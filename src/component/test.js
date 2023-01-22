import React, { useRef, useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Modal from "../admin/modal";

function Test() {
  const [items, setItems] = useState([]);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState(``);
  const [url, setURl] = useState(``);
  const itemName = useRef();
  const stock = useRef();
  const desc = useRef();
  const price = useRef();

  useEffect(() => {
    onSnapshot(collection(db, `shopItem`), (data) => {
      const newData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        addToCart: 1,
      }));
      setItems(newData);
    });
  }, [items]);

  const handleUpload = async function () {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setURl(url);
          console.log(url);
        });
      }
    );
    // const url = await getDownloadURL(storageRef);
    // setURl(url);
  };
  const sendData = async function (e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "shopItem"), {
      itemName: itemName.current.value,
      stock: parseInt(stock.current.value),
      desc: desc.current.value,
      price: parseFloat(price.current.value),
      img: url,
    });
    console.log("Document written with ID: ", docRef.id);
  };
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const deleteItem = async function (e) {
    console.log(`pre wait`, e);
    await deleteDoc(doc(db, "shopItem", e));
    console.log(`works`);
  };

  return (
    <main>
      <form onSubmit={sendData}>
        <div>
          <label>Product Name</label>{" "}
          <input ref={itemName} type="text" required />
        </div>
        <div>
          <label>Current Stock</label>{" "}
          <input ref={stock} type="number" required />
        </div>
        <div>
          <label>Description</label> <input ref={desc} type="text" required />
        </div>
        <div>
          <label>Price</label>{" "}
          <input step="0.01" ref={price} type="number" required />
        </div>{" "}
        <input type="file" accept="image/*" onChange={handleChange} />
        {url ? <p>{url}</p> : <p>{percent} % done</p>}
        <button disabled={url ? false : true} type="submit">
          Submit
        </button>
      </form>
      <button type="button" onClick={handleUpload}>
        upload
      </button>
      <section className="shop">
        {items
          ? items.map((i, index) => {
              return (
                <Modal key={i.id} i={i} index={index} deleteItem={deleteItem} />
              );
            })
          : null}
      </section>
    </main>
  );
}

export default Test;
