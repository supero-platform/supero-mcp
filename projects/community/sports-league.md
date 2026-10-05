# Amateur sports league

**Vertical:** Community · **Level:** Intermediate · **Status:** open

A local league publishes fixtures, records results, and keeps the table up to date.

## The problem

A Sunday league's table lives in the secretary's spreadsheet and is updated on Wednesday, if at all. Captains argue about scores because there is one copy of the truth and it is at someone's house.

## Who uses it

- **Visitor**: reads fixtures, results and the table
- **Captain**: submits the result of their own team's matches
- **League secretary**: creates fixtures, confirms disputed results

## What it keeps track of

- **Team**: name, captain, home ground
- **Fixture**: home team, away team, date, ground, status
- **Result**: fixture, home score, away score, submitted by, confirmed

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. The secretary publishes a season of fixtures.
2. After a match a captain submits the score.
3. The other captain confirms it, or disputes it for the secretary to settle.
4. The table updates from confirmed results only.

## Who can see what

- Fixtures, results and the table are public.
- A captain can submit and confirm only for their own team.
- Only the secretary can overrule a disputed score.

## Platform services to reach for

`workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] The table is computed from confirmed results, with points, played and goal difference.
- [ ] A captain cannot submit a score for a match their team is not in.
- [ ] An unconfirmed result does not move the table.
- [ ] A visitor can read everything public without signing in.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Player availability per fixture.
- Top scorers.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/community/sports-league.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
