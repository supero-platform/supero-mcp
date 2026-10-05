# Conference agenda and tickets

**Vertical:** Events · **Level:** Intermediate · **Build status:** not yet built by anyone

A small conference publishes its programme, sells tickets, and lets attendees build a personal schedule.

## The problem

A two-day community conference runs on a shared document. Room changes reach half the audience, and nobody knows which talks will overflow until they do.

## Who uses it

- **Visitor**: reads the programme and speaker pages
- **Attendee**: holds a ticket, saves sessions to a personal schedule
- **Organiser**: manages sessions, rooms and speakers, sees attendance interest

## What it keeps track of

- **Speaker**: name, bio, photo
- **Session**: title, abstract, speaker, room, start, end, capacity
- **Ticket**: attendee, type, status
- **Saved session**: attendee, session

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor browses the programme by day and by track.
2. A signed-in visitor gets a ticket and becomes an attendee.
3. An attendee saves sessions; clashes are flagged.
4. An organiser sees how many people saved each session against the room's capacity.

## Who can see what

- Programme and speakers are public.
- A personal schedule is visible only to its owner.
- Only organisers see interest counts and the attendee list.

## Platform services to reach for

`product`, `order`, `attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A signed-out visitor can read the full programme.
- [ ] An attendee cannot see anyone else's saved sessions.
- [ ] A session moved to another room shows the new room everywhere.
- [ ] A clash between two saved sessions is shown to the attendee.
- [ ] Interest counts match the saved sessions.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Paid tickets with `stripe_checkout`.
- Session feedback with `feedback`, visible to the speaker in aggregate only.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/events/conference-agenda.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
