import React, { useState } from "react";
import FormEdit from "./admin/FormEdit";

function Modal({ i, index, deleteItem }) {
  const [open, setOpen] = useState(false);
  const toggleModal = function () {
    setOpen(!open);
  };
  return (
    <div className="shopItem admin" key={i.id}>
      <h3>{i.itemName}</h3>
      <img src={i.img} alt={i.itemName} />
      <p>{i.desc}</p>
      <div>Stock : {i.stock}</div>
      <div className="quantity dir">
        Price : <div> ${i.price}</div>
      </div>{" "}
      <div>
        <button onClick={toggleModal}>Toggle Modal</button>
      </div>
      {/* {i.stock ? (
                    <div className="quantity">
                      Quantity:
                      <input
                        data-index={index}
                        type="number"
                        value={i.addToCart}
                      />
                    </div>
                  ) : (
                    <div className="outStock">
                      <div>Out of Stock </div>
                    </div>
                  )} */}
      <div>
        <button
          onClick={(e) => {
            deleteItem(i.id);
          }}
        >
          Remove
        </button>
      </div>
      {open ? <FormEdit i={i} /> : null}
    </div>
  );
}

export default Modal;
