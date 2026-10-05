# supero-mcp

Build and deploy a real web app from your AI assistant, using [Supero](https://supero.dev) over MCP.

You describe the app. Your assistant (Claude Code, Cursor, VS Code Copilot, or any MCP client) reads the build spec from Supero, writes the app, validates it, and deploys it to a URL you can open. The app gets sign-in, roles, a database, an admin panel and an API from the platform, so the assistant writes the part that is yours and nothing else.

This repo has three things:

- **This guide**: how to connect and build, start to finish.
- **[Project briefs](projects/README.md)**: 26 apps worth building, in 15 verticals, written as requirements. Pick one and build it.
- **[Community apps](apps/README.md)**: apps people have built, with source. Run one, add your own, or send a fix to someone else's.

The free plan gives you **3 projects** and needs no card, so you can build three of these without paying anything.

## Start here

| If you want to | Go to |
|---|---|
| Build your first app, with every step spelled out | **[Your first app, step by step](docs/first-app.md)** (30 minutes) |
| Choose something to build | [Picking a project](docs/pick-a-project.md), then the [project list](projects/README.md) |
| See a finished example with its source | [Page Turners, a book club app](apps/community/book-club/README.md) |
| Fix something in an app that exists | [Community apps](apps/README.md#improve-someone-elses) |
| Read about a platform feature | [Learn more on docs.supero.dev](docs/learn-more.md) |

The rest of this page is the short version for people who have done this before.

## Contents

1. [Get a key](#1-get-a-key)
2. [Connect your assistant](#2-connect-your-assistant)
3. [Check the connection](#3-check-the-connection)
4. [Build an app](#4-build-an-app)
5. [What the assistant does](#5-what-the-assistant-does)
6. [Change it and ship it](#6-change-it-and-ship-it)
7. [Free plan limits](#free-plan-limits)
8. [When something goes wrong](#when-something-goes-wrong)
9. [Contribute](#contribute)

## 1. Get a key

1. [Create a free Supero account](https://www.supero.dev/r/github/supero-mcp). No card.
2. In the dashboard, open **Build via MCP**. It is on every project page and in the sidebar.
3. Create a key. There are two kinds:

| Key | What the assistant can do with it | Use it when |
|---|---|---|
| **Project key** | Build into one project, and only that one | You have made a project in the dashboard and want the app there. This is the safer default. |
| **Domain key** | Create new projects and build into them | You want the assistant to create the project too. Needs a domain admin. |

The key starts with `ak_` and is shown **once**. Copy it then. If you lose it, rotate it under **API Keys** to get a new one.

Treat the key like a password. Do not commit it, and do not paste it into an issue or an app folder.

## 2. Connect your assistant

The server is at `https://api.supero.dev/mcp/v1/messages` (streamable HTTP). Send the key in an `X-API-Key` header, raw, with no `Bearer` in front.

**Claude Code**

```bash
claude mcp add --transport http supero \
  https://api.supero.dev/mcp/v1/messages \
  --header "X-API-Key: ak_..."
```

Then run `/mcp` inside Claude Code and check that `supero` is connected.

**Cursor**: `~/.cursor/mcp.json`

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

**VS Code (GitHub Copilot)**: `.vscode/mcp.json`

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

Run **MCP: List Servers**, start `supero`, and use Copilot in Agent mode.

**Anything else.** Any client that speaks MCP over streamable HTTP and lets you set a request header will work. More detail, and the one known gap (Claude Desktop's connector screen wants OAuth, which the server does not offer yet), is in [docs/connect.md](docs/connect.md).

## 3. Check the connection

Ask your assistant:

```text
Call build_whoami on Supero and tell me what it says.
```

You should get back your role, your domain and, for a project key, the project it is bound to. If you would rather check from a terminal:

```bash
curl -s https://api.supero.dev/mcp/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ak_..." \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"build_whoami","arguments":{}}}'
```

## 4. Build an app

Paste this, with your own description in the middle.

**With a project key** (the project already exists):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: don't look for a local supero CLI or a SKILLS.md file on disk, there isn't one.

Build this app in my project: [describe your app: the main thing users do, the key screens, and an admin view].

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype as your reference, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and deploy (build_deploy for a ~30-minute preview, build_go_live for the permanent URL). Finally build_smoke_test the deployed URL and finish with a short summary: what you built, the URL, and how I log in.
```

**With a domain key**, change the second paragraph to:

```text
Create a new project with build_create_project (pick a short name and namespace), then build this app in it: [describe your app].
```

Stuck for an idea? Every [project brief](projects/README.md) ends with a prompt that is ready to paste.

If the assistant starts searching your disk for a CLI, send it this:

```text
Stop reading the local filesystem. There is no CLI and no SKILLS.md. Call build_get_skills over MCP now, author the bundle, then build_validate.
```

More prompts, for changing an app, fixing a failed deploy and going live, are in [docs/prompts.md](docs/prompts.md).

## 5. What the assistant does

| Step | Tools | What happens |
|---|---|---|
| 1. Orient | `build_whoami` | Finds out which project it may build into and what the key allows. |
| 2. Learn | `build_get_skills`, `build_get_examples`, `build_get_service_contract` | Reads the build spec, a working reference app, and the contract of each platform service it plans to use. The spec is served live, so it is never out of date. |
| 3. Plan | `build_plan` | Turns your description into records, roles and screens. You read it and say go. |
| 4. Write | (your assistant) | Writes a small bundle: the data model, the configuration, the setup and the front end. |
| 5. Check | `build_validate`, `build_doctor` | The platform checks the bundle and reports what to fix before anything is deployed. |
| 6. Ship | `build_publish`, `build_deploy` or `build_go_live`, `build_deploy_status`, `build_smoke_test` | Publishes a version, deploys it, waits for it to come up, and tests the live URL. |

A deploy usually takes a few minutes and can sit in `launching` for five or more. That is normal: the assistant should keep polling `build_deploy_status` for up to ten minutes before deciding something is wrong.

The full walk-through is in [docs/build-flow.md](docs/build-flow.md), and every tool is listed in [docs/tools.md](docs/tools.md) (64 tools; you can list them without a key).

**What you do not have to build.** Sign-in, roles and permissions, per-record and per-field access rules, the database, the REST API, the admin panel, and data kept apart between organisations in a multi-tenant app. There are also ready-made services to switch on instead of writing: bookings, appointments, rentals, cart, orders, payments, approvals, tasks, tickets, reviews, memberships, recurring plans, inventory, document signature, attachments, notifications, email and more. Ask the assistant to call `build_list_capabilities` to see them all.

## 6. Change it and ship it

- **Change the app.** Tell the assistant what to change. It fetches the current version with `build_get_bundle`, edits it, then validates, publishes and deploys again. The version number goes up each time.
- **Preview or live.** `build_deploy` gives a preview URL that lasts about 30 minutes, which is enough to click through and share. `build_go_live` gives a permanent address on `supero.live` and needs a paid plan.
- **Secrets.** Keys for email, SMS or payments go in the app's admin panel under **Services**. Never put one in the bundle.
- **Dev and live mode.** A project starts in dev mode. Switch it to live mode before real users arrive.

## Free plan limits

| | Free |
|---|---|
| Price | $0, no card |
| Projects | 3 |
| Preview deployments | 10 per project, about 30 minutes each |
| Schemas | 20 |
| API requests | 10,000 a month |
| Permanent live URL | From the Basic plan |

These are the figures on the [pricing page](https://supero.dev/pricing) on 5 October 2026. That page is the authority if they differ. A plan and a validation pass cost nothing, so get `build_validate` clean before spending a preview. More in [docs/limits.md](docs/limits.md).

## When something goes wrong

| You see | It means | Do this |
|---|---|---|
| `Authentication required` | No key reached the server | Check the header is `X-API-Key` and the client was restarted after you added it. |
| `401` or `Invalid API key` | The key is wrong, cut short, revoked, or has `Bearer` in front | Paste the raw `ak_...` value. If it is lost, rotate it under **API Keys**. |
| The assistant cannot create a project | You gave it a project key | Create the project in the dashboard, or use a domain key. |
| The assistant looks for a CLI or a `SKILLS.md` file | It is guessing from old habits | Send the recovery prompt from step 4. |
| `build_validate` fails | The bundle breaks a rule | Let the assistant fix what it lists and run it again. This step is free. |
| Workflows do not fire, or the log says `event_bindings: PUT failed` | Workflow triggers are not registered on MCP deploys yet. We are investigating | Leave the workflow out for now and note it as a known gap. |
| The app deployed but screens are half empty | Some starter data may not have been created | Ask the assistant to call `build_logs` and look for `SEED FAILURES`. Deploying again usually fills the gaps. |
| Deploy stays in `launching` | The app is still starting | Wait. Poll for up to ten minutes. |
| A status field will not save for ordinary users | Fields named `status` or `state` are protected | Name lifecycle fields `<something>_state`, for example `booking_state`. |
| Out of previews | The free plan has ten | Validate more before deploying, or upgrade. |

Still stuck? Ask in [Discussions](https://github.com/supero-platform/supero-apps/discussions). Found a way to make the server misbehave? See [SECURITY.md](SECURITY.md) and report it privately.

## Contribute

There are four ways in, and none of them needs permission first.

- **Publish an app.** Build a brief, or your own idea, and add it with its source to [community apps](apps/README.md).
- **Improve someone else's app.** Deploy it into your own project, fix one of its known gaps, and send the change back.
- **Write a brief** for an app you wish existed. Copy [projects/TEMPLATE.md](projects/TEMPLATE.md).
- **Improve this guide**: a client we have not covered, a prompt that works better, an error we did not explain.

[CONTRIBUTING.md](CONTRIBUTING.md) has the details.

## Related

- [supero-apps](https://github.com/supero-platform/supero-apps): 19 complete reference apps with source and live demos.
- [MCP documentation](https://docs.supero.dev/developers/mcp/overview/) on docs.supero.dev, and a [guide to the feature pages](docs/learn-more.md) most useful while building.

## Licence

Everything in this repo is [MIT](LICENSE). An app you build is yours. The Supero platform itself is a hosted service and is not open source.
