
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import Stocks from "./pages/Stocks";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Workflow from "./pages/Workflow";
import Details from "./pages/Details";
import Finance from "./pages/Finance";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem("userName");
    if (userName) {
      setIsLoggedIn(true);
    }
    
    // Add classes to hide Lovable branding
    document.documentElement.classList.add('lovable-badge');
    document.body.classList.add('lovable-badge');
    
    // Additional approach to hide Lovable branding
    const removeLovabledBranding = () => {
      const elements = document.querySelectorAll('[class*="lovable"],[class*="Lovable"],[id*="lovable"],[id*="Lovable"],div[style*="z-index: 2147483647"],div[style*="position: fixed"][style*="bottom: 0"][style*="right: 0"]');
      elements.forEach(el => {
        el.remove();
      });
    };
    
    // Run immediately and then periodically
    removeLovabledBranding();
    const interval = setInterval(removeLovabledBranding, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={isLoggedIn ? <Index /> : <Navigate to="/login" />} />
            <Route path="/industries" element={isLoggedIn ? <Industries /> : <Navigate to="/login" />} />
            <Route path="/stocks" element={isLoggedIn ? <Stocks /> : <Navigate to="/login" />} />
            <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/workflow" element={isLoggedIn ? <Workflow /> : <Navigate to="/login" />} />
            <Route path="/details" element={isLoggedIn ? <Details /> : <Navigate to="/login" />} />
            <Route path="/finance" element={isLoggedIn ? <Finance /> : <Navigate to="/login" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
