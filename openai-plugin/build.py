#!/usr/bin/env python3
"""Build the ChatGPT app-directory package for Supero.

    python3 build.py --video-url https://...        writes supero-chatgpt.zip next to this file

Checks every limit OpenAI documents before writing the ZIP, so the dashboard's automated checks
pass on the first upload. Never put secrets, tokens or reviewer passwords in this package: those
go only in the dashboard's Review details form."""
import argparse, json, os, re, struct, sys, zipfile
HERE = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser(); ap.add_argument("--video-url", required=True); a = ap.parse_args()
if not re.fullmatch(r"https://\S{8,1000}", a.video_url): sys.exit("--video-url must be an https:// link anyone with the link can watch")
plugin = json.load(open(os.path.join(HERE, "plugin.json")))
mcp = json.load(open(os.path.join(HERE, "mcp.json")))
oa = plugin["extensions"]["com.openai"]; ui = oa["interface"]; rv = oa["review"]
rv["demo_recording_url"] = a.video_url
errs = []
def lim(v, n, label):
    if not isinstance(v, str) or not v.strip() or len(v) > n: errs.append(f"{label}: must be 1-{n} chars (is {len(v or '')})")
if not re.fullmatch(r"(?!.*(?:--|\.\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?", plugin["name"]) or len(plugin["name"]) > 64: errs.append("name: lowercase letters, digits, single hyphens")
lim(plugin["description"], 4000, "description"); lim(ui["displayName"], 30, "displayName"); lim(ui["shortDescription"], 30, "shortDescription")
lim(ui["longDescription"], 4000, "longDescription"); lim(ui["developerName"], 80, "developerName")
for k in ("websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"):
    if not re.fullmatch(r"https://\S{4,1016}", ui.get(k, "")): errs.append(f"{k}: https URL required")
pos, neg = rv["test_cases"]["positive"], rv["test_cases"]["negative"]
if len(pos) != 5: errs.append(f"positive test cases: exactly 5 required (have {len(pos)})")
if len(neg) != 3: errs.append(f"negative test cases: exactly 3 required (have {len(neg)})")
for i, t in enumerate(pos):
    for k in ("description", "prompt", "tools_triggered", "expected_behavior"):
        if not t.get(k): errs.append(f"positive[{i}].{k} missing")
for i, t in enumerate(neg):
    for k in ("description", "prompt"):
        if not t.get(k): errs.append(f"negative[{i}].{k} missing")
srv = mcp["mcpServers"]
if len(srv) != 1: errs.append("mcp.json: exactly one server")
for s in srv.values():
    if s.get("headers"): errs.append("mcp.json: no headers allowed")
    if s["url"] != "https://mcp.supero.dev/mcp": errs.append("mcp.json: url must be https://mcp.supero.dev/mcp")
def png_size(p):
    d = open(p, "rb").read(24)
    return struct.unpack(">II", d[16:24]) if d[:8] == b"\x89PNG\r\n\x1a\n" else (0, 0)
for k in ("logo", "composerIcon"):
    p = os.path.join(HERE, ui[k].lstrip("./"))
    if not os.path.exists(p): errs.append(f"{k}: {ui[k]} missing"); continue
    w, h = png_size(p)
    if w != h or w < 48 or w > 4096: errs.append(f"{k}: must be square PNG 48-4096 px (is {w}x{h})")
    if os.path.getsize(p) > 5 * 1024 * 1024: errs.append(f"{k}: over 5 MiB")
blob = json.dumps(plugin) + json.dumps(mcp)
if re.search(r"(?i)(password|secret|token\"\s*:|ghp_|sk-)", blob): errs.append("package must not contain secrets or passwords")
if errs: print("NOT BUILT:"); [print("  -", e) for e in errs]; sys.exit(1)
out = os.path.join(HERE, "supero-chatgpt.zip")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("plugin.json", json.dumps(plugin, indent=2)); z.writestr("mcp.json", json.dumps(mcp, indent=2))
    for k in ("logo", "composerIcon"):
        rel = ui[k].lstrip("./"); z.write(os.path.join(HERE, rel), rel)
print("BUILT", out, "-", ", ".join(zipfile.ZipFile(out).namelist()))
