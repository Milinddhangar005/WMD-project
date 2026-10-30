// SRAMS Frontend REST API Client
// Connects with http://localhost:5000 with automatic offline/demo fallback

const API_BASE = "http://localhost:5000/api";

export async function fetchWithFallback(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[SRAMS API] Backend offline at ${API_BASE}${endpoint}. Using local state fallback.`);
    throw err;
  }
}

export const api = {
  // Stats
  getStats: () => fetchWithFallback("/stats"),

  // Rooms
  getRooms: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchWithFallback(`/rooms${query ? `?${query}` : ""}`);
  },
  
  addRoom: (data) =>
    fetchWithFallback("/rooms", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  vacateRoom: (roomId, studentId = null) =>
    fetchWithFallback(`/rooms/${roomId}/vacate`, {
      method: "POST",
      body: JSON.stringify({ studentId })
    }),

  // Requests
  getRequests: () => fetchWithFallback("/requests"),

  submitRequest: (data) =>
    fetchWithFallback("/requests", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  // Automated Allotment
  runAutoAllotment: () =>
    fetchWithFallback("/allotment/auto", {
      method: "POST"
    }),

  // Logs & Reset
  getLogs: () => fetchWithFallback("/logs"),

  resetDemoData: () =>
    fetchWithFallback("/allotment/reset", {
      method: "POST"
    }),

  // Auth
  login: (email, password, role) =>
    fetchWithFallback("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role })
    })
};
