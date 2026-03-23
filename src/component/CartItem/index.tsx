import { useTranslation } from "react-i18next";
import { Product } from "../../model/store";

interface CartItemProps {
  product: Product & { quantity: number };
  stock: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({
  product,
  stock,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col text-sm border rounded p-2 gap-2 text-left">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-semibold">{product.title}</span>
          <span className="text-xs ">{product.sku}</span>
        </div>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onRemove(product.id);
          }}
          aria-label={t("cart.remove")}
          className="btn btn-danger btn-sm"
        >
          ✕
        </button>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="number"
          min={1}
          max={stock}
          value={product.quantity}
          onChange={(e) => onUpdateQuantity(product.id, Number(e.target.value))}
          className="w-12 text-center border rounded text-xs p-1"
          aria-label={t("cart.quantity")}
        />
        <div className="flex gap-2 items-center">
          <span className="font-bold">
            ${(product.price * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
