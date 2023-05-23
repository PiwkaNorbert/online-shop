import React from "react";

const OrderSuccess = () => {
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center text-slate-300">
      <div className="rounded-2xl border border-slate-200/20 bg-bkg-2 p-5  ">
        <h1 className="mb-3 text-3xl ">Order</h1>

        <section className="max-h-[400px] space-y-4  bg-bkg-2 p-5  px-7  ">
          Your order was successful
          <div className="mt-4 ">
            <a href="/categories" className="text-accent-1">
              {" "}
              Return to Categories!{" "}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderSuccess;
