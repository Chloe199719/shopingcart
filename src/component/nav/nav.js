import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  const controler = function () {
    if (props.itemsBasked === 0) return;
    return props.itemsBasked;
  };
  return (
    <header>
      <h1>Place Holder Name</h1>
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <Link to="/checkout">
            <li>Shopping Cart {controler()}</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
