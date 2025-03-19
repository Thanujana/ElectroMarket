package com.example.ElectroMart.Service;

import com.example.ElectroMart.Model.Order;
import com.example.ElectroMart.Model.OrderItem;
import com.example.ElectroMart.Model.Product;
import com.example.ElectroMart.Repository.OrderRepository;
import com.example.ElectroMart.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository; // ✅ Inject ProductRepository to modify stock

    // ✅ Place a new order & update stock
    public Order placeOrder(Order order) {
        if (order.getShippingAddress() == null) {
            throw new RuntimeException("Shipping address is missing.");
        }

        order.setStatus("Ordered"); // Default status

        // ✅ Loop through order items to update stock
        for (OrderItem item : order.getItems()) {
            Optional<Product> productOptional = productRepository.findById(item.getProductId());

            if (productOptional.isPresent()) {
                Product product = productOptional.get();

                // ✅ Check if stock is available
                if (product.getStock() < item.getQuantity()) {
                    throw new RuntimeException("❌ Not enough stock available for product: " + product.getName());
                }

                // ✅ Reduce stock
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product); // ✅ Save updated stock
            } else {
                throw new RuntimeException("❌ Product not found: " + item.getProductId());
            }
        }

        return orderRepository.save(order); // ✅ Save the order
    }


    // ✅ Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ Get order by ID
    public Optional<Order> getOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }

    // ✅ Get orders by user ID
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // ✅ Update order status (e.g., "Shipped", "Delivered", "Cancelled")
    public Order updateOrderStatus(String orderId, String newStatus) {
        Optional<Order> existingOrder = orderRepository.findById(orderId);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setStatus(newStatus);
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found.");
    }

    // ✅ Approve an order (Set status to "Approved")
    public Order approveOrder(String orderId) {
        return updateOrderStatus(orderId, "Approved");
    }

    // ✅ Reject an order (Set status to "Rejected")
    public Order rejectOrder(String orderId) {
        return updateOrderStatus(orderId, "Rejected");
    }
}
