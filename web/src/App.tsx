import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SuccessStories from "./pages/SuccessStories";
import OurTeamPage from "./pages/OurTeamPage";
import UpcomingEventsPage from "./pages/UpcomingEventsPage";
import VolunteersPage from "./pages/VolunteersPage";
import OurMissionPage from "./pages/OurMissionPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: Error | { message?: string; status?: number }) => {
        // Don't retry on CORS errors or 403 errors
        if (error?.message?.includes('CORS') || (error as { status?: number })?.status === 403) {
          console.warn('CORS or 403 error detected, not retrying:', error);
          return false;
        }
        // Only retry up to 2 times for other errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000, // 5 minutes default
    },
  },
});

const AppContent = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/our-team" element={<OurTeamPage />} />
      <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
      <Route path="/volunteers" element={<VolunteersPage />} />
      <Route path="/our-mission" element={<OurMissionPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
