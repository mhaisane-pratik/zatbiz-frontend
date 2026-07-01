package com.primezat.demo.controller;

import com.primezat.demo.model.Scratch;
import com.primezat.demo.repository.ScratchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/scratch")
@CrossOrigin(origins = "*")
public class ScratchApiController {

    @Autowired
    private ScratchRepository repository;

    @GetMapping
    public ResponseEntity<Scratch> getScratchInfo(@RequestParam Long projectId) {
        Optional<Scratch> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Scratch> createScratchInfo(@RequestParam Long projectId, @RequestBody Scratch scratch) {
        scratch.setProjectId(projectId);
        Optional<Scratch> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            Scratch existing = opt.get();
            updateFields(existing, scratch);
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.ok(repository.save(scratch));
    }

    @PutMapping
    public ResponseEntity<Scratch> updateScratchInfo(@RequestParam Long projectId, @RequestBody Scratch scratch) {
        scratch.setProjectId(projectId);
        Optional<Scratch> opt = repository.findByProjectId(projectId);
        Scratch toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            updateFields(toSave, scratch);
        } else {
            toSave = scratch;
        }
        return ResponseEntity.ok(repository.save(toSave));
    }

    private void updateFields(Scratch dest, Scratch src) {
        if (src.getName() != null) dest.setName(src.getName());
        if (src.getEmail() != null) dest.setEmail(src.getEmail());
        if (src.getPassword() != null) dest.setPassword(src.getPassword());
        if (src.getBusinessType() != null) dest.setBusinessType(src.getBusinessType());
        if (src.getOwnerName() != null) dest.setOwnerName(src.getOwnerName());
        if (src.getOwnerEmail() != null) dest.setOwnerEmail(src.getOwnerEmail());
        if (src.getMobileNo() != null) dest.setMobileNo(src.getMobileNo());
        if (src.getWhatsappNo() != null) dest.setWhatsappNo(src.getWhatsappNo());
        if (src.getAddress() != null) dest.setAddress(src.getAddress());
        if (src.getPhotoUrl() != null) dest.setPhotoUrl(src.getPhotoUrl());
        if (src.getLogoUrl() != null) dest.setLogoUrl(src.getLogoUrl());
        if (src.getBannerUrl() != null) dest.setBannerUrl(src.getBannerUrl());
        if (src.getSelectedTheme() != null) dest.setSelectedTheme(src.getSelectedTheme());
        if (src.getSelectedHomepageLayout() != null) dest.setSelectedHomepageLayout(src.getSelectedHomepageLayout());
        if (src.getSelectedLoginLayout() != null) dest.setSelectedLoginLayout(src.getSelectedLoginLayout());
        if (src.getSelectedDashboardLayout() != null) dest.setSelectedDashboardLayout(src.getSelectedDashboardLayout());
    }
}
