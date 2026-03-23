import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getStore } from "../../api/getStore";
import { Store } from "../../model/store";
import ProductCard from "../../component/ProductCard";
import Pagination from "../../component/Pagination";
import { useAppStore } from "../../store/useAppStore";

const Plp = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useAppStore((state) => state.addToCart);
  useEffect(() => {
    setLoading(true);
    const fetchStore = async () => {
      try {
        const data = await getStore();
        setStore(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  const paginated = useMemo(() => {
    if (!store) return [];
    const start = (page - 1) * store.pagination.pageSize;
    const end = page * store.pagination.pageSize;
    return store.products.slice(start, end);
  }, [store, page]);

  return (
    <main className="container">
      <h1 className="text-lg font-semibold">{store?.name}</h1>
      <hr className="my-4" />
      {loading && <p>{t("global.loading", "Loading...")}</p>}
      {!loading && store?.products.length === 0 && (
        <p>{t("global.noProductsAvailable", "N/A")}</p>
      )}
      {!loading && (
        <section className="products">
          {paginated?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={store!.currency}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </section>
      )}
      <Pagination page={page} totalPages={store?.pagination.totalPages ?? 0} />
    </main>
  );
};

export default Plp;
