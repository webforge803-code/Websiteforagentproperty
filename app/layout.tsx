import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Semak jika pengguna bukan admin – jika ya, redirect ke halaman login
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell admin">
      <aside className="sidebar">
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 25 }}>
          Property Admin
        </div>
        <a href="/admin">Dashboard</a>
        <a href="/admin/properties">Properties</a>
        <a href="/admin/leads">Leads</a>
        <a href="/admin/settings">Settings</a>
        <form action="/api/admin/logout" method="post">
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 20 }}>
            Logout
          </button>
        </form>
      </aside>
      <section className="admin-main">{children}</section>
    </div>
  );
}
