package com.primezat.demo.service;

import com.primezat.demo.model.RealEstateInfo;

public interface RealEstateInfoService {
    RealEstateInfo getByProjectId(Long projectId);
    RealEstateInfo save(Long projectId, RealEstateInfo realEstateInfo);
}
