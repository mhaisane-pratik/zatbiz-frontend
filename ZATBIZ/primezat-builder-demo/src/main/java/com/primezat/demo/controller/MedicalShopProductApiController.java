package com.primezat.demo.controller;

import com.primezat.demo.model.MedicalShopProduct;
import com.primezat.demo.repository.MedicalShopProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medical-shop/products")
@CrossOrigin(origins = "*")
public class MedicalShopProductApiController {

    @Autowired
    private MedicalShopProductRepository repository;

    @GetMapping
    public ResponseEntity<List<MedicalShopProduct>> getProducts(@RequestParam Long projectId) {
        List<MedicalShopProduct> products = repository.findByProjectId(projectId);
        if (products.isEmpty()) {
            // Seed default medical products for a premium demo experience
            products = seedDefaultProducts(projectId);
        }
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<MedicalShopProduct> createProduct(@RequestBody MedicalShopProduct product) {
        return ResponseEntity.ok(repository.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalShopProduct> updateProduct(@PathVariable Long id, @RequestBody MedicalShopProduct product) {
        Optional<MedicalShopProduct> opt = repository.findById(id);
        if (opt.isPresent()) {
            MedicalShopProduct existing = opt.get();
            existing.setName(product.getName());
            existing.setBrand(product.getBrand());
            existing.setGenericName(product.getGenericName());
            existing.setCategory(product.getCategory());
            existing.setDescription(product.getDescription());
            existing.setUses(product.getUses());
            existing.setDosage(product.getDosage());
            existing.setIngredients(product.getIngredients());
            existing.setSideEffects(product.getSideEffects());
            existing.setWarnings(product.getWarnings());
            existing.setStorageInstructions(product.getStorageInstructions());
            existing.setExpiryInformation(product.getExpiryInformation());
            existing.setPrice(product.getPrice());
            existing.setDiscount(product.getDiscount());
            existing.setStockStatus(product.getStockStatus());
            existing.setStockCount(product.getStockCount());
            existing.setRating(product.getRating());
            existing.setImageUrl(product.getImageUrl());
            existing.setPrescriptionRequired(product.getPrescriptionRequired());
            return ResponseEntity.ok(repository.save(existing));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    private List<MedicalShopProduct> seedDefaultProducts(Long projectId) {
        List<MedicalShopProduct> list = new ArrayList<>();
        
        // 1. Medicines - Pain/Fever
        list.add(new MedicalShopProduct(projectId, "Paracetamol 650mg", "Calpol", "Paracetamol", 
            "Effective pain reliever and fever reducer used to treat headaches, muscle aches, arthritis, backache, toothaches, and colds.",
            "Fever, mild to moderate body pain, headache, dental pain.",
            "Take 1 tablet every 4-6 hours as needed. Maximum 4g (6 tablets) per 24 hours.",
            "Paracetamol 650mg, Excipients q.s.",
            "Nausea, allergic skin rashes, liver toxicity (only in extreme overdose).",
            "Do not consume with alcohol. Do not exceed the recommended dosage to avoid liver damage.",
            "Store below 30°C in a dry place. Keep away from direct sunlight and children.",
            "Expiry: Dec 2028", 29.50, 10, "In Stock", 120, 4.6, 
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80", false, "Medicines"));

        // 2. Medicines - Cold/Allergy
        list.add(new MedicalShopProduct(projectId, "Cetirizine 10mg", "Alerid", "Cetirizine Hydrochloride",
            "An antihistamine that reduces the natural chemical histamine in the body. Antihistamines can produce symptoms of sneezing, itching, watery eyes, and runny nose.",
            "Allergic rhinitis, hay fever, hives, skin itching, sneezing.",
            "1 tablet daily at bedtime. May cause mild drowsiness.",
            "Cetirizine HCl 10mg, Lactose, Maize starch.",
            "Drowsiness, dry mouth, tiredness, headache.",
            "Avoid driving or operating heavy machinery after consumption.",
            "Store in a cool, dry place. Keep out of reach of children.",
            "Expiry: Mar 2027", 18.00, 5, "In Stock", 250, 4.5,
            "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&auto=format&fit=crop&q=80", false, "Medicines"));

        // 3. Medicines - Heart/BP (Prescription Required)
        list.add(new MedicalShopProduct(projectId, "Amlodipine 5mg", "Amlopin", "Amlodipine Besylate",
            "Calcium channel blocker that dilates blood vessels to improve blood flow, widely prescribed for hypertension and chest pain (angina).",
            "High blood pressure, chronic stable angina, coronary artery disease.",
            "1 tablet daily in the morning, or as directed by a cardiologist.",
            "Amlodipine Besylate 5mg, Microcrystalline cellulose.",
            "Swelling of ankles or feet, dizziness, headache, fatigue.",
            "Regular blood pressure monitoring is required. Do not stop taking abruptly.",
            "Store in a cool dry place below 25°C. Protect from moisture.",
            "Expiry: Sep 2027", 45.00, 15, "In Stock", 90, 4.8,
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80", true, "Medicines"));

        // 4. Healthcare Devices - BP Monitor
        list.add(new MedicalShopProduct(projectId, "Digital BP Monitor", "Omron", "N/A - Medical Device",
            "Fully automatic blood pressure monitor operating on the oscillometric principle for precise measurements. Easy one-touch operation with hypertension indicator.",
            "Monitoring systolic/diastolic blood pressure and pulse rate at home.",
            "Wrap cuff around upper left arm, keep arm level with heart, press Start.",
            "High precision pressure sensor, digital LCD monitor, medium cuff (22-32 cm).",
            "None.",
            "Avoid eating, smoking, or exercising 30 minutes before taking readings.",
            "Store in its protective pouch. Avoid dropping or exposing to extreme heat.",
            "Warranty: 3 Years", 1999.00, 20, "In Stock", 15, 4.9,
            "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80", false, "Medical Devices"));

        // 5. Healthcare Devices - Nebulizer
        list.add(new MedicalShopProduct(projectId, "Compressor Nebulizer", "Philips Respironics", "N/A - Medical Device",
            "Delivers aerosol medication therapy effectively for asthma, COPD, allergies, and other respiratory disorders.",
            "Inhalation therapy for lung and airway congestion.",
            "Connect medicine cup, fill with liquid medication, turn on air compressor, inhale mist.",
            "Compressor pump, nebulizer cup, adult mask, child mask, tubing.",
            "None.",
            "Clean the medicine cup and mask thoroughly after each use to prevent bacterial growth.",
            "Store in a dust-free bag. Keep away from water sources.",
            "Warranty: 1 Year", 2499.00, 25, "In Stock", 8, 4.7,
            "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80", false, "Medical Devices"));

        // 6. Vitamins & Supplements
        list.add(new MedicalShopProduct(projectId, "Multivitamin Gold (60 Capsules)", "Revital", "Ginseng with Multivitamins & Minerals",
            "Daily nutritional supplement loaded with Ginseng extract, 10 vitamins, and 9 minerals to fight fatigue and boost immunity.",
            "Daily fatigue, low energy levels, vitamin deficiencies, physical stress.",
            "1 capsule daily with water after meals (breakfast or lunch).",
            "Ginseng Extract, Vitamin A, B-Complex, C, D3, E, Calcium, Iron, Zinc.",
            "Mild stomach upset if taken on an empty stomach.",
            "Not recommended for pregnant women or children without consulting a pediatrician.",
            "Store in a cool, dark place. Protect from heat and direct sunlight.",
            "Expiry: Oct 2027", 350.00, 12, "In Stock", 180, 4.4,
            "https://images.unsplash.com/photo-1577401230592-240406f0e9d6?w=600&auto=format&fit=crop&q=80", false, "Vitamins"));

        // 7. Personal Care
        list.add(new MedicalShopProduct(projectId, "Moisturizing Ceramide Cream", "CeraVe", "Ceramides & Hyaluronic Acid",
            "Provides 24-hour hydration and helps restore the protective skin barrier with three essential ceramides.",
            "Dry skin, eczema flare-ups, skin barrier repair.",
            "Apply liberally to clean face and body as often as needed.",
            "Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Glycerin.",
            "Extremely rare mild skin tingling.",
            "For external use only. Avoid contact with eyes.",
            "Store at room temperature. Keep container closed tightly.",
            "Expiry: Jan 2028", 599.00, 8, "In Stock", 65, 4.7,
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80", false, "Personal Care"));

        // 8. Baby Care
        list.add(new MedicalShopProduct(projectId, "Premium Diaper Pants (M-54)", "Pampers", "N/A - Baby Care",
            "Baby diaper pants with 360-degree stretch fit and anti-leak guards, offering up to 12 hours of dry comfort.",
            "Absorbing infant urine and preventing skin wetness.",
            "Pull diaper up like pants. Tear sides to remove easily.",
            "Absorbent gelling material, soft non-woven cover, elastic bands.",
            "None.",
            "Change diaper immediately when soiled to avoid diaper rash.",
            "Store in a clean, dry, hygienic place.",
            "Expiry: N/A", 749.00, 15, "In Stock", 40, 4.8,
            "https://images.unsplash.com/photo-1519689680058-324335c77eb2?w=600&auto=format&fit=crop&q=80", false, "Baby Care"));

        // 9. Medicines - Cough Syrup
        list.add(new MedicalShopProduct(projectId, "Dry Cough Relief Syrup 100ml", "Benadryl", "Dextromethorphan Hydrobromide",
            "Effective antitussive formulation designed to soothe throat tickle and suppress annoying dry coughs within 15 minutes.",
            "Dry, tickly coughs, throat irritation due to colds or allergies.",
            "10ml twice daily for adults. 5ml twice daily for children (6-12 years).",
            "Dextromethorphan HBr 15mg per 5ml, Menthol.",
            "Mild drowsiness, dizziness, constipation.",
            "Do not consume if you are taking MAO inhibitors. May cause drowsiness.",
            "Store below 25°C. Do not freeze.",
            "Expiry: Aug 2027", 115.00, 10, "In Stock", 150, 4.5,
            "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&auto=format&fit=crop&q=80", false, "Medicines"));

        // 10. Medicines - Diabetes Care (Prescription Required)
        list.add(new MedicalShopProduct(projectId, "Metformin 500mg SR", "Glycomet", "Metformin Hydrochloride",
            "Sustained-release oral anti-diabetic drug that helps control blood sugar levels in patients with type 2 diabetes.",
            "Type 2 Diabetes mellitus management.",
            "Take 1 tablet daily with dinner, or as recommended by your physician.",
            "Metformin HCl 500mg in sustained release matrix.",
            "Stomach upset, flatulence, metallic taste, nausea.",
            "Monitor kidney function regularly. Risk of lactic acidosis in rare cases.",
            "Store in a dry place below 30°C. Protect from light.",
            "Expiry: Jun 2028", 32.00, 5, "In Stock", 140, 4.7,
            "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80", true, "Medicines"));

        // Seed to repository
        for (MedicalShopProduct prod : list) {
            repository.save(prod);
        }
        
        // Return seeded list
        return repository.findByProjectId(projectId);
    }
}
