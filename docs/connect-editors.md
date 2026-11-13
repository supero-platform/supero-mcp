# Connect VS Code, Cursor, Gemini CLI, Codex CLI or Windsurf

These tools sign in to Supero with OAuth, the same way ChatGPT and Claude do. There is no key to copy. Add the server URL to the tool's config, sign in when the browser opens, and click Allow.

| | |
|---|---|
| Server URL | `https://mcp.supero.dev/mcp` (exactly this: no trailing slash) |
| Transport | Streamable HTTP |
| Sign-in | OAuth 2.1 with PKCE. The tool registers itself (dynamic registration, or a client ID metadata document for Codex). |
| Discovery | `https://mcp.supero.dev/.well-known/oauth-protected-resource/mcp` and `https://mcp.supero.dev/.well-known/oauth-authorization-server` |

A request without a token gets `401` with a `WWW-Authenticate` header that points to the discovery document; the tool takes it from there.

**What "checked" means below.** On 2026-11-13 each tool's sign-in was replayed against the live server with the exact registration, scopes and redirect that tool sends (taken from its source or documentation): registration, browser sign-in and Allow, token, refresh, `initialize`, `tools/list` and one tool call. Windsurf does not publish its registration, so for Windsurf each documented shape was checked instead, against the live server and in Supero's tests; Windsurf itself was not run.

**What the approval page shows.** Editors and command-line tools receive the sign-in on a local address (`127.0.0.1` or `localhost`). Supero can't verify a program on your computer, so the approval page usually says "Supero hasn't verified this app" (Codex may show as ChatGPT instead). That is expected; continue only if you started the sign-in yourself. You also pick where the tool may work: a new project or an existing one. A tool on your computer is never offered the whole workspace. Details: [access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access).

