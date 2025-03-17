
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add an error boundary to catch and log any errors during rendering
try {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found");
  }
} catch (error) {
  console.error("Error rendering application:", error);
  // Display a fallback UI instead of white screen
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Something went wrong</h2><p>Please try refreshing the page.</p></div>';
}
