import { useEffect, useState } from "react";
import { LogOut, Upload, Plus, Pencil, Trash2, X } from "lucide-react";
import SectionHeading from "../../components/SectionHeading";
import { useAdminAuth } from "../../context/AdminAuthContext";
import siteConfig from "../../data/siteConfig";
import "../../styles/admin/admin-dashboard.css";

const API = siteConfig.apiBaseUrl;

async function apiFetch(url, options = {}) {
  const res = await fetch(`${API}${url}`, { credentials: "include", ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed.");
  return data;
}

const TABS = [
  { id: "logo", label: "Site Logo" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
];

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const [tab, setTab] = useState("logo");

  return (
    <div className="page-head-section section admin-dashboard">
      <div className="container">
        <div className="admin-dashboard__header">
          <SectionHeading
            eyebrow="Admin"
            title={`Welcome, ${admin?.username || "Admin"}`}
            description="Edit what visitors see on the Phronix website."
          />
          <button className="btn btn--outline btn--sm" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`admin-tabs__btn ${tab === t.id ? "admin-tabs__btn--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "logo" && <LogoPanel />}
        {tab === "projects" && <ProjectsPanel />}
        {tab === "team" && <TeamPanel />}
      </div>
    </div>
  );
}

// ── Logo ─────────────────────────────────────────────────────────
function LogoPanel() {
  const [settings, setSettings] = useState({ logoUrl: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    apiFetch("/settings").then((d) => setSettings(d.settings)).catch(() => {});
  }, []);

  function onPick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function onUpload() {
    if (!file) return;
    setStatus("Uploading…");
    try {
      const form = new FormData();
      form.append("logo", file);
      const data = await apiFetch("/settings/logo", { method: "PUT", body: form });
      setSettings(data.settings);
      setFile(null);
      setPreview("");
      setStatus("Logo updated.");
    } catch (err) {
      setStatus(err.message);
    }
  }

  const currentUrl = preview || (settings.logoUrl ? `${API.replace(/\/api$/, "")}${settings.logoUrl}` : "");

  return (
    <div className="card admin-panel">
      <h3>Site logo</h3>
      {currentUrl && <img src={currentUrl} alt="Site logo" className="admin-panel__logo-preview" />}
      <div className="admin-panel__row">
        <input type="file" accept="image/*" onChange={onPick} />
        <button className="btn btn--gold btn--sm" onClick={onUpload} disabled={!file}>
          <Upload size={16} /> Upload
        </button>
      </div>
      {status && <p className="admin-panel__status">{status}</p>}
    </div>
  );
}

// ── Projects ─────────────────────────────────────────────────────
const emptyProject = {
  name: "",
  category: "",
  description: "",
  technologies: "",
  githubUrl: "",
  demoUrl: "",
  ongoing: false,
  order: 0,
};

function ProjectsPanel() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // id or "new" or null
  const [form, setForm] = useState(emptyProject);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  function load() {
    apiFetch("/projects").then((d) => setItems(d.projects)).catch(() => {});
  }
  useEffect(load, []);

  function startNew() {
    setForm(emptyProject);
    setFile(null);
    setEditing("new");
  }
  function startEdit(p) {
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      technologies: (p.technologies || []).join(", "),
      githubUrl: p.github_url || "",
      demoUrl: p.demo_url || "",
      ongoing: p.ongoing,
      order: p.order,
    });
    setFile(null);
    setEditing(p.id);
  }

  async function save() {
    setStatus("Saving…");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      if (file) body.append("image", file);
      if (editing === "new") {
        await apiFetch("/projects", { method: "POST", body });
      } else {
        await apiFetch(`/projects/${editing}`, { method: "PUT", body });
      }
      setEditing(null);
      setStatus("");
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await apiFetch(`/projects/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__toolbar">
        <button className="btn btn--gold btn--sm" onClick={startNew}>
          <Plus size={16} /> Add project
        </button>
      </div>

      {editing && (
        <div className="card admin-form">
          <div className="admin-form__head">
            <h3>{editing === "new" ? "New project" : "Edit project"}</h3>
            <button className="admin-form__close" onClick={() => setEditing(null)}><X size={18} /></button>
          </div>
          {status && <p className="admin-panel__status">{status}</p>}
          <label className="admin-field"><span>Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Category</span>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Description</span>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Technologies (comma separated)</span>
            <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
          </label>
          <label className="admin-field"><span>GitHub URL</span>
            <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
          </label>
          <label className="admin-field"><span>Demo URL</span>
            <input value={form.demoUrl} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} />
          </label>
          <label className="admin-field admin-field--row">
            <input type="checkbox" checked={form.ongoing} onChange={(e) => setForm({ ...form, ongoing: e.target.checked })} />
            <span>Ongoing project</span>
          </label>
          <label className="admin-field"><span>Order</span>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          </label>
          <label className="admin-field"><span>Image</span>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <button className="btn btn--gold btn--block" onClick={save}>Save</button>
        </div>
      )}

      <div className="admin-list">
        {items.map((p) => (
          <div className="admin-list__row" key={p.id}>
            <img src={p.image?.startsWith("http") || p.image?.startsWith("/uploads") ? `${API.replace(/\/api$/, "")}${p.image.startsWith("/uploads") ? p.image : ""}` || p.image : p.image} alt="" className="admin-list__thumb" onError={(e)=>{e.currentTarget.style.visibility="hidden"}} />
            <div className="admin-list__info">
              <strong>{p.name}</strong>
              <span>{p.category}{p.ongoing ? " · Ongoing" : ""}</span>
            </div>
            <div className="admin-list__actions">
              <button className="btn btn--outline btn--sm" onClick={() => startEdit(p)}><Pencil size={14} /></button>
              <button className="btn btn--outline btn--sm" onClick={() => remove(p.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-panel__status">No projects yet.</p>}
      </div>
    </div>
  );
}

// ── Team ─────────────────────────────────────────────────────────
const emptyMember = { name: "", role: "", bio: "", skills: "", linkedin: "", github: "", order: 0 };

function TeamPanel() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  function load() {
    apiFetch("/team").then((d) => setItems(d.team)).catch(() => {});
  }
  useEffect(load, []);

  function startNew() {
    setForm(emptyMember);
    setFile(null);
    setEditing("new");
  }
  function startEdit(m) {
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio || "",
      skills: (m.skills || []).join(", "),
      linkedin: m.linkedin || "",
      github: m.github || "",
      order: m.order,
    });
    setFile(null);
    setEditing(m.id);
  }

  async function save() {
    setStatus("Saving…");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      if (file) body.append("image", file);
      if (editing === "new") {
        await apiFetch("/team", { method: "POST", body });
      } else {
        await apiFetch(`/team/${editing}`, { method: "PUT", body });
      }
      setEditing(null);
      setStatus("");
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Remove this team member?")) return;
    try {
      await apiFetch(`/team/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__toolbar">
        <button className="btn btn--gold btn--sm" onClick={startNew}>
          <Plus size={16} /> Add team member
        </button>
      </div>

      {editing && (
        <div className="card admin-form">
          <div className="admin-form__head">
            <h3>{editing === "new" ? "New team member" : "Edit team member"}</h3>
            <button className="admin-form__close" onClick={() => setEditing(null)}><X size={18} /></button>
          </div>
          {status && <p className="admin-panel__status">{status}</p>}
          <label className="admin-field"><span>Name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Role</span>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </label>
          <label className="admin-field"><span>Bio</span>
            <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </label>
          <label className="admin-field"><span>Skills (comma separated)</span>
            <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          </label>
          <label className="admin-field"><span>LinkedIn URL</span>
            <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
          </label>
          <label className="admin-field"><span>GitHub URL</span>
            <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </label>
          <label className="admin-field"><span>Order</span>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          </label>
          <label className="admin-field"><span>Photo</span>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <button className="btn btn--gold btn--block" onClick={save}>Save</button>
        </div>
      )}

      <div className="admin-list">
        {items.map((m) => (
          <div className="admin-list__row" key={m.id}>
            <div className="admin-list__info">
              <strong>{m.name}</strong>
              <span>{m.role}</span>
            </div>
            <div className="admin-list__actions">
              <button className="btn btn--outline btn--sm" onClick={() => startEdit(m)}><Pencil size={14} /></button>
              <button className="btn btn--outline btn--sm" onClick={() => remove(m.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-panel__status">No team members yet.</p>}
      </div>
    </div>
  );
}