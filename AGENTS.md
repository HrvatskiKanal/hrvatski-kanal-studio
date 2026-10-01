# Hrvatski Kanal Tool Lab — agent instructions

This repository is the **single discovery hub** for HrvatskiKanal tools. Before changing, adding, installing, or debugging anything, read these files in order:

1. [`TOOL_REGISTRY.json`](TOOL_REGISTRY.json) — machine-readable inventory, canonical repository, entrypoint, test command, deployment model, and network boundary.
2. [`TOOL_LAB.md`](TOOL_LAB.md) — human operating model and change process.
3. [`README.md`](README.md) — the Studio's local privacy and deployment boundary.

## Source of truth

| Need | Canonical location | Rule |
|---|---|---|
| Browser-only image, PDF, text, QR, direct-file, or local transcription tool | `HrvatskiKanal/hrvatski-kanal-studio` | Add under `tools/`; update `app.js`, registry, README, and `npm test`. |
| Private reusable branch/ref check | `HrvatskiKanal/hrvatski-kanal-qa-lab` | Use its manual target runner; do not copy product source or publish a preview. |
| Integrated feature for the one public site `https://hrvatskikanal.com/` | The private QA Lab's user-designated `site-release` target | Use the currently designated date-stamped candidate; run typecheck, build, tool, data, and visual checks before production. |
| Server-side multi-platform downloader | `HrvatskiKanal/hk-video-downloader` | Never present it as a GitHub Pages/static/no-bandwidth feature. Require local `yt-dlp` and FFmpeg. |
| Repositories marked `legacy-or-review-copy` in the registry | Do not add new work there | Establish deployment ownership before changing, archiving, renaming, or migrating. |

## Non-negotiable guardrails

- Do not create a new tools repository when an existing canonical repository fits.
- Do not introduce paid APIs, credentials, a payment flow, a tracking SDK, or a remote proxy without updating the registry and documenting why it is technically required.
- Do not select a date-stamped site repository by name or update time. The user updates the QA Lab's `site-release` pointer whenever a newer candidate is ready for testing.
- Use only the owner's explicitly authorised GitHub integration. Never invite collaborators, add tokens/secrets/deploy keys/webhooks, change visibility/billing/deployment, force-push, delete branches, or bypass protected-main pull-request rules.
- Do not claim that a server feature has no cost. Distinguish source-code cost from CPU, disk, bandwidth, and hosting cost.
- Use pinned local assets for static tools where practical. Any unavoidable first-use model download must be visible in the tool UI and README.
- Preserve user privacy: browser-local tools must not upload their content to a Hrvatski Kanal server.
- A pull request that changes the tool inventory must update `TOOL_REGISTRY.json`, `TOOL_LAB.md`, `README.md`, and validation in the same change.

## Required change checklist

1. Classify the work as `local-browser`, `browser-api`, `browser-api-and-local-model`, `public-data`, or `server-side`.
2. Find the canonical repository in `TOOL_REGISTRY.json`; do not search the organization blindly.
3. Implement the smallest complete change, including error states and Croatian copy.
4. Add or update an automated check and run the repository's documented verification command. Use the private QA Lab only for a repeatable branch/ref check or QA report.
5. Update the registry and human documentation.
6. Open one focused pull request with the changed inventory and exact validation results.

## Adding a new tool

For a new local Studio tool, add exactly one `tools/<slug>.html` page, one `app.js` entry, and one `TOOL_REGISTRY.json` entry. `npm test` must pass before the pull request is opened.

A server-side tool requires a clear operating-cost statement, input limits, rate limits, supported-host validation, cleanup, and a deployment document. It does not belong in the static Studio unless its UI remains fully local.
