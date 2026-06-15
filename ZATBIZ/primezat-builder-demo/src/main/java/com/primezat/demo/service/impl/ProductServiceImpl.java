package com.primezat.demo.service.impl;

import com.primezat.demo.exception.ResourceNotFoundException;
import com.primezat.demo.model.Product;
import com.primezat.demo.repository.ProductRepository;
import com.primezat.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts(Long projectId) {
        if (projectId != null) {
            return productRepository.findByProjectId(projectId);
        }
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public Product createProduct(Product product) {
        if (product.getStock() == null) {
            product.setStock(0);
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = getProductById(id);
        if (updatedProduct.getName() != null) {
            product.setName(updatedProduct.getName());
        }
        if (updatedProduct.getDescription() != null) {
            product.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getPrice() != null) {
            product.setPrice(updatedProduct.getPrice());
        }
        if (updatedProduct.getCategory() != null) {
            product.setCategory(updatedProduct.getCategory());
        }
        if (updatedProduct.getImageUrl() != null) {
            product.setImageUrl(updatedProduct.getImageUrl());
        }
        if (updatedProduct.getVariants() != null) {
            product.setVariants(updatedProduct.getVariants());
        }
        if (updatedProduct.getStock() != null) {
            product.setStock(updatedProduct.getStock());
        }
        if (updatedProduct.getAvailable() != null) {
            product.setAvailable(updatedProduct.getAvailable());
        }
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
