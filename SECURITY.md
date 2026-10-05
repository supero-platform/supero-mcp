# Security

## Reporting a problem

Email **security@supero.dev**. Please do not open a public issue for a security report. We will acknowledge within 2 business days and keep you posted until it is resolved.

The hosted platform and its MCP server at `api.supero.dev` are in scope, at the same address.

## Your key

- A key is shown once and works like a password. Keep it out of git, issues, screenshots and chat logs.
- Prefer a **project key**. It can reach one project. A domain key can create projects across your account.
- If a key may have leaked, rotate it under **API Keys** straight away. The old one stops working.
- Client config files (`.cursor/mcp.json`, `.vscode/mcp.json`) hold the key in plain text. Keep them out of a shared repo.

## Apps you build

- A preview is on the public internet for about 30 minutes. Do not put real personal data in it.
- Seed users in a demo have known passwords so people can try it. Change or remove them before real users arrive, and switch the project to live mode.
- Secrets for email, SMS and payments go in the app's admin panel, never in the bundle.
- An app built here is a starting point, not a certified system. Do not put health, payment-card or other regulated data in one without the agreements and reviews that data requires.
