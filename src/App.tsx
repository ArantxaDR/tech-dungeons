import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Flexbela from "./pages/Flexbela";
import Query from "./pages/Query";
import Usabella from "./pages/Usabella";
import Stackia from "./pages/Stackia";
import Testina from "./pages/Testina";
import Applia from "./pages/Applia";
import CharacterCreator from "./pages/CharacterCreator";
import Manual from "./pages/Manual";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Flexbela" element={<Flexbela />} />
          <Route path="/Query" element={<Query />} />
          <Route path="/Usabella" element={<Usabella />} />
          <Route path="/Stackia" element={<Stackia />} />
          <Route path="/Testina" element={<Testina />} />
          <Route path="/Applia" element={<Applia />} />
          <Route path="/crear-personaje" element={<CharacterCreator />} />
          <Route path="/manual" element={<Manual />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
