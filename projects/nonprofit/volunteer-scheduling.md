# Volunteer shift scheduling

**Vertical:** Nonprofit · **Level:** Starter · **Build status:** not yet built by anyone

> **Workflows do not work on MCP deploys yet.** This brief uses `workflows`. When an app is deployed through MCP today, its workflow triggers are not registered, and we are investigating. Build the rest of the app, leave the workflow out, and list it as a known gap.

A charity posts shifts and volunteers sign up for them.

## The problem

A food bank fills its rota by group chat every week. Some shifts get eight people and some get none, and nobody can say how many hours a volunteer gave this year.

## Who uses it

- **Volunteer**: sees open shifts, signs up, cancels, sees their own hours
- **Coordinator**: posts shifts, sets how many people each needs, marks attendance

## What it keeps track of

- **Shift**: title, location, start, end, people needed
- **Signup**: shift, volunteer, status (signed up, attended, no-show, cancelled)

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A coordinator posts next week's shifts.
2. A volunteer signs up; a full shift stops taking signups.
3. After the shift the coordinator marks who attended.
4. A volunteer sees their total hours.

## Who can see what

- Any signed-in volunteer can see open shifts and how many places remain.
- A volunteer sees only their own signups; the coordinator sees all.

## Platform services to reach for

`workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A shift that needs 4 never has 5 active signups.
- [ ] Hours are counted only for attended shifts.
- [ ] A volunteer cannot mark themselves as attended.
- [ ] Cancelling frees the place for someone else.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A coordinator dashboard: shifts short of people this week.
- Recurring shifts.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/nonprofit/volunteer-scheduling.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
