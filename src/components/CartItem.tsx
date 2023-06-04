import { useEffect, useState } from "react";
import { useShoppingCart } from "../Contexts/cartContext";
import { Button, Stack } from "react-bootstrap";
import formatCurrency from "./CurrencyFormatter";

type cartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: cartItemProps) {
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

  const { removeFromCart } = useShoppingCart();

  const item = products.find((i) => i.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.thumbnail}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.title}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  );
}
