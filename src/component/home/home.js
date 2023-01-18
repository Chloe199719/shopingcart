import React from "react";

function Home(props) {
  return (
    <main>
      <section className="info">
        <h2>Our Mission</h2>
        <p>
          Bring Stuffed Animals to all boys and girls {props.items[0].addToCart}{" "}
          asdkasdjaskldjaskldjaskdjqkwjheiasjdaskdmadadadjadasjdkasdjoqiehjqlkdjhqwoiehaslkdjasldhqwdjalskdjhaslkdjhasliehqwldhasldhad
        </p>
      </section>
    </main>
  );
}

export default Home;
