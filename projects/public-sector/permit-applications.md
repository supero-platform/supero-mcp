# Permit applications

**Vertical:** Public sector · **Level:** Intermediate · **Build status:** not yet built by anyone

A resident applies for a permit, a reviewer checks it, and a manager signs it off.

## The problem

A town office handles street-trading permits on paper. Applicants cannot find out where their application is, and nobody can say how long a decision usually takes.

## Who uses it

- **Applicant**: submits an application with documents, follows its state
- **Reviewer**: checks applications, asks for more information
- **Manager**: approves or refuses, sees every application

## What it keeps track of

- **Permit type**: name, fee, required documents
- **Application**: applicant, permit type, details, state
- **Document**: application, kind, file
- **Decision**: application, outcome, reason, decided at

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An applicant picks a permit type and submits with documents.
2. A reviewer checks it and may send it back for more information.
3. A manager approves or refuses with a reason.
4. The applicant sees the state at every step.

## Who can see what

- Permit types and fees are public.
- An applicant sees only their own applications.
- Reviewer comments are hidden from the applicant until a decision.

## Platform services to reach for

`approval`, `attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] An application cannot be approved without its required documents.
- [ ] A reviewer cannot make the final decision.
- [ ] Reviewer comments are absent from the applicant's view before a decision.
- [ ] Every state change records who made it and when.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Average time to decision per permit type.
- A public register of granted permits.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/public-sector/permit-applications.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
