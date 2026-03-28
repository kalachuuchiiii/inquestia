import { outsideLinks } from "../data/outsideLinks.jsx";
import footerRoutes from "../data/footerRoutes.js";
import { FaCode } from "react-icons/fa6";
import user from "../data/user.js";

const Footer = () => {
  return (
    <footer className="shrink-0 flex flex-col justify-center items-center py-10 bg-neutral-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200">
      {/* Brand + Social */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold">Inquestia.ask</h1>
        <div className="flex gap-4 text-2xl opacity-90">
          {outsideLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="hover:text-blue-600 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mb-10">
        {footerRoutes.map((route, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg mb-3">{route.title}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {route.paths.map((path, j) => (
                <li key={j}>
                  <a
                    href={path.path}
                    className="hover:underline hover:text-blue-600 transition-colors"
                  >
                    {path.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Source Code Button */}
        <div className="flex items-start">
          <a
            href="https://github.com/kalachuuchiiii/inquestia"
            className="truncate flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-900 text-neutral-100 hover:bg-neutral-200 hover:text-zinc-900 transition shadow-md"
          >
            View Source Code <FaCode size="18" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-black/20 dark:bg-white/20 w-full max-w-6xl mb-10" />

      {/* Developer Credit */}
      <div className="flex flex-col items-center gap-4 text-sm px-6">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="Developer"
            className="size-10 rounded-full border"
          />
          <div>
            <a
              href="https://github.com/kalachuuchiiii"
              className="font-medium hover:underline"
            >
              {user.username}
            </a>
            <p className="px-2 py-0.5 mt-1 bg-zinc-900 text-white text-xs rounded-lg w-fit">
              Developer
            </p>
          </div>
        </div>
        <div className="opacity-70 text-center">
          <p>Practical Research 2 — G1</p>
          <p>12 - Haskell</p>
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-8 text-sm opacity-70">© 2025 Inquestia.ask</p>
    </footer>
  );
};

export default Footer;
