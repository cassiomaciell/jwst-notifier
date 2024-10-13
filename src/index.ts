import { EmbedBuilder, WebhookClient } from 'discord.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import puppeteer from 'puppeteer-core';
import { WebbImage } from './types';

const webhookClient = new WebhookClient({
	id: process.env.DISCORD_WEBHOOK_ID,
	token: process.env.DISCORD_WEBHOOK_TOKEN,
});

interface IImage {
	imageId: string;
}

const imageSchema = new mongoose.Schema<IImage>({
	imageId: { type: String, required: true },
});

const Image = mongoose.model<IImage>('Image', imageSchema);

async function checkImages() {
	const browser = await puppeteer.launch({
		headless: true,
		channel: 'chrome',
	});
	
	const page = await browser.newPage();
	console.log('Navigating to images URL');

	await page.goto(process.env.WEBB_IMAGES_URL);
	const images = (await page.evaluate<WebbImage[]>('images')) as WebbImage[];
	await browser.close();

	console.log('Fetching known image IDs');
	const knownImageIds = (await Image.find()).map(
		(knownImage) => knownImage.imageId
	);
	const newImages = images.filter((image) => !knownImageIds.includes(image.id));

	if (newImages.length > 0) {
		const embeds = newImages.map((image) => {
			return new EmbedBuilder({
				title: image.title,
				url: process.env.WEBB_BASE_URL + image.url,
				image: { url: image.src },
			});
		});

		const chunkedEmbeds = chunkArray(embeds, 10);

		for (const chunk of chunkedEmbeds) {
			console.log('Sending embeds');
			await webhookClient.send({
				embeds: chunk,
				content: `<@&${process.env.DISCORD_MENTION_ROLE_ID}>`,
			});
		}

		console.log(`Inserting ${newImages.length} new images`);
		await Image.bulkWrite(
			newImages.map((image) => ({
				insertOne: {
					document: {
						imageId: image.id,
					},
				},
			}))
		);
	} else {
		console.log('No new images found');
	}
}

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
	const chunkedArray: T[][] = [];

	for (let i = 0; i < arr.length; i += chunkSize) {
		chunkedArray.push(arr.slice(i, i + chunkSize));
	}

	return chunkedArray;
}

(async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		await checkImages();
		mongoose.disconnect();
	} catch (error) {
		mongoose.disconnect();
		console.error(error);
		throw error;
	}
})();
