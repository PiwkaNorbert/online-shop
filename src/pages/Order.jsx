import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const token = sessionStorage.getItem("token");

  if (token === null) return <div> Please login</div>;
  const { orderId } = useParams();
  const orderQuery = useQuery(["orders"], async () => {
    const res = await fetch(
      `http://192.168.15.115:7777/show-order/${orderId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    console.log(data);
    return data;
  });
  console.log(orderQuery.data);

  if (orderQuery.isLoading) return <div>Loading...</div>;
  if (orderQuery.isError) return <div>Error... {orderQuery.error}</div>;
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-slate-300">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 p-5  ">
        <h1 className="mb-3 text-3xl ">Orders</h1>
        {orderQuery.isLoading ? (
          <div>Loading...</div>
        ) : orderQuery.isSuccess ? (
          orderQuery?.data.map(
            ({ id, done, items, payment_url, total_price, user }) => {
              return (
                <div key={id} className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <a
                          className="cursor-pointer text-accent-1"
                          href={`/order/${id}`}
                        >
                          <span className="font-bold"> Order ID: </span>
                          {id}
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <span className="font-bold">Total Price:</span>
                        <span>&#36; {total_price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <span className="font-bold">Done:</span>
                        <span>{done ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold">Items:</span>
                        <span>
                          {items.map((item) => {
                            return <span key={item.id}>{item.name}, </span>;
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
              );
            }
          )
        ) : (
          <div>No orders could be fetched</div>
        )}
      </div>
    </div>
  );
};

export default Order;
