# Supero plugin

Supero is the multi-tenant backend your coding agent configures over MCP: sign-in, tenants, roles and permissions, data, workflows and deployment. This plugin works in Claude Code and in Cursor.

It adds:

- **The Supero MCP server** (Streamable HTTP). You sign in with your Supero account through OAuth, so there is no API key to copy, and the plugin stores no credentials. Claude Code reads `.mcp.json`, which uses `https://mcp.supero.dev/mcp` with every tool. Cursor reads `mcp.json`, which uses `https://mcp.supero.dev/mcp?features=core`.
- **The `supero-build` skill** with the build sequence, the tool groups, common pitfalls and starter prompts.
- **A Cursor rule**, `rules/supero.mdc`, with the same guidance.

The skill and the rule are generated from [`guidance/build.md`](../../guidance/build.md). The plugin has no hooks, scripts or executables. It connects to `mcp.supero.dev` to load the server's tools and handle sign-in, and sign-in opens `app.supero.dev` in your browser.

## Install in Claude Code

```text
/plugin marketplace add supero-platform/supero-mcp
/plugin install supero@supero
```

Then run `/mcp`, select the `supero` server and authenticate. In the browser you pick a new or an existing project for the connection and whether it may publish apps. Review or revoke the connection at `https://app.supero.dev/oauth/connections`.

Installs from the earlier marketplace, `supero-platform/supero-claude-plugin`, get this same plugin.

## More tools

In Cursor the plugin connects with `?features=core`, the tools a first build needs. To add a group, such as platform services, change the server URL to `https://mcp.supero.dev/mcp?features=core,services`, or use `features=all` for every tool. In Claude Code the plugin already has every tool. The groups are listed in the [repo README](../../README.md#tools).

## Try it

Ask: "Which Supero account and project am I connected to?" Then: "Build a helpdesk on Supero where each customer company sees only its own tickets."

## Support

Email info@supero.dev, or open an issue at https://github.com/supero-platform/supero-mcp/issues. Privacy policy: https://supero.dev/privacy. Terms: https://supero.dev/terms.

MIT licensed.
