
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui-components";
import { useLocation, useNavigate } from "react-router-dom";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const menuLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Help Center", path: "/help" },
    { name: "Notifications", path: "/notifications" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchValue);
    setSearchValue("");
  };

  return (
    <header className="relative z-10">
      <div className="glass shadow-sm border-b border-white/30">
        <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} className="text-genz-dark" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-display font-semibold text-genz-dark">
                GenZ Connects
              </h1>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white/70 rounded-full border border-genz-gray px-3 overflow-hidden w-96"
          >
            <Search size={18} className="text-genz-gray-medium" />
            <input
              type="text"
              placeholder="Search industries, products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 py-2 px-2 bg-transparent focus:outline-none text-sm placeholder:text-genz-gray-medium"
            />
          </form>

          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search"
              onClick={() => navigate("/search")}
            >
              <Search size={20} className="text-genz-dark" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsMenuOpen(false);
              }
            }}
          >
            <div className="h-full w-72 bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-genz-dark">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="p-1.5 rounded-full hover:bg-genz-gray transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} className="text-genz-dark" />
                </button>
              </div>

              <nav className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-genz-gray-medium uppercase tracking-wider">
                    Main Navigation
                  </p>
                  <ul className="space-y-1">
                    {menuLinks.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => {
                            navigate(link.path);
                            setIsMenuOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-genz-dark hover:bg-genz-blue-light transition-colors",
                            location.pathname === link.path && "bg-genz-blue-light text-genz-blue"
                          )}
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-genz-gray">
                  <Button
                    variant="outline"
                    width="full"
                    onClick={() => {
                      // Implement logout or sign-in
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopBar;
