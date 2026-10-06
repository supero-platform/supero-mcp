# Feature-request board

**Vertical:** Developer tools · **Level:** Intermediate · **Build status:** not yet built by anyone

Users post ideas and vote on them, and the team shows what it plans to do about each one.

## The problem

A small product team collects requests from email, chat and a spreadsheet. The same idea arrives five times in five wordings, nobody can tell which matter most, and users never hear what happened to theirs.

## Who uses it

- **Visitor**: reads ideas and their state without signing in
- **User**: posts ideas, votes, comments, follows their own
- **Team member**: sets the state of an idea, merges duplicates, keeps internal notes

## What it keeps track of

- **Idea**: title, description, author, state (open, planned, in progress, shipped, declined)
- **Vote**: idea, user
- **Comment**: idea, author, text
- **Internal note**: idea, author, text

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor browses ideas sorted by votes or by newest.
2. A signed-in user posts an idea and votes on others, once each.
3. A team member sets an idea to planned or declined, with a public reply.
4. A team member merges a duplicate into another idea; its votes move with it.

## Who can see what

- Ideas, vote counts and public replies are visible to everyone.
- Who voted for what is not public; a user sees only their own votes.
- Internal notes are visible to team members only.
- Only a team member can change an idea's state.

## Platform services to reach for

`comment`, `feedback`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A user cannot vote twice on one idea.
- [ ] The vote count equals the number of vote records.
- [ ] Internal notes are absent from anything a user or visitor can fetch.
- [ ] A user cannot change the state of an idea, including their own.
- [ ] After a merge, no vote is lost and no user is counted twice.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Tell a voter when an idea they voted for ships (to their own signed-in address).
- A public roadmap view grouped by state.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/developer-tools/feature-request-board.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
