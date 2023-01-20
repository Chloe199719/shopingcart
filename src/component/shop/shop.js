import React from "react";
import uniqid from "uniqid";
function Shop(props) {
  const shopAddCart = function (e) {
    if (e.target.value > props.items[e.target.dataset.index].stock) return;
    if (e.target.value < 0) return;
    const temp = [...props.items];
    temp[e.target.dataset.index].addToCart = parseInt(e.target.value);
    props.setItems(temp);
  };
  class CartItem {
    constructor(itemName, price, desc, img, quantity, stock, id) {
      this.itemName = itemName;
      this.price = price;
      this.desc = desc;
      this.img = img;
      this.quantity = quantity;
      this.stock = stock;
      this.id = id;
    }
  }

  const onClick = function (e) {
    if (props.items[e.target.dataset.index].addToCart === 0) return;
    const temp = [...props.cart];
    temp.push(
      new CartItem(
        props.items[e.target.dataset.index].itemName,
        props.items[e.target.dataset.index].price,
        props.items[e.target.dataset.index].desc,
        props.items[e.target.dataset.index].img,
        props.items[e.target.dataset.index].addToCart,
        props.items[e.target.dataset.index].stock,
        uniqid()
      )
    );
    props.setCart(temp);
    const tempItems = [...props.items];
    tempItems[e.target.dataset.index].stock =
      props.items[e.target.dataset.index].stock -
      props.items[e.target.dataset.index].addToCart;
    tempItems[e.target.dataset.index].addToCart = 0;
    props.setItems(tempItems);
  };
  return (
    <main>
      <section className="shop">
        <h2>Our Products</h2>
        {props.items.map((i, index) => {
          return (
            <div className="shopItem" key={i.id}>
              <h3>{i.itemName}</h3>
              <img src={i.img} alt={i.itemName} />
              <p>{i.desc}</p>
              <div>Stock : {i.stock}</div> <div>Price : ${i.price}</div>
              <div className="quantity">
                Quantity:
                <input
                  data-index={index}
                  type="number"
                  value={i.addToCart}
                  onChange={shopAddCart}
                />
              </div>
              <button data-index={index} onClick={onClick}>
                Add To Cart
              </button>{" "}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Shop;
