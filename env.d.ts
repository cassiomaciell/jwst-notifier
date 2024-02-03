declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			DISCORD_WEBHOOK_ID: string;
			DISCORD_WEBHOOK_TOKEN: string;
			DISCORD_MENTION_ROLE_ID: string;
			DATABASE_URL: string;
			WEBB_BASE_URL: string;
			WEBB_IMAGES_URL: string;
		}
	}
}

export {};
