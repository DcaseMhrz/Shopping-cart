import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../Contexts/cartContext";
import { CartItem } from "./CartItem";
import formatCurrency from "./CurrencyFormatter";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cartItem } = useShoppingCart();

  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((r) => r.products);

      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Stack gap={3}>
      {cartItem?.map((item, index) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="ms-auto fw-bold fs-5">
        Total{" "}
        {formatCurrency(
          cartItem?.reduce((total, cItem) => {
            const item = products.find((i) => i.id === cItem.id);
            return total + (item?.price || 0) * cItem.quantity;
          }, 0)
        )}
      </div>
    </Stack>
  );
};

export default Cart;
