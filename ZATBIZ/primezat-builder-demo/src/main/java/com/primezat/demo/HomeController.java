package com.primezat.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> homeIndex() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Primezat Builder API");
        response.put("version", "1.0.0");
        return response;
    }
}