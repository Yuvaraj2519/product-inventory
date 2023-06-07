package com.example.product.Service;

import com.example.product.model.Product;

import java.util.List;

public interface ProductService {

    String addProduct(Product product);
    List<Product> findAllProduct();
    Product findById(String id);
    Product updateIt(Product product,Product present,String id);
    void removeProduct(String id);
}
