import React from "react";

const AddToCart = ({ id }) => {
  const addToCartHandler = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location = "/login";
      throw new Error("No token");
    }

    const addQuery = await fetch(
      `http://192.168.15.115:7777/add-to-cart/${id}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(addQuery);
    if (!addQuery.ok) throw new Error("Could not add to cart");
    const addData = await addQuery.json();
    return addData;
  };

  return (
    <button
      className="mt-5 border border-slate-200/20 bg-black/90 text-slate-200 hover:border-[#747bff] "
      onClick={addToCartHandler}
    >
      Add to cart{" "}
    </button>
  );
};

export default AddToCart;
