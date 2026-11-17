# Supero plugin for Antigravity

Supero is the multi-tenant backend your coding agent configures over MCP: sign-in, tenants, roles and permissions, data, workflows and deployment.

This plugin adds:

- the Supero MCP server at `https://mcp.supero.dev/mcp?features=core` (Streamable HTTP), in `mcp_config.json`;
- the `supero-build` skill;
- an always-on rule, `rules/AGENTS.md`.

You sign in with your Supero account through OAuth when the server first connects. There is no API key to copy.

The skill and the rule are generated from [`guidance/build.md`](../../guidance/build.md).

## Install

```bash
git clone https://github.com/supero-platform/supero-mcp
agy plugin install ./supero-mcp/plugins/supero-antigravity
```

To add tool groups such as platform services, change `serverUrl` in `mcp_config.json` to `https://mcp.supero.dev/mcp?features=core,services`, or use `features=all` for every tool.

## Support

Email info@supero.dev, or open an issue at https://github.com/supero-platform/supero-mcp/issues. Privacy policy: https://supero.dev/privacy. Terms: https://supero.dev/terms.

MIT licensed.
