# Hrvatski Kanal Tool Lab

**One organization, one entry point, clear ownership.** This repository is the catalogue and canonical home for browser-local utilities. It prevents agents and collaborators from searching several similarly named repositories before they can make a safe change.

## Start here

- **Machine-readable inventory:** [`TOOL_REGISTRY.json`](TOOL_REGISTRY.json)
- **Instructions for connected agents:** [`AGENTS.md`](AGENTS.md)
- **Local Studio:** [`README.md`](README.md)

The registry declares every known relevant repository, its role, test command, deployment model, and cost/privacy boundary.

## Architecture

| Area | Canonical repository | Intended use | What does not belong there |
|---|---|---|---|
| Local Tool Lab | [`hrvatski-kanal-studio`](https://github.com/HrvatskiKanal/hrvatski-kanal-studio) | Browser-local image, PDF, text, QR, direct-file and local-transcription tools | Server proxies, credentials, paid APIs, analytics trackers |
| Integrated public site | [`hrvatskikanal30.rujna`](https://github.com/HrvatskiKanal/hrvatskikanal30.rujna) | Main-site pages, including weather, economy, and user-facing server features | A second copy of a Studio-only local tool |
| Downloader backend | [`hk-video-downloader`](https://github.com/HrvatskiKanal/hk-video-downloader) | Self-hosted Node/yt-dlp/FFmpeg backend | GitHub Pages deployment or promises of zero bandwidth/hosting cost |
| Old or review copies | Listed in the registry | Preserve until a deployment audit identifies their owner and URL | New features or parallel tool implementations |

## Tool classes

| Class | Typical examples | Network and cost boundary |
|---|---|---|
| `local-browser` | image conversion, collage, QR, PDF, text count | Works on the device in the browser; no application server or paid API |
| `browser-api` | text reader, microphone mode | Uses an API provided by the browser/device; availability depends on the user's browser |
| `browser-api-and-local-model` | file transcription | File stays in browser; an open model is fetched once into browser cache unless self-hosted later |
| `public-data` | weather and market data | Live values use public sources; values can be stale/unavailable and must not be presented as guaranteed real-time feeds |
| `server-side` | multi-platform media downloader | Requires a maintained server, limits, disk/CPU/bandwidth, yt-dlp, and FFmpeg; cannot be honestly described as a static GitHub Pages tool |

## Working agreement

1. **Find, do not guess.** Read the registry before starting work.
2. **One canonical implementation.** Add a capability in its designated repository; link to it elsewhere instead of copying it.
3. **No silent dependencies.** Local asset, remote model, public feed, server binary, and paid service must be declared.
4. **Test with the change.** Every tool change includes a runnable check and the check result in its pull request.
5. **Retire duplicates deliberately.** Do not delete, rename, or migrate an old repository until its deployed URL, owner, redirects, and backups are confirmed.

## Future cleanup: safe sequence

The organization currently contains multiple exports of the main site. The safe consolidation sequence is:

1. Determine the live deployment and custom-domain target for each repository.
2. Mark one integrated-site repository as canonical in the registry.
3. Freeze legacy copies: no feature work, only emergency fixes.
4. Create redirects or preserve an archival tag before any rename or archive action.
5. Update links, Pages settings, and the registry in one planned migration.

This is intentionally separate from the Tool Lab setup; it avoids breaking published addresses while making future work discoverable now.
