# Plex Torrent Automation Script

**Status:** Idea documented for future implementation
**Scope:** Personal project, not a business idea
**Effort estimate:** ~50–100 lines of Python, 1 evening of work

---

## Current Manual Workflow

1. Log into DMZ-VM (auto-connects to PIA VPN)
2. Navigate to YTS or Pirate Bay website
3. Manually search for movie torrents
4. Prefer 4K, settle for 1080p if not available
5. Copy magnet link
6. Trigger download in BitTorrent client (DMZ-VM)
7. Wait for download to complete
8. RDP to Plex VM
9. Pull files from DMZ-VM over SMB
10. Manually organize/verify files in Plex library

**Pain points:**
- Entirely manual search and download
- Multiple VMs and manual file transfers required
- No quality preference automation
- Time-consuming for regular movie additions

---

## Proposed Solution

Automated script that:
1. **Searches YTS API** for movies (title, year, quality preference)
2. **Filters results** (prefer 4K → fallback to 1080p)
3. **Retrieves magnet link** from YTS API response
4. **Triggers torrent download** via torrent client API (transmission/qBittorrent)
5. **Monitors download completion** (poll torrent client status or watch folder)
6. **Transfers files** from DMZ-VM to Plex VM via SMB
7. **Organizes files** per Plex naming conventions
8. **Logs activity** (downloaded movies, timestamps, quality used)

---

## Technical Details

### APIs & Services
- **YTS API** (`yts.mx/api`): Free, no auth required
  - Endpoint: `/api/v2/list_movies.json?query={title}&sort_by=download_count`
  - Returns: movie metadata, release dates, quality options (480p, 720p, 1080p, 2160p), magnet links
  - Quality field: `quality` in response (e.g., "2160p" for 4K)

- **Torrent Client API**: Depends on client
  - Transmission: `transmission-rpc` (JSON-RPC over HTTP)
  - qBittorrent: REST API (`/api/v2/torrents/add`)
  - Deluge: `deluge-client` (Python library)

- **SMB/File Transfer**: `smb` Python library or `rsync` over SSH

### Script Flow (Pseudocode)

```
Input: Movie title (or watchlist)

1. Search YTS API for movie
2. Filter results:
   - If 4K available → use 4K magnet
   - Else if 1080p available → use 1080p magnet
   - Else → skip or use best available
3. Add magnet to torrent client (DMZ-VM)
4. Poll torrent client until download complete (check progress, handle failures)
5. Copy downloaded file from DMZ-VM share to Plex-VM via SMB
6. Rename file per Plex convention: `Movie Title (Year)/Movie Title (Year).mkv`
7. Log: title, quality, download time, completion status
8. Return success/failure to caller
```

### Configuration Needs
- DMZ-VM torrent client (transmission/qBittorrent) API endpoint
- Plex-VM SMB share credentials and path
- Quality preference list (order: 4K, 1080p, 720p, etc.)
- Plex library folder structure (path where movies should be organized)
- Optional: Movie watchlist source (hardcoded list, file, or API feed)

---

## Next Steps (If Pursued)

1. Choose torrent client (transmission easiest for API, qBittorrent also solid)
2. Test YTS API manually to confirm magnet link retrieval
3. Write script to search → download → transfer
4. Add monitoring/logging for reliability
5. Optional: Add watchlist support (IMDb list, Letterboxd, etc.)
6. Optional: Add scheduling (run daily, check for new releases, etc.)

---

## Notes

- YTS often has 4K versions of popular movies; older/niche films may only have 1080p
- Magnet links from YTS are reliable (they own the content)
- Consider rate-limiting API calls to avoid blocking (YTS is usually lenient)
- File naming critical for Plex: `Title (Year)/Title (Year).mkv` format
- Could eventually tie this into Radarr if setup becomes more complex
