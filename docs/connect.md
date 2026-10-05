# Connecting a client

| | |
|---|---|
| Endpoint | `https://api.supero.dev/mcp/v1/messages` |
| Transport | Streamable HTTP, JSON-RPC 2.0 |
| Protocol versions | `2025-03-26`, `2024-11-05` |
| Auth | `X-API-Key: ak_...` (raw key, no `Bearer`) |
| Server info | `GET https://api.supero.dev/mcp/v1/info` |

`initialize` and `tools/list` work without a key, so you can look at the tool list before you sign up. `tools/call` needs a key.

## Claude Code

```bash
claude mcp add --transport http supero \
  https://api.supero.dev/mcp/v1/messages \
  --header "X-API-Key: ak_..."
```

Run `/mcp` to confirm `supero` is connected. To keep the key out of your shell history, put it in an environment variable and pass `--header "X-API-Key: $SUPERO_API_KEY"`.

## Cursor

`~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "supero": {
      "url": "https://api.supero.dev/mcp/v1/messages",
      "headers": { "X-API-Key": "ak_..." }
    }
  }
}
```

## VS Code with GitHub Copilot

`.vscode/mcp.json`:

```json
{
  "servers": {
    "supero": {
      "type": "http",
      "url": "https://api.supero.dev/mcp/v1/messages",
      "headers": { "X-API-Key": "ak_..." }
    }
  }
}
```

Open the command palette, run **MCP: List Servers**, start `supero`, and switch Copilot Chat to Agent mode.

If the file is in a repo, add it to `.gitignore` or use an input variable for the key. A committed key is a leaked key.

## Other clients

A client works if it can do two things: speak MCP over streamable HTTP, and add a custom header to every request. Point it at the endpoint above and set `X-API-Key`.

## What does not work yet

**Claude Desktop and claude.ai custom connectors.** Their "add connector" screen expects the server to offer OAuth, and Supero's server authenticates with a key in a header. Until that changes, use one of the clients above.

If you get a client working that is not listed here, please send a pull request with the steps.

## Which key

A **project key** can build into one project and nothing else. A **domain key** can also create projects. Start with a project key: if it leaks, one project is exposed, not your account. An ordinary dashboard sign-in session cannot run the build tools that change things; they need a key.

## From a script

```bash
# The tool list, no key needed
curl -s https://api.supero.dev/mcp/v1/messages \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# One tool call
curl -s https://api.supero.dev/mcp/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $SUPERO_API_KEY" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"build_whoami","arguments":{}}}'
```
