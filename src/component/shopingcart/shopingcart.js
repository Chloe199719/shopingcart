import React from "react";
import { Link } from "react-router-dom";

function Shopingcart(props) {
  //   const [orderTotal, setOrderTotal] = useState(0);
  // //   useEffect(() => {
  // //     let tempTotal = 0;
  // //     if (props.cart.length !== 0) {
  // //       const temparr = [...props.cart];

  // //       for (let i = 0; i < props.cart.length; i++) {
  // //         tempTotal = tempTotal + temparr[i].price * temparr[i].quantity;
  // //       }
  // //     }
  // //     setOrderTotal(tempTotal);
  // //   });
  const updateQuantity = function (e) {
    const index = e.target.dataset.index;
    if (e.target.value > props.cart[index].stock) return;
    if (e.target.value < 1) return;
    const temp = [...props.cart];
    temp[index].quantity = parseInt(e.target.value);
    props.setCart(temp);
  };
  const removeItem = function (e) {
    if (window.confirm(`Are you Sure You want to Remove This Item?`)) {
      const index = e.target.dataset.index;
      const temp = [...props.cart];
      temp.splice(index, 1);
      props.setCart(temp);
    }
  };
  const cart = function () {
    if (props.cart.length === 0) return <p> Empty Cart</p>;
    return props.cart.map((item, index) => {
      return (
        <li key={item.id} className="cartItem">
          <div>{item.itemName}</div>
          <img src={item.img} alt={item.itemName} title={item.desc} />
          <div>
            Quantity:
            <input
              data-index={index}
              type="number"
              value={item.quantity}
              onChange={updateQuantity}
            ></input>
          </div>

          <div>
            Total: ${Math.round(item.quantity * item.price * 100) / 100}
          </div>

          <svg data-index={index} onClick={removeItem} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          </svg>
        </li>
        // Change image sizing on Css instead
      );
    });
  };
  return (
    <main>
      <section className="shopingCart">
        <ul>{cart()}</ul>
        <div className="total">
          {" "}
          <div className="total-total">Total : {props.orderTotal}$</div>{" "}
        </div>
        <div className="btns">
          <button>Checkout</button>{" "}
          <button>
            {" "}
            <Link to="/shop">Keep Shopping</Link>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Shopingcart;
