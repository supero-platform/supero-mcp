---
name: supero-builder
description: Build and deploy a web app on Supero through its MCP server. Use when the user asks to build, change or deploy an app on Supero, or names a brief from the supero-mcp repo.
---

# Building on Supero over MCP

Everything goes through the `supero` MCP server's `build_` tools. There is no local CLI and no spec file on disk. Do not search the filesystem for one.

If the `build_` tools are not available, stop and tell the user to connect the server: https://github.com/supero-platform/supero-mcp#2-connect-your-assistant

## Order of work

1. `build_whoami`. Note the role, the bound project, and whether the key can publish and deploy. A project key cannot create projects: if no project is bound, ask the user to create one or supply a domain key.
2. `build_get_skills`. Read every page. This is the authority on what the platform accepts; prefer it over anything you remember.
3. `build_plan`. Show the plan to the user and **wait for a go-ahead**.
4. `build_get_examples` for the closest archetype, and `build_get_service_contract` for each platform service in the plan. Use a platform service where one fits.
5. Write the bundle.
6. `build_validate`. Fix everything it reports and run it again until clean.
7. `build_doctor`. Fix warnings, or tell the user which you left and why.
8. `build_publish`, then `build_deploy` (preview, about 30 minutes) unless the user asked for `build_go_live`.
9. `build_deploy_status` until it is up. `launching` for several minutes is normal. Give it ten minutes before treating it as a failure.
10. `build_smoke_test` on the URL.
11. Report: what was built, the URL, how to sign in, and what you left undone.

## Rules that save a rebuild

- Name lifecycle fields `<thing>_state`. Fields called `status` or `state` are write-protected for ordinary users.
- Do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`.
- Never put a secret in the bundle. Integration keys are set in the app's admin panel.
- Send messages only to the signed-in user's verified address. Never to an address or number read from a record field.
- A preview is a limited resource on the free plan. Do not deploy a bundle that has not passed `build_validate`.
- To change an existing app, start from `build_get_bundle`, not from memory.

## Working from a brief

A brief in `projects/` lists roles, records, flows, access rules and a "Done when" list. Treat the access rules as requirements, not suggestions. After the smoke test, go through "Done when" line by line and report each as passing or not.
