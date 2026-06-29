package com.primezat.demo.controller;

import com.primezat.demo.model.GymInfo;
import com.primezat.demo.repository.GymInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/gym")
@CrossOrigin(origins = "*")
public class GymInfoApiController {

    @Autowired
    private GymInfoRepository repository;

    @GetMapping
    public ResponseEntity<GymInfo> getGymInfo(@RequestParam Long projectId) {
        Optional<GymInfo> infoOpt = repository.findByProjectId(projectId);
        if (infoOpt.isPresent()) {
            return ResponseEntity.ok(infoOpt.get());
        }
        
        // Return default/empty if not present
        GymInfo defaultInfo = new GymInfo();
        defaultInfo.setProjectId(projectId);
        defaultInfo.setSubcategory("Traditional Gym");
        defaultInfo.setClubName("Iron Forge Gym");
        defaultInfo.setThemeColor("#ea580c");
        return ResponseEntity.ok(defaultInfo);
    }

    @PostMapping
    public ResponseEntity<GymInfo> createGymInfo(@RequestParam Long projectId, @RequestBody GymInfo gymInfo) {
        gymInfo.setProjectId(projectId);
        Optional<GymInfo> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            GymInfo existing = opt.get();
            updateFields(existing, gymInfo);
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.ok(repository.save(gymInfo));
    }

    @PutMapping
    public ResponseEntity<GymInfo> updateGymInfo(@RequestParam Long projectId, @RequestBody GymInfo gymInfo) {
        gymInfo.setProjectId(projectId);
        Optional<GymInfo> opt = repository.findByProjectId(projectId);
        GymInfo toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            updateFields(toSave, gymInfo);
        } else {
            toSave = gymInfo;
        }
        return ResponseEntity.ok(repository.save(toSave));
    }

    private void updateFields(GymInfo existing, GymInfo source) {
        existing.setSubcategory(source.getSubcategory());
        existing.setClubName(source.getClubName());
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
        existing.setHeaderBgImage(source.getHeaderBgImage());
        existing.setSelectedLoginLayout(source.getSelectedLoginLayout());
    }
}
