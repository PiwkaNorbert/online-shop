import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const token = sessionStorage.getItem("token");

  const categoryQuery = useQuery(["category"], () =>
    fetch("http://192.168.15.115:7777/categories/?format=json", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((res) => res.json())
  );

  const navigate = useNavigate();

  if (categoryQuery.isLoading) return <div>Loading...</div>;
  if (categoryQuery.isError) return <div>Error... {categoryQuery.error}</div>;
  return (
    <div className="flex flex-col ">
      <h1>Category</h1>
      <div onClick={(e) => navigate(`/category/${e.target.innerText}`)}>
        {categoryQuery?.data.map((category) => {
          return (
            <a
              key={category.id}
              // href="/category/product/me/"
              className="font-md "
            >
              {category.category_name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
