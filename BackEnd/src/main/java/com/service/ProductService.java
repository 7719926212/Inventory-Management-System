package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dto.ProductRequest;
import com.entity.Category;
import com.entity.Product;
import com.repository.CategoryRepository;
import com.repository.ProductRepository;

@Service
public class ProductService {

    private static final int LOW_STOCK_LIMIT = 10;

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // CREATE PRODUCT
    public Product createProduct(ProductRequest request) {

        validateProductRequest(request);

        if (productRepository.existsBySku(request.getSku())) {
            throw new RuntimeException("SKU already exists");
        }

        Category category = categoryRepository.findById(
                request.getCategoryId()
        ).orElseThrow(() ->
                new RuntimeException("Category not found"));

        Product product = new Product();

        product.setCategory(category);
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());

        return productRepository.save(product);
    }

    // GET ALL PRODUCTS
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET PRODUCT BY ID
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id));
    }

    // UPDATE PRODUCT
    public Product updateProduct(
            Long id,
            ProductRequest request) {

        validateProductRequest(request);

        Product product = getProductById(id);

        Category category = categoryRepository.findById(
                request.getCategoryId()
        ).orElseThrow(() ->
                new RuntimeException("Category not found"));

        if (!product.getSku().equals(request.getSku())
                && productRepository.existsBySku(request.getSku())) {

            throw new RuntimeException("SKU already exists");
        }

        product.setCategory(category);
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());

        return productRepository.save(product);
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {

        Product product = getProductById(id);

        productRepository.delete(product);
    }

    // SEARCH BY NAME
    public List<Product> searchByName(String name) {

        return productRepository
                .findByNameContainingIgnoreCase(name);
    }

    // SEARCH BY SKU
    public List<Product> searchBySku(String sku) {

        return productRepository
                .findBySkuContainingIgnoreCase(sku);
    }

    // LOW STOCK PRODUCTS
    public List<Product> getLowStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getQuantity() <= LOW_STOCK_LIMIT)
                .toList();
    }

    // UPDATE STOCK
    public Product updateStock(
            Long id,
            Integer quantity) {

        if (quantity == null || quantity < 0) {
            throw new RuntimeException(
                    "Quantity cannot be negative");
        }

        Product product = getProductById(id);

        product.setQuantity(quantity);

        return productRepository.save(product);
    }

    // VALIDATION
    private void validateProductRequest(
            ProductRequest request) {

        if (request == null) {
            throw new RuntimeException(
                    "Product data is required");
        }

        if (request.getCategoryId() == null) {
            throw new RuntimeException(
                    "Category is required");
        }

        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Product name is required");
        }

        if (request.getSku() == null ||
                request.getSku().trim().isEmpty()) {

            throw new RuntimeException(
                    "SKU is required");
        }

        if (request.getPrice() == null ||
                request.getPrice().signum() < 0) {

            throw new RuntimeException(
                    "Price cannot be negative");
        }

        if (request.getQuantity() == null ||
                request.getQuantity() < 0) {

            throw new RuntimeException(
                    "Quantity cannot be negative");
        }
    }
}