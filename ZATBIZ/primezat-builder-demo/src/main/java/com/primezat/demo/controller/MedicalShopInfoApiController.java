package com.primezat.demo.controller;

import com.primezat.demo.model.MedicalShopInfo;
import com.primezat.demo.repository.MedicalShopInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/medical-shop/info")
@CrossOrigin(origins = "*")
public class MedicalShopInfoApiController {

    @Autowired
    private MedicalShopInfoRepository repository;

    @GetMapping
    public ResponseEntity<MedicalShopInfo> getInfo(@RequestParam Long projectId) {
        Optional<MedicalShopInfo> infoOpt = repository.findByProjectId(projectId);
        if (infoOpt.isPresent()) {
            return ResponseEntity.ok(infoOpt.get());
        }
        
        // Return default/empty if not present
        MedicalShopInfo defaultInfo = new MedicalShopInfo();
        defaultInfo.setProjectId(projectId);
        defaultInfo.setSubcategory("Pharmacy & Wellness");
        defaultInfo.setCompanyName("MedShop Rx");
        defaultInfo.setThemeColor("#10b981"); // Emerald color default
        return ResponseEntity.ok(defaultInfo);
    }

    @PostMapping
    public ResponseEntity<MedicalShopInfo> createInfo(@RequestParam Long projectId, @RequestBody MedicalShopInfo info) {
        info.setProjectId(projectId);
        Optional<MedicalShopInfo> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            MedicalShopInfo existing = opt.get();
            updateFields(existing, info);
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.ok(repository.save(info));
    }

    @PutMapping
    public ResponseEntity<MedicalShopInfo> updateInfo(@RequestParam Long projectId, @RequestBody MedicalShopInfo info) {
        info.setProjectId(projectId);
        Optional<MedicalShopInfo> opt = repository.findByProjectId(projectId);
        MedicalShopInfo toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            updateFields(toSave, info);
        } else {
            toSave = info;
        }
        return ResponseEntity.ok(repository.save(toSave));
    }

    private void updateFields(MedicalShopInfo existing, MedicalShopInfo source) {
        existing.setSubcategory(source.getSubcategory());
        existing.setCompanyName(source.getCompanyName());
        existing.setBusinessName(source.getBusinessName());
        existing.setCompanyDescription(source.getCompanyDescription());
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
