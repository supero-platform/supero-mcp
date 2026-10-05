# Book club

**Vertical:** Community · **Level:** Starter · **Build status:** built once by us, without its workflow (see note)

> **Workflows do not work on MCP deploys yet.** This brief uses `workflows`. When an app is deployed through MCP today, its workflow triggers are not registered, and we are investigating. Build the rest of the app, leave the workflow out, and list it as a known gap.

Members propose books, vote on next month's read, and RSVP to the monthly meeting.

## The problem

A book club decides its next book in a chat thread that nobody can find a week later, and the host never knows how many chairs to put out.

## Who uses it

- **Member**: proposes books, casts one vote per round, RSVPs
- **Organiser**: opens and closes voting, schedules meetings

## What it keeps track of

- **Book proposal**: title, author, proposed by, pitch
- **Vote**: round, proposal, member
- **Meeting**: date, place, book
- **RSVP**: meeting, member, answer (yes, no, maybe)

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A member proposes a book with a short pitch.
2. The organiser opens a voting round; each member votes once.
3. The organiser closes the round; the winner becomes the next meeting's book.
4. Members RSVP and the organiser sees the headcount.

## Who can see what

- Any member sees proposals and the running tally.
- A member can change only their own vote and RSVP.
- Only the organiser opens and closes a round.

## Platform services to reach for

`workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A member cannot vote twice in one round.
- [ ] Votes cannot be cast after the round closes.
- [ ] The headcount equals the yes RSVPs.
- [ ] A member cannot edit someone else's proposal.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Reading history with ratings via `reviews`.
- A reminder to members who have not RSVPed (sent to their own signed-in address).

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/community/book-club.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
