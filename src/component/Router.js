import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/home";
import Nav from "./nav/nav";
import Shop from "./shop/shop";
import Shopingcart from "./shopingcart/shopingcart";
import { useAuthState } from "react-firebase-hooks/auth";
import sharkimg from "./assets/shark.jpg";
import doggyimg from "./assets/doggy.jpg";
import cutefoximg from "./assets/cuteFox.png";
import RilakkumaImg from "./assets/Rilakkuma .png";
import uniqid from "uniqid";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import Test from "./test";
import { doc, getDoc } from "firebase/firestore";
function Router() {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState();
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "admin", user.uid);
      const data = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdmin(docSnap.data().isAdmin);
        } else {
          setAdmin(false);
        }
      };
      data();
    } else {
      setAdmin(false);
    }
  }, [user]);
  const [items, setItems] = useState([
    {
      itemName: `Shark`,
      price: 20.99,
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
    {
      itemName: `Fox`,
      price: 22.99,
      desc: `To Be Defined`,
      stock: 20,
      img: cutefoximg,
      id: uniqid(),
      addToCart: 0,
    },
    {
      itemName: `Rilakkuma`,
      price: 25.99,
      desc: `To Be Defined`,
      stock: 20,
      img: RilakkumaImg,
      id: uniqid(),
      addToCart: 0,
    },
  ]);

  useEffect(() => {
    onSnapshot(collection(db, `shopItem`), (data) => {
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        addToCart: 1,
      }));
      setItems(newData);
    });
  }, []);

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
  }, [cart]);
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = cart[i].quantity + total;
    }
    setItemsBasked(total);
  }, [cart]);
  return (
    <BrowserRouter basename="/">
      <Nav itemsBasked={itemsBasked} />
      <Routes>
        <Route path="/" element={<Home items={items} />} />
        <Route
          path="/shop"
          element={
            <Shop
              setItems={setItems}
              items={items}
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
              setItems={setItems}
              items={items}
            />
          }
        />
        <Route path="/admin" element={<Test admin={admin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
