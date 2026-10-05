#!/usr/bin/env python3
"""Repo checks run by CI: brief structure, internal links, and no committed keys."""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SECTIONS = ["## The problem", "## Who uses it", "## What it keeps track of", "## What people do",
            "## Who can see what", "## Platform services to reach for", "## Done when",
            "## Stretch goals", "## Starter prompt"]
KEY = re.compile(r"ak_[A-Za-z0-9]{12,}")
LINK = re.compile(r"\]\(([^)#\s]+)(#[^)\s]*)?\)")
errors = []

briefs = [p for p in (ROOT / "projects").glob("*/*.md")]
index = (ROOT / "projects" / "README.md").read_text()
for p in briefs:
    text = p.read_text()
    for s in SECTIONS:
        if s not in text:
            errors.append(f"{p.relative_to(ROOT)}: missing section '{s}'")
    if not re.search(r"\*\*Level:\*\* (Starter|Intermediate|Advanced) · \*\*Build status:\*\* ", text):
        errors.append(f"{p.relative_to(ROOT)}: needs Level (Starter, Intermediate or Advanced) and Build status")
    if f"{p.parent.name}/{p.name}" not in index:
        errors.append(f"{p.relative_to(ROOT)}: not listed in projects/README.md")

for d in (ROOT / "apps").glob("*/*/"):
    for need in ("README.md", "bundle/schemas.py", "bundle/config.py", "bundle/ui/app.js"):
        if not (d / need).exists():
            errors.append(f"{d.relative_to(ROOT)}: missing {need}")

for p in ROOT.rglob("*"):
    if not p.is_file() or ".git" in p.parts:
        continue
    if p.name == ".env":
        errors.append(f"{p.relative_to(ROOT)}: .env files must not be committed")
    try:
        text = p.read_text()
    except (UnicodeDecodeError, OSError):
        continue
    if KEY.search(text):
        errors.append(f"{p.relative_to(ROOT)}: looks like it contains an API key")
    if p.suffix == ".md" and not p.name.endswith("TEMPLATE.md"):
        for target, _ in LINK.findall(text):
            if "://" in target or target.startswith("mailto:"):
                continue
            if not (p.parent / target).exists():
                errors.append(f"{p.relative_to(ROOT)}: broken link '{target}'")

print(f"{len(briefs)} briefs checked")
if errors:
    print("\n".join(errors))
    sys.exit(1)
print("ok")
