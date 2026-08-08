const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function getCars(category) {
  const query = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/cars${query}`);
}

export function getCategories() {
  return request("/categories");
}

export function createBooking(payload) {
  return request("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBookings() {
  return request("/bookings");
}
