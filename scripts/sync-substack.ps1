# Fetches the Substack feed from this PC (Substack blocks GitHub's servers) and,
# if the posts changed, commits and pushes substack-posts.json so GitHub redeploys.
# Run daily by the Windows scheduled task "CoolCat Substack Sync".

# "Continue", not "Stop": in Windows PowerShell 5.1, stderr from node/git (e.g. warnings)
# would otherwise abort the script. Failures are detected via $LASTEXITCODE instead.
$ErrorActionPreference = "Continue"
$site = Split-Path -Parent $PSScriptRoot
$dataFile = "src/data/substack-posts.json"
$logFile = Join-Path (Split-Path -Parent $site) "substack-sync.log"
$node = "C:\Program Files\nodejs\node.exe"
$git = "C:\Program Files\Git\cmd\git.exe"

function Log($msg) {
  "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $msg" | Out-File -FilePath $logFile -Append -Encoding utf8
}

try {
  Set-Location $site

  $out = & $node scripts/fetch-substack.mjs 2>&1 | Out-String
  if ($LASTEXITCODE -ne 0) { throw "fetch failed: $out" }
  if ($out -match "Could not fetch") { Log "Feed unreachable, nothing changed. $($out.Trim())"; exit 0 }

  $untagged = $out -split "`n" | Select-String "No folder hashtag" | ForEach-Object { " $($_.ToString().Trim())" }

  & $git diff --quiet -- $dataFile
  if ($LASTEXITCODE -eq 0) { Log "No new posts.$untagged"; exit 0 }

  # Commit only the posts file so any in-progress edits stay local
  & $git commit -q -m "Update Substack posts" -- $dataFile
  if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
  & $git push -q origin main 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "git push failed (run 'git pull' in site/ and retry)" }

  $counts = ($out -split "`n" | Select-String "Post counts").ToString().Trim()
  Log "Pushed new posts. $counts$untagged"
}
catch {
  Log "ERROR: $($_.Exception.Message)"
  exit 1
}
