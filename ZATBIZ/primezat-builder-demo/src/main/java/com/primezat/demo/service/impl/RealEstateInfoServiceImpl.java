package com.primezat.demo.service.impl;

import com.primezat.demo.model.RealEstateInfo;
import com.primezat.demo.repository.RealEstateInfoRepository;
import com.primezat.demo.service.RealEstateInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RealEstateInfoServiceImpl implements RealEstateInfoService {

    @Autowired
    private RealEstateInfoRepository repository;

    @Override
    public RealEstateInfo getByProjectId(Long projectId) {
        Optional<RealEstateInfo> opt = repository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return opt.get();
        }
        // Return default/blank settings if not initialized yet
        RealEstateInfo defaults = new RealEstateInfo();
        defaults.setProjectId(projectId);
        defaults.setCompanyName("My Real Estate Agency");
        defaults.setBusinessName("Real Estate Hub");
        defaults.setCompanyDescription("Find luxury, commercial, and residential properties.");
        defaults.setLogoType("auto");
        defaults.setThemeColor("emerald");
        return defaults;
    }

    @Override
    public RealEstateInfo save(Long projectId, RealEstateInfo realEstateInfo) {
        Optional<RealEstateInfo> opt = repository.findByProjectId(projectId);
        RealEstateInfo toSave;
        if (opt.isPresent()) {
            toSave = opt.get();
            toSave.setNiches(realEstateInfo.getNiches());
            toSave.setCompanyName(realEstateInfo.getCompanyName());
            toSave.setBusinessName(realEstateInfo.getBusinessName());
            toSave.setCompanyDescription(realEstateInfo.getCompanyDescription());
            toSave.setOwnerName(realEstateInfo.getOwnerName());
            toSave.setMobileNo(realEstateInfo.getMobileNo());
            toSave.setEmail(realEstateInfo.getEmail());
            toSave.setWhatsappNo(realEstateInfo.getWhatsappNo());
            toSave.setCity(realEstateInfo.getCity());
            toSave.setState(realEstateInfo.getState());
            toSave.setCountry(realEstateInfo.getCountry());
            toSave.setPincode(realEstateInfo.getPincode());
            toSave.setLogoType(realEstateInfo.getLogoType());
            toSave.setLogoUrl(realEstateInfo.getLogoUrl());
            toSave.setBrandImageUrl(realEstateInfo.getBrandImageUrl());
            toSave.setThemeColor(realEstateInfo.getThemeColor());
        } else {
            toSave = realEstateInfo;
            toSave.setProjectId(projectId);
        }
        return repository.save(toSave);
    }
}
