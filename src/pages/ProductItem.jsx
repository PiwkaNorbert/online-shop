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

  const addToCartHandler = (e) =>
    fetch(
      `http://192.168.15.115:7777/add-to-cart/${
        e.target.closest(".is-item").dataset.item
      }`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((res) => res.json());

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
                {/* <AddToCart id={id} /> */}
                <button
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
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ProductItem;
