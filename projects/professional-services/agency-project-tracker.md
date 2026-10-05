# Agency work tracker with a client view

**Vertical:** Professional services · **Level:** Intermediate · **Status:** open

A small agency tracks jobs and hours, and each client sees only their own work.

## The problem

A six-person studio reports progress to clients by email. Clients ask the same question three times, and time is billed from memory at the end of the month.

## Who uses it

- **Team member**: logs time, moves tasks
- **Account lead**: creates engagements, sees their clients
- **Client**: sees their own engagement's progress and approved hours, nothing internal

## What it keeps track of

- **Client company**: name
- **Engagement**: client company, name, budget hours, status
- **Work item**: engagement, title, assignee, state
- **Time entry**: work item, team member, hours, date, internal note

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An account lead sets up an engagement with a budget of hours.
2. Team members move work items across a board and log time.
3. A client opens their engagement and sees progress and hours used.
4. The lead sees hours used against budget for every engagement.

## Who can see what

- A client sees only their own company's engagements.
- Internal notes on time entries are hidden from clients.
- A team member sees engagements they are assigned to.

## Platform services to reach for

`task`, `comment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A client cannot open another client's engagement by its ID.
- [ ] The internal note is absent from the client's view of a time entry.
- [ ] Hours used equals the sum of time entries.
- [ ] The words Project and Account are not used as record names (the platform reserves them).
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A monthly hours summary per client.
- File hand-over with `attachment`.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/professional-services/agency-project-tracker.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
