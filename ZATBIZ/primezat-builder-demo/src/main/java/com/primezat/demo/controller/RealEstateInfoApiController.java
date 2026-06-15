package com.primezat.demo.controller;

import com.primezat.demo.model.RealEstateInfo;
import com.primezat.demo.service.RealEstateInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/realestate")
@CrossOrigin(origins = "*")
public class RealEstateInfoApiController {

    @Autowired
    private RealEstateInfoService service;

    @GetMapping
    public ResponseEntity<RealEstateInfo> getRealEstateInfo(@RequestParam Long projectId) {
        RealEstateInfo info = service.getByProjectId(projectId);
        return ResponseEntity.ok(info);
    }

    @PutMapping
    public ResponseEntity<RealEstateInfo> updateRealEstateInfo(@RequestParam Long projectId, @RequestBody RealEstateInfo realEstateInfo) {
        RealEstateInfo saved = service.save(projectId, realEstateInfo);
        return ResponseEntity.ok(saved);
    }

    @PostMapping
    public ResponseEntity<RealEstateInfo> createRealEstateInfo(@RequestParam Long projectId, @RequestBody RealEstateInfo realEstateInfo) {
        RealEstateInfo saved = service.save(projectId, realEstateInfo);
        return ResponseEntity.ok(saved);
    }
}
