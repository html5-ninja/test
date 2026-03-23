import { useTranslation } from "react-i18next";
import { useAppStore } from "../../store/useAppStore";
import Cart from "../Cart";

const LANGUAGES = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

const Header = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useAppStore();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-slate-50 sticky top-0 z-10">
      <h1 className="text-xl font-bold">{t("header.title")}</h1>
      <div className="flex gap-4 items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
        >
          {LANGUAGES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
