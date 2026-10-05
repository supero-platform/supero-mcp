# Contributing

Thank you for being here. You do not need to ask before starting any of these.

## Build a brief

1. Pick one from [projects/](projects/README.md). Nobody owns a brief: ten people can build the same one, and the differences are the interesting part.
2. Follow the [README](README.md) to connect, then paste the brief's starter prompt.
3. Add your build to the [showcase](showcase/README.md).

The free plan's three projects are enough for this.

## Write a brief

Copy [projects/TEMPLATE.md](projects/TEMPLATE.md) to `projects/<vertical>/<short-name>.md` and add a row to [projects/README.md](projects/README.md). A good brief:

- Describes a real situation, with the thing that goes wrong today.
- Says **who can see what**. This is the heart of a brief. Include at least one thing that must be hidden from someone.
- Has a "Done when" list a stranger could check in the running app, with yes or no answers.
- Says what, never how. No schemas, no code, no screen layouts.
- Names only platform services that `build_list_capabilities` returns.
- Fits the free plan: 20 schemas or fewer.

New verticals are welcome. So are briefs from a trade you know and we do not.

## Improve the guide

Steps for a client we have not covered, a prompt that works better, an error message we did not explain. Please test what you write against the live server. `python3 scripts/gen_tools_reference.py` rebuilds [docs/tools.md](docs/tools.md) from the live tool list; do not edit that file by hand.

## House rules

- **No keys, ever.** Not in code, issues, screenshots or logs. If one slips out, rotate it at once under **API Keys** and tell us.
- **Messages go only to a verified identity.** An app in this repo may send email or SMS only to the signed-in user's own verified address. Never to an address or phone number read from a form field.
- **No real personal data** in seed data or screenshots.
- **Say what you used.** If an assistant wrote it, say which. That is the point of this repo, not something to hide.
- Plain words, short sentences. If a newcomer would have to look a term up, explain it or drop it.

## Pull requests

Keep each one to one thing. `python3 scripts/check_repo.py` checks that briefs have every section, that links inside the repo resolve, and that no key has been committed. We aim to reply within a day.

Problems with the Supero platform itself (a tool returning something wrong, a deploy that fails for no reason) are worth an issue here. Anything that looks like a security hole goes to [SECURITY.md](SECURITY.md) instead.
