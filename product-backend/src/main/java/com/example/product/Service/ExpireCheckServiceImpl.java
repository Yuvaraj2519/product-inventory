package com.example.product.Service;

import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class ExpireCheckServiceImpl implements ExpireCheckService{

    @Autowired
    private ProductRepository repo;

    @Override
    public long checkExpire(Product p) {

        LocalDate stored = p.getStoredDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate now = LocalDate.now();

        Duration diff = Duration.between(stored.atStartOfDay(), now.atStartOfDay());

        long diffDays = diff.toDays();
        return diffDays;
    }
}
