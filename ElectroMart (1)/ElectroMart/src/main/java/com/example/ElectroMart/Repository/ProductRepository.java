package com.example.ElectroMart.Repository;

import com.example.ElectroMart.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

// MongoDB repository interface
public interface ProductRepository extends MongoRepository<Product, String> {
    // Additional query methods can be defined here if needed
}
