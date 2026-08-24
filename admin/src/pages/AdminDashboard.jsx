import { useEffect, useState } from "react";
import {
  KeyRound,
  LogOut,
  Upload,
  Plus,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import { useAdminAuth } from "../context/AdminAuthContext";

import siteConfig from "../data/siteConfig";

import "../styles/admin-auth.css";
import "../styles/admin-dashboard.css";

const API = siteConfig.apiBaseUrl;

async function apiFetch(url, options = {}) {
  const res = await fetch(`${API}${url}`, {
    credentials: "include",
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

const TABS = [
  { id: "logo", label: "Site Logo" },
  { id: "homeStats", label: "Homepage Stats" },
  { id: "projects", label: "Student Project" },
  { id: "team", label: "Team" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "careers", label: "Careers" },
  { id: "downloads", label: "Client Project" },
  { id: "youtube", label: "YouTube" },
  { id: "ongoing", label: "Ongoing Projects" },
  { id: "why", label: "Why Phronix" },
  { id: "powerhouse", label: "Powerhouse" },
  { id: "about", label: "About Phronix" },
  { id: "contact", label: "Contact" },
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

          <button
            className="btn btn--outline btn--sm"
            onClick={logout}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`admin-tabs__btn ${
                tab === t.id ? "admin-tabs__btn--active" : ""
              }`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "logo" && <LogoPanel />}
        {tab === "homeStats" && <HomeStatsPanel />}
        {tab === "projects" && <ProjectsPanel />}
        {tab === "team" && <TeamPanel />}
        {tab === "services" && <ServicesPanel />}
        {tab === "testimonials" && <TestimonialsPanel />}
        {tab === "careers" && <CareersPanel />}
        {tab === "downloads" && <DownloadsPanel />}
        {tab === "youtube" && <YoutubePanel />}
        {tab === "ongoing" && <OngoingPanel />}
        {tab === "why" && <WhyPanel />}
        {tab === "powerhouse" && <PowerhousePanel />}
        {tab === "about" && <AboutPanel />}
        {tab === "contact" && <ContactPanel />}
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
    apiFetch("/settings")
      .then((d) => setSettings(d.settings))
      .catch(() => {});
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

      const data = await apiFetch("/settings/logo", {
        method: "PUT",
        body: form,
      });

      setSettings(data.settings);
      setFile(null);
      setPreview("");
      setStatus("Logo updated.");
    } catch (err) {
      setStatus(err.message);
    }
  }

  const currentUrl =
    preview ||
    (settings.logoUrl
      ? `${API.replace(/\/api$/, "")}${settings.logoUrl}`
      : "");

  return (
    <div className="card admin-panel">
      <h3>Site logo</h3>

      {currentUrl && (
        <img
          src={currentUrl}
          alt="Site logo"
          className="admin-panel__logo-preview"
        />
      )}

      <div className="admin-panel__row">
        <input
          type="file"
          accept="image/*"
          onChange={onPick}
        />

        <button
          className="btn btn--gold btn--sm"
          onClick={onUpload}
          disabled={!file}
        >
          <Upload size={16} />
          Upload
        </button>
      </div>

      {status && (
        <p className="admin-panel__status">
          {status}
        </p>
      )}
    </div>
  );
}

// ── Homepage Stats (the "40+" projects counter + heading) ──────────

function HomeStatsPanel() {
  const [form, setForm] = useState({
    statNumber: "40+",
    title: "Real-World Projects Built by Aspiring Developers",
    description:
      "From final-year submissions to portfolio-ready builds — practical, industry-style projects crafted to help students learn by doing.",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm({
          statNumber: d.settings?.statNumber || "40+",
          title:
            d.settings?.projectsTitle ||
            "Real-World Projects Built by Aspiring Developers",
          description:
            d.settings?.projectsDescription ||
            "From final-year submissions to portfolio-ready builds — practical, industry-style projects crafted to help students learn by doing.",
        });
      })
      .catch(() => {
        // Backend endpoint isn't ready yet — keep the defaults shown above.
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");

    try {
      await apiFetch("/settings/home-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) {
    return <p className="admin-panel__status">Loading…</p>;
  }

  return (
    <div className="card admin-panel">
      <h3>Homepage — "40+" stat section</h3>

      {status && (
        <p className="admin-panel__status">
          {status}
        </p>
      )}

      <label className="admin-field">
        <span>Stat number (e.g. 40+)</span>

        <input
          value={form.statNumber}
          onChange={(e) =>
            setForm({
              ...form,
              statNumber: e.target.value,
            })
          }
        />
      </label>

      <label className="admin-field">
        <span>Title</span>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </label>

      <label className="admin-field">
        <span>Description</span>

        <textarea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
      </label>

      <button
        className="btn btn--gold btn--sm"
        onClick={save}
      >
        <Upload size={16} />
        Save
      </button>
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
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

 function load() {
  apiFetch("/projects")
    .then((d) => {
      setItems(d.projects || []);
      setStatus("");
    })
    .catch((err) => {
      console.error("Projects load error:", err);
      setStatus(err.message);
    });
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

      Object.entries(form).forEach(([k, v]) => {
        body.append(k, v);
      });

      if (file) {
        body.append("image", file);
      }

      if (editing === "new") {
        await apiFetch("/projects", {
          method: "POST",
          body,
        });
      } else {
        await apiFetch(`/projects/${editing}`, {
          method: "PUT",
          body,
        });
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
      await apiFetch(`/projects/${id}`, {
        method: "DELETE",
      });

      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-panel">

      <div className="admin-panel__toolbar">
        <button
          className="btn btn--gold btn--sm"
          onClick={startNew}
        >
          <Plus size={16} />
          Add project
        </button>
      </div>

      {editing && (
        <div className="card admin-form">

          <div className="admin-form__head">
            <h3>
              {editing === "new"
                ? "New project"
                : "Edit project"}
            </h3>

            <button
              className="admin-form__close"
              onClick={() => setEditing(null)}
            >
              <X size={18} />
            </button>
          </div>

          {status && (
            <p className="admin-panel__status">
              {status}
            </p>
          )}

          <label className="admin-field">
            <span>Name</span>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Category</span>

            <input
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Description</span>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>
              Technologies (comma separated)
            </span>

            <input
              value={form.technologies}
              onChange={(e) =>
                setForm({
                  ...form,
                  technologies: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>GitHub URL</span>

            <input
              value={form.githubUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  githubUrl: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>Demo URL</span>

            <input
              value={form.demoUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  demoUrl: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field admin-field--row">
            <input
              type="checkbox"
              checked={form.ongoing}
              onChange={(e) =>
                setForm({
                  ...form,
                  ongoing: e.target.checked,
                })
              }
            />

            <span>Ongoing project</span>
          </label>

          <label className="admin-field">
            <span>Order</span>

            <input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm({
                  ...form,
                  order: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>Image</span>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
          </label>

          <button
            className="btn btn--gold btn--block"
            onClick={save}
          >
            Save
          </button>

        </div>
      )}

      <div className="admin-list">

        {items.map((p) => (
          <div
            className="admin-list__row"
            key={p.id}
          >

            <img
              src={
                p.image?.startsWith("http") ||
                p.image?.startsWith("/uploads")
                  ? `${API.replace(/\/api$/, "")}${
                      p.image.startsWith("/uploads")
                        ? p.image
                        : ""
                    }` || p.image
                  : p.image
              }
              alt=""
              className="admin-list__thumb"
              onError={(e) => {
                e.currentTarget.style.visibility =
                  "hidden";
              }}
            />

            <div className="admin-list__info">
              <strong>{p.name}</strong>

              <span>
                {p.category}
                {p.ongoing
                  ? " · Ongoing"
                  : ""}
              </span>
            </div>

            <div className="admin-list__actions">

              <button
                className="btn btn--outline btn--sm"
                onClick={() => startEdit(p)}
              >
                <Pencil size={14} />
              </button>

              <button
                className="btn btn--outline btn--sm"
                onClick={() => remove(p.id)}
              >
                <Trash2 size={14} />
              </button>

            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="admin-panel__status">
            No projects yet.
          </p>
        )}

      </div>
    </div>
  );
}

// ── Team ─────────────────────────────────────────────────────────

const emptyMember = {
  name: "",
  role: "",
  bio: "",
  skills: "",
  linkedin: "",
  github: "",
  order: 0,
};

function TeamPanel() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  function load() {
    apiFetch("/team")
      .then((d) => setItems(d.team))
      .catch(() => {});
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

      Object.entries(form).forEach(([k, v]) => {
        body.append(k, v);
      });

      if (file) {
        body.append("image", file);
      }

      if (editing === "new") {
        await apiFetch("/team", {
          method: "POST",
          body,
        });
      } else {
        await apiFetch(`/team/${editing}`, {
          method: "PUT",
          body,
        });
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
      await apiFetch(`/team/${id}`, {
        method: "DELETE",
      });

      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-panel">

      <div className="admin-panel__toolbar">
        <button
          className="btn btn--gold btn--sm"
          onClick={startNew}
        >
          <Plus size={16} />
          Add team member
        </button>
      </div>

      {editing && (
        <div className="card admin-form">

          <div className="admin-form__head">
            <h3>
              {editing === "new"
                ? "New team member"
                : "Edit team member"}
            </h3>

            <button
              className="admin-form__close"
              onClick={() => setEditing(null)}
            >
              <X size={18} />
            </button>
          </div>

          {status && (
            <p className="admin-panel__status">
              {status}
            </p>
          )}

          <label className="admin-field">
            <span>Name</span>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Role</span>

            <input
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Bio</span>

            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) =>
                setForm({
                  ...form,
                  bio: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>
              Skills (comma separated)
            </span>

            <input
              value={form.skills}
              onChange={(e) =>
                setForm({
                  ...form,
                  skills: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>LinkedIn URL</span>

            <input
              value={form.linkedin}
              onChange={(e) =>
                setForm({
                  ...form,
                  linkedin: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>GitHub URL</span>

            <input
              value={form.github}
              onChange={(e) =>
                setForm({
                  ...form,
                  github: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>Order</span>

            <input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm({
                  ...form,
                  order: e.target.value,
                })
              }
            />
          </label>

          <label className="admin-field">
            <span>Photo</span>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />
          </label>

          <button
            className="btn btn--gold btn--block"
            onClick={save}
          >
            Save
          </button>

        </div>
      )}

      <div className="admin-list">

        {items.map((m) => (
          <div
            className="admin-list__row"
            key={m.id}
          >

            <div className="admin-list__info">
              <strong>{m.name}</strong>
              <span>{m.role}</span>
            </div>

            <div className="admin-list__actions">

              <button
                className="btn btn--outline btn--sm"
                onClick={() => startEdit(m)}
              >
                <Pencil size={14} />
              </button>

              <button
                className="btn btn--outline btn--sm"
                onClick={() => remove(m.id)}
              >
                <Trash2 size={14} />
              </button>

            </div>

          </div>
        ))}

        {items.length === 0 && (
          <p className="admin-panel__status">
            No team members yet.
          </p>
        )}

      </div>
    </div>
  );
}

// ── Generic CRUD panel ──────────────────────────────────────────────
// Services, Testimonials, Careers, Downloads, and YouTube all follow the
// same shape (plain JSON fields, no image upload), so they share this one
// implementation instead of five near-identical copies.
//
// field.type: "text" | "textarea" | "number" | "checkbox" | "csv" (comma
// separated list, stored as an array server-side) | "lines" (one item per
// line, stored as an array server-side) | "password" (optional — blank
// means "leave unchanged").

function GenericPanel({
  basePath,
  listKey,
  emptyItem,
  fields,
  addLabel,
  emptyLabel,
  formTitle,
  rowLabel,
  rowSub,
}) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [status, setStatus] = useState("");

  function load() {
    apiFetch(basePath)
      .then((d) => setItems(d[listKey] || []))
      .catch((err) => {
        console.error(`${basePath} load error:`, err);
        setStatus(err.message);
      });
  }

  useEffect(load, []);

  function toFormValue(field, item) {
    const raw = item[field.key];
    if (field.type === "csv") return Array.isArray(raw) ? raw.join(", ") : raw || "";
    if (field.type === "lines") return Array.isArray(raw) ? raw.join("\n") : raw || "";
    if (field.type === "checkbox") return Boolean(raw);
    if (field.type === "password") return "";
    return raw ?? "";
  }

  function startNew() {
    setForm(emptyItem);
    setStatus("");
    setEditing("new");
  }

  function startEdit(item) {
    const next = { ...emptyItem };
    fields.forEach((f) => {
      next[f.key] = toFormValue(f, item);
    });
    setForm(next);
    setStatus("");
    setEditing(item.id);
  }

  async function save() {
    setStatus("Saving…");

    try {
      const body = {};
      fields.forEach((f) => {
        body[f.key] = form[f.key];
      });

      if (editing === "new") {
        await apiFetch(basePath, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch(`${basePath}/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      setEditing(null);
      setStatus("");
      load();
    } catch (err) {
      setStatus(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this entry?")) return;

    try {
      await apiFetch(`${basePath}/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="admin-panel">

      <div className="admin-panel__toolbar">
        <button className="btn btn--gold btn--sm" onClick={startNew}>
          <Plus size={16} />
          {addLabel}
        </button>
      </div>

      {editing && (
        <div className="card admin-form">

          <div className="admin-form__head">
            <h3>{editing === "new" ? `New ${formTitle}` : `Edit ${formTitle}`}</h3>

            <button className="admin-form__close" onClick={() => setEditing(null)}>
              <X size={18} />
            </button>
          </div>

          {status && <p className="admin-panel__status">{status}</p>}

          {fields.map((f) => {
            if (f.type === "checkbox") {
              return (
                <label className="admin-field admin-field--row" key={f.key}>
                  <input
                    type="checkbox"
                    checked={Boolean(form[f.key])}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                  />
                  <span>{f.label}</span>
                </label>
              );
            }

            if (f.type === "textarea" || f.type === "lines") {
              return (
                <label className="admin-field" key={f.key}>
                  <span>{f.label}</span>
                  <textarea
                    rows={f.type === "lines" ? 4 : 3}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.required}
                  />
                </label>
              );
            }

            return (
              <label className="admin-field" key={f.key}>
                <span>{f.label}</span>
                <input
                  type={f.type === "number" ? "number" : f.type === "password" ? "text" : "text"}
                  placeholder={f.placeholder}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required={f.required}
                />
              </label>
            );
          })}

          <button className="btn btn--gold btn--block" onClick={save}>
            Save
          </button>

        </div>
      )}

      <div className="admin-list">

        {items.map((item) => (
          <div className="admin-list__row" key={item.id}>
            <div className="admin-list__info">
              <strong>{rowLabel(item)}</strong>
              <span>{rowSub ? rowSub(item) : ""}</span>
            </div>

            <div className="admin-list__actions">
              <button className="btn btn--outline btn--sm" onClick={() => startEdit(item)}>
                <Pencil size={14} />
              </button>

              <button className="btn btn--outline btn--sm" onClick={() => remove(item.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && <p className="admin-panel__status">{emptyLabel}</p>}

      </div>
    </div>
  );
}

// ── Services ─────────────────────────────────────────────────────

const emptyService = {
  name: "",
  icon: "",
  shortDescription: "",
  technologies: "",
  priceRange: "",
  order: 0,
};

function ServicesPanel() {
  return (
    <GenericPanel
      basePath="/services"
      listKey="services"
      emptyItem={emptyService}
      addLabel="Add service"
      emptyLabel="No services yet."
      formTitle="service"
      rowLabel={(s) => s.name}
      rowSub={(s) => s.price_range || ""}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "icon", label: "Icon (lucide icon name, e.g. Globe)", type: "text" },
        { key: "shortDescription", label: "Short description", type: "textarea" },
        { key: "technologies", label: "Technologies (comma separated)", type: "csv" },
        { key: "priceRange", label: "Price range", type: "text", placeholder: "₹5,999 – ₹9,999" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── Testimonials ─────────────────────────────────────────────────

const emptyTestimonial = {
  clientName: "",
  company: "",
  logo: "",
  projectCompleted: "",
  designation: "",
  rating: 5,
  feedback: "",
  order: 0,
};

function TestimonialsPanel() {
  return (
    <GenericPanel
      basePath="/testimonials"
      listKey="testimonials"
      emptyItem={emptyTestimonial}
      addLabel="Add testimonial"
      emptyLabel="No testimonials yet."
      formTitle="testimonial"
      rowLabel={(t) => t.client_name}
      rowSub={(t) => t.company || ""}
      fields={[
        { key: "clientName", label: "Client name", type: "text", required: true },
        { key: "company", label: "Company", type: "text" },
        { key: "logo", label: "Logo URL", type: "text" },
        { key: "projectCompleted", label: "Project completed", type: "text" },
        { key: "designation", label: "Designation", type: "text" },
        { key: "rating", label: "Rating (1–5)", type: "number" },
        { key: "feedback", label: "Feedback", type: "textarea" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── Careers ──────────────────────────────────────────────────────

const emptyCareer = {
  title: "",
  slug: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  experience: "",
  description: "",
  responsibilities: "",
  requirements: "",
  skills: "",
  application_email: "",
  is_open: true,
  order: 0,
};

function CareersPanel() {
  return (
    <GenericPanel
      basePath="/careers"
      listKey="careers"
      emptyItem={emptyCareer}
      addLabel="Add role"
      emptyLabel="No open roles yet."
      formTitle="role"
      rowLabel={(c) => c.title}
      rowSub={(c) => `${c.department || ""}${c.is_open ? "" : " · Closed"}`}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "Slug (unique, used in the URL)", type: "text", required: true },
        { key: "department", label: "Department", type: "text" },
        { key: "location", label: "Location", type: "text" },
        { key: "employment_type", label: "Employment type", type: "text", placeholder: "Full-time / Internship" },
        { key: "experience", label: "Experience required", type: "text", placeholder: "Fresher / 2+ years" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "responsibilities", label: "Responsibilities (one per line)", type: "lines" },
        { key: "requirements", label: "Requirements (one per line)", type: "lines" },
        { key: "skills", label: "Skills (comma separated)", type: "csv" },
        { key: "application_email", label: "Application email (optional)", type: "text" },
        { key: "is_open", label: "Role is open", type: "checkbox" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── Downloads ────────────────────────────────────────────────────

const emptyDownload = {
  slug: "",
  name: "",
  description: "",
  version: "",
  filename: "",
  requiresAuth: true,
  password: "",
  order: 0,
};

function DownloadsPanel() {
  return (
    <GenericPanel
      basePath="/downloads"
      listKey="downloads"
      emptyItem={emptyDownload}
      addLabel="Add download"
      emptyLabel="No downloadable projects yet."
      formTitle="download"
      rowLabel={(d) => d.name}
      rowSub={(d) => `${d.version || ""}${d.hasPassword ? " · Password protected" : ""}`}
      fields={[
        { key: "slug", label: "Slug (unique, used in the URL)", type: "text", required: true },
        { key: "name", label: "Name", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "version", label: "Version", type: "text", placeholder: "v1.0.0" },
        {
          key: "filename",
          label: "Filename on server (inside PROTECTED_FILES_DIR)",
          type: "text",
          placeholder: "project-v1.0.0.zip",
        },
        { key: "requiresAuth", label: "Require visitor sign-in to download", type: "checkbox" },
        {
          key: "password",
          label: "Password (leave blank to keep the current one / no password)",
          type: "password",
        },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── YouTube ──────────────────────────────────────────────────────

const emptyVideo = {
  title: "",
  thumbnail: "",
  url: "",
  order: 0,
};

function YoutubePanel() {
  return (
    <GenericPanel
      basePath="/youtube"
      listKey="videos"
      emptyItem={emptyVideo}
      addLabel="Add video"
      emptyLabel="No videos yet."
      formTitle="video"
      rowLabel={(v) => v.title}
      rowSub={(v) => v.url || ""}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "thumbnail", label: "Thumbnail URL", type: "text" },
        { key: "url", label: "YouTube URL", type: "text", required: true },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── Ongoing Projects ─────────────────────────────────────────────

const emptyOngoing = {
  name: "",
  image: "",
  description: "",
  status: "Planning",
  technologies: "",
  startDate: "",
  expectedCompletion: "",
  order: 0,
};

function OngoingPanel() {
  return (
    <GenericPanel
      basePath="/ongoing-projects"
      listKey="items"
      emptyItem={emptyOngoing}
      addLabel="Add ongoing project"
      emptyLabel="No ongoing projects yet."
      formTitle="ongoing project"
      rowLabel={(o) => o.name}
      rowSub={(o) => o.status || ""}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        {
          key: "image",
          label: "Image URL",
          type: "text",
          placeholder: "/assets/placeholder-project.svg",
        },
        { key: "description", label: "Description", type: "textarea", required: true },
        {
          key: "status",
          label: "Status (Planning / In Development / Testing / Near Completion)",
          type: "text",
        },
        { key: "technologies", label: "Technologies (comma separated)", type: "csv" },
        { key: "startDate", label: "Start date", type: "text", placeholder: "2026-03-01" },
        { key: "expectedCompletion", label: "Expected completion", type: "text", placeholder: "2026-09-30" },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}


// ── Why Phronix (intro text + feature cards) ───────────────────────

function WhyPanel() {
  return (
    <div className="admin-panel">
      <WhyIntroPanel />
      <WhyFeaturesPanel />
    </div>
  );
}

function WhyIntroPanel() {
  const [form, setForm] = useState({
    title: "Built Right, Built to Last.",
    description:
      "Every engagement gets senior engineering attention, transparent communication, and code you actually own — no black boxes, no hand-offs to juniors mid-project.",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm({
          title: d.settings?.whyTitle || "Built Right, Built to Last.",
          description:
            d.settings?.whyDescription ||
            "Every engagement gets senior engineering attention, transparent communication, and code you actually own — no black boxes, no hand-offs to juniors mid-project.",
        });
      })
      .catch(() => {
        // Backend endpoint isn'''t ready yet — keep the defaults shown above.
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");

    try {
      await apiFetch("/settings/why-intro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) {
    return <p className="admin-panel__status">Loading…</p>;
  }

  return (
    <div className="card admin-panel">
      <h3>"Why Phronix?" — heading &amp; intro</h3>

      {status && (
        <p className="admin-panel__status">
          {status}
        </p>
      )}

      <label className="admin-field">
        <span>Title</span>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </label>

      <label className="admin-field">
        <span>Description</span>

        <textarea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
      </label>

      <button
        className="btn btn--gold btn--sm"
        onClick={save}
      >
        <Upload size={16} />
        Save
      </button>
    </div>
  );
}

const emptyWhyFeature = {
  title: "",
  description: "",
  icon: "",
  order: 0,
};

function WhyFeaturesPanel() {
  return (
    <GenericPanel
      basePath="/why-features"
      listKey="features"
      emptyItem={emptyWhyFeature}
      addLabel="Add feature card"
      emptyLabel="No feature cards yet."
      formTitle="feature card"
      rowLabel={(f) => f.title}
      rowSub={(f) => f.icon || ""}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        {
          key: "icon",
          label: "Icon (lucide icon name, e.g. Layers, Gauge, ShieldCheck)",
          type: "text",
        },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}

// ── Powerhouse ("Everything You Need, Built Right In") ─────────────

function PowerhousePanel() {
  return (
    <div className="admin-panel">
      <PowerhouseCardsPanel />
      <PowerhouseTrioPanel />
    </div>
  );
}

// Form 1 — Box 1 (Fast Project Kickoffs) + Box 2 (Integrated Tech Stack)
function PowerhouseCardsPanel() {
  const [form, setForm] = useState({
    card1Title: "Fast Project Kickoffs",
    card1Description:
      "Save weeks of setup. We spin up a production-ready boilerplate so your idea starts shipping from day one.",
    card2Title: "Integrated Tech Stack",
    card2Description:
      "Every tool you need — no extra cost, no hassle. Battle-tested integrations, ready out of the box.",
    stackItems: "PostgreSQL, AWS, Docker, Node.js, CI / CD, React Native",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm((f) => ({
          card1Title: d.settings?.powerhouseCard1Title || f.card1Title,
          card1Description: d.settings?.powerhouseCard1Description || f.card1Description,
          card2Title: d.settings?.powerhouseCard2Title || f.card2Title,
          card2Description: d.settings?.powerhouseCard2Description || f.card2Description,
          stackItems: d.settings?.powerhouseStackItems || f.stackItems,
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");
    try {
      await apiFetch("/settings/powerhouse-cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) return <p className="admin-panel__status">Loading…</p>;

  return (
    <div className="card admin-panel">
      <h3>Powerhouse — Box 1 &amp; Box 2</h3>
      {status && <p className="admin-panel__status">{status}</p>}

      <label className="admin-field">
        <span>Box 1 title (Fast Project Kickoffs)</span>
        <input value={form.card1Title} onChange={(e) => setForm({ ...form, card1Title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 1 description</span>
        <textarea rows={2} value={form.card1Description} onChange={(e) => setForm({ ...form, card1Description: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 2 title (Integrated Tech Stack)</span>
        <input value={form.card2Title} onChange={(e) => setForm({ ...form, card2Title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 2 description</span>
        <textarea rows={2} value={form.card2Description} onChange={(e) => setForm({ ...form, card2Description: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 2 tech stack items (comma separated)</span>
        <input value={form.stackItems} onChange={(e) => setForm({ ...form, stackItems: e.target.value })} placeholder="PostgreSQL, AWS, Docker, Node.js, CI / CD, React Native" />
      </label>

      <button className="btn btn--gold btn--sm" onClick={save}>
        <Upload size={16} />
        Save
      </button>
    </div>
  );
}

// Form 2 — Box 3 (Pick Your Stack), Box 4 (Structured Page Builder), Box 5 (SEO-Ready & Blazing Fast)
function PowerhouseTrioPanel() {
  const [form, setForm] = useState({
    box3Title: "Pick Your Stack",
    box3Description: "Choose the frameworks and integrations that fit your product — nothing forced, nothing locked in.",
    box4Title: "Structured Page Builder",
    box4Description: "Every page follows a clean header–content–footer architecture, easy to extend as you grow.",
    box5Title: "SEO-Ready & Blazing Fast",
    box5Description: "Built for speed and top scores on Core Web Vitals — no extra optimization work needed.",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm((f) => ({
          box3Title: d.settings?.powerhouseBox3Title || f.box3Title,
          box3Description: d.settings?.powerhouseBox3Description || f.box3Description,
          box4Title: d.settings?.powerhouseBox4Title || f.box4Title,
          box4Description: d.settings?.powerhouseBox4Description || f.box4Description,
          box5Title: d.settings?.powerhouseBox5Title || f.box5Title,
          box5Description: d.settings?.powerhouseBox5Description || f.box5Description,
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");
    try {
      await apiFetch("/settings/powerhouse-trio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) return <p className="admin-panel__status">Loading…</p>;

  return (
    <div className="card admin-panel">
      <h3>Powerhouse — Box 3, 4 &amp; 5</h3>
      {status && <p className="admin-panel__status">{status}</p>}

      <label className="admin-field">
        <span>Box 3 title (Pick Your Stack)</span>
        <input value={form.box3Title} onChange={(e) => setForm({ ...form, box3Title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 3 description</span>
        <textarea rows={2} value={form.box3Description} onChange={(e) => setForm({ ...form, box3Description: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 4 title (Structured Page Builder)</span>
        <input value={form.box4Title} onChange={(e) => setForm({ ...form, box4Title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 4 description</span>
        <textarea rows={2} value={form.box4Description} onChange={(e) => setForm({ ...form, box4Description: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 5 title (SEO-Ready &amp; Blazing Fast)</span>
        <input value={form.box5Title} onChange={(e) => setForm({ ...form, box5Title: e.target.value })} />
      </label>

      <label className="admin-field">
        <span>Box 5 description</span>
        <textarea rows={2} value={form.box5Description} onChange={(e) => setForm({ ...form, box5Description: e.target.value })} />
      </label>

      <button className="btn btn--gold btn--sm" onClick={save}>
        <Upload size={16} />
        Save
      </button>
    </div>
  );
}

// ── Contact (Email, Phone, Address, GST Number) ─────────────────────

function ContactPanel() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    gstNumber: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm((f) => ({
          email: d.settings?.email || f.email,
          phone: d.settings?.phone || f.phone,
          addressLine1: d.settings?.addressLine1 || f.addressLine1,
          addressLine2: d.settings?.addressLine2 || f.addressLine2,
          gstNumber: d.settings?.gstNumber || f.gstNumber,
        }));
      })
      .catch(() => {
        // Backend endpoint isn't ready yet — keep the defaults shown above.
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");

    try {
      await apiFetch("/settings/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) {
    return <p className="admin-panel__status">Loading…</p>;
  }

  return (
    <div className="card admin-panel">
      <h3>Contact details</h3>

      {status && (
        <p className="admin-panel__status">
          {status}
        </p>
      )}

      <label className="admin-field">
        <span>Email</span>

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          placeholder="hello@phronix.io"
        />
      </label>

      <label className="admin-field">
        <span>Phone number</span>

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          placeholder="+91 90000 00000"
        />
      </label>

      <label className="admin-field">
        <span>Address — line 1</span>

        <input
          value={form.addressLine1}
          onChange={(e) =>
            setForm({
              ...form,
              addressLine1: e.target.value,
            })
          }
          placeholder="4th Floor, Prism Business Park"
        />
      </label>

      <label className="admin-field">
        <span>Address — line 2</span>

        <input
          value={form.addressLine2}
          onChange={(e) =>
            setForm({
              ...form,
              addressLine2: e.target.value,
            })
          }
          placeholder="College Road, Nashik, Maharashtra 422005"
        />
      </label>

      <label className="admin-field">
        <span>GST Number</span>

        <input
          value={form.gstNumber}
          onChange={(e) =>
            setForm({
              ...form,
              gstNumber: e.target.value,
            })
          }
          placeholder="27ABCDE1234F1Z5"
        />
      </label>

      <button
        className="btn btn--gold btn--sm"
        onClick={save}
      >
        <Upload size={16} />
        Save
      </button>
    </div>
  );
}


// ── About Phronix (heading + description + 3 point cards) ───────────

function AboutPanel() {
  return (
    <div className="admin-panel">
      <AboutIntroPanel />
      <AboutPointsPanel />
    </div>
  );
}

function AboutIntroPanel() {
  const [form, setForm] = useState({
    title: "A small studio, deliberately.",
    description:
      "We keep the team small so every project gets senior attention — from the first architecture decision to the last production deploy. We work across web, mobile, cloud, and AI, but the discipline stays the same: understand the problem before writing a line of code.",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/settings")
      .then((d) => {
        setForm({
          title: d.settings?.aboutTitle || "A small studio, deliberately.",
          description:
            d.settings?.aboutDescription ||
            "We keep the team small so every project gets senior attention — from the first architecture decision to the last production deploy. We work across web, mobile, cloud, and AI, but the discipline stays the same: understand the problem before writing a line of code.",
        });
      })
      .catch(() => {
        // Backend endpoint isn't ready yet — keep the defaults shown above.
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setStatus("Saving…");

    try {
      await apiFetch("/settings/about-intro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Backend not connected yet.");
    }
  }

  if (loading) {
    return <p className="admin-panel__status">Loading…</p>;
  }

  return (
    <div className="card admin-panel">
      <h3>"About Phronix" — heading &amp; intro</h3>

      {status && (
        <p className="admin-panel__status">
          {status}
        </p>
      )}

      <label className="admin-field">
        <span>Title</span>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </label>

      <label className="admin-field">
        <span>Description</span>

        <textarea
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
      </label>

      <button
        className="btn btn--gold btn--sm"
        onClick={save}
      >
        <Upload size={16} />
        Save
      </button>
    </div>
  );
}

const emptyAboutPoint = {
  eyebrow: "",
  title: "",
  description: "",
  order: 0,
};

function AboutPointsPanel() {
  return (
    <GenericPanel
      basePath="/about-points"
      listKey="points"
      emptyItem={emptyAboutPoint}
      addLabel="Add point"
      emptyLabel="No points yet."
      formTitle="point"
      rowLabel={(p) => p.title}
      rowSub={(p) => p.eyebrow || ""}
      fields={[
        { key: "eyebrow", label: "Label (e.g. PHX / 01)", type: "text" },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "order", label: "Order", type: "number" },
      ]}
    />
  );
}