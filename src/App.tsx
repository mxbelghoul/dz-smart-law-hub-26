import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Laws from "./pages/Laws";
import Procedures from "./pages/Procedures";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Forum from "./pages/Forum";
import Centers from "./pages/Centers";
import Library from "./pages/Library";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// New interactive pages
import NewTopic from "./pages/NewTopic";
import UploadFile from "./pages/UploadFile";
import AddLaw from "./pages/AddLaw";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/laws" element={<Laws />} />
            <Route path="/laws/add" element={<AddLaw />} />
            <Route path="/procedures" element={<Procedures />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/new-topic" element={<NewTopic />} />
            <Route path="/centers" element={<Centers />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/upload" element={<UploadFile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
