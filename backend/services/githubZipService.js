// Streams protected ZIP assets from a private GitHub repo used ONLY for
// download distribution (separate from any public deployment/source repo).
// Requires:
//   GITHUB_ZIP_OWNER  - repo owner/org
//   GITHUB_ZIP_REPO   - the private distribution repo name
//   GITHUB_ZIP_TOKEN  - fine-grained PAT, Contents: Read-only, scoped to that repo
//
// Nothing here ever sends the PAT, the repo name, or any github.com URL to
// the frontend — callers only ever get back a byte stream.

const GITHUB_API = "https://api.github.com";

function assertConfigured() {
  if (!process.env.GITHUB_ZIP_OWNER || !process.env.GITHUB_ZIP_REPO || !process.env.GITHUB_ZIP_TOKEN) {
    throw new Error(
      "GitHub ZIP distribution is not configured (GITHUB_ZIP_OWNER / GITHUB_ZIP_REPO / GITHUB_ZIP_TOKEN)."
    );
  }
}

async function githubFetch(path, opts = {}) {
  assertConfigured();
  return fetch(`${GITHUB_API}${path}`, {
    ...opts,
    headers: {
      Authorization: `token ${process.env.GITHUB_ZIP_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(opts.headers || {}),
    },
  });
}

// Looks up the numeric asset id for a release tag + exact asset filename.
// Done per-download rather than cached, so re-uploading a new asset under
// the same release/name is picked up immediately without a cache to bust.
async function resolveAssetId(releaseTag, assetName) {
  const res = await githubFetch(
    `/repos/${process.env.GITHUB_ZIP_OWNER}/${process.env.GITHUB_ZIP_REPO}/releases/tags/${encodeURIComponent(releaseTag)}`
  );
  if (!res.ok) {
    throw new Error(`GitHub release lookup failed (${res.status}) for tag "${releaseTag}".`);
  }
  const release = await res.json();
  const asset = (release.assets || []).find((a) => a.name === assetName);
  if (!asset) {
    throw new Error(`Asset "${assetName}" not found in release "${releaseTag}".`);
  }
  return asset.id;
}

// Returns { body, contentType, contentLength } where body is a web
// ReadableStream of the raw file bytes, ready to pipe into an Express
// response. GitHub's asset endpoint 302s to a signed, time-limited storage
// URL for the actual bytes — fetch follows that redirect automatically.
export async function fetchReleaseAssetStream({ releaseTag, assetName }) {
  const assetId = await resolveAssetId(releaseTag, assetName);
  const res = await githubFetch(
    `/repos/${process.env.GITHUB_ZIP_OWNER}/${process.env.GITHUB_ZIP_REPO}/releases/assets/${assetId}`,
    { headers: { Accept: "application/octet-stream" } }
  );
  if (!res.ok || !res.body) {
    throw new Error(`GitHub asset download failed (${res.status}) for "${assetName}".`);
  }
  return {
    body: res.body,
    contentType: res.headers.get("content-type") || "application/octet-stream",
    contentLength: res.headers.get("content-length") || null,
  };
}

export default { fetchReleaseAssetStream };
