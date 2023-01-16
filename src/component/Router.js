import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/home";
import Nav from "./nav/nav";
import Shop from "./shop/shop";
import Shopingcart from "./shopingcart/shopingcart";

import sharkimg from "./assets/shark.jpg";
import doggyimg from "./assets/doggy.jpg";
import uniqid from "uniqid";
function Router() {
  const [items, setItems] = useState([
    {
      itemName: `Shark`,
      price: 20,
      desc: `To Be Defined`,
      stock: 20,
      img: sharkimg,
      id: uniqid(),
      addToCart: 0,
    },
    {
      itemName: `Doggy`,
      price: 16.99,
      desc: `To Be Defined`,
      stock: 20,
      img: doggyimg,
      id: uniqid(),
      addToCart: 0,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [itemsBasked, setItemsBasked] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    if (cart.length !== 0) {
      const temparr = [...cart];

      for (let i = 0; i < cart.length; i++) {
        tempTotal = tempTotal + temparr[i].price * temparr[i].quantity;
      }
    }
    tempTotal = Math.round(tempTotal * 100) / 100;
    setOrderTotal(tempTotal); // console.log(cart);
  });
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = cart[i].quantity + total;
    }
    setItemsBasked(total);
  });
  return (
    <BrowserRouter>
      <Nav itemsBasked={itemsBasked} />
      <Routes>
        <Route path="/" element={<Home items={items} />} />
        <Route
          path="/shop"
          element={
            <Shop
              items={items}
              setItems={setItems}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Shopingcart
              cart={cart}
              setCart={setCart}
              orderTotal={orderTotal}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
