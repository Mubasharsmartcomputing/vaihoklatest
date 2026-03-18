import { Link } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $lang } from "../store";
import { t } from "../i18n";

export default function NotFound() {
  useStore($lang);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-9xl font-bold">{t("notfound.title")}</h1>
      <h2 className="text-4xl font-bold mt-4">{t("notfound.subtitle")}</h2>
      <p className="text-gray-300 mt-4 max-w-md text-center">{t("notfound.desc")}</p>
      <Link to="/home" className="mt-8 px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition-colors">
        {t("notfound.button")}
      </Link>
    </div>
  );
}
