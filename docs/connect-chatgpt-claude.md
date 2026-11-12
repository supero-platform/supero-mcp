# Build with ChatGPT or Claude (sign in, no key)

ChatGPT, claude.ai, Claude Desktop and Claude Code connect to Supero by signing in. You add one URL, sign in to Supero in the window that opens, pick what the assistant may touch, and click **Allow**. There is no key to copy.

| | |
|---|---|
| Server URL | `https://mcp.supero.dev/mcp` |
| Auth | OAuth 2.1 with PKCE (your assistant handles it) |
| Manage connections | [app.supero.dev/oauth/connections](https://app.supero.dev/oauth/connections) |

Editors that want a key in a header (Cursor, VS Code Copilot) still use `https://api.supero.dev/mcp/v1/messages` with an `ak_` key; see [connect.md](connect.md). Both reach the same build tools.

## Contents

1. [Before you start](#1-before-you-start)
2. [Connect](#2-connect): [ChatGPT](#chatgpt), [Claude](#claude-claudeai-and-claude-desktop), [Claude Code](#claude-code)
3. [Choose the access](#3-choose-the-access)
4. [Check the connection](#4-check-the-connection)
5. [Build an app](#5-build-an-app)
6. [Sign in to your app](#6-sign-in-to-your-app)
7. [Change it, make it live](#7-change-it-make-it-live)
8. [Manage or end the connection](#8-manage-or-end-the-connection)
9. [What is different from a key](#9-what-is-different-from-a-key)
10. [When something goes wrong](#10-when-something-goes-wrong)

## 1. Before you start

- **ChatGPT:** a plan that allows custom MCP servers. On Business, Enterprise and Edu an admin may have to switch them on first.
- **Claude:** any plan on claude.ai or Claude Desktop (Free allows one custom connector). On Team and Enterprise an Owner adds the connector once for the organisation; members then click **Connect**.
- **Claude Code:** the `claude` command-line tool.
- **Supero:** an account at [app.supero.dev](https://www.supero.dev/r/github/supero-mcp). You can also create one in the sign-in window. The free plan needs no card.

Sign in as yourself. A support or "switch domain" session cannot approve a connection.

## 2. Connect

### ChatGPT

ChatGPT dropped the separate Developer mode switch in October 2026. Button labels still move, so look for the place and the action.

1. Open [chatgpt.com/plugins](https://chatgpt.com/plugins), click **+**, and choose to add a custom MCP server. (Older accounts: **Settings → Apps & Connectors → Create**.)
2. Fill in:
   - Name: `Supero`
   - Connection: **Public endpoint**, URL `https://mcp.supero.dev/mcp`
   - Authentication: **OAuth**
3. Tick the box that you understand the risk, then create it. A Supero window opens. Sign in, [choose the access](#3-choose-the-access), click **Allow**.
4. In a new chat, type **@** and pick **Supero** (or turn it on from the **+** menu). ChatGPT asks you to approve Supero actions the first time each one runs; approve them.

### Claude (claude.ai and Claude Desktop)

1. Open **Customize → Connectors**, click **+ Add**, then **Add custom connector**. On Team and Enterprise, an Owner does this once under **Organization settings → Connectors → Add → Custom → Web**, and members click **Connect**.
2. Name: `Supero`. URL: `https://mcp.supero.dev/mcp`. Leave the advanced OAuth fields empty. Click **Add**.
3. Click **Connect**. Sign in to Supero, [choose the access](#3-choose-the-access), click **Allow**.
4. In a new chat, click **+ → Connectors** and switch **Supero** on.

### Claude Code

```bash
claude mcp add --scope user --transport http supero https://mcp.supero.dev/mcp
```

Start `claude`, type `/mcp`, pick `supero`, and choose **Authenticate**. Your browser opens the same sign-in and approval page (on a remote or headless machine, open the link Claude Code prints).

Claude Code runs on your own computer, so it can be given a new or an existing project, never the whole workspace.

## 3. Choose the access

The approval page shows who you are signed in as, your workspace (your Supero domain) and the assistant asking. If the account is wrong, click **Switch account**. Then pick one:

| Option | The assistant can | Who can pick it |
|---|---|---|
| **An existing project** | Build in that one project. Anything else is refused. | Workspace admins, and project admins for their own project |
| **A new project** | Create one project the first time you ask for an app, then build only in it | Workspace admins |
| **Whole workspace** | Build in any project and create new ones | Workspace admins, from ChatGPT or Claude (not Claude Code) |

**Let it publish apps** decides whether the assistant may put an app on a permanent public URL. Previews work without it. Leave it off until you are ready to go live; you can turn it on later on the connection's page in the console (see [step 8](#8-manage-or-end-the-connection)).

Which to pick:

- First app, new account: **A new project**.
- You made the project in the dashboard already: **An existing project**.
- You want one assistant to look after several apps: **Whole workspace**.

ChatGPT, Claude and Claude Code are recognised by name. For any other app the page shows a warning; continue only if you started the connection yourself.

## 4. Check the connection

Ask:

```text
Which Supero account and project am I connected to?
```

The assistant calls `build_whoami` and answers with your workspace, your role and what the connection allows. If it asks you to sign in again instead, the connection did not finish: remove the connector and add it again.

## 5. Build an app

Describe the app in plain words: who uses it, the main thing they do, and what an admin needs. For example:

```text
Use Supero to build a booking app for a dog-grooming salon. Customers book a groomer
and a time slot and see their past visits. Groomers see their day. The owner manages
groomers, services and prices. Show me the plan before you build, then deploy a
preview and tell me how to sign in.
```

For more ideas, every [project brief](../projects/README.md) ends with a prompt you can paste.

What happens next, and what you do:

| Step | The assistant | You |
|---|---|---|
| 1. Orient | Calls `build_whoami` and reads the build spec (`build_get_skills`). This takes a minute. | Wait. |
| 2. Ask | If the description is thin, asks a few short questions, such as who will use the app and whether strangers can sign up. | Answer in a line each. |
| 3. Plan | Calls `build_plan` and shows a **Build Brief**: the records, roles, who can see what, the screens, and a short "How it works". Anything it guessed is marked *(my guess)*. | Check the roles and the "who can see what" rules. Correct anything wrong, then say **go**. |
| 4. Create | With **A new project** or **Whole workspace**, creates the project (`build_create_project`). | Nothing. |
| 5. Write and check | Writes the app, then runs `build_validate` and `build_doctor` and fixes what they report. Free; nothing is deployed yet. | Wait. |
| 6. Preview | Runs `build_publish`, `build_deploy`, polls `build_deploy_status`, then `build_smoke_test`. A deploy can sit in `launching` for five minutes or more. | Wait. Up to ten minutes is normal. |
| 7. Summary | Ends with the preview link, how long it lasts, what you must do before real users arrive (each with a console link), and the admin email and role to sign in with. | Open the link. |

The preview is at an address like `https://preview-<workspace>-<project>.supero.live` and lasts about 30 minutes. The project also shows in the Supero console under **Projects**.

If the assistant starts looking for a command-line tool or a `SKILLS.md` file, send:

```text
There is no CLI and no local SKILLS.md. Call build_get_skills over MCP, write the bundle, then build_validate.
```

## 6. Sign in to your app

The assistant gives you the **email and role** of each starter account. It never prints a password in the chat, and it never asks you for one. That is on purpose: chats are stored and shared.

To find or set a password:

- **The seeded password** is in the app's `config.py`, in the `users` list. Ask: "Which line of config.py has the admin's password?" The assistant points you at the line.
- **Your own password:** open the console link the assistant gives you (the app's **Users** page), add yourself as an admin, then disable the seeded account.
- **"Invalid email or password":** check you used the email from the summary and the password from that `config.py` line. Seeding only creates accounts that are missing, so a password changed in `config.py` after the first deploy does not reach an account that already exists. Add a new admin on the **Users** page instead.

Keys for email, SMS or payments are also entered in the console (the app's **Services** page), never in the chat. The summary lists which ones the app needs.

## 7. Change it, make it live

- **Change something:** say it in one sentence ("add a notes field only groomers can see"). The assistant fetches the current version, edits it, validates, publishes and deploys. The version number goes up; the URL stays.
- **Make it live:** ask for a permanent URL. The assistant runs `build_go_live`. This needs:
  1. a paid plan (the free plan is previews only), and
  2. **Let it publish apps** on this connection. If it is off, the assistant says so and gives you a link to the connection's page, where you tick it.
- Before real users arrive, follow the "Do now" items in the summary: your own admin account, service keys, and switching the project from dev to live mode.

## 8. Manage or end the connection

[app.supero.dev/oauth/connections](https://app.supero.dev/oauth/connections) lists every connected assistant.

- **Disconnect** ends it. The assistant loses access right away and asks you to reconnect the next time.
- **Let it publish apps** can be ticked on the connection's page. Only the person who connected it can turn it on; a workspace admin can turn it off.
- **Change** (workspace admins, on ChatGPT and Claude connections) switches between a project and the whole workspace.
- If your role changes and no longer covers what you allowed, the connection ends.
- Each connection has daily limits on builds and on publishing. When one is reached, the assistant tells you when it resets.

Disconnecting does not touch your projects or apps.

## 9. What is different from a key

Sign-in connections get the build tools, with these limits:

- **No data-source connector tools** (`connector_*`). They use stored credentials against outside systems, so they are only available with a key, from an editor.
- **Large-bundle upload** (`build_stage_bundle`) only appears on a whole-workspace connection. On a project connection the assistant sends the files inline.
- **Creating a project** needs **A new project** or **Whole workspace**. On an existing-project connection the assistant builds into that project, or asks you to widen the access.
- **Publishing** needs **Let it publish apps** (see above).

## 10. When something goes wrong

| You see | It means | Do this |
|---|---|---|
| "You're a member in your workspace. Workspace admins can connect assistants…" | Your role cannot grant the access you picked | Ask a workspace admin, or pick a project you administer |
| "You're in a support session" | You signed in through a session that cannot approve connections | Sign out and sign in with your own account |
| "This connection can't publish apps" | Publishing was not allowed | Open the link in the message and tick **Let it publish apps**, or keep using previews |
| "This connection has already ended" / asked to sign in again | It was disconnected, or your role changed | Reconnect. Projects and apps are not affected |
| ChatGPT shows a "browser setup URL" message after you changed access | ChatGPT kept the old sign-in | In ChatGPT's connector settings, press **Reconnect** |
| The assistant cannot create a project | The connection is for an existing project | Reconnect with **A new project** or **Whole workspace**, or create the project in the console |
| A deploy stays in `launching` | The app is still starting | Wait; up to ten minutes is normal |
| You cannot sign in to the preview | Wrong account or password | Use the email from the summary and the password in `config.py`, or add a new admin on the app's **Users** page |
| The Supero window shows an error or does not load | A temporary problem on our side | Try again in a few minutes |

Still stuck? Ask in [Discussions](https://github.com/supero-platform/supero-mcp/discussions).

## For client authors

Any client that implements the [MCP authorization spec](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) can connect to `https://mcp.supero.dev/mcp`.

- Discovery: `https://mcp.supero.dev/.well-known/oauth-protected-resource` and `https://mcp.supero.dev/.well-known/oauth-authorization-server`.
- Clients identify with a Client ID Metadata Document or dynamic registration, and must use PKCE with `S256`.
- Scopes: `supero:read`, `supero:build`, `supero:workspace`, `supero:publish`, `offline_access`.
- A request without a token gets `401` with a `WWW-Authenticate` header that points at the discovery document.
- A client whose redirect is on `localhost` (a loopback client) can never hold a whole-workspace grant.
