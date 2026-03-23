import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getShop } from "../../api/getShop";
import { Shop } from "../../model/shop";
import ProductCard from "../../component/ProductCard";
import Pagination from "../../component/Pagination";
import { useAppStore } from "../../store/useAppStore";

const Plp = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);
  useEffect(() => {
    setLoading(true);
    const fetchStore = async () => {
      try {
        const data = await getShop();
        setShop(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  const paginated = useMemo(() => {
    if (!shop) return [];
    const start = (page - 1) * shop.pagination.pageSize;
    const end = page * shop.pagination.pageSize;
    return shop.products.slice(start, end);
  }, [shop, page]);

  return (
    <main className="container">
      <h1 className="text-lg font-semibold">{shop?.name}</h1>
      <hr className="my-4" />
      {loading && <p>{t("global.loading", "Loading...")}</p>}
      {!loading && shop?.products.length === 0 && (
        <p>{t("global.noProductsAvailable", "N/A")}</p>
      )}
      {!loading && (
        <section className="products">
          {paginated?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={shop!.currency}
              onAddToCart={() => addToCart(product)}
              cart={cart}
            />
          ))}
        </section>
      )}
      <Pagination page={page} totalPages={shop?.pagination.totalPages ?? 0} />
    </main>
  );
};

export default Plp;
