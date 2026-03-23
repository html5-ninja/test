import { useTranslation } from "react-i18next";
import { useAppStore } from "../../store/useAppStore";

const Cart = () => {
  const { t } = useTranslation();
  const { cart } = useAppStore();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="relative group">
      <button className="btn" aria-label={t("cart.label")}>
        {t("cart.label")}
        {cart.length > 0 && (
          <span className="ml-1 font-bold">( {cart.length} )</span>
        )}
        <div className="popover">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-400">{t("cart.empty")}</p>
          ) : (
            <>
              <pre className="text-black">{JSON.stringify(cart, null, 2)}</pre>

              <hr />
              <div className="flex justify-between font-bold text-sm">
                <span>{t("cart.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default Cart;
