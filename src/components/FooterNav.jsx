import { Home, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function FooterNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/pomodoro", label: "Pomodoro", icon: Clock },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full bg-white border-t shadow-md py-2 z-50"
      aria-label="Footer navigation"
    >
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all duration-200 relative ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                <Icon size={24} aria-hidden="true" />
                <span className="text-xs font-medium">{item.label}</span>

                {/* underline effect */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
