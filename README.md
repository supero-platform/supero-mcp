# Supero: the multi-tenant backend your coding agent configures over MCP

[![Glama MCP connector](https://glama.ai/mcp/connectors/io.github.supero-platform/supero/badges/score.svg)](https://glama.ai/mcp/connectors/io.github.supero-platform/supero)

Your agent writes the UI. [Supero](https://supero.dev/?ref=github) provides the rest: sign-in, tenants, roles and permissions, data on Supero's database or yours, workflows, and deployment to Supero Cloud or your own AWS. This repo holds the remote MCP server's install files, build guidance and examples.

The server is `https://mcp.supero.dev/mcp` (Streamable HTTP). You sign in with your Supero account through OAuth, so there is no API key to copy. New installs use `https://mcp.supero.dev/mcp?features=core`, which offers the tools a first build needs; [Tools](#tools) explains how to add more. The server is in the official MCP Registry as `io.github.supero-platform/supero`.

## What Supero handles

You describe an app. Your assistant reads the build spec from Supero, plans the app with you, writes a small bundle (the data model, the configuration and the front end), validates it, and deploys it to a URL you can open. The platform supplies:

- sign-in and sign-up, with each customer organisation kept apart from the others;
- roles, permissions, and per-record and per-field access rules;
- the database, the REST API and an admin panel;
- workflows, email and notifications;
- ready-made services: bookings, appointments, rentals, cart, orders, payments, approvals, tasks, tickets, reviews, memberships, recurring plans, inventory, document signature and attachments;
- previews, permanent URLs on `supero.live`, and deployment to your own cloud.

## Install

Every option below signs in through your browser. The links, the Cursor, Gemini and Antigravity installs, and the `claude mcp add` command connect to `https://mcp.supero.dev/mcp?features=core`. The Claude Code plugin connects to `https://mcp.supero.dev/mcp`, which has every tool.

**Claude Code plugin** (the server plus the `supero-build` skill). Inside Claude Code:

```text
/plugin marketplace add supero-platform/supero-mcp
/plugin install supero@supero
```

Then run `/mcp`, select `supero` and authenticate. The earlier marketplace, `supero-platform/supero-claude-plugin`, installs the same plugin.

**Claude Code without the plugin:**

```bash
claude mcp add --transport http --scope user supero "https://mcp.supero.dev/mcp?features=core"
```

Use either the plugin or this command, not both, or the tools appear twice.

**Cursor:** [![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=supero&config=eyJ1cmwiOiJodHRwczovL21jcC5zdXBlcm8uZGV2L21jcD9mZWF0dXJlcz1jb3JlIn0=)

The direct link is `cursor://anysphere.cursor-deeplink/mcp/install?name=supero&config=eyJ1cmwiOiJodHRwczovL21jcC5zdXBlcm8uZGV2L21jcD9mZWF0dXJlcz1jb3JlIn0=`. The repo also has a Cursor plugin in [`plugins/supero-cursor`](plugins/supero-cursor) with the server, a rule and the skill.

**VS Code (GitHub Copilot):** [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Supero-0098FF?logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522supero%2522%252C%2522type%2522%253A%2522http%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fmcp.supero.dev%252Fmcp%253Ffeatures%253Dcore%2522%257D)

Or open `vscode:mcp/install?%7B%22name%22%3A%22supero%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.supero.dev%2Fmcp%3Ffeatures%3Dcore%22%7D`. Start the server from **MCP: List Servers** and use Copilot in Agent mode.

**Gemini CLI:**

```bash
gemini extensions install https://github.com/supero-platform/supero-mcp
```

Then run `/mcp auth supero` inside Gemini CLI. The extension adds the server and [GEMINI.md](GEMINI.md) as context.

**Antigravity:** clone this repo and install the plugin folder:

```bash
git clone https://github.com/supero-platform/supero-mcp
agy plugin install ./supero-mcp/plugins/supero-antigravity
```

It signs in when the server first connects.

**ChatGPT, claude.ai and Claude Desktop:** add `https://mcp.supero.dev/mcp` as a custom connector. The steps are in [Build with ChatGPT or Claude](docs/connect-chatgpt-claude.md).

**Codex CLI, Windsurf and other clients:** see [Connect your editor or CLI](docs/connect-editors.md). [AGENTS.md](AGENTS.md) has the build guidance in the form Codex and other `AGENTS.md` readers use; copy it into your project.

**Scripts and CI** with no browser use an API key at `https://api.supero.dev/mcp/v1/messages`, sent raw in an `X-API-Key` header. Create the key in the dashboard under **Build via MCP**. The setup is in [docs/connect.md](docs/connect.md).

## Try it

Paste one of these after you connect:

```text
Which Supero account and project am I connected to?
```

```text
Build a helpdesk on Supero. Customers belong to a company and open tickets; agents answer them; an admin manages agents. A customer sees only their own company's tickets, and agents see every company's. Plan it first and show me the plan before you build. Then validate, publish, deploy a preview and verify it, and tell me the URL and how to sign in.
```

```text
In my Supero app, add a priority field (low, normal, high) to tickets and show it in the ticket list. Change nothing else. Validate, publish and redeploy, then tell me the new version and URL.
```

The free plan has 3 projects and needs no card. Deployments on it are 30-minute previews; a permanent URL is a paid plan. Current figures are on the [pricing page](https://supero.dev/pricing) and in [docs/limits.md](docs/limits.md).

How a build runs, step by step, is in [guidance/build.md](guidance/build.md), the same guidance every client above receives. [Your first app, step by step](docs/first-app.md) walks through one in 30 minutes, and [docs/prompts.md](docs/prompts.md) has more prompts.

## Examples

- [supero-apps](https://github.com/supero-platform/supero-apps): complete reference apps with source and live demos.
- [Project briefs](projects/README.md): 31 apps worth building, in 16 verticals, written as requirements. Each ends with a prompt to paste. [Picking a project](docs/pick-a-project.md) helps you choose.
- [Community apps](apps/README.md): apps people have built, with source, such as [Page Turners, a book club app](apps/community/book-club/README.md).

## Tools

<!-- tools:start (generated by scripts/gen-guidance from docs/tool-groups.json) -->

A connection to `https://mcp.supero.dev/mcp?features=core` has the 21 core tools:

`build_whoami`, `build_list_projects`, `build_get_project`, `build_create_project`, `build_plan`, `build_get_skills`, `build_next_steps`, `schema_list`, `schema_get`, `schema_save`, `schema_validate`, `crud_search`, `crud_get`, `crud_create`, `crud_update`, `build_validate`, `build_publish`, `build_get_bundle`, `build_deploy`, `build_deploy_status`, `build_verify`.

Other tools come in groups. Add a group to the URL to get its tools, for example `https://mcp.supero.dev/mcp?features=core,services`, or use `features=all` for every tool. Without `features` the server offers every tool, as it always has.

| Group | What it adds | Tools |
|---|---|---|
| `ops` | logs, preflight checks, reports, deletes and teardown | `build_logs`, `build_doctor`, `build_report`, `build_audit`, `crud_delete`, `build_teardown`, `build_stage_bundle` |
| `schemas` | change or delete schemas saved in a project | `schema_list_project`, `schema_update`, `schema_delete` |
| `services` | platform services, integrations and example apps | `build_configure_services`, `build_import_services`, `build_recommend_integrations`, `build_get_service_contract`, `build_list_capabilities`, `build_get_examples`, `project_link_schemas` |
| `sdk` | generate and download client SDKs | `sdk_list`, `sdk_status`, `sdk_generate`, `sdk_download` |
| `testing` | smoke and end-to-end tests of a deployed app | `build_smoke_test`, `build_e2e_test`, `build_e2e_test_status`, `build_check_app_account` |
| `connectors` | outside data sources and connector runs | `connector_status`, `connector_plugins`, `connector_test`, `connector_test_config`, `connector_enable`, `connector_disable`, `connector_run`, `connector_cancel`, `connector_discover`, `connector_discover_status`, `connector_discover_results`, `build_connect_data_source`, `build_discover_source`, `build_bind_data_source`, `build_run_data_source`, `build_list_data_sources`, `build_list_bound_schemas` |
| `rbac` | check permissions and key scope | `rbac_check_permission`, `rbac_get_my_access`, `apikey_get_scope` |
| `production` | permanent URL, live mode and project changes | `build_go_live`, `build_go_production`, `build_set_project_mode`, `build_update_project`, `build_replace_project` |

Add `read_only=true` to keep only tools that change nothing. Every tool, with its arguments, is in [docs/tools.md](docs/tools.md).

<!-- tools:end -->

## Security and privacy

- Sign-in is OAuth with your Supero account. You choose which project the connection may use and whether it may publish, and you can review or revoke it at `https://app.supero.dev/oauth/connections`. Changing your Supero password or email ends every signed-in assistant connection.
- Every tool call runs with your own permissions. Each customer organisation's data in a multi-tenant app is kept apart by the platform, not by the app's code.
- Secrets for email, SMS or payments go in the app's admin panel, never in the bundle or this repo.
- [Security](https://supero.dev/security), [privacy policy](https://supero.dev/privacy) and [terms](https://supero.dev/terms). Report a vulnerability privately as described in [SECURITY.md](SECURITY.md).

## Support

| You see | It means | Do this |
|---|---|---|
| ChatGPT or Claude asks for a key or a header | You used the key URL | Use `https://mcp.supero.dev/mcp` and sign in. |
| A tool is refused with "is in the '…' tool group" | The connection URL doesn't include that group | Change the URL to the one the message gives and reconnect. |
| `401` or `Invalid API key` | The key is wrong, cut short, revoked, or has `Bearer` in front | Paste the raw `ak_...` value, or rotate it under **API Keys**. |
| The assistant looks for a CLI or a `SKILLS.md` file | There is none; the spec comes from the server | Ask it to call `build_get_skills` over MCP. |
| `build_validate` fails | The bundle breaks a rule | Let the assistant fix what it lists and run it again. Validation is free. |
| Deploy stays in `launching` | The app is still starting | Keep polling `build_deploy_status` for up to ten minutes. |
| A status field won't save for ordinary users | Fields named `status` or `state` are protected | Name lifecycle fields `<something>_state`. |

- Email: [info@supero.dev](mailto:info@supero.dev)
- Bugs and requests: [GitHub issues](https://github.com/supero-platform/supero-mcp/issues)
- Questions: [GitHub Discussions](https://github.com/supero-platform/supero-mcp/discussions)
- Documentation: [docs.supero.dev](https://docs.supero.dev/developers/mcp/overview/), with a [guide to the most useful pages](docs/learn-more.md)
- Client support status: [docs/client-compat.md](docs/client-compat.md)

To contribute an app, a brief or a fix to this guide, see [CONTRIBUTING.md](CONTRIBUTING.md). Guidance files are generated: edit [guidance/build.md](guidance/build.md) and run `python3 scripts/gen-guidance`, then `scripts/check`.

Everything in this repo is [MIT](LICENSE). An app you build is yours. The Supero platform itself is a hosted service and is not open source.

[Privacy](https://supero.dev/privacy) · [Terms](https://supero.dev/terms) · [Security](https://supero.dev/security) · [info@supero.dev](mailto:info@supero.dev) · [Issues](https://github.com/supero-platform/supero-mcp/issues)
