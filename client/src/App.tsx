import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/feed" component={Feed} />
          <Route path="/upload" component={Upload} />
          <Route path="/profile" component={Profile} />
          <Route path="/auth" component={Auth} />

          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <FloatingActionButton />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
