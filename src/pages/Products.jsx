import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const { productName } = useParams();
  const token = sessionStorage.getItem("token");

  if (!token) return (window.location.href = "/login");

  const productQuery = useQuery(
    ["category", "productName", productName],
    () =>
      fetch(`http://192.168.15.115:7777/category/${productName}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: !!token && !!productName,
    }
  );

  const navigate = useNavigate();

  if (productQuery.isLoading) return <div>Loading...</div>;
  if (productQuery.isError) return <div>Error... {productQuery.error}</div>;
  return (
    <div className="flex flex-col ">
      <h1>Product</h1>
      <div
        className=" flex flex-wrap items-center justify-center gap-1 "
        onClick={(e) => {
          navigate(`/product/${e.target.closest(".is-item").dataset.item}`);
        }}
      >
        {productQuery?.data.map(
          ({ id, product_name, product_img_url, price, description }) => {
            return (
              <div
                key={id}
                data-item={id}
                className="font-md is-item group  flex cursor-pointer flex-col self-center rounded-lg border border-slate-200 p-2 text-slate-200 hover:text-[#747bff]"
              >
                <a>
                  <img
                    className="aspect-w-3 aspect-h-2 h-24 w-24 "
                    src={product_img_url}
                    alt={product_name}
                  />
                  <p className="font-bold">{price}</p>
                  <p className="text-md">{product_name}</p>
                  <p className=" isolate block group-hover:block ">
                    description {description}
                  </p>
                </a>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Products;
