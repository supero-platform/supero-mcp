# Supero plugin for Cursor

Supero is the multi-tenant backend your coding agent configures over MCP: sign-in, tenants, roles and permissions, data, workflows and deployment.

The plugin adds three things:

- **The Supero MCP server** at `https://mcp.supero.dev/mcp?features=core` (Streamable HTTP). It offers the tools a first build needs. You sign in with your Supero account through OAuth, so there is no API key to copy, and the plugin stores no credentials. Cursor reads the server from `mcp.json`.
- **The `supero-build` skill.** It covers the build sequence, the tool groups, common pitfalls and starter prompts.
- **A Cursor rule**, `rules/supero.mdc`, with the same guidance.

The skill and the rule are generated from [`guidance/build.md`](../../guidance/build.md). The plugin has no hooks, scripts or executables.

## Data it sends

The plugin itself sends nothing. When you call a Supero tool, Cursor sends the tool's arguments to `https://mcp.supero.dev/mcp`. The server then reads or writes your Supero workspace under your own permissions, as described in the [Supero privacy policy](https://supero.dev/privacy). You can review or revoke the connection at `https://app.supero.dev/oauth/connections`.

## More tools

To add a tool group, such as platform services, change the server URL in `mcp.json` to `https://mcp.supero.dev/mcp?features=core,services`. Use `features=all` for every tool. The groups are listed in the [repo README](../../README.md#tools).

## Try it

Ask: "Which Supero account and project am I connected to?" Then: "Build a helpdesk on Supero where each customer company sees only its own tickets."

## Support

Email info@supero.dev, or open an issue at https://github.com/supero-platform/supero-mcp/issues. Privacy policy: https://supero.dev/privacy. Terms: https://supero.dev/terms.

MIT licensed.
