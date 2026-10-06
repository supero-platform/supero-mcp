# Beta waitlist with invites

**Vertical:** Developer tools · **Level:** Starter · **Build status:** not yet built by anyone

People join a waitlist for a product, see their place in line, and are let in a batch at a time.

## The problem

A launch collects emails in a form. Nobody on the list knows where they stand, the team invites people by copying addresses out of a spreadsheet, and some get invited twice.

## Who uses it

- **Visitor**: joins the waitlist
- **Member**: sees their own place and whether they have been invited
- **Admin**: sees the whole list and invites the next batch

## What it keeps track of

- **Waitlist entry**: member, joined at, state (waiting, invited, joined), invited at

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor signs up and becomes a member with a place in line.
2. A member opens the app and sees how many people are ahead of them.
3. An admin invites the next ten; their state changes to invited.
4. An invited member marks that they have joined.

## Who can see what

- A member sees only their own entry and their place, never the list.
- Only an admin sees the whole list and can invite.
- The total number waiting may be shown publicly; names may not.

## Platform services to reach for

`membership`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A member's place is worked out from join order, not typed in.
- [ ] A person cannot join the list twice.
- [ ] A member cannot see anyone else's entry or address.
- [ ] Inviting the next ten invites exactly the ten who have waited longest.
- [ ] A member cannot invite themselves.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A referral link that moves a member up when someone joins through it.
- Tell a member when they are invited (to their own signed-in address).

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/developer-tools/beta-waitlist.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
