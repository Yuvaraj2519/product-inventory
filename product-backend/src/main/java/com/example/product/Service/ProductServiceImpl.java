package com.example.product.Service;

import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository repo;

    @Override
    public String addProduct(Product product) {
        repo.save(product);
        return null;
    }

    @Override
    public List<Product> findAllProduct() {

        return repo.findAll();
    }

    @Override
    public Product findById(String id) {
        return repo.findProductById(id);
    }

    @Override
    public Product updateIt(Product product,Product present,String id) {

        present.setProduct_name(product.getProduct_name());
        present.setStoredDate(product.getStoredDate());
        present.setCount(product.getCount());
        present.setPrice(product.getPrice());

        return present;
    }

    @Override
    public void removeProduct(String id) {
        repo.delete(findById(id));
    }
}
