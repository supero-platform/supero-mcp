# Client intake for a small law office

**Vertical:** Professional services · **Level:** Intermediate · **Status:** open

A solicitor takes a new client's details, opens a matter, and gets the engagement letter signed.

## The problem

New-client intake is a PDF form, a scan and three emails. The engagement letter comes back unsigned a week later, and the fee earner's private notes sit in the same folder the client can ask to see.

## Who uses it

- **Client**: completes intake, signs the engagement letter, follows their matter
- **Fee earner**: reviews intake, opens matters, keeps private notes
- **Office manager**: sees all matters and their state

## What it keeps track of

- **Intake**: client, matter type, summary, state
- **Matter**: client, fee earner, title, state
- **Engagement letter**: matter, document, signed at
- **Matter note**: matter, author, text

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A client fills in an intake form.
2. A fee earner accepts it and opens a matter, or declines it.
3. The client reads and signs the engagement letter online.
4. The fee earner keeps notes on the matter as it moves.

## Who can see what

- A client sees only their own intake and matters.
- Matter notes are hidden from the client.
- A fee earner sees their own matters; the office manager sees all.

## Platform services to reach for

`document_signature`, `approval`, `attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A matter cannot become active before the letter is signed.
- [ ] Matter notes are absent from anything the client can fetch.
- [ ] A client cannot read another client's matter.
- [ ] The signed time is recorded by the platform, not typed in.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A conflict check that searches existing clients before accepting intake.
- Document requests the client uploads against.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/professional-services/legal-intake.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
