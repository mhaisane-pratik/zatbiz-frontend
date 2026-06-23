package com.primezat.demo.controller;

import com.primezat.demo.model.RestaurantData;
import com.primezat.demo.repository.RestaurantDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant-data")
@CrossOrigin(origins = "*")
public class RestaurantDataApiController {

    @Autowired
    private RestaurantDataRepository restaurantDataRepository;

    // Get all restaurant custom data, optionally filtered by projectId and/or dataType
    @GetMapping
    public ResponseEntity<List<RestaurantData>> getRestaurantData(
            @RequestParam Long projectId,
            @RequestParam(required = false) String dataType) {
        
        List<RestaurantData> dataList;
        if (dataType != null && !dataType.trim().isEmpty()) {
            dataList = restaurantDataRepository.findByProjectIdAndDataType(projectId, dataType.trim());
        } else {
            dataList = restaurantDataRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(dataList);
    }

    // Get a specific custom data item by ID
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantData> getRestaurantDataById(@PathVariable Long id) {
        Optional<RestaurantData> data = restaurantDataRepository.findById(id);
        return data.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new restaurant custom data item
    @PostMapping
    public ResponseEntity<RestaurantData> createRestaurantData(@RequestBody RestaurantData data) {
        RestaurantData saved = restaurantDataRepository.save(data);
        return ResponseEntity.ok(saved);
    }

    // Update an existing restaurant custom data item
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRestaurantData(
            @PathVariable Long id,
            @RequestBody RestaurantData updatedData) {
        Optional<RestaurantData> optionalData = restaurantDataRepository.findById(id);
        if (optionalData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RestaurantData existing = optionalData.get();
        if (updatedData.getDataType() != null) {
            existing.setDataType(updatedData.getDataType());
        }
        if (updatedData.getDataJson() != null) {
            existing.setDataJson(updatedData.getDataJson());
        }
        RestaurantData saved = restaurantDataRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    // Delete a restaurant custom data item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurantData(@PathVariable Long id) {
        Optional<RestaurantData> optionalData = restaurantDataRepository.findById(id);
        if (optionalData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        restaurantDataRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
