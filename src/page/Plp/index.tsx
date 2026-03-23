import { useEffect, useState } from "react";
import { getProducts } from "../../api/getProducts";

const Plp = () => {
  const [plpState, setPlpState] = useState({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    getProducts()
      .then((products) => {
        setPlpState({
          products,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setPlpState({
          products: [],
          loading: false,
          error: error.message,
        });
      });
  }, []);

  return (
    <main className="container">
      <h1>Product List Page</h1>
      <pre>{JSON.stringify(plpState, null, 2)}</pre>
    </main>
  );
};

export default Plp;
