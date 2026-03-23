import { useTranslation } from "react-i18next";
import { useAppStore } from "../../store/useAppStore";
import CartItem from "../CartItem";

const Cart = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity } = useAppStore();

  const total = cart?.reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0;

  return (
    <div className="group">
      <button className="btn focus:bg-green-500" aria-label={t("cart.label")}>
        {t("cart.label")}
        {cart?.length > 0 && (
          <span className="ml-1 font-bold">( {cart.length} )</span>
        )}
      </button>
      <div tabIndex={-1} className="popover">
        {cart?.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">{t("cart.empty")}</p>
        ) : (
          <>
            <div className="max-h-96 overflow-auto">
              <div className="flex flex-col gap-2">
                {cart?.map((item) => (
                  <CartItem
                    key={item.id}
                    product={item}
                    stock={item.stock}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-sm py-2 mt-2">
              <span>{t("cart.total")}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
