import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddToCart from "../comp/AddToCart";

const ProductItem = () => {
  const { productId } = useParams();
  const token = sessionStorage.getItem("token");

  if (!token) return (window.location.href = "/login");

  const productItemQuery = useQuery(["product", productId], () =>
    fetch(`http://192.168.15.115:7777/product/${productId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json())
  );
  console.log(productItemQuery.data);

  const navigate = useNavigate();

  if (productItemQuery.isLoading) return <div>Loading...</div>;
  if (productItemQuery.isError)
    return <div>Error... {productItemQuery.error}</div>;
  return (
    <div className="flex flex-col text-slate-200">
      <h1>Product</h1>
      <div
        className=" flex flex-wrap items-center justify-center gap-1 "
        // onClick={(e) => {
        //   navigate(`/product/${e.target.closest(".is-item").dataset.item}`);
        // }}
      >
        {productItemQuery?.data.map(
          ({ id, product_name, product_img_url, price, description }) => {
            return (
              <div
                key={id}
                data-item={id}
                className="font-md is-item text-md group flex cursor-pointer flex-col self-center rounded-lg border border-slate-200 p-2 shadow shadow-white "
              >
                <img
                  className="aspect-w-3 aspect-h-2 h-24 w-24 "
                  src={product_img_url}
                  alt={product_name}
                />
                <p className="font-bold">{price}</p>
                <p className="">{product_name}</p>
                <p className="  ">{description}</p>
                <AddToCart id={id} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ProductItem;
