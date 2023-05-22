import "./input.css";
import Login from "./pages/Login";

import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductItem from "./pages/ProductItem";
import Cart from "./pages/Cart";
import Header from "./comp/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/categories",
    element: (
      <>
        <Header />
        <Categories />
      </>
    ),
  },
  {
    path: "/category/:productName/",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:productId/",
    element: (
      <>
        <Header />
        <ProductItem />
      </>
    ),
  },
  {
    path: "/cart/",
    element: <Cart />,
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
