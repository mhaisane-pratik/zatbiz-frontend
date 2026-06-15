package com.primezat.demo.controller;

import com.primezat.demo.model.Brand;
import com.primezat.demo.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "*")
public class BrandApiController {

    @Autowired
    private BrandRepository brandRepository;

    @GetMapping
    public List<Brand> getBrands(@RequestParam Long projectId) {
        return brandRepository.findByProjectId(projectId);
    }

    @PostMapping
    public Brand createBrand(@RequestBody Brand brand) {
        return brandRepository.save(brand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        if (brandRepository.existsById(id)) {
            brandRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
