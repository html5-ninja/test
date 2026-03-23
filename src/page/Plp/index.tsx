import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getStore } from "../../api/getStore";
import { Store } from "../../model/store";
import ProductCard from "../../component/ProductCard";

const Plp = () => {
  const { t } = useTranslation();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

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
          {store?.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={store.currency}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Plp;
