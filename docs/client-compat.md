# Client compatibility

How each MCP client works with the Supero server. "Sign-in" means OAuth to `https://mcp.supero.dev/mcp`. The client registers itself, through dynamic client registration or a client ID metadata document, so there is nothing to configure.

## Sign-in and tools/list

Checked on 13 November 2026 against the live server. Each client's own sign-in sequence was run end to end: discovery, OAuth, connect and `tools/list`.

| Client | Sign-in | Connect | Tools listed | Notes |
|---|---|---|---|---|
| Claude Code | yes | yes | yes | `claude mcp add --transport http`, or the plugin in `plugins/supero` |
| VS Code (GitHub Copilot) | yes | yes | yes | VS Code drops a tool whose input schema fails draft-07; every Supero tool passes |
| Cursor | yes | yes | yes | |
| Gemini CLI | yes | yes | yes | Sign in with `/mcp auth supero` |
| Codex CLI | yes | yes | yes | Codex signs in with its client ID metadata document |

## Core tool set (`?features=core`)

Checked on 17 November 2026 against the live server with the Gemini CLI and VS Code client profiles:

| Check | Result |
|---|---|
| `tools/list` on `https://mcp.supero.dev/mcp?features=core` | 20 tools: the core set in [tool-groups.json](tool-groups.json) apart from `build_next_steps`, which the server lists only where it is enabled |
| `tools/list` with no query | every tool, unchanged |
| `build_teardown` (ops group) called on a core connection | refused, with the `?features=core,ops` URL to reconnect with |
| VS Code schema validator on the core tools | 0 failures |

## Install links and listings

| Install route | Status |
|---|---|
| Cursor "Add to Cursor" link | not yet tested |
| VS Code install link (`vscode:mcp/install` and the vscode.dev redirect) | not yet tested |
| Claude Code plugin (`/plugin marketplace add supero-platform/supero-mcp`) | not yet tested |
| Gemini CLI extension (`gemini extensions install`) | not yet tested |
| Antigravity plugin (clone, then `agy plugin install`) | not yet tested |

To report a client that doesn't work, open an issue at https://github.com/supero-platform/supero-mcp/issues or email info@supero.dev.
