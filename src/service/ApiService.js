const ApiService = {
  // Get user data from localStorage
  getUserData: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    const userData = ApiService.getUserData();
    return !!userData; // User is authenticated if userData exists
  },

  // Check if the user is an admin
  isAdmin: () => {
    const userData = ApiService.getUserData();
    return userData?.role === "admin"; // User is admin if role is "admin"
  },

  // Save user data to localStorage (e.g., after login or registration)
  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User logged in:", userData);
  },

  // Simulate logout functionality
  logout: () => {
    localStorage.removeItem("userData");
    console.log("User logged out");
  },
};

export default ApiService;
