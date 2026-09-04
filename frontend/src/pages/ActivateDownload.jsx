import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, Download } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;

// Route: /activate-download?type=client|student&token=<raw-token>
// This page never has the file itself — it only asks the backend "is this
// token still good?", then, if yes, links to the real download endpoint,
// which re-checks and atomically consumes the token server-side.
export default function ActivateDownload() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const token = searchParams.get("token");

  const [state, setState] = useState("loading"); // loading | valid | invalid
  const [message, setMessage] = useState("");
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!type || !token || (type !== "client" && type !== "student")) {
      setState("invalid");
      setMessage("This activation link is malformed or incomplete.");
      return;
    }

    let mounted = true;

    fetch(`${API}/downloads/${type}/validate/${token}`)
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!mounted) return;
        if (!ok || !data.valid) {
          setState("invalid");
          setMessage(data.message || "This link is no longer valid.");
          return;
        }
        setProject(data.project);
        setState("valid");
      })
      .catch(() => {
        if (mounted) {
          setState("invalid");
          setMessage("Something went wrong while checking this link. Please try again.");
        }
      });

    return () => {
      mounted = false;
    };
  }, [type, token]);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Downloads"
          title="Activate your download"
          description="This link is single-use — once you download, it stops working."
        />

        {state === "loading" && (
          <div className="notice">
            <Loader2 size={18} className="spin" />
            <span>Checking your link…</span>
          </div>
        )}

        {state === "invalid" && (
          <div className="notice notice--error">
            <XCircle size={18} />
            <div>
              <p>{message}</p>
              <p>
                Head back to the{" "}
                <Link to={type === "student" ? "/projects" : "/downloads"}>project page</Link> to
                request a fresh link.
              </p>
            </div>
          </div>
        )}

        {state === "valid" && project && (
          <div className="card download-card">
            <div className="download-card__head">
              <h3>{project.name}</h3>
              {project.category && <span className="tag">{project.category}</span>}
              {project.version && <span className="tag">{project.version}</span>}
            </div>

            <p>{project.description}</p>

            <p className="field-success">
              <CheckCircle2 size={16} />
              Link verified. This download can be used once.
            </p>

            <a
              className="btn btn--gold btn--block"
              href={`${API}/downloads/${type}/${token}/download`}
            >
              <Download size={16} />
              Download ZIP
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
