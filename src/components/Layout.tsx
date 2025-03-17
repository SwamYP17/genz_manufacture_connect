
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./Navigation";
import TopBar from "./TopBar";
import { pageVariants } from "./ui-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  // Add animation for route transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-genz-blue-light">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-12 w-12 text-genz-blue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-genz-dark">
            GenZ Connects
          </h2>
          <p className="mt-2 text-genz-gray-dark">
            Connecting innovators with manufacturers
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-b from-genz-blue-light to-white">
      <TopBar />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="h-full overflow-auto pb-20"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="container py-4">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