**Sign-in or API key.** Sign-in is the simpler choice. Use an API key (`https://api.supero.dev/mcp/v1/messages` with an `X-API-Key` header) when there is no browser, from scripts and CI, or for the tools that are only offered with a key; [tools.md](tools.md) marks which ones. Each section below has the key version of the config as well. Creating a key is covered in the [main README](../README.md#1-get-a-key).

- [VS Code with GitHub Copilot](#vs-code-with-github-copilot)
- [Cursor](#cursor)
- [Gemini CLI](#gemini-cli)
- [Codex CLI](#codex-cli)
- [Windsurf (Devin Desktop)](#windsurf-devin-desktop)
- [Check the connection](#check-the-connection)
- [When something goes wrong](#when-something-goes-wrong)

## VS Code with GitHub Copilot

Full guide: [docs.supero.dev/developers/mcp/connect-vscode-copilot](https://docs.supero.dev/developers/mcp/connect-vscode-copilot/)

> **Note.** Checked end to end against Supero on 2026-11-13 with VS Code's own sign-in behaviour: registration, browser sign-in, token refresh, and the tool list.

Create `.vscode/mcp.json` in your workspace (or add the same entry to your user MCP configuration):

```json
{
  "servers": {
    "supero": {
      "type": "http",
      "url": "https://mcp.supero.dev/mcp"
    }
  }
}
```

1. **Start the server.** Open `.vscode/mcp.json` and start the `supero` server, or run **MCP: List Servers** from the Command Palette and start it there.
2. **Sign in.** VS Code opens your browser at Supero. Sign in, or create an account.
3. **Allow.** The approval page says "Supero hasn't verified this app", followed by the local address the tool uses (such as 127.0.0.1 or localhost). That is normal. Supero can't check a program on your computer, so it asks you to confirm you started the sign-in. Pick where it may work ([access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access)). Click Allow.
4. **Use it.** Open Copilot Chat, switch to Agent mode, and check that the Supero tools are enabled in the tools picker.

**With an API key instead**

Use an API key only when you can't sign in, for example on a server with no browser. The key endpoint is `https://api.supero.dev/mcp/v1/messages` with the key in the `X-API-Key` header; see [Connect Your AI Editor over MCP](https://docs.supero.dev/developers/mcp/overview/#authentication) for creating a key and its scope. Never commit a key.

```json
{
  "inputs": [
    { "type": "promptString", "id": "supero-key", "description": "Supero API key", "password": true }
  ],
  "servers": {
    "supero": {
      "type": "http",
      "url": "https://api.supero.dev/mcp/v1/messages",
      "headers": { "X-API-Key": "${input:supero-key}" }
    }
  }
}
```

**If it goes wrong**

- VS Code allows up to 128 tools per request across all servers. Supero lists about 50 when you sign in and about 70 with an API key. If you hit the limit, turn off tools you don't need in the tools picker.

## Cursor

Full guide: [docs.supero.dev/developers/mcp/connect-cursor](https://docs.supero.dev/developers/mcp/connect-cursor/)

> **Note.** Checked end to end against Supero on 2026-11-13 with Cursor's documented sign-in: registration, browser sign-in, token refresh, and the tool list.

Add Supero to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "supero": {
      "url": "https://mcp.supero.dev/mcp"
    }
  }
}
```

1. **Turn it on.** Open Cursor's settings, find the MCP section, and enable `supero`.
2. **Sign in.** Cursor opens your browser at Supero. Sign in, or create an account.
3. **Allow.** The approval page says "Supero hasn't verified this app", followed by the local address the tool uses (such as 127.0.0.1 or localhost). That is normal. Supero can't check a program on your computer, so it asks you to confirm you started the sign-in. Pick where it may work ([access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access)). Click Allow.
4. **Use it.** Ask Cursor's agent to build an app; it calls the Supero tools.

**With an API key instead**

Use an API key only when you can't sign in, for example on a server with no browser. The key endpoint is `https://api.supero.dev/mcp/v1/messages` with the key in the `X-API-Key` header; see [Connect Your AI Editor over MCP](https://docs.supero.dev/developers/mcp/overview/#authentication) for creating a key and its scope. Never commit a key.

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

**If it goes wrong**

- Some Cursor versions pass only the first 40 tools to the model. All of Supero's build tools are in the first 40, so building works either way.

## Gemini CLI

Full guide: [docs.supero.dev/developers/mcp/connect-gemini-cli](https://docs.supero.dev/developers/mcp/connect-gemini-cli/)

> **Note.** Checked end to end against Supero on 2026-11-13 with Gemini CLI's own sign-in: it requests every scope Supero lists and requires the iss check; both work.

Add Supero to `~/.gemini/settings.json` (or `.gemini/settings.json` in a project). Use `httpUrl`, not `url`: `url` means the older SSE transport.

```json
{
  "mcpServers": {
    "supero": {
      "httpUrl": "https://mcp.supero.dev/mcp"
    }
  }
}
```

1. **Start Gemini CLI.** Run `gemini`. It reports that Supero needs authentication.
2. **Sign in.** Run `/mcp auth supero`. Your browser opens at Supero. Sign in, or create an account.
3. **Allow.** The approval page says "Supero hasn't verified this app", followed by the local address the tool uses (such as 127.0.0.1 or localhost). That is normal. Supero can't check a program on your computer, so it asks you to confirm you started the sign-in. Pick where it may work ([access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access)). Click Allow.
4. **Use it.** Run `/mcp` to see the Supero tools, then ask Gemini to build an app.

**With an API key instead**

Use an API key only when you can't sign in, for example on a server with no browser. The key endpoint is `https://api.supero.dev/mcp/v1/messages` with the key in the `X-API-Key` header; see [Connect Your AI Editor over MCP](https://docs.supero.dev/developers/mcp/overview/#authentication) for creating a key and its scope. Never commit a key.

```json
{
  "mcpServers": {
    "supero": {
      "httpUrl": "https://api.supero.dev/mcp/v1/messages",
      "headers": { "X-API-Key": "$GEMINI_CLI_SUPERO_API_KEY" }
    }
  }
}
```

Set `GEMINI_CLI_SUPERO_API_KEY` in your environment; Gemini CLI expands it, so the key stays out of the file. Keep the `GEMINI_CLI_` prefix: Gemini CLI blanks variables whose names contain words like KEY or TOKEN before expanding headers, and a name starting with `GEMINI_CLI_` is exempt.

**If it goes wrong**

- Gemini CLI keeps your sign-in in `~/.gemini/mcp-oauth-tokens.json`. If it expires, run `/mcp auth supero` again.

## Codex CLI

Full guide: [docs.supero.dev/developers/mcp/connect-codex-cli](https://docs.supero.dev/developers/mcp/connect-codex-cli/)

> **Note.** Checked end to end against Supero on 2026-11-13 with Codex's own sign-in (its chatgpt.com client document and its registration fallback).

Add Supero to `~/.codex/config.toml`:

```toml
[mcp_servers.supero]
url = "https://mcp.supero.dev/mcp"
```

1. **Sign in.** Run `codex mcp login supero`. Your browser opens at Supero. Sign in, or create an account. No browser on that machine? Add `--no-browser` and paste the redirect URL back when asked.
2. **Allow.** Codex identifies itself with a document hosted on chatgpt.com, so the approval page may name the app **ChatGPT**, or say "Supero hasn't verified this app" followed by 127.0.0.1. Either is expected. Pick where it may work ([access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access)). Click Allow.
3. **Use it.** Start `codex` and ask it to build an app; it calls the Supero tools.

**With an API key instead**

Use an API key only when you can't sign in, for example on a server with no browser. The key endpoint is `https://api.supero.dev/mcp/v1/messages` with the key in the `X-API-Key` header; see [Connect Your AI Editor over MCP](https://docs.supero.dev/developers/mcp/overview/#authentication) for creating a key and its scope. Never commit a key.

```toml
[mcp_servers.supero]
url = "https://api.supero.dev/mcp/v1/messages"
env_http_headers = { "X-API-Key" = "SUPERO_API_KEY" }
```

`env_http_headers` reads the header value from the `SUPERO_API_KEY` environment variable, so the key stays out of the file.

**If it goes wrong**

- Codex keeps your sign-in in the OS keyring, or in `~/.codex/.credentials.json`. If it expires, run `codex mcp login supero` again.

## Windsurf (Devin Desktop)

Full guide: [docs.supero.dev/developers/mcp/connect-windsurf](https://docs.supero.dev/developers/mcp/connect-windsurf/)

> **Status.** Supero accepts every sign-in shape Windsurf documents (a local callback on any port, all scopes, with or without a resource), checked against the live server and in Supero's tests on 2026-11-13. Windsurf does not publish its exact registration, so if sign-in fails, use the API key option below and tell us at app.supero.dev.

For the Cascade agent, add Supero to `~/.config/devin/mcp_config.json` (on Windows, `%AppData%/devin/mcp_config.json`):

```json
{
  "mcpServers": {
    "supero": {
      "serverUrl": "https://mcp.supero.dev/mcp"
    }
  }
}
```

1. **Sign in.** When Windsurf connects to the server it opens your browser at Supero. Sign in, or create an account. If the server later shows Needs authentication (the sign-in expired), authenticate it again from the MCP list.
2. **Allow.** The approval page says "Supero hasn't verified this app", followed by the local address the tool uses (such as 127.0.0.1 or localhost). That is normal. Supero can't check a program on your computer, so it asks you to confirm you started the sign-in. Pick where it may work ([access options](https://docs.supero.dev/developers/mcp/connect-chatgpt-claude/#access)). Click Allow.
3. **Use it.** Ask Cascade to build an app; it calls the Supero tools.

**With an API key instead**

Use an API key only when you can't sign in, for example on a server with no browser. The key endpoint is `https://api.supero.dev/mcp/v1/messages` with the key in the `X-API-Key` header; see [Connect Your AI Editor over MCP](https://docs.supero.dev/developers/mcp/overview/#authentication) for creating a key and its scope. Never commit a key.

```json
{
  "mcpServers": {
    "supero": {
      "serverUrl": "https://api.supero.dev/mcp/v1/messages",
      "headers": { "X-API-Key": "${env:SUPERO_API_KEY}" }
    }
  }
}
```

**If it goes wrong**

- Cascade can use at most 100 tools across all servers at once. Supero lists about 50 when you sign in and about 70 with an API key. If you hit the limit, turn off tools you don't need.

## Check the connection

Ask the assistant:

```text
Use Supero and tell me who I am connected as.
```

It calls `build_whoami` and answers with your workspace and what the connection may do. Signed in, Supero lists about 50 tools, build tools first. Then ask for an app:

```text
Build a booking app for a dog grooming salon: customers pick a groomer and a time slot and pay a deposit; staff see the day's appointments.
```

What happens next is in [build-flow.md](build-flow.md) and [first-app.md](first-app.md).

## When something goes wrong

- Use the URL exactly as `https://mcp.supero.dev/mcp`, with no trailing slash. Some clients compare it with the server's published resource and stop if they differ.
- "Too many registrations" (HTTP 429). Each new sign-in registers the tool with Supero. One IP address may register 10 times an hour (an IPv6 /64 network 20 times), and there is an overall hourly limit. Wait, then try again. A sign-in that already works is not affected.
- Signed in as the wrong account: remove the server, add it again, and use Switch account on the approval page.
- To disconnect, use Disconnect at [app.supero.dev/oauth/connections](https://app.supero.dev/oauth/connections), then remove the server from the tool's config.
- Changing your Supero password or email ends every assistant connection you signed in. Your projects and apps are not affected; sign in again from the tool.
- A tool you expected is missing: it may be offered only with an API key. See [tools.md](tools.md).

Got another MCP client working? Send a pull request with its steps.
