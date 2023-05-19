import "./input.css";
import Login from "./pages/Login";

import Category from "./pages/Category";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductItem from "./pages/ProductItem";

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
    path: "/category",
    element: <Category />,
  },
  {
    path: "/category/:productName/",
    element: <Products />,
  },
  {
    path: "/product/:productId/",
    element: <ProductItem />,
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
