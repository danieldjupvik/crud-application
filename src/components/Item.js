import Card from "react-bootstrap/Card";

const Item = (props) => {
  const { title, description, image_url, price } = props;
  return (
    <Card style={{ width: "17rem", textAlign: "center", color: "black" }}>
      <Card.Img
        variant="top"
        src={image_url}
        alt={title}
        style={{ width: "100%" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{price} kr</Card.Text>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Item;
