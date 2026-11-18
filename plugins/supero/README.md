# Supero plugin for Claude Code

Supero is the multi-tenant backend your coding agent configures over MCP: sign-in, tenants, roles and permissions, data, workflows and deployment.

The plugin adds two things:

- **The Supero MCP server** at `https://mcp.supero.dev/mcp` (Streamable HTTP). You sign in with your Supero account through OAuth, so there is no API key to copy, and the plugin stores no credentials. The plugin connects with every tool.
- **The `supero-build` skill.** It covers the build sequence, the tool groups, common pitfalls and starter prompts. The skill is generated from [`guidance/build.md`](../../guidance/build.md).

The plugin has no hooks, scripts or executables. It connects to `mcp.supero.dev` to load the server's tools and handle sign-in, and sign-in opens `app.supero.dev` in your browser.

## Data it sends

The plugin itself sends nothing. When you call a Supero tool, Claude Code sends the tool's arguments to `https://mcp.supero.dev/mcp`. The server then reads or writes your Supero workspace under your own permissions. Your Supero account details and the app data you ask it to read or write are handled under the [Supero privacy policy](https://supero.dev/privacy). You can review or revoke the connection at `https://app.supero.dev/oauth/connections`.

## Install

```text
/plugin marketplace add supero-platform/supero-mcp
/plugin install supero@supero
```

Then run `/mcp`, select the `supero` server and authenticate. In the browser you pick a new or an existing project for the connection, and whether it may publish apps.

Installs from the earlier marketplace, `supero-platform/supero-claude-plugin`, get this same plugin.

## Try it

Ask: "Which Supero account and project am I connected to?" Then: "Build a helpdesk on Supero where each customer company sees only its own tickets."

## Cursor

The Cursor plugin is in [`plugins/supero-cursor`](../supero-cursor). It has the same server and skill, plus a Cursor rule.

## Support

Email info@supero.dev, or open an issue at https://github.com/supero-platform/supero-mcp/issues. Privacy policy: https://supero.dev/privacy. Terms: https://supero.dev/terms.

MIT licensed.
