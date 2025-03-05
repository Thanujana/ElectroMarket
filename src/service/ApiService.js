import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust for production

const ApiService = {
  /** 🔹 Get JWT Token */
  getAuthToken: () => localStorage.getItem("authToken"),

  /** 🔹 Get Authorization Headers */
  getHeader: () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.warn("⚠️ No auth token found. Redirecting to login...");
        return { "Content-Type": "application/json" };
    }
    return { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json" 
    };
},


  /** 🔹 User Login */
  loginUser: async (loginDetails) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, loginDetails);
        console.log("✅ Login successful:", response.data);

        // ✅ Store the token
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", JSON.stringify(response.data.role));

        return response.data;
    } catch (error) {
        console.error("❌ Login failed:", error.response?.data?.message || error.message);
        throw error;
    }
},


  /** 🔹 User Logout */
  logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      setTimeout(() => window.location.href = "/login", 1000);
  },

  /** 🔹 Check Authentication */
  isAuthenticated: () => !!localStorage.getItem("authToken"),

  /** 🔹 Get User Role */
  getUserRole: () => {
      const role = localStorage.getItem("userRole");
      return role ? JSON.parse(role) : [];
  },

  /** 🔹 Register User */
  registerUser: async (userData) => {
      try {
          const response = await axios.post(`${API_BASE_URL}/auth/register/user`, userData, {
              headers: { "Content-Type": "application/json" },
          });
          return response.data;
      } catch (error) {
          console.error("❌ Registration failed:", error.response?.data || error.message);
          throw error;
      }
  },

  /** 🔹 Fetch User Profile */
  getUserProfile: async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/users/profile`, {
              headers: ApiService.getHeader(),
              withCredentials: true,
          });
          return response.data;
      } catch (error) {
          console.error("❌ Error fetching profile:", error.response?.data || error.message);

          if (error.response?.status === 401) {
              ApiService.logout();
              setTimeout(() => window.location.href = "/login", 1500);
          }

          throw error;
      }
  },

  /** 🔹 Update User Profile */
  updateUserProfile: async (updatedData) => {
      try {
          const response = await axios.put(`${API_BASE_URL}/users/profile`, updatedData, {
              headers: ApiService.getHeader(),
          });
          return response.data;
      } catch (error) {
          console.error("❌ Error updating profile:", error.response?.data || error.message);
          throw error;
      }
  },

  /** 🔹 Fetch Approved Products */
  getApprovedProducts: async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/products/buyer`, {
              headers: ApiService.getHeader(),
          });
          return response.data;
      } catch (error) {
          console.error("❌ Error fetching products:", error.response?.data || error.message);
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
          console.error(`❌ Error fetching product ID ${id}:`, error.response?.data || error.message);
          throw error;
      }
  },

  /** 🔹 Approve a Product */
  approveProduct: async (id) => {
      try {
          const response = await axios.put(`${API_BASE_URL}/products/approve/${id}`, {}, {
              headers: ApiService.getHeader(),
          });
          return response.data;
      } catch (error) {
          console.error(`❌ Error approving product ID ${id}:`, error.response?.data || error.message);
          throw error;
      }
  },

};

export default ApiService;
