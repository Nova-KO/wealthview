import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored authentication state on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem('wealthwise-auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('wealthwise-auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wealthwise-auth');
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <div className="text-xl font-semibold text-gray-700">Wealthwise</div>
          <div className="text-gray-500 mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Landing />}
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/app" replace />
              ) : (
                <Login onAuthSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route 
            path="/app" 
            element={
              isAuthenticated ? (
                <Index onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/demo" 
            element={
              isAuthenticated ? (
                <Index onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
