import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface Variation {
  type: string;
  options: string[];
}

export interface Product {
  id: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  points: number;
  variations: Variation[];
}

interface ProductCardProps {
  currency: string;
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ currency, product, onAddToCart }: ProductCardProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(product.quantity);

  const handleAdd = () => {
    if (quantity === 0) return;
    setQuantity((q) => q - 1);
    onAddToCart?.(product);
  };

  return (
    <article className="card" aria-label={`Product card for ${product.title}`}>
      <div>
        <span
          className="text-xs text-gray-400"
          aria-label={`${t("productCard.sku", "SKU")}: ${product.sku}`}
        >
          {product.sku}
        </span>
      </div>
      <div className="flex justify-between">
        <h3 className="font-semibold" role="heading">
          {product.title}
        </h3>
      </div>
      <div className="flex justify-between">
        <span
          className="font-bold text-blue-600"
          aria-label={`Price: $${product.price}`}
        >
          ${product.price} {currency}
        </span>
        <span className="text-xs text-yellow-600">
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
        <span className="text-xs text-gray-400" aria-live="polite">
          {t("productCard.stock", "Stock")}: {quantity}
        </span>
        <button
          onClick={handleAdd}
          disabled={quantity === 0}
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
