import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./lib/auth";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/floating-action-button";
import Home from "@/pages/home";
import Feed from "@/pages/feed";
import Upload from "@/pages/upload";
import Profile from "@/pages/profile";
import Auth from "@/pages/auth";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/about" component={About} />
          <Route path="/">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>
          <Route path="/feed">
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          </Route>
          <Route path="/upload">
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <ProtectedRoute>
        <FloatingActionButton />
      </ProtectedRoute>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
