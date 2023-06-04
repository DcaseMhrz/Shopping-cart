import { Button, Card, CardImg, Col, Container } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import formatCurrency from "./CurrencyFormatter";
import { useShoppingCart } from "../Contexts/cartContext";

type ShoppingItemsProps = {
  id: number;
  category?: string;
  discountPercentage?: number;
  description: string;
  brand?: string;
  stock?: number;
  rating?: number;
  images?: string[];
  price: number;
  thumbnail: string;
  title: string;
};
export function ShopItem({
  thumbnail,
  price,
  title,
  description,
  id,
  category,
  brand,
  stock,
  rating,
  images,
}: ShoppingItemsProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Col md="4">
      <Card className="h-100">
        <Card.Img
          variant="top"
          height={"200px"}
          src={thumbnail}
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <p>{formatCurrency(price)}</p>
          <Card.Text>{description}</Card.Text>

          <div className="mt-auto">
            {quantity == 0 ? (
              <Button
                className="w-100"
                variant="primary"
                onClick={() => {
                  increaseItemQuantity(id);
                }}
              >
                + Add to Cart
              </Button>
            ) : (
              <div
                className="d-flex flex-column align-items-center"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    onClick={() => {
                      decreaseItemQuantity(id);
                    }}
                  >
                    -
                  </Button>
                  <div>
                    <span className="fs-3">{quantity}</span> in cart
                  </div>
                  <Button
                    onClick={() => {
                      increaseItemQuantity(id);
                    }}
                  >
                    +
                  </Button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(id)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
