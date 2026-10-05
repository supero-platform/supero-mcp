# Catering quotes and orders

**Vertical:** Food · **Level:** Intermediate · **Build status:** not yet built by anyone

A caterer turns an enquiry into a quote, the customer accepts it, and the kitchen gets a prep list.

## The problem

A catering business quotes by email and re-types the accepted quote for the kitchen. Dietary requirements go missing between the two.

## Who uses it

- **Customer**: sends an enquiry, accepts a quote, sees their orders
- **Sales**: builds quotes from the menu
- **Kitchen**: sees accepted orders by event date with dietary notes

## What it keeps track of

- **Menu item**: name, price per head, dietary tags, photo
- **Enquiry**: customer, event date, guests, notes
- **Quote**: enquiry, lines, total, state
- **Order**: quote, event date, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor browses the menu and sends an enquiry.
2. Sales builds a quote from menu items and guest count.
3. The customer accepts or asks for a change.
4. An accepted quote becomes an order on the kitchen's list.

## Who can see what

- The menu is public.
- A customer sees only their own enquiries, quotes and orders.
- Margins and internal notes are hidden from customers.

## Platform services to reach for

`order`, `approval`, `product`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Quote total is price per head times guests, summed.
- [ ] Only an accepted quote can become an order.
- [ ] The kitchen list shows dietary notes for every order.
- [ ] A customer cannot open another customer's quote.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A deposit on acceptance.
- A shopping list across all orders in a week.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/food/catering-orders.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
