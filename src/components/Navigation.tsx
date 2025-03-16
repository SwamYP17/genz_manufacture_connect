
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  ShoppingBag,
  User,
  Workflow,
  FileDigit,
  Wallet,
  Save
} from "lucide-react";
import useMobile from "@/hooks/use-mobile";

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  notification?: number;
}

// Reusable NavLink component
const NavLinkItem = ({
  to,
  icon,
  label,
  notification,
  disabled = false,
}: NavItem) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (disabled) {
    return (
      <div
        className="flex items-center px-3 py-2.5 rounded-xl text-genz-gray-medium cursor-not-allowed"
        title="Coming soon"
      >
        {icon}
        <span className="ml-3">{label}</span>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center px-3 py-2.5 rounded-xl transition-colors ${
          isActive
            ? "bg-genz-purple text-white font-medium"
            : "text-genz-dark hover:bg-genz-purple/10"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-genz-purple rounded-xl"
              initial={false}
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center">
            {icon}
            <span className="ml-3">{label}</span>
          </span>
          {notification && (
            <span className="relative z-10 ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notification}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

const Navigation = () => {
  const { isMobile } = useMobile();
  const location = useLocation();

  // Navigation items
  const navItems: NavItem[] = [
    {
      to: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/industries",
      icon: <Building2 size={20} />,
      label: "Industries",
    },
    {
      to: "/stocks",
      icon: <TrendingUp size={20} />,
      label: "Market Trends",
    },
    {
      to: "/products",
      icon: <ShoppingBag size={20} />,
      label: "Products",
    },
    {
      to: "/workflow",
      icon: <Workflow size={20} />,
      label: "Workflow",
    },
    {
      to: "/details",
      icon: <FileDigit size={20} />,
      label: "Details",
    },
    {
      to: "/finance",
      icon: <Wallet size={20} />,
      label: "Finance",
    },
    {
      to: "/saved-estimations",
      icon: <Save size={20} />,
      label: "Saved Estimations",
    },
    {
      to: "/profile",
      icon: <User size={20} />,
      label: "Profile",
    },
  ];

  // On mobile, we hide the navigation on route change
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Toggle the navigation menu
  const toggleNav = () => setIsOpen(!isOpen);

  // Close navigation when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [location.pathname, isMobile]);

  // Update isOpen when isMobile changes
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleNav}
        ></div>
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed top-0 pt-16 bottom-0 w-64 bg-white z-30 transition-transform duration-300 border-r border-genz-gray-light transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "shadow-xl" : ""}`}
      >
        <div className="h-full overflow-y-auto pb-20 pt-3 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLinkItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile nav toggle button */}
      {isMobile && (
        <button
          onClick={toggleNav}
          className="fixed bottom-4 right-4 z-50 bg-genz-purple text-white rounded-full p-3 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}
    </>
  );
};

export default Navigation;
