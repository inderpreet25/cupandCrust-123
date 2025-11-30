const BASE_URL = "http://localhost:5000/api";

export async function placeOrder(orderData) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  return res.json();
}
