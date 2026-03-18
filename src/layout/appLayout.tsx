import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import bg1 from "../assets/logo/bg1.png";

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* bg1 only on desktop — mobile sections handle their own bg */}
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Header — absolute, floats over everything */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header onBackClick={() => navigate(-1)} />
      </div>

      {/* Content — pt clears the header height */}
      <div className="relative z-10 pt-[72px] lg:pt-[88px] h-screen">
        {children}
      </div>
    </div>
  );
}
