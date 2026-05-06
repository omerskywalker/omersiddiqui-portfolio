import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import ScrollProgress from "@/components/ScrollProgress";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ConsoleSignature() {
  useEffect(() => {
    if ((window as any).__os_signed) return;
    (window as any).__os_signed = true;
    const orange = "color:#F7931A;font-weight:bold;font-family:monospace;";
    const dim = "color:#888;font-family:monospace;";
    const ascii = `
   ██████╗ ███████╗
  ██╔═══██╗██╔════╝
  ██║   ██║███████╗
  ██║   ██║╚════██║
  ╚██████╔╝███████║
   ╚═════╝ ╚══════╝
`;
     
    console.log("%c" + ascii, orange);
    console.log("%cInterested in how I built this?", orange);
    console.log(
      "%cgithub.com/omerskywalker  ·  omer@omersiddiqui.com",
      dim
    );
  }, []);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <ConsoleSignature />
          <ScrollProgress />
          <Toaster />
          <Router />
        </TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
