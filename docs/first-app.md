# Your first app, step by step

This page takes you from nothing to a working app at a URL. Allow 30 minutes. You need no Supero knowledge and you will not install anything except an AI coding assistant, if you do not have one.

At each step there is a **You should see** line. If you do not see it, stop and look at [When something goes wrong](../README.md#when-something-goes-wrong) before going on.

## Before you start

You need one of these: [Claude Code](https://claude.com/claude-code), [Cursor](https://cursor.com), or VS Code with GitHub Copilot.

## Step 1. Create an account (2 minutes)

1. Go to [supero.dev](https://www.supero.dev/r/github/supero-mcp) and sign up. No card is asked for.
2. Confirm your email with the code you are sent.

**You should see:** the Supero dashboard.

## Step 2. Create a project (1 minute)

A project is one app. The free plan gives you three.

1. In the dashboard, create a project. Give it a short name, for example `petsalon`.
2. Choose to start blank if you are asked how to begin.

**You should see:** your project's page.

## Step 3. Get a key (1 minute)

1. On the project page, open **Build via MCP**.
2. Choose **Project key** and create it.
3. Copy the key now. It starts with `ak_` and is shown once.

**You should see:** a key, and a ready-made snippet for your assistant on the same page. The **Test connection** button on that page should turn green.

Keep the key private. Anyone who has it can build into your project.

## Step 4. Connect your assistant (2 minutes)

Use the snippet from the dashboard page, or one of these.

Claude Code, in a terminal:

```bash
claude mcp add --transport http supero \
  https://api.supero.dev/mcp/v1/messages \
  --header "X-API-Key: ak_..."
```

Cursor and VS Code: see [connect.md](connect.md).

**You should see:** `supero` listed as connected (in Claude Code, type `/mcp`).

## Step 5. Check the connection (1 minute)

Open your assistant in an empty folder and type:

```text
Call build_whoami on Supero and tell me what it says.
```

**You should see:** your project's name and a role of `project_admin`. If the assistant says it has no such tool, the connection in step 4 did not take; restart the assistant and try again.

## Step 6. Choose what to build (2 minutes)

For a first app, pick a **Starter** brief in the [project list](../projects/README.md). Good first choices:

- [Public changelog](../projects/developer-tools/public-changelog.md), if you want something for your own product
- [Beta waitlist with invites](../projects/developer-tools/beta-waitlist.md)
- [Pet grooming salon](../projects/pets/grooming-salon.md)
- [Venue and room hire](../projects/events/venue-hire.md)
- [Time-off requests](../projects/hr/time-off-requests.md)
- [Community library lending](../projects/public-sector/library-lending.md)
- [Expense claims](../projects/finance/expense-claims.md)

Or describe your own idea in a paragraph. [prompts.md](prompts.md) says what a good description contains.

## Step 7. Ask for the app (1 minute of your time)

Open the brief, scroll to **Starter prompt**, copy it, and paste it into your assistant.

**You should see:** the assistant calling `build_whoami`, then `build_get_skills` several times. It is reading the build spec, which is long. This takes a minute or two.

If it starts looking through your files for a command-line tool, paste:

```text
Stop reading the local filesystem. There is no CLI and no SKILLS.md. Call build_get_skills over MCP now, author the bundle, then build_validate.
```

## Step 8. Read the plan and say go (3 minutes)

The assistant will show you a plan: the records, the roles, who can see what, and the screens.

Check three things against the brief:

1. Are all the roles there?
2. Is every "who can see what" rule in the plan?
3. Is anything there that you did not ask for?

Correct what is wrong in plain words, then say `go`.

**You should see:** the assistant writing files (`schemas.py`, `config.py`, `setup.py`, `ui/app.js` and a few small ones).

## Step 9. Let it check its work (2 to 5 minutes)

The assistant runs `build_validate`, fixes what is reported, and runs it again. Then `build_doctor`.

**You should see:** `build_validate` passing. `build_doctor` may leave a few warnings; ask the assistant which it left and why.

This step is free. Nothing has been deployed yet.

## Step 10. Deploy (4 minutes)

The assistant runs `build_publish`, then `build_deploy`, then checks `build_deploy_status` every half minute.

**You should see:** a status of `launching` for three or four minutes, then `running` and a URL. Up to ten minutes is normal. This uses one of your project's ten previews.

## Step 11. Look at the app yourself (5 minutes)

The preview lasts about 30 minutes, so do this straight away.

1. Ask the assistant: `How do I sign in, as each role?`
2. Open the URL and sign in.
3. Go down the brief's **Done when** list and try each line.
4. Take a screenshot.

**You should see:** every screen with some starter data in it.

If screens are empty, tell the assistant:

```text
Call build_logs and look for SEED FAILURES. If there are any, deploy again and re-check.
```

A status of `running` means the app started. The tools do not yet confirm that everything in it was created, so always look.

## Step 12. Change something (5 minutes)

Tell the assistant what to change, in one sentence:

```text
Add a notes field to appointments that only the groomer can see. Then validate, publish and deploy.
```

**You should see:** a new version number and the same URL. Right after a second deploy the old version can be served for a minute or two; reload before deciding it did not work.

## Step 13. Share it

Add your app to [community apps](../apps/README.md): a short README, your screenshot, and the app's files (ask the assistant to save what `build_get_bundle` returns). List what does not work yet. That list is how other people find something to fix.

## What next

- Build an **Intermediate** brief.
- Fix a known gap in [someone else's app](../apps/README.md#improve-someone-elses).
- Read how the platform's features work: [learn-more.md](learn-more.md).
- To keep an app online permanently, see [limits.md](limits.md).
