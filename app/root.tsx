import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { getUser } from "./services/session.server";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer} from 'react-toastify';




export const links: LinksFunction = () => [
  // Preconnect for Google Fonts
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },

  // Google Fonts
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" },

  // External CSS files
  { rel: "stylesheet", href: "/css/open-iconic-bootstrap.min.css" },
  { rel: "stylesheet", href: "/css/animate.css" },
  { rel: "stylesheet", href: "/css/owl.carousel.min.css" },
  { rel: "stylesheet", href: "/css/owl.theme.default.min.css" },
  { rel: "stylesheet", href: "/css/magnific-popup.css" },
  { rel: "stylesheet", href: "/css/aos.css" },
  { rel: "stylesheet", href: "/css/ionicons.min.css" },
  { rel: "stylesheet", href: "/css/bootstrap-datepicker.css" },
  { rel: "stylesheet", href: "/css/jquery.timepicker.css" },
  { rel: "stylesheet", href: "/css/flaticon.css" },
  { rel: "stylesheet", href: "/css/icomoon.css" },
  { rel: "stylesheet", href: "/css/style.css" },

  /* admin */

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

export function Layout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Minishop</title>

      </head>
      <body className="goto-here">
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload/> */}

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>

        <script src="/js/jquery.min.js"></script>
        <script src="/js/jquery-migrate-3.0.1.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/jquery.easing.1.3.js"></script>
        <script src="/js/jquery.waypoints.min.js"></script>
        <script src="/js/jquery.stellar.min.js"></script>
        <script src="/js/owl.carousel.min.js"></script>
        <script src="/js/jquery.magnific-popup.min.js"></script>
        <script src="/js/aos.js"></script>
        <script src="/js/jquery.animateNumber.min.js"></script>
        <script src="/js/bootstrap-datepicker.js"></script>
        <script src="/js/scrollax.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
        <script src="/js/google-map.js"></script>
        <script src="/js/main.js"></script>

      </body>
    </html>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
 /*  useEffect(() => {
    // Load các script của bạn
    const scripts = [
      "/js/jquery.min.js",
      "/js/jquery-migrate-3.0.1.min.js",
      "/js/popper.min.js",
      "/js/bootstrap.min.js",
      "/js/jquery.easing.1.3.js",
      "/js/jquery.waypoints.min.js",
      "/js/jquery.stellar.min.js",
      "/js/owl.carousel.min.js",
      "/js/jquery.magnific-popup.min.js",
      "/js/aos.js",
      "/js/jquery.animateNumber.min.js",
      "/js/bootstrap-datepicker.js",
      "/js/scrollax.min.js",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false",
      "/js/google-map.js",
      "/js/main.js",

      
    ];

    scripts.forEach((scriptSrc) => {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      //  script.onload = () => console.log(`Script loaded: ${scriptSrc}`);
      document.body.appendChild(script);

      // Cleanup: Remove script when component unmounts
      return () => document.body.removeChild(script);
    });
  }, []); */

   useEffect(() => {
    // Nhúng các script khi layout được render
    const scripts = [
      "/js/jquery.min.js",
      "/js/jquery-migrate-3.0.1.min.js",
      "/js/popper.min.js",
      "/js/bootstrap.min.js",
      "/js/jquery.easing.1.3.js",
      "/js/jquery.waypoints.min.js",
      "/js/jquery.stellar.min.js",
      "/js/owl.carousel.min.js",
      "/js/jquery.magnific-popup.min.js",
      "/js/aos.js",
      "/js/jquery.animateNumber.min.js",
      "/js/bootstrap-datepicker.js",
      "/js/scrollax.min.js",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false",
      "/js/google-map.js",
      "/js/main.js",
    ];

    const scriptElements = scripts.map((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Đảm bảo các script được thực thi theo thứ tự
      document.body.appendChild(script);
      // script.onload = () => console.log(`Script loaded: ${src}`);
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


  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar/>}
      <Outlet/>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
      {!isAdminRoute && <Footer/>}

  
      {/* Loading */}

      <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px">
        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee" />
        <circle className="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10"
          stroke="#F96D00" />
      </svg></div>

    </>
  );
}
