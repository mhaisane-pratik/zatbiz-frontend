package com.primezat.demo.controller;

import com.primezat.demo.model.StoreSettings;
import com.primezat.demo.repository.StoreSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class StoreSettingsApiController {

    @Autowired
    private StoreSettingsRepository storeSettingsRepository;

    @GetMapping
    public ResponseEntity<StoreSettings> getSettings(@RequestParam Long projectId) {
        Optional<StoreSettings> opt = storeSettingsRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        // Return default/blank settings if not initialized yet
        StoreSettings defaults = new StoreSettings(projectId, "My Shop", "", 18.0, 0.0, true, true, true);
        return ResponseEntity.ok(defaults);
    }

    @PutMapping
    public ResponseEntity<StoreSettings> updateSettings(@RequestParam Long projectId, @RequestBody StoreSettings settings) {
        Optional<StoreSettings> opt = storeSettingsRepository.findByProjectId(projectId);
        StoreSettings toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            toSave.setStoreName(settings.getStoreName());
            toSave.setLogoUrl(settings.getLogoUrl());
            toSave.setTaxRate(settings.getTaxRate());
            toSave.setShippingFee(settings.getShippingFee());
            toSave.setEnableUpi(settings.getEnableUpi());
            toSave.setEnableCard(settings.getEnableCard());
            toSave.setEnableCod(settings.getEnableCod());
        } else {
            toSave = settings;
            toSave.setProjectId(projectId);
        }
        return ResponseEntity.ok(storeSettingsRepository.save(toSave));
    }
}
