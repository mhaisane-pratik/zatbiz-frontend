package com.primezat.demo.controller;

import com.primezat.demo.model.RestaurantInfo;
import com.primezat.demo.repository.RestaurantInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant")
@CrossOrigin(origins = "*")
public class RestaurantInfoApiController {

    @Autowired
    private RestaurantInfoRepository repository;

    @GetMapping
    public ResponseEntity<RestaurantInfo> getRestaurantInfo(@RequestParam Long projectId) {
        Optional<RestaurantInfo> infoOpt = repository.findByProjectId(projectId);
        if (infoOpt.isPresent()) {
            return ResponseEntity.ok(infoOpt.get());
        }
        
        // Return default/empty if not present
        RestaurantInfo defaultInfo = new RestaurantInfo();
        defaultInfo.setProjectId(projectId);
        defaultInfo.setSubcategory("General Restaurant");
        defaultInfo.setRestaurantName("Gourmet Kitchen");
        defaultInfo.setBusinessName("Gourmet Kitchen");
        defaultInfo.setThemeColor("slate");
        return ResponseEntity.ok(defaultInfo);
    }

    @PostMapping
    public ResponseEntity<RestaurantInfo> createRestaurantInfo(@RequestParam Long projectId, @RequestBody RestaurantInfo restaurantInfo) {
        restaurantInfo.setProjectId(projectId);
        Optional<RestaurantInfo> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            RestaurantInfo existing = opt.get();
            updateFields(existing, restaurantInfo);
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.ok(repository.save(restaurantInfo));
    }

    @PutMapping
    public ResponseEntity<RestaurantInfo> updateRestaurantInfo(@RequestParam Long projectId, @RequestBody RestaurantInfo restaurantInfo) {
        restaurantInfo.setProjectId(projectId);
        Optional<RestaurantInfo> opt = repository.findByProjectId(projectId);
        RestaurantInfo toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            updateFields(toSave, restaurantInfo);
        } else {
            toSave = restaurantInfo;
        }
        return ResponseEntity.ok(repository.save(toSave));
    }

    private void updateFields(RestaurantInfo existing, RestaurantInfo source) {
        existing.setSubcategory(source.getSubcategory());
        existing.setRestaurantName(source.getRestaurantName());
        existing.setBusinessName(source.getBusinessName());
        existing.setDescription(source.getDescription());
        existing.setOwnerName(source.getOwnerName());
        existing.setMobileNo(source.getMobileNo());
        existing.setEmail(source.getEmail());
        existing.setCity(source.getCity());
        existing.setState(source.getState());
        existing.setCountry(source.getCountry());
        existing.setPincode(source.getPincode());
        existing.setLogoUrl(source.getLogoUrl());
        existing.setThemeColor(source.getThemeColor());
        existing.setSelectedTheme(source.getSelectedTheme());
        existing.setSelectedHomepageLayout(source.getSelectedHomepageLayout());
        existing.setSelectedLoginLayout(source.getSelectedLoginLayout());
        existing.setSelectedDashboardLayout(source.getSelectedDashboardLayout());
    }
}
