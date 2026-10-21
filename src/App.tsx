import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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

// A data router (createBrowserRouter) is what unlocks useBlocker, the hook
// that warns before leaving the creator with changes that are not saved yet.
const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Index /> },
      { path: "/Flexbela", element: <Flexbela /> },
      { path: "/Query", element: <Query /> },
      { path: "/Usabella", element: <Usabella /> },
      { path: "/Stackia", element: <Stackia /> },
      { path: "/Testina", element: <Testina /> },
      { path: "/Applia", element: <Applia /> },
      { path: "/crear-personaje", element: <CharacterCreator /> },
      { path: "/manual", element: <Manual /> },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <TooltipProvider>
    <Sonner />
    <RouterProvider router={router} />
  </TooltipProvider>
);

export default App;
