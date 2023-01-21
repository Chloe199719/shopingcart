import React from "react";
import uniqid from "uniqid";
import { useRef, useEffect } from "react";
function Shop(props) {
  // let quantity = useRef([]);

  // useEffect(() => {
  //   for (let i = 0; i < quantity.current.length; i++) {}
  //   console.log(quantity.current);
  // }, [props.items]);
  const shopAddCart = function (e) {
    // if (e.target.value > props.items[e.target.dataset.index].stock) {
    //   e.target.value = props.items[e.target.dataset.index].stock;
    // }
    // if (e.target.value < 0) {
    //   e.target.value = 0;
    // }
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
    const index = temp
      .map((e) => e.itemName)
      .indexOf(props.items[e.target.dataset.index].itemName);
    if (index === -1) {
      temp.push(
        new CartItem(
          props.items[e.target.dataset.index].itemName,
          props.items[e.target.dataset.index].price,
          props.items[e.target.dataset.index].desc,
          props.items[e.target.dataset.index].img,
          props.items[e.target.dataset.index].addToCart,
          props.items[e.target.dataset.index].stock,
          props.items[e.target.dataset.index].id
        )
      );
    } else {
      if (
        props.cart[index].quantity +
          props.items[e.target.dataset.index].addToCart <=
        props.items[e.target.dataset.index].stock
      ) {
        temp[index].quantity =
          props.cart[index].quantity +
          props.items[e.target.dataset.index].addToCart;
      } else {
        temp[index].quantity = props.items[e.target.dataset.index].stock;
        alert(`Added More Items then we Currently have in Stock`);
      }
    }
    props.setCart(temp);
    const tempItems = [...props.items];

    // tempItems[e.target.dataset.index].stock =
    //   props.items[e.target.dataset.index].stock -
    //   props.items[e.target.dataset.index].addToCart;
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
              <div>Stock : {i.stock}</div>
              <div className="quantity dir">
                Price : <div> ${i.price}</div>
              </div>
              {i.stock ? (
                <div className="quantity">
                  Quantity:
                  <input
                    data-index={index}
                    type="number"
                    onChange={shopAddCart}
                    value={i.addToCart}
                  />
                </div>
              ) : (
                <div className="outStock">
                  <div>Out of Stock </div>
                </div>
              )}
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
