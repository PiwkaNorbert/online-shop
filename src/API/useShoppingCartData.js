import { useQuery } from "@tanstack/react-query";

export function useShoppingCartData() {
  const token = sessionStorage.getItem("token");
  console.log(!token);
  if (token.length === 0) return null;
  const shoppingCartQuery = useQuery(["shoppingCart"], async () => {
    const res = await fetch(`http://192.168.15.115:7777/shopping-cart/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  });

  return shoppingCartQuery;
}
