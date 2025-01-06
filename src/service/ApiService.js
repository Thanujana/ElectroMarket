// src/service/ApiService.js

const ApiService = {
    // Simulate if the user is an admin
    isAdmin: () => {
      // Replace this logic with your mock admin status
      return localStorage.getItem('role') === 'admin'; // Mock as admin if role is "admin"
    },
  
    // Simulate if the user is authenticated
    isAuthenticated: () => {
      // Replace this logic with your mock authentication status
      return !!localStorage.getItem('authToken'); // Mock as logged-in if authToken exists
    },
  
    // Simulate logout functionality
    logout: () => {
      // Clear mock user session data
      localStorage.removeItem('authToken');
      localStorage.removeItem('role');
      console.log('User logged out (mock)');
    },
  };
  
  export default ApiService;
  