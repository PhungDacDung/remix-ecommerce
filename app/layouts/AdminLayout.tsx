import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration
} from "@remix-run/react";
import { useEffect } from "react";
import NavbarAdmin from "~/components/admin/NavbarAdmin";
import SidebarAdmin from "~/components/admin/SidebarAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';

// Khai báo CSS và các link stylesheet
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" },
  { rel: "stylesheet", href: "/admin/lib/owlcarousel/assets/owl.carousel.min.css" },
  { rel: "stylesheet", href: "/admin/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" },
  { rel: "stylesheet", href: "/admin/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/admin/css/style.css" },
];

export default  function AdminLayout({ children }: { children: React.ReactNode }) {
  console.log("layout");
  useEffect(() => {
    // Nhúng các script khi layout được render
    const scripts = [
      "/admin/lib/chart/chart.min.js",
      "/admin/lib/easing/easing.min.js",
      "/admin/lib/waypoints/waypoints.min.js",
      "/admin/lib/owlcarousel/owl.carousel.min.js",
      "/admin/lib/tempusdominus/js/moment.min.js",
      "/admin/lib/tempusdominus/js/moment-timezone.min.js",
      "/admin/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"
    ];

    const scriptElements = scripts.map((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Đảm bảo các script được thực thi theo thứ tự
      document.body.appendChild(script);
      script.onload = () => console.log(`Script loaded: ${src}`);
      return script;
    });

    // Khắc phục xung đột jQuery UI tooltip với Bootstrap tooltip
    const resolveConflictScript = document.createElement("script");
    resolveConflictScript.innerHTML = `$.widget.bridge('uibutton', $.ui.button);`;
    document.body.appendChild(resolveConflictScript);

    // Cleanup scripts khi component bị hủy
    return () => {
      scriptElements.forEach((script) => document.body.removeChild(script));
      document.body.removeChild(resolveConflictScript);
    };
  }, []);


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body >
      <div className="container-xxl position-relative bg-white d-flex p-0">
          <SidebarAdmin />
          <div className="content">
          <NavbarAdmin />
          {children}
          <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />


        {/* External Scripts */}
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>

        {/* Local Scripts */}
        <script src="/admin/lib/chart/chart.min.js"></script>
        <script src="/admin/lib/easing/easing.min.js"></script>
        <script src="/admin/lib/waypoints/waypoints.min.js"></script>
        <script src="/admin/lib/owlcarousel/owl.carousel.min.js"></script>
        <script src="/admin/lib/tempusdominus/js/moment.min.js"></script>
        <script src="/admin/lib/tempusdominus/js/moment-timezone.min.js"></script>
        <script src="/admin/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

        {/* Main Script */}
        <script src="/admin/js/main.js"></script>

      </body>
    </html>

  );
}

/* export default function App() {

  console.log("Admin layout");

  useEffect(() => {
    // Nhúng các script khi layout được render
    const scripts = [
      "/admin/lib/chart/chart.min.js",
      "/admin/lib/easing/easing.min.js",
      "/admin/lib/waypoints/waypoints.min.js",
      "/admin/lib/owlcarousel/owl.carousel.min.js",
      "/admin/lib/tempusdominus/js/moment.min.js",
      "/admin/lib/tempusdominus/js/moment-timezone.min.js",
      "/admin/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"
    ];

    const scriptElements = scripts.map((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Đảm bảo các script được thực thi theo thứ tự
      document.body.appendChild(script);
      script.onload = () => console.log(`Script loaded: ${src}`);
      return script;
    });

    // Khắc phục xung đột jQuery UI tooltip với Bootstrap tooltip
    const resolveConflictScript = document.createElement("script");
    resolveConflictScript.innerHTML = `$.widget.bridge('uibutton', $.ui.button);`;
    document.body.appendChild(resolveConflictScript);

    // Cleanup scripts khi component bị hủy
    return () => {
      scriptElements.forEach((script) => document.body.removeChild(script));
      document.body.removeChild(resolveConflictScript);
    };
  }, []);
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
          <NavbarAdmin />
          <SidebarAdmin />
          <Outlet />

        </div>
  )

} */
