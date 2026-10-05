# Donor and pledge tracker

**Vertical:** Nonprofit · **Level:** Intermediate · **Build status:** not yet built by anyone

> **Needs a domain key today.** This brief uses `workflows`, and a project key cannot register workflow triggers yet. Build it with a domain key, or leave the workflow out and list it as a known gap.

A small charity records donors, campaigns and pledges, and sees what has actually come in.

## The problem

Pledges are promised at an event and then forgotten. The treasurer cannot tell pledged money from received money without rebuilding a spreadsheet.

## Who uses it

- **Fundraiser**: records donors and pledges for their own campaigns
- **Treasurer**: marks pledges as received, sees every campaign
- **Admin**: manages campaigns and users

## What it keeps track of

- **Campaign**: name, goal, start, end
- **Donor**: name, notes
- **Pledge**: campaign, donor, amount, status (pledged, received, written off), received date

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A fundraiser adds a donor and records a pledge against a campaign.
2. The treasurer marks a pledge received, or writes it off.
3. Each campaign shows pledged, received and outstanding against its goal.
4. A donor page lists everything they have given.

## Who can see what

- A fundraiser sees only the campaigns they own; the treasurer sees all.
- Donor notes are hidden from fundraisers who do not own that donor.
- Only the treasurer can change a pledge to received.

## Platform services to reach for

`workflows`, `comment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Campaign totals equal the sum of their pledges, by status.
- [ ] A fundraiser cannot mark money as received.
- [ ] A written-off pledge leaves the outstanding total.
- [ ] Donor notes are absent from the response for a user who should not see them.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A year-end summary per donor.
- Recurring pledges with `recurring_plan`.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/nonprofit/donation-tracker.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
