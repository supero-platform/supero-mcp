# Status page

**Vertical:** Developer tools · **Level:** Intermediate · **Build status:** not yet built by anyone

A service shows which of its parts are working and keeps a public record of incidents.

## The problem

When something breaks, customers find out from each other. Support answers the same question a hundred times, and there is no record afterwards of what happened or how long it lasted.

## Who uses it

- **Visitor**: sees current status and past incidents without signing in
- **On-call engineer**: opens incidents, posts updates, resolves them
- **Admin**: manages components and who is on call

## What it keeps track of

- **Component**: name, description, current status (operational, degraded, down)
- **Incident**: title, components affected, started, resolved, state
- **Update**: incident, text, posted at, author
- **Private note**: incident, author, text

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An on-call engineer opens an incident against one or more components; their status changes.
2. The engineer posts updates as the situation moves.
3. The engineer resolves the incident; the components return to operational.
4. A visitor sees today's status at the top and a history of past incidents below.

## Who can see what

- Components, incidents and updates are public.
- Private notes are visible to on-call engineers and admins only.
- Only on-call engineers and admins can open, update or resolve an incident.

## Platform services to reach for

`notification`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A signed-out visitor can read current status and incident history.
- [ ] Opening an incident changes the affected components' status; resolving it changes them back.
- [ ] Private notes are absent from anything a visitor can fetch.
- [ ] An incident's duration is worked out from its start and resolve times.
- [ ] Update times are set by the app, not typed in.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Scheduled maintenance windows shown ahead of time.
- Uptime per component over the last 90 days, worked out from incidents.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/developer-tools/status-page.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
