import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-slate-50 sticky top-0 z-10">
      <h1 className="text-xl font-bold">{t("header.title", "Shop")}</h1>
      <div className="flex gap-4">
        <div>lang</div>
        <div>cart</div>
      </div>
    </header>
  );
};

export default Header;
