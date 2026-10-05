# Local delivery dispatch

**Vertical:** Logistics · **Level:** Intermediate · **Build status:** not yet built by anyone

> **Needs a domain key today.** This brief uses `workflows`, and a project key cannot register workflow triggers yet. Build it with a domain key, or leave the workflow out and list it as a known gap.

A dispatcher assigns deliveries to drivers, and the customer signs on the doorstep.

## The problem

A local courier runs on phone calls. The dispatcher cannot see which driver has what, and a disputed delivery has no proof behind it.

## Who uses it

- **Dispatcher**: creates deliveries, assigns drivers, sees everything
- **Driver**: sees only deliveries assigned to them, updates status
- **Customer**: tracks their own deliveries

## What it keeps track of

- **Delivery**: reference, pickup, drop-off, customer, driver, status
- **Proof of delivery**: delivery, signed by, signed at

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. The dispatcher creates a delivery and assigns a driver.
2. The driver moves it through picked up, out for delivery and delivered.
3. On delivery the recipient signs; the signature is stored against the delivery.
4. The customer follows the status of their own delivery.

## Who can see what

- A driver sees only their own deliveries.
- A customer sees only deliveries addressed to their account.
- Only the assigned driver can mark a delivery delivered.

## Platform services to reach for

`document_signature`, `workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A driver cannot open a delivery assigned to someone else.
- [ ] A delivery cannot be marked delivered without a signature.
- [ ] Status can only move forward, except by the dispatcher.
- [ ] A customer sees status but not the driver's other jobs.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A dispatcher board grouped by driver.
- Failed-delivery reasons and a retry.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/logistics/delivery-dispatch.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
