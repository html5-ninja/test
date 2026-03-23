import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Product } from "../../model/store";

interface ProductCardProps {
  currency: string;
  product: Product;
  onAddToCart?: (product: Product) => void;
  cart: Product[];
}

const ProductCard = ({
  currency,
  product,
  onAddToCart,
  cart,
}: ProductCardProps) => {
  const { t } = useTranslation();

  const stock = useMemo(() => {
    const cartItem = cart.find((i) => i.id === product.id);
    return product.quantity - (cartItem?.quantity ?? 0);
  }, [cart, product]);

  const handleAdd = () => {
    if (stock === 0) return;
    onAddToCart?.(product);
    toast.success(t("productCard.addedToCart", { title: product.title }));
  };

  return (
    <article className="card" aria-label={`Product card for ${product.title}`}>
      <div>
        <span
          className="text-xs "
          aria-label={`${t("productCard.sku", "SKU")}: ${product.sku}`}
        >
          {product.sku}
        </span>
      </div>
      <div className="flex justify-between">
        <h2 className="font-semibold" role="heading">
          {product.title}
        </h2>
      </div>
      <div className="flex justify-between">
        <span
          className="font-bold text-blue-600"
          aria-label={`Price: $${product.price}`}
        >
          ${product.price} {currency}
        </span>
        <span className="text-xs">
          {product.points} {t("productCard.points", "pts")}
        </span>
      </div>
      <div className="flex-1">
        {product.variations.map((v) => (
          <div key={v.type} className="text-xs text-gray-500 capitalize">
            {v.type}: {v.options.join(", ")}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs " aria-live="polite">
          {t("productCard.stock", "Stock")}: {stock}
        </span>
        <button
          onClick={handleAdd}
          disabled={stock === 0}
          className="btn"
          type="button"
          aria-label={`${t("productCard.addToCart", "Add to Cart")} ${product.title}`}
        >
          {t("productCard.addToCart", "Add to Cart")}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
