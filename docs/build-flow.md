# The build flow

A build is six steps. Your assistant runs them; this page says what each one is for, so you can tell when one has been skipped.

## 1. Orient: `build_whoami`

Returns the role behind the key, the domain, the project the key is bound to (for a project key), and whether it may publish and deploy. If this fails, nothing after it will work, so it goes first.

With a domain key the assistant can then call `build_create_project` to make a project. With a project key the project must exist already.

## 2. Learn: `build_get_skills`, `build_get_examples`, `build_get_service_contract`

- `build_get_skills` returns the build spec. It is long and comes in pages; the assistant should read all of it, not the first page. It is served by the platform, so it always matches what the platform accepts today. There is no copy on your disk and none in this repo, on purpose.
- `build_get_examples` returns a complete working app of a given archetype (a marketplace, a booking service, an operations dashboard, a multi-tenant portal and so on). The assistant uses the closest one as a reference.
- `build_list_capabilities` lists the platform's ready-made services, and `build_get_service_contract` returns exactly how to use one. A booking, a cart or an approval that comes from the platform is less code and fewer mistakes than one written from scratch.

## 3. Plan: `build_plan`

Turns your description into a plan: the records, the roles, who can see what, the screens, and which services to use. **Read it.** This is the cheapest moment to change your mind. Ask for the plan to be echoed back and say "go" yourself.

## 4. Write the bundle

The assistant writes a small set of files:

| File | What it holds |
|---|---|
| `schemas.py` | The records and their fields |
| `config.py` | Roles, access rules, services, seed users |
| `setup.py`, `__main__.py`, `run.sh`, `requirements.txt` | How the app sets itself up and starts |
| `ui/app.js` | The front end |

You never have to read these, but they are yours and you can.

## 5. Check: `build_validate`, `build_doctor`

`build_validate` checks the bundle against the rules and returns a list of what is wrong. `build_doctor` looks for things that are legal but likely to disappoint: a screen with nothing on it, a role that can see nothing. Neither deploys anything and neither uses up a preview, so run them until they are clean.

Some `build_doctor` advice is tuned for customer-facing apps (for example, asking for a richer landing page). For an internal tool it is fine to read that advice and leave it.

## 6. Ship: `build_publish`, `build_deploy`, `build_deploy_status`, `build_smoke_test`

- `build_publish` stores the bundle as a new version. For a large bundle the assistant may use `build_stage_bundle` first.
- `build_deploy` starts a preview that lasts about 30 minutes. `build_go_live` deploys to a permanent address and needs a paid plan.
- `build_deploy_status` reports progress. `launching` for several minutes is normal. Poll for up to ten.
- `build_smoke_test` signs in to the deployed app and checks that it answers. `build_e2e_test` goes further.

## Afterwards

- **Iterate**: `build_get_bundle` fetches the current version; edit, validate, publish, deploy.
- **Start again**: `build_replace_project` wipes the app's data and keeps its credentials. Dev mode only, and it needs a domain admin.
- **Secrets**: set them in the app's admin panel under **Services**. They do not belong in the bundle.
- **Real users**: switch the project from dev mode to live mode first.
