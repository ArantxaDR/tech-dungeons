import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Frontella from "./pages/Frontella";
import Bitgrun from "./pages/Bitgrun";
import Pixaria from "./pages/Pixaria";
import Stackia from "./pages/Stackia";
import Bugaria from "./pages/Bugaria";
import Applia from "./pages/Applia";
import CharacterCreator from "./pages/CharacterCreator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/frontella" element={<Frontella />} />
          <Route path="/bitgrun" element={<Bitgrun />} />
          <Route path="/pixaria" element={<Pixaria />} />
          <Route path="/stackia" element={<Stackia />} />
          <Route path="/bugaria" element={<Bugaria />} />
          <Route path="/applia" element={<Applia />} />
          <Route path="/crear-personaje" element={<CharacterCreator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
