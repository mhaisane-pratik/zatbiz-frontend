package com.primezat.demo.controller;

import com.primezat.demo.model.Coupon;
import com.primezat.demo.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "*")
public class CouponApiController {

    @Autowired
    private CouponRepository couponRepository;

    @GetMapping
    public List<Coupon> getCoupons(@RequestParam Long projectId) {
        return couponRepository.findByProjectId(projectId);
    }

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Coupon> toggleCoupon(@PathVariable Long id) {
        Optional<Coupon> opt = couponRepository.findById(id);
        if (opt.isPresent()) {
            Coupon c = opt.get();
            c.setActive(!c.getActive());
            return ResponseEntity.ok(couponRepository.save(c));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        if (couponRepository.existsById(id)) {
            couponRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
