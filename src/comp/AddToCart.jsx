import React from "react";

const AddToCart = ({ id }) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No token");

  const addToCartHandler = async () => {
    const addQuery = await fetch(
      `http://192.168.15.115:7777/add-to-cart/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (!addQuery.ok) throw new Error("Could not add to cart");
    const addData = await addQuery.json();
    return addData;
    // const addQuery = useQuery(["cart"], () =>
    //   fetch(`http://192.168.15.115:7777/add-to-cart/${id}`, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: `Token ${token}`,
    //     },
    //   }).then((res) => res.json())
    // );
    // console.log(productItemQuery.data);
    // return addQuery;
  };

  return (
    <div
      className="bg-slate-200 text-slate-900 hover:bg-[#747bff] hover:text-slate-200"
      onclick={addToCartHandler}
      type="submit"
    >
      Add to cart{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#000000"
        viewBox="0 0 256 256"
      >
        <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
      </svg>
    </div>
  );
};

export default AddToCart;
