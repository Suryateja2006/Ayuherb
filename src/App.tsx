import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerDashboard from "./pages/FarmerDashboard";
import ConsumerScan from "./pages/ConsumerScan";
import CollectorDashboard from "./pages/CollectorDashboard";
import TesterDashboard from "./pages/TesterDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/collector" element={<CollectorDashboard />} />
          <Route path="/tester" element={<TesterDashboard />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/manufacturer" element={<ManufacturerDashboard />} />
          <Route path="/consumer" element={<ConsumerScan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
