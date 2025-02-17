import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust if needed

const ApiService = {
  /** 🔹 Get JWT Token from Local Storage */
  getAuthToken: () => localStorage.getItem("authToken"),

  /** 🔹 Get Authorization Headers */
  getHeader: () => {
    const token = ApiService.getAuthToken();
    if (!token) return {}; // Return empty headers if no token exists

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  },

  /** 🔹 User Login */
  loginUser: async (loginDetails) => {
    try {
      console.log("📤 Sending login request:", loginDetails);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginDetails);
      console.log("✅ Login successful:", response.data);

      // Store token & role in local storage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", JSON.stringify(response.data.role)); // Store role as an array

      return response.data;
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      throw error;
    }
  },

  /** 🔹 Register a New Buyer */
  registerUser: async (userData) => {
    try {
      console.log("📤 Registering new user:", userData);
      const response = await axios.post(`${API_BASE_URL}/auth/register/user`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ User registered successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ User registration failed:", error.response?.data || error.message);
      throw error;
    }
  },

  /** 🔹 Register a New Seller */
  registerSeller: async (sellerData) => {
    try {
      console.log("📤 Registering new seller:", JSON.stringify(sellerData, null, 2)); // Debugging
      const response = await axios.post(`${API_BASE_URL}/auth/register/seller`, sellerData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Seller registered successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Seller registration failed:", error.response?.data || error.message);
      throw error;
    }
  },

  /** 🔹 Fetch User Profile */
  getUserProfile: async () => {
    try {
      const token = ApiService.getAuthToken();
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: ApiService.getHeader(),
        withCredentials: true,  // ✅ Set to `true` if using cookies for auth
      });

      console.log("✅ User profile fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user profile:", error.response?.data || error.message);

      // If unauthorized, log the user out
      if (error.response?.status === 401) {
        ApiService.logout();
        window.location.href = "/login";
      }

      throw error;
    }
  },

  /** 🔹 Logout */
  logout: () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  },

  /** 🔹 Check if User is Authenticated */
  isAuthenticated: () => !!localStorage.getItem("authToken"),

  /** 🔹 Get User Role */
  getUserRole: () => {
    const role = localStorage.getItem("userRole");
    return role ? JSON.parse(role) : [];
  },

  /** 🔹 Fetch Approved Products */
  getApprovedProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/buyer`, {
        headers: ApiService.getHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching approved products:", error.response?.data || error.message);
      throw error;
    }
  },

  /** 🔹 Fetch Product by ID */
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
        headers: ApiService.getHeader(),
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching product with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /** 🔹 Approve a Product */
  approveProduct: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/approve/${id}`, {}, {
        headers: ApiService.getHeader(),
      });
      console.log(`✅ Product with ID ${id} approved.`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error approving product with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
};

export default ApiService;
