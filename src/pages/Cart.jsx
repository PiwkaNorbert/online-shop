import { useQuery } from "@tanstack/react-query";
import React from "react";

const Cart = () => {
  const token = sessionStorage.getItem("token");

  const shoppingCartQuery = useQuery(["shoppingCart"], () =>
    fetch(`http://192.168.15.115:7777/shopping-cart/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json())
  );
  if (shoppingCartQuery.isLoading) return <div>Loading...</div>;
  if (shoppingCartQuery.isError)
    return <div>Error... {productQuery.error}</div>;

  const totalPrice = shoppingCartQuery?.data[0]?.items
    .map(({ price, quantity }) => price * quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 py-5 text-slate-300">
        <h1 className="mb-3 text-3xl ">Cart</h1>

        {shoppingCartQuery?.data[0].items.map(
          ({ name, price, img_url, quantity }, index) => {
            {
              /* console.log(totalCost); */
            }
            return (
              <div key={index} className="flex gap-2 space-y-2 text-white">
                <img
                  className="max-h-20 w-20 rounded-md"
                  src={img_url}
                  alt={name}
                />
                <p className="font-semibold">{name}</p>
                <p className="font-semibold">&#36;{price}</p>
                <p>{quantity}</p>
                {/* <button onClick={null}>Remove</button>
                <button onClick={null}>Add</button> */}
              </div>
            );
          }
        )}
      </div>
      SUM {totalPrice}
    </div>
  );
};

export default Cart;
