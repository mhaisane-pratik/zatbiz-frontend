package com.primezat.demo.controller;

import com.primezat.demo.model.HospitalInfo;
import com.primezat.demo.repository.HospitalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/hospital")
@CrossOrigin(origins = "*")
public class HospitalInfoApiController {

    @Autowired
    private HospitalInfoRepository repository;

    @GetMapping
    public ResponseEntity<HospitalInfo> getHospitalInfo(@RequestParam Long projectId) {
        Optional<HospitalInfo> infoOpt = repository.findByProjectId(projectId);
        if (infoOpt.isPresent()) {
            return ResponseEntity.ok(infoOpt.get());
        }
        
        // Return default/empty if not present
        HospitalInfo defaultInfo = new HospitalInfo();
        defaultInfo.setProjectId(projectId);
        defaultInfo.setSubcategory("General Clinic");
        defaultInfo.setCompanyName("Hope Care Hospital");
        defaultInfo.setThemeColor("#4f46e5");
        return ResponseEntity.ok(defaultInfo);
    }

    @PostMapping
    public ResponseEntity<HospitalInfo> createHospitalInfo(@RequestParam Long projectId, @RequestBody HospitalInfo hospitalInfo) {
        hospitalInfo.setProjectId(projectId);
        Optional<HospitalInfo> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            HospitalInfo existing = opt.get();
            updateFields(existing, hospitalInfo);
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.ok(repository.save(hospitalInfo));
    }

    @PutMapping
    public ResponseEntity<HospitalInfo> updateHospitalInfo(@RequestParam Long projectId, @RequestBody HospitalInfo hospitalInfo) {
        hospitalInfo.setProjectId(projectId);
        Optional<HospitalInfo> opt = repository.findByProjectId(projectId);
        HospitalInfo toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            updateFields(toSave, hospitalInfo);
        } else {
            toSave = hospitalInfo;
        }
        return ResponseEntity.ok(repository.save(toSave));
    }

    private void updateFields(HospitalInfo existing, HospitalInfo source) {
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
    }
}
