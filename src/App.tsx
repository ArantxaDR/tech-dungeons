import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import CharacterCreator from "./pages/CharacterCreator";
import Manual from "./pages/Manual";
import NotFound from "./pages/NotFound";
import { createRolePage } from "./pages/createRolePage";
import { getDefaultFlexbela } from "@/data/characterPresets";
import { getDefaultQuery } from "@/data/characterPresets";
import { getDefaultUsabella } from "@/data/characterPresets";
import { getDefaultStackia } from "@/data/characterPresets";
import { getDefaultTestina } from "@/data/characterPresets";
import { getDefaultApplia } from "@/data/characterPresets";
import frontellaAvatar from "@/assets/avatars/front.webp";
import bitgrunAvatar from "@/assets/avatars/back.webp";
import pixariaAvatar from "@/assets/avatars/uxui.webp";
import stackiaAvatar from "@/assets/avatars/fullstack.webp";
import bugariaAvatar from "@/assets/avatars/qa.webp";
import appliaAvatar from "@/assets/avatars/mobile.webp";

const Flexbela = createRolePage(getDefaultFlexbela, frontellaAvatar);
const Query = createRolePage(getDefaultQuery, bitgrunAvatar);
const Usabella = createRolePage(getDefaultUsabella, pixariaAvatar);
const Stackia = createRolePage(getDefaultStackia, stackiaAvatar);
const Testina = createRolePage(getDefaultTestina, bugariaAvatar);
const Applia = createRolePage(getDefaultApplia, appliaAvatar);

const App = () => (
  <TooltipProvider>
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
  );

export default App;
