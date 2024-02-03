# JWST Notifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JWST Notifier is a simple project that uses GitHub Actions to check for newly released images, notifies through Discord webhooks, and employs MongoDB to store notified images.

### Secrets

- `DISCORD_WEBHOOK_ID`: The Discord webhook ID.
- `DISCORD_WEBHOOK_TOKEN`: The Discord webhook token.
- `DISCORD_MENTION_ROLE_ID`: The Discord role ID for mentioning.
- `DATABASE_URL`: The MongoDB connection URL.

[GitHub documentation on secrets](https://docs.github.com/actions/security-guides/encrypted-secrets).

### Variables

- `WEBB_BASE_URL`: Base URL of the website.
- `WEBB_IMAGES_URL`: URL for retrieving images.

[GitHub documentation on variables](https://docs.github.com/actions/learn-github-actions/variables).

## Example

```ini
# Secrets
DISCORD_WEBHOOK_ID="1213122322228994944"
DISCORD_WEBHOOK_TOKEN="PVCLygPdytAmiYAmgos41zWXfNfhp8rfzdjvUAjoE6HzX6ou17TWD-XHsPaAcuhbJ1xqcL"
DISCORD_MENTION_ROLE_ID="1223455444543466111"
DATABASE_URL="mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/webb"

# Vars
WEBB_IMAGES_URL="https://esawebb.org/images/?&sort=-release_date"
WEBB_BASE_URL="https://esawebb.org"
```
