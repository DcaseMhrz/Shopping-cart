import { useEffect, useState } from "react";
import { ShopItem } from "../components/ShopItem";
import { Col, Row } from "react-bootstrap";

const Shop = () => {
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
    <div>
      <div className="container">
        <h1>Shop</h1>
        <Row direction="row">
          {products?.map((item) => {
            return (
              <ShopItem
                key={item.id}
                id={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                price={item.price}
                description={item.description}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Shop;
