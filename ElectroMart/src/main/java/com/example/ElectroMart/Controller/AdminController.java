package com.example.ElectroMart.Controller;

import com.example.ElectroMart.Model.Order;
import com.example.ElectroMart.Model.Product;
import com.example.ElectroMart.Model.User;
import com.example.ElectroMart.Repository.UserRepository;
import com.example.ElectroMart.Service.AdminService;
import com.example.ElectroMart.Service.OrderService;
import com.example.ElectroMart.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Autowired  // Inject UserRepository
    private UserRepository userRepository;
    // ✅ Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body("Email and password are required.");
            }

            String token = adminService.loginAdmin(email, password);
            return ResponseEntity.ok(Map.of("token", token, "role", "ROLE_ADMIN", "userId", email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Login failed: " + e.getMessage()));
        }
    }

    // ✅ Get Admin Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<?> getAdminDashboard() {
        try {
            return ResponseEntity.ok(adminService.getAdminDashboard());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // ✅ Get All Users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(adminService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // ✅ Approve User
    @PutMapping("/users/approve/{id}")
    public ResponseEntity<?> approveUser(@PathVariable String id) {
        try {
            adminService.approveUser(id);
            return ResponseEntity.ok("User approved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    /* 📦✅ Product Management (Admin Only) */

    // ✅ Get All Products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ✅ Add New Product
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(product));
    }

    // ✅ Approve a product
    // ✅ Approve a product
    @PutMapping("/products/approve/{id}")
    public ResponseEntity<String> approveProduct(@PathVariable String id) {
        Optional<Product> productOptional = productService.getProductById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setApproved(true); // ✅ Mark product as approved
            productService.saveProduct(product); // ✅ Save the updated product

            return ResponseEntity.ok("Product approved successfully!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
    }



    // ✅ Reject a product
    @DeleteMapping("/products/reject/{id}")
    public ResponseEntity<String> rejectProduct(@PathVariable String id) {
        productService.rejectProduct(id);
        return ResponseEntity.ok("Product rejected successfully!");
    }
    // ✅ Update Product
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    // ✅ Delete Product
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully!");
    }

    /* 📦✅ Order Management (Admin Only) */

    // ✅ Get All Orders
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ✅ Approve Order
    @PutMapping("/orders/approve/{orderId}")
    public ResponseEntity<?> approveOrder(@PathVariable String orderId) {
        orderService.approveOrder(orderId);
        return ResponseEntity.ok("Order approved successfully!");
    }

    // ✅ Reject Order
    @PutMapping("/orders/reject/{orderId}")
    public ResponseEntity<?> rejectOrder(@PathVariable String orderId) {
        orderService.rejectOrder(orderId);
        return ResponseEntity.ok("Order rejected successfully!");
    }
    @PutMapping("/users/block")
    public ResponseEntity<String> blockUser(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActive(false); // Set user as blocked
            userRepository.save(user);
            return ResponseEntity.ok("User blocked successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }


    @PutMapping("/users/unblock")
    public ResponseEntity<String> unblockUser(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActive(true); // Set user as active
            userRepository.save(user);
            return ResponseEntity.ok("User unblocked successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }

    @DeleteMapping("/users/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return ResponseEntity.ok("User deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }


}
