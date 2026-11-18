# Building on Supero over MCP

Supero is a multi-tenant backend that a coding agent configures over MCP. Every app gets sign-in, tenants, roles and permissions, a database, a REST API, an admin panel, workflows and deployment from the platform. The agent writes the data model, the configuration and the front end, and the platform provides everything else.

This page is the reference for building through the Supero MCP server at `https://mcp.supero.dev/mcp`. It covers the build sequence, the tool groups, common pitfalls and three starter prompts.

## How the server is reached

The server speaks Streamable HTTP. Sign-in is OAuth with a Supero account, so no API key is copied into the client. At sign-in the user picks the project the connection may work in (or the whole workspace, for workspace admins) and whether it may publish apps. Connections can be reviewed or revoked at `https://app.supero.dev/oauth/connections`.

Scripts and CI that cannot open a browser use the API-key endpoint, `https://api.supero.dev/mcp/v1/messages`, with the key in an `X-API-Key` header.

All project state lives on the server. The build spec comes from `build_get_skills`, the project from `build_whoami` and `build_get_project`, and the current app files from `build_get_bundle`. There is no Supero CLI and no spec file on disk, and folders on the local machine are not part of a Supero project. If the connected client did not surface the server's instructions, the `start-supero-build` MCP prompt loads them.

## Tool groups

A connection made with `?features=core` sees the core tools, which are enough to take one app from a description to a verified preview. Other tools come in named groups that are added to the URL:

| URL | Tools |
|---|---|
| `https://mcp.supero.dev/mcp?features=core` | core |
| `https://mcp.supero.dev/mcp?features=core,services` | core plus platform services |
| `https://mcp.supero.dev/mcp?features=core,ops,testing` | core plus operations and testing |
| `https://mcp.supero.dev/mcp?features=all` | every tool |
| `https://mcp.supero.dev/mcp` | every tool (the URL existing connections use) |

Adding `read_only=true` keeps only the tools that change nothing, for example `?features=core&read_only=true`.

The groups:

- **core**: orient, plan, schemas, records, validate, publish, deploy and verify. `build_whoami`, `build_list_projects`, `build_get_project`, `build_create_project`, `build_plan`, `build_get_skills`, `schema_list`, `schema_get`, `schema_save`, `schema_validate`, `crud_search`, `crud_get`, `crud_create`, `crud_update`, `build_validate`, `build_publish`, `build_get_bundle`, `build_deploy`, `build_deploy_status`, `build_verify`.
- **ops**: `build_logs`, `build_doctor`, `build_report`, `build_audit`, `crud_delete`, `build_teardown`, `build_stage_bundle`.
- **schemas**: `schema_list_project`, `schema_update`, `schema_delete`.
- **services**: `build_list_capabilities`, `build_get_service_contract`, `build_configure_services`, `build_import_services`, `build_recommend_integrations`, `build_get_examples`, `project_link_schemas`.
- **sdk**: `sdk_list`, `sdk_status`, `sdk_generate`, `sdk_download`.
- **testing**: `build_smoke_test`, `build_e2e_test`, `build_e2e_test_status`, `build_check_app_account`.
- **connectors**: outside data sources and connector runs, such as `connector_status`, `build_connect_data_source` and `build_list_data_sources`.
- **rbac**: `rbac_check_permission`, `rbac_get_my_access`, `apikey_get_scope`.
- **production**: `build_go_live`, `build_go_production`, `build_production_status`, `build_set_project_mode`, `build_update_project`, `build_replace_project`. `build_production_status` only reads: use it to check where Go to production stands (`what`: status, plan, job, backup) and `build_go_production` for the steps that change data.

A call to a tool outside the connection's groups is refused, and the refusal names the group and the URL to reconnect with. After the URL changes, the client reconnects and may ask for sign-in again.

On a connection made with `features=`, `build_teardown` previews what it would stop. The real run needs `confirm_project_name` set to the project's name.

## The build sequence

A first build runs in this order: whoami, plan, schemas, validate, publish, deploy, deploy status, verify.

1. **Orient with `build_whoami`.** It returns the account, the role, the project scope of the connection and whether it may publish. A connection scoped to one project already has its project, so the build happens there. A workspace connection lists projects with `build_list_projects` and can make one with `build_create_project`. `build_get_project` returns the project's `schema_namespace`, which every schema uses as its namespace.
2. **Read the spec with `build_get_skills`.** It is served by the platform, so it matches what the platform accepts today. Long documents come in pages: when a response has `more: true`, the next page is fetched with `offset`.
3. **Plan with `build_plan`.** It turns a description into records, roles, access rules, screens and services. The plan goes back to the user before anything is written, since this is the cheapest point to change the design.
4. **Write the schemas and the bundle.** The bundle is a small set of files: `schemas.py` (records and fields), `config.py` (roles, access rules, services, seed users), `setup.py`, `__main__.py`, `run.sh`, `requirements.txt` and `ui/app.js`. `schema_validate` checks schema definitions on their own, and `schema_list`, `schema_get` and `schema_save` work with the schemas saved in the project. The bundle is written fresh for a new app. For a change to an existing app, `build_get_bundle` returns the current files, and those are what gets edited.
5. **Validate with `build_validate`.** It checks the bundle against the live platform and lists what is wrong by file and schema. Validation is free and uses no preview, so it runs until clean. With the ops group, `build_doctor` adds checks for things that are legal but likely to disappoint, such as an empty screen or a role that can see nothing.
6. **Publish with `build_publish`.** It runs validation again, stores the bundle and returns a `version_uuid`.
7. **Deploy with `build_deploy`.** `target='cloud_ephemeral'` starts a preview that lasts about 30 minutes. A permanent `<service>.supero.live` address comes from `build_go_live` in the production group, on paid plans.
8. **Wait with `build_deploy_status`.** A deploy is asynchronous. `launching` for five minutes or more is normal; cloud permissions can take up to about six and a half minutes to settle. Once a URL appears, any response from the app means it is up, and a Cloud Run 403 means it is still settling. A deploy that is still unreachable after about ten minutes is a real failure.
9. **Verify with `build_verify`.** It runs acceptance checks against the running preview, including the launch checklist and tamper checks on money and status fields. With the testing group, `build_smoke_test` signs in to the deployed app and checks that it answers.

