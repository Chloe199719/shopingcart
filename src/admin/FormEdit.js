import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function FormEdit({ i }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const name = useRef();
  const descTemp = useRef();
  const priceTemp = useRef();
  const stockTemp = useRef();
  useEffect(() => {
    name.current.value = i.itemName;
    descTemp.current.value = i.desc;
    priceTemp.current.value = i.price;
    stockTemp.current.value = i.stock;
  }, [i.itemName, i.desc, i.price, i.stock]);

  const updateItem = async function (e) {
    e.preventDefault();
    setLoading(true);
    setMessage(`Loading`);
    await setDoc(doc(db, "shopItem", i.id), {
      itemName: name.current.value,
      desc: descTemp.current.value,
      price: parseFloat(priceTemp.current.value),
      stock: parseInt(stockTemp.current.value),
      img: i.img,
    })
      .then((e) => setMessage(`Updated`))
      .catch((e) => setMessage(`Error ${e}`))
      .finally(setLoading(false));
    //  catch (e) {
    //   console.log(e);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <form onSubmit={updateItem}>
      <div>
        <label>Name</label>
        <input type="text" ref={name} required />
      </div>{" "}
      <div>
        <label>Description</label>
        <input type="text" ref={descTemp} required />
      </div>
      <div>
        <label>Stock</label>
        <input type="text" ref={stockTemp} required />
      </div>
      <div>
        <label>Price</label>
        <input step="0.01" type="text" ref={priceTemp} required />
      </div>
      <button disabled={loading} type="submit">
        Update
      </button>{" "}
      <div>{message}</div>
    </form>
  );
}

export default FormEdit;
