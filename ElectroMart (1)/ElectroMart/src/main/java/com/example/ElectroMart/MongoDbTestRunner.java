package com.example.ElectroMart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.ElectroMart.Model.Product;
import com.example.ElectroMart.Repository.ProductRepository;

@Component
public class MongoDbTestRunner implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create a sample Product
        Product product = new Product();
        product.setName("Sample Product");
        product.setPrice(50.0);

        // Save to MongoDB
        productRepository.save(product);

        // Retrieve and print all Products
        System.out.println("Products in MongoDB:");
        productRepository.findAll().forEach(System.out::println);
    }
}