The build finishes with a short summary for the user: what was built, the URL, how to sign in, and anything left undone.

### Changing an app

A change starts from `build_get_bundle`, edits only what the user asked for, then runs `build_validate`, `build_publish` and `build_deploy` again. Each publish raises the version number. Records in a running app can be read and edited with `crud_search`, `crud_get`, `crud_create` and `crud_update`.

### Services and integrations

Bookings, appointments, rentals, cart, orders, payments, approvals, tasks, tickets, reviews, memberships, recurring plans, inventory, document signature, attachments, notifications and email are platform services. Using one is less code than writing it. The services group lists them (`build_list_capabilities`), returns the contract for one (`build_get_service_contract`), turns them on for a project (`build_configure_services`) and has complete example apps by archetype (`build_get_examples`). To use these tools, the connection URL includes `services`, for example `?features=core,services`.

Keys for email, SMS or payment providers are set in the app's admin panel under **Services**. They are not part of the bundle.

## Common pitfalls

- **Lifecycle field names.** Fields called `status` or `state` are write-protected for ordinary users. Lifecycle fields are named `<thing>_state`, for example `booking_state`.
- **Reserved record names.** `Project`, `User`, `Account`, `Organization` and `Tenant` are platform names and are not used as record names.
- **Namespace.** Every schema uses the exact `schema_namespace` from `build_get_project`. A namespace error from validation is fixed in the schema, not published around.
- **Previews are limited.** The free plan has ten previews per project. A bundle that has not passed `build_validate` is not worth a preview.
- **Rebuilding instead of editing.** An existing app is changed from `build_get_bundle`. Regenerating it from memory loses earlier changes.
- **Repeated failing calls.** The same failing call sent again unchanged gives the same error. Each error names the file or field to fix.
- **Proxy errors on code uploads.** An HTTP 403, an HTML page or a firewall-style error on `build_validate` or `build_publish` usually comes from a proxy rejecting raw code in the request. The same call with `files_b64gz` (the files as base64 of gzip) gets through.
- **Paged documents.** A response with `more: true` continues at the given `offset`. Fetching the whole document again returns the same first page.
- **Local tunnels.** An app run on the local machine behind a tunnel (cloudflared, ngrok) is not a Supero deployment. The user's URL comes from `build_deploy` or `build_go_live`.
- **Money in the browser.** Anything the browser computes or writes can be changed by the buyer. Checkout goes through the cart service and `window.SuperoCheckout()`, which prices lines from the catalog record, and the Stripe webhook confirms the order. Payment, fulfilment and status fields are read-only for `tenant_user`. The full rules are in section 0a of `build_get_skills`.
- **Email recipients.** Workflow emails go to `user.email` of the signed-in user, or to a fixed business address for staff alerts. An address read from a record field is not a safe recipient.
- **A stuck redeploy of a live app.** A failed redeploy leaves the previous version serving. Running `build_go_live` again is the fix, not `build_teardown`.
- **Preview versus live.** A preview ends after about 30 minutes. Before real users arrive, the project moves from dev mode to live mode (`build_set_project_mode`, production group).

## Describing an app

One paragraph is enough when it answers four questions:

1. Who uses it? For example, "customers, agents and an admin".
2. What does each role do? One sentence per role.
3. Who is kept from seeing what? For example, "a customer sees only their own company's tickets".
4. What does done look like? For example, "a customer can open a ticket and an agent can close it".

The third answer is the one most often left out, and it is what makes an app safe to put in front of other people.

## Starter prompts

These work on a `?features=core` connection.

**Build a helpdesk with per-company isolation**

```text
Build a helpdesk on Supero. Customers belong to a company and open tickets; agents answer them; an admin manages agents. A customer sees only their own company's tickets, and agents see every company's. Plan it first and show me the plan before you build. Then validate, publish, deploy a preview and verify it, and tell me the URL and how to sign in.
```

**Check the connection**

```text
Which Supero account and project am I connected to?
```

**Add a field and redeploy**

```text
In my Supero app, add a priority field (low, normal, high) to tickets and show it in the ticket list. Change nothing else. Validate, publish and redeploy, then tell me the new version and URL.
```

## More

- Install for each client, the tool reference and example app briefs: https://github.com/supero-platform/supero-mcp
- Documentation: https://docs.supero.dev/developers/mcp/overview/
- Support: info@supero.dev, or GitHub issues at https://github.com/supero-platform/supero-mcp/issues
