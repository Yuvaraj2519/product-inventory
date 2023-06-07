package com.example.product.Controller;

import com.example.product.Service.ExpireCheckServiceImpl;
import com.example.product.Service.ProductServiceImpl;
import com.example.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductServiceImpl service;

    @Autowired
    private ExpireCheckServiceImpl expire;

    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestBody Product product){

        long days = expire.checkExpire(product);
        if(days>=90)
            product.setExpire("Expired!");
        else
            product.setExpire("Not Expired");
        try{
            service.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/viewAllProducts")
    public ResponseEntity<List> viewProducts() throws ParseException {

        try{
            List<Product> pl = service.findAllProduct();
            if(pl.size()==0){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            else
                return ResponseEntity.ok(pl);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/viewProduct")
    public ResponseEntity<Product> getProduct(@RequestParam String id){
        Product p = service.findById(id);
        return ResponseEntity.ok(p);
    }

    @PutMapping("/updateProduct")
    public ResponseEntity<String> updateProduct(@RequestBody Product product,@RequestParam String id){
        Product present = service.findById(id);
        Product update =service.updateIt(product,present,id);
        long days = expire.checkExpire(update);
        if(days>=90)
            update.setExpire("Expired!");
        else
            update.setExpire("Not Expired");
        try{
            service.addProduct(update);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/removeItem")
    public ResponseEntity<String> removeProduct(@RequestParam String id){
        try{
            service.removeProduct(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
