import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import SectionLayout from "./layout/appLayout";
import bg1 from "./assets/logo/bg1.png";

import WelcomePage from "./pages/WelcomePage";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Benifits from "./pages/Benifits";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

import {
  MessageSection,
  FinanceSection,
  MarketplaceSection,
  AppsSection,
  CommunitySection,
  AIFinanceSection,
  NuricionSection,
  MentalHealthSection,
  MusicSection,
} from "./pages/Module";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="relative z-10 pt-[72px] lg:pt-[88px] min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/home"       element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services"   element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/benefits"   element={<PublicLayout><Benifits /></PublicLayout>} />
        <Route path="/about"      element={<PublicLayout><AboutUs /></PublicLayout>} />
        <Route path="/contact"    element={<PublicLayout><ContactUs /></PublicLayout>} />

        <Route path="/chat"        element={<SectionLayout><MessageSection /></SectionLayout>} />
        <Route path="/wallet"      element={<SectionLayout><FinanceSection /></SectionLayout>} />
        <Route path="/marketplace" element={<SectionLayout><MarketplaceSection /></SectionLayout>} />
        <Route path="/apps"        element={<SectionLayout><AppsSection /></SectionLayout>} />
        <Route path="/nutrition"   element={<SectionLayout><NuricionSection /></SectionLayout>} />
        <Route path="/communities" element={<SectionLayout><CommunitySection /></SectionLayout>} />
        <Route path="/musica"      element={<SectionLayout><MusicSection /></SectionLayout>} />
        <Route path="/salud-mental" element={<SectionLayout><MentalHealthSection /></SectionLayout>} />
        <Route path="/finance"     element={<SectionLayout><AIFinanceSection /></SectionLayout>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
