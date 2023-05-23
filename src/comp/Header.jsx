import React, { useEffect } from "react";
import { useShoppingCartData } from "../API/useShoppingCartData";

const Header = () => {
  const token = sessionStorage.getItem("token");

  const shoppingCartQuery = useShoppingCartData();
  // if (shoppingCartQuery.isLoading) return <div>Loading...</div>;
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full bg-bkg-1 transition-all">
      <div className="mx-auto w-full max-w-screen-xl px-5 md:px-20">
        <div className="flex h-16 items-center justify-between">
          <div></div>
          <div className="flex items-center space-x-6">
            {token !== null && (
              <>
                <a
                  className="hidden rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-white sm:block"
                  href="/Categories"
                >
                  Categories
                </a>
                <a
                  className=" hidden gap-1 rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-white sm:flex sm:items-center"
                  href="/cart"
                >
                  Cart{" "}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path>
                    </svg>
                    {token !== null &&
                    shoppingCartQuery.isSuccess &&
                    shoppingCartQuery?.data[0]?.items.length > 0 ? (
                      <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500 text-center text-xs text-white">
                        {shoppingCartQuery?.data[0]?.items.length}
                      </div>
                    ) : null}
                  </div>
                </a>
                <a
                  className="hidden rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-white sm:block"
                  href="/Orders"
                >
                  Orders
                </a>
              </>
            )}
            <button
              className=" border border-black bg-black px-5 py-1.5 text-center text-sm font-semibold text-slate-200 transition ease-in-out hover:border-accent-1 hover:text-white "
              onClick={() => {
                if (token === null)
                  return (window.location.pathname = "/login");

                sessionStorage.removeItem("token");

                return (window.location.pathname = "/");
              }}
            >
              {token === null ? "Login" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
