# Public changelog

**Vertical:** Developer tools · **Level:** Starter · **Build status:** not yet built by anyone

A team publishes dated release notes that anyone can read and filter.

## The problem

Release notes live in commit messages and a chat channel. Customers ask what changed, support cannot answer, and the one person who knows is on holiday.

## Who uses it

- **Visitor**: reads published entries and filters by tag
- **Editor**: writes entries, saves drafts, publishes

## What it keeps track of

- **Entry**: title, body, tags (new, improved, fixed), published date, state (draft, published), author

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An editor writes an entry and saves it as a draft.
2. The editor publishes it; it appears at the top of the public page.
3. A visitor filters entries by tag and opens one.
4. An editor corrects a published entry; the page shows it was edited.

## Who can see what

- Published entries are public.
- Drafts are visible to editors only.
- Only an editor can create, edit or publish.

## Platform services to reach for

`attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A signed-out visitor can read every published entry.
- [ ] A draft is absent from the public list and cannot be opened by its ID.
- [ ] Entries are in date order, newest first.
- [ ] The published date is set by the app when the entry is published, not typed in.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- An image per entry with `attachment`.
- A feed of the latest ten entries that another site can read.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/developer-tools/public-changelog.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
