package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.entity.Category;
import com.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Create Category
    public Category createCategory(Category category) {

        if (category.getName() == null || category.getName().trim().isEmpty()) {
            throw new RuntimeException("Category name is required");
        }

        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new RuntimeException("Category already exists");
        }

        return categoryRepository.save(category);
    }

    // Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get Category By ID
    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    // Update Category
    public Category updateCategory(Long id, Category categoryDetails) {

        Category category = getCategoryById(id);

        if (categoryDetails.getName() == null ||
                categoryDetails.getName().trim().isEmpty()) {

            throw new RuntimeException("Category name is required");
        }

        category.setName(categoryDetails.getName());

        return categoryRepository.save(category);
    }

    // Delete Category
    public void deleteCategory(Long id) {

        Category category = getCategoryById(id);

        categoryRepository.delete(category);
    }
}