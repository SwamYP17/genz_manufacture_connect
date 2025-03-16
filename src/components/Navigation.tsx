
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Factory, TrendingUp, Package, FileText, DollarSign, HelpCircle, MessageSquare, Save, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "relative flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
          isActive ? "text-genz-blue" : "text-genz-gray-dark hover:text-genz-blue"
        )
      }
    >
      <div className="relative">
        {icon}
        {isActive && (
          <motion.span
            layoutId="navIndicator"
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-genz-blue rounded-full"
            transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
          />
        )}
      </div>
      <span className="mt-1 text-[10px]">{label}</span>
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10">
      <div className="glass border-t border-white/20 backdrop-blur-md py-1 px-2">
        <div className="flex items-center justify-around">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/industries" icon={<Factory size={20} />} label="Industries" />
          <NavItem to="/stocks" icon={<TrendingUp size={20} />} label="Stocks" />
          <NavItem to="/products" icon={<Package size={20} />} label="Products" />
          <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
        </div>
      </div>
      <div className="absolute bottom-16 right-4">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ y: -5 }}
            className="bg-genz-blue shadow-lg rounded-full p-3.5 text-white cursor-pointer"
          >
            <HelpCircle size={24} />
          </motion.div>
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
