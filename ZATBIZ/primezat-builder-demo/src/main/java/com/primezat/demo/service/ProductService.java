package com.primezat.demo.service;

import com.primezat.demo.model.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts(Long projectId);
    Product getProductById(Long id);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product updatedProduct);
    void deleteProduct(Long id);
}
