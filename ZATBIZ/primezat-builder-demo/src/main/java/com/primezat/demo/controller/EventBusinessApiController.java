package com.primezat.demo.controller;

import com.primezat.demo.model.*;
import com.primezat.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "*")
public class EventBusinessApiController {

    @Autowired private EventAgencyInfoRepository agencyInfoRepository;
    @Autowired private EventBookingRepository bookingRepository;
    @Autowired private EventCatalogRepository catalogRepository;
    @Autowired private EventCustomerRepository customerRepository;
    @Autowired private EventBillingRepository billingRepository;

    // ==========================================
    // DTO Definitions representing the old models
    // ==========================================
    public static class EventCategory {
        public Long id;
        public Long projectId;
        public String name;
    }

    public static class EventService {
        public Long id;
        public Long projectId;
        public String name;
        public String description;
        public Double price;
        public String imageUrl;
    }

    public static class EventPackage {
        public Long id;
        public Long projectId;
        public String name;
        public String description;
        public Double price;
        public String features;
    }

    public static class EventPortfolio {
        public Long id;
        public Long projectId;
        public String title;
        public String description;
        public String imageUrl;
        public String category;
    }

    public static class EventGallery {
        public Long id;
        public Long projectId;
        public String imageUrl;
        public String caption;
    }

    public static class EventVendor {
        public Long id;
        public Long projectId;
        public String name;
        public String serviceType;
        public String phone;
        public String email;
        public String priceRange;
    }

    public static class EventTeamMember {
        public Long id;
        public Long projectId;
        public String name;
        public String role;
        public String imageUrl;
        public String phone;
    }

    public static class EventCalendarEvent {
        public Long id;
        public Long projectId;
        public Long bookingId;
        public String title;
        public String date;
        public String notes;
    }

    public static class EventPayment {
        public Long id;
        public Long projectId;
        public Long bookingId;
        public Double amount;
        public String date;
        public String method;
        public String status;
    }

    public static class EventInvoice {
        public Long id;
        public Long projectId;
        public Long bookingId;
        public String invoiceNumber;
        public Double amount;
        public Double tax;
        public Double total;
        public String dueDate;
        public String status;
    }

    public static class EventExpense {
        public Long id;
        public Long projectId;
        public String title;
        public String category;
        public Double amount;
        public String date;
        public String notes;
    }

    public static class EventQuotation {
        public Long id;
        public Long projectId;
        public Long bookingId;
        public String description;
        public Double estimatedAmount;
        public String status;
    }

    public static class EventTestimonial {
        public Long id;
        public Long projectId;
        public String clientName;
        public String clientRole;
        public String feedback;
        public Integer rating;
    }

    public static class EventBlog {
        public Long id;
        public Long projectId;
        public String title;
        public String content;
        public String author;
        public String date;
        public String imageUrl;
    }

    public static class EventFaq {
        public Long id;
        public Long projectId;
        public String question;
        public String answer;
    }

    public static class EventContact {
        public Long id;
        public Long projectId;
        public String name;
        public String email;
        public String subject;
        public String message;
    }

    public static class EventLead {
        public Long id;
        public Long projectId;
        public String name;
        public String email;
        public String phone;
        public Double budget;
        public String message;
        public String status;
    }

    public static class EventNotification {
        public Long id;
        public Long projectId;
        public String title;
        public String message;
        public String date;
        public Boolean isRead;
    }

    public static class EventCoupon {
        public Long id;
        public Long projectId;
        public String code;
        public Double discountValue;
        public Boolean active;
    }

    public static class EventWebsiteSettings {
        public Long id;
        public Long projectId;
        public String themeName;
        public String customCss;
        public String headerLayout;
        public String footerLayout;
    }

    public static class EventSeoSettings {
        public Long id;
        public Long projectId;
        public String metaTitle;
        public String metaDescription;
        public String metaKeywords;
    }

    public static class EventBookingStatus {
        public Long id;
        public Long projectId;
        public String status;
    }

    public static class EventSupportTicket {
        public Long id;
        public Long projectId;
        public String name;
        public String email;
        public String subject;
        public String description;
        public String status;
    }

    public static class EventReview {
        public Long id;
        public Long projectId;
        public String clientName;
        public String feedback;
        public Integer rating;
    }

    public static class EventChecklistItem {
        public Long id;
        public Long projectId;
        public Long bookingId;
        public String task;
        public Boolean completed;
    }

    // --- 1. Event Agency Info ---
    @GetMapping("/agency-info")
    public ResponseEntity<EventAgencyInfo> getAgencyInfo(@RequestParam Long projectId) {
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        EventAgencyInfo defaultInfo = new EventAgencyInfo();
        defaultInfo.setProjectId(projectId);
        defaultInfo.setCompanyName("Dream Events");
        defaultInfo.setOwnerName("Manager");
        defaultInfo.setWorkingHours("9:00 AM - 7:00 PM");
        return ResponseEntity.ok(defaultInfo);
    }

    @PostMapping("/agency-info")
    public EventAgencyInfo saveAgencyInfo(@RequestParam Long projectId, @RequestBody EventAgencyInfo info) {
        info.setProjectId(projectId);
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            EventAgencyInfo existing = opt.get();
            existing.setCompanyName(info.getCompanyName());
            existing.setOwnerName(info.getOwnerName());
            existing.setBusinessEmail(info.getBusinessEmail());
            existing.setPhone(info.getPhone());
            existing.setWhatsApp(info.getWhatsApp());
            existing.setBusinessAddress(info.getBusinessAddress());
            existing.setCity(info.getCity());
            existing.setState(info.getState());
            existing.setCountry(info.getCountry());
            existing.setLogoUrl(info.getLogoUrl());
            existing.setCoverImageUrl(info.getCoverImageUrl());
            existing.setWorkingHours(info.getWorkingHours());
            existing.setGstNumber(info.getGstNumber());
            existing.setSocialMediaLinks(info.getSocialMediaLinks());
            
            // Copy website/layout configurations
            if (info.getTagline() != null) existing.setTagline(info.getTagline());
            if (info.getAboutText() != null) existing.setAboutText(info.getAboutText());
            if (info.getPrimaryColor() != null) existing.setPrimaryColor(info.getPrimaryColor());
            if (info.getSecondaryColor() != null) existing.setSecondaryColor(info.getSecondaryColor());
            
            // Copy SEO configurations
            if (info.getSeoTitle() != null) existing.setSeoTitle(info.getSeoTitle());
            if (info.getSeoKeywords() != null) existing.setSeoKeywords(info.getSeoKeywords());
            if (info.getSeoDescription() != null) existing.setSeoDescription(info.getSeoDescription());

            return agencyInfoRepository.save(existing);
        }
        return agencyInfoRepository.save(info);
    }

    // --- 2. Categories ---
    @GetMapping("/categories")
    public List<EventCategory> getCategories(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "category");
        List<EventCategory> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventCategory dto = new EventCategory();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getTitle();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/categories")
    public EventCategory createCategory(@RequestBody EventCategory category) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(category.projectId);
        item.setType("category");
        item.setTitle(category.name);
        EventCatalog saved = catalogRepository.save(item);
        category.id = saved.getId();
        return category;
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<EventCategory> updateCategory(@PathVariable Long id, @RequestBody EventCategory updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.name);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 3. Services ---
    @GetMapping("/services")
    public List<EventService> getServices(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "service");
        List<EventService> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventService dto = new EventService();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getTitle();
            dto.description = item.getDescription();
            dto.price = item.getPrice();
            dto.imageUrl = item.getImageUrl();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/services")
    public EventService createService(@RequestBody EventService service) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(service.projectId);
        item.setType("service");
        item.setTitle(service.name);
        item.setDescription(service.description);
        item.setPrice(service.price);
        item.setImageUrl(service.imageUrl);
        EventCatalog saved = catalogRepository.save(item);
        service.id = saved.getId();
        return service;
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<EventService> updateService(@PathVariable Long id, @RequestBody EventService updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.name);
        existing.setDescription(updated.description);
        existing.setPrice(updated.price);
        existing.setImageUrl(updated.imageUrl);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 4. Packages ---
    @GetMapping("/packages")
    public List<EventPackage> getPackages(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "package");
        List<EventPackage> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventPackage dto = new EventPackage();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getTitle();
            dto.description = item.getDescription();
            dto.price = item.getPrice();
            dto.features = item.getDataJson();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/packages")
    public EventPackage createPackage(@RequestBody EventPackage pack) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(pack.projectId);
        item.setType("package");
        item.setTitle(pack.name);
        item.setDescription(pack.description);
        item.setPrice(pack.price);
        item.setDataJson(pack.features);
        EventCatalog saved = catalogRepository.save(item);
        pack.id = saved.getId();
        return pack;
    }

    @PutMapping("/packages/{id}")
    public ResponseEntity<EventPackage> updatePackage(@PathVariable Long id, @RequestBody EventPackage updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.name);
        existing.setDescription(updated.description);
        existing.setPrice(updated.price);
        existing.setDataJson(updated.features);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 5. Portfolios ---
    @GetMapping("/portfolios")
    public List<EventPortfolio> getPortfolios(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "portfolio");
        List<EventPortfolio> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventPortfolio dto = new EventPortfolio();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.title = item.getTitle();
            dto.description = item.getDescription();
            dto.imageUrl = item.getImageUrl();
            dto.category = item.getSubtitle();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/portfolios")
    public EventPortfolio createPortfolio(@RequestBody EventPortfolio portfolio) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(portfolio.projectId);
        item.setType("portfolio");
        item.setTitle(portfolio.title);
        item.setDescription(portfolio.description);
        item.setImageUrl(portfolio.imageUrl);
        item.setSubtitle(portfolio.category);
        EventCatalog saved = catalogRepository.save(item);
        portfolio.id = saved.getId();
        return portfolio;
    }

    @PutMapping("/portfolios/{id}")
    public ResponseEntity<EventPortfolio> updatePortfolio(@PathVariable Long id, @RequestBody EventPortfolio updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.title);
        existing.setDescription(updated.description);
        existing.setImageUrl(updated.imageUrl);
        existing.setSubtitle(updated.category);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/portfolios/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 6. Gallery ---
    @GetMapping("/galleries")
    public List<EventGallery> getGalleries(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "gallery");
        List<EventGallery> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventGallery dto = new EventGallery();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.imageUrl = item.getImageUrl();
            dto.caption = item.getTitle();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/galleries")
    public EventGallery createGallery(@RequestBody EventGallery gallery) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(gallery.projectId);
        item.setType("gallery");
        item.setImageUrl(gallery.imageUrl);
        item.setTitle(gallery.caption);
        EventCatalog saved = catalogRepository.save(item);
        gallery.id = saved.getId();
        return gallery;
    }

    @PutMapping("/galleries/{id}")
    public ResponseEntity<EventGallery> updateGallery(@PathVariable Long id, @RequestBody EventGallery updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setImageUrl(updated.imageUrl);
        existing.setTitle(updated.caption);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/galleries/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 7. Bookings ---
    @GetMapping("/bookings")
    public List<EventBooking> getBookings(@RequestParam Long projectId) {
        return bookingRepository.findByProjectId(projectId);
    }

    @PostMapping("/bookings")
    public EventBooking createBooking(@RequestBody EventBooking booking) {
        return bookingRepository.save(booking);
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<EventBooking> updateBooking(@PathVariable Long id, @RequestBody EventBooking updated) {
        Optional<EventBooking> opt = bookingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBooking existing = opt.get();
        existing.setCustomerName(updated.getCustomerName());
        existing.setCustomerEmail(updated.getCustomerEmail());
        existing.setCustomerPhone(updated.getCustomerPhone());
        existing.setEventType(updated.getEventType());
        existing.setEventDate(updated.getEventDate());
        existing.setBudget(updated.getBudget());
        existing.setLocation(updated.getLocation());
        existing.setGuestsCount(updated.getGuestsCount());
        existing.setMessage(updated.getMessage());
        existing.setStatus(updated.getStatus());
        existing.setChecklistJson(updated.getChecklistJson());
        existing.setCalendarJson(updated.getCalendarJson());
        return ResponseEntity.ok(bookingRepository.save(existing));
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 8. Customers ---
    @GetMapping("/customers")
    public List<EventCustomer> getCustomers(@RequestParam Long projectId) {
        return customerRepository.findByProjectIdAndType(projectId, "customer");
    }

    @PostMapping("/customers")
    public EventCustomer createCustomer(@RequestBody EventCustomer customer) {
        customer.setType("customer");
        customer.setStatus("Active");
        return customerRepository.save(customer);
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<EventCustomer> updateCustomer(@PathVariable Long id, @RequestBody EventCustomer updated) {
        Optional<EventCustomer> opt = customerRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCustomer existing = opt.get();
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setNotes(updated.getNotes());
        return ResponseEntity.ok(customerRepository.save(existing));
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 9. Vendors ---
    @GetMapping("/vendors")
    public List<EventVendor> getVendors(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "vendor");
        List<EventVendor> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventVendor dto = new EventVendor();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getTitle();
            dto.serviceType = item.getSubtitle();
            if (item.getDescription() != null && item.getDescription().contains("|")) {
                String[] parts = item.getDescription().split("\\|");
                dto.phone = parts[0];
                dto.email = parts.length > 1 ? parts[1] : "";
            } else {
                dto.phone = item.getDescription();
            }
            dto.priceRange = item.getDataJson();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/vendors")
    public EventVendor createVendor(@RequestBody EventVendor vendor) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(vendor.projectId);
        item.setType("vendor");
        item.setTitle(vendor.name);
        item.setSubtitle(vendor.serviceType);
        item.setDescription(vendor.phone + "|" + vendor.email);
        item.setDataJson(vendor.priceRange);
        EventCatalog saved = catalogRepository.save(item);
        vendor.id = saved.getId();
        return vendor;
    }

    @PutMapping("/vendors/{id}")
    public ResponseEntity<EventVendor> updateVendor(@PathVariable Long id, @RequestBody EventVendor updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.name);
        existing.setSubtitle(updated.serviceType);
        existing.setDescription(updated.phone + "|" + updated.email);
        existing.setDataJson(updated.priceRange);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/vendors/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 10. Team Members ---
    @GetMapping("/team-members")
    public List<EventTeamMember> getTeamMembers(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "team_member");
        List<EventTeamMember> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventTeamMember dto = new EventTeamMember();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getTitle();
            dto.role = item.getSubtitle();
            dto.imageUrl = item.getImageUrl();
            dto.phone = item.getDescription();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/team-members")
    public EventTeamMember createTeamMember(@RequestBody EventTeamMember member) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(member.projectId);
        item.setType("team_member");
        item.setTitle(member.name);
        item.setSubtitle(member.role);
        item.setImageUrl(member.imageUrl);
        item.setDescription(member.phone);
        EventCatalog saved = catalogRepository.save(item);
        member.id = saved.getId();
        return member;
    }

    @PutMapping("/team-members/{id}")
    public ResponseEntity<EventTeamMember> updateTeamMember(@PathVariable Long id, @RequestBody EventTeamMember updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.name);
        existing.setSubtitle(updated.role);
        existing.setImageUrl(updated.imageUrl);
        existing.setDescription(updated.phone);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/team-members/{id}")
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 11. Calendar Events ---
    @GetMapping("/calendar-events")
    public List<EventCalendarEvent> getCalendarEvents(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "calendar_event");
        List<EventCalendarEvent> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventCalendarEvent dto = new EventCalendarEvent();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.title = item.getTitle();
            dto.date = item.getSubtitle();
            dto.notes = item.getDescription();
            try {
                dto.bookingId = Long.parseLong(item.getDataJson());
            } catch (Exception e) {
                dto.bookingId = null;
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/calendar-events")
    public EventCalendarEvent createCalendarEvent(@RequestBody EventCalendarEvent item) {
        EventCatalog cat = new EventCatalog();
        cat.setProjectId(item.projectId);
        cat.setType("calendar_event");
        cat.setTitle(item.title);
        cat.setSubtitle(item.date);
        cat.setDescription(item.notes);
        cat.setDataJson(item.bookingId != null ? String.valueOf(item.bookingId) : "");
        EventCatalog saved = catalogRepository.save(cat);
        item.id = saved.getId();
        return item;
    }

    @PutMapping("/calendar-events/{id}")
    public ResponseEntity<EventCalendarEvent> updateCalendarEvent(@PathVariable Long id, @RequestBody EventCalendarEvent updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.title);
        existing.setSubtitle(updated.date);
        existing.setDescription(updated.notes);
        existing.setDataJson(updated.bookingId != null ? String.valueOf(updated.bookingId) : "");
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/calendar-events/{id}")
    public ResponseEntity<Void> deleteCalendarEvent(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 12. Payments ---
    @GetMapping("/payments")
    public List<EventPayment> getPayments(@RequestParam Long projectId) {
        List<EventBilling> list = billingRepository.findByProjectIdAndType(projectId, "payment");
        List<EventPayment> result = new ArrayList<>();
        for (EventBilling item : list) {
            EventPayment dto = new EventPayment();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.amount = item.getAmountValue();
            dto.date = item.getDate();
            dto.status = item.getStatus();
            if (item.getDetailsJson() != null && item.getDetailsJson().contains("|")) {
                String[] parts = item.getDetailsJson().split("\\|");
                try {
                    dto.bookingId = Long.parseLong(parts[0]);
                } catch (Exception e) {}
                dto.method = parts.length > 1 ? parts[1] : "";
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/payments")
    public EventPayment createPayment(@RequestBody EventPayment payment) {
        EventBilling item = new EventBilling();
        item.setProjectId(payment.projectId);
        item.setType("payment");
        item.setAmount(payment.amount);
        item.setDate(payment.date);
        item.setStatus(payment.status);
        item.setDetailsJson(payment.bookingId + "|" + payment.method);
        EventBilling saved = billingRepository.save(item);
        payment.id = saved.getId();
        return payment;
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<EventPayment> updatePayment(@PathVariable Long id, @RequestBody EventPayment updated) {
        Optional<EventBilling> opt = billingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBilling existing = opt.get();
        existing.setAmount(updated.amount);
        existing.setDate(updated.date);
        existing.setStatus(updated.status);
        existing.setDetailsJson(updated.bookingId + "|" + updated.method);
        billingRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 13. Invoices ---
    @GetMapping("/invoices")
    public List<EventInvoice> getInvoices(@RequestParam Long projectId) {
        List<EventBilling> list = billingRepository.findByProjectIdAndType(projectId, "invoice");
        List<EventInvoice> result = new ArrayList<>();
        for (EventBilling item : list) {
            EventInvoice dto = new EventInvoice();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.total = item.getAmountValue();
            dto.dueDate = item.getDate();
            dto.status = item.getStatus();
            if (item.getDetailsJson() != null && item.getDetailsJson().contains("|")) {
                String[] parts = item.getDetailsJson().split("\\|");
                try {
                    dto.bookingId = Long.parseLong(parts[0]);
                } catch (Exception e) {}
                dto.invoiceNumber = parts.length > 1 ? parts[1] : "";
                try {
                    dto.amount = Double.parseDouble(parts[2]);
                } catch (Exception e) {}
                try {
                    dto.tax = Double.parseDouble(parts[3]);
                } catch (Exception e) {}
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/invoices")
    public EventInvoice createInvoice(@RequestBody EventInvoice invoice) {
        EventBilling item = new EventBilling();
        item.setProjectId(invoice.projectId);
        item.setType("invoice");
        item.setAmount(invoice.total);
        item.setDate(invoice.dueDate);
        item.setStatus(invoice.status);
        item.setDetailsJson(invoice.bookingId + "|" + invoice.invoiceNumber + "|" + invoice.amount + "|" + invoice.tax);
        EventBilling saved = billingRepository.save(item);
        invoice.id = saved.getId();
        return invoice;
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<EventInvoice> updateInvoice(@PathVariable Long id, @RequestBody EventInvoice updated) {
        Optional<EventBilling> opt = billingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBilling existing = opt.get();
        existing.setAmount(updated.total);
        existing.setDate(updated.dueDate);
        existing.setStatus(updated.status);
        existing.setDetailsJson(updated.bookingId + "|" + updated.invoiceNumber + "|" + updated.amount + "|" + updated.tax);
        billingRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 14. Expenses ---
    @GetMapping("/expenses")
    public List<EventExpense> getExpenses(@RequestParam Long projectId) {
        List<EventBilling> list = billingRepository.findByProjectIdAndType(projectId, "expense");
        List<EventExpense> result = new ArrayList<>();
        for (EventBilling item : list) {
            EventExpense dto = new EventExpense();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.amount = item.getAmountValue();
            dto.date = item.getDate();
            dto.category = item.getStatus();
            if (item.getDetailsJson() != null && item.getDetailsJson().contains("|")) {
                String[] parts = item.getDetailsJson().split("\\|");
                dto.title = parts[0];
                dto.notes = parts.length > 1 ? parts[1] : "";
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/expenses")
    public EventExpense createExpense(@RequestBody EventExpense expense) {
        EventBilling item = new EventBilling();
        item.setProjectId(expense.projectId);
        item.setType("expense");
        item.setAmount(expense.amount);
        item.setDate(expense.date);
        item.setStatus(expense.category);
        item.setDetailsJson(expense.title + "|" + expense.notes);
        EventBilling saved = billingRepository.save(item);
        expense.id = saved.getId();
        return expense;
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<EventExpense> updateExpense(@PathVariable Long id, @RequestBody EventExpense updated) {
        Optional<EventBilling> opt = billingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBilling existing = opt.get();
        existing.setAmount(updated.amount);
        existing.setDate(updated.date);
        existing.setStatus(updated.category);
        existing.setDetailsJson(updated.title + "|" + updated.notes);
        billingRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 15. Quotations ---
    @GetMapping("/quotations")
    public List<EventQuotation> getQuotations(@RequestParam Long projectId) {
        List<EventBilling> list = billingRepository.findByProjectIdAndType(projectId, "quotation");
        List<EventQuotation> result = new ArrayList<>();
        for (EventBilling item : list) {
            EventQuotation dto = new EventQuotation();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.estimatedAmount = item.getAmountValue();
            dto.status = item.getStatus();
            if (item.getDetailsJson() != null && item.getDetailsJson().contains("|")) {
                String[] parts = item.getDetailsJson().split("\\|");
                try {
                    dto.bookingId = Long.parseLong(parts[0]);
                } catch (Exception e) {}
                dto.description = parts.length > 1 ? parts[1] : "";
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/quotations")
    public EventQuotation createQuotation(@RequestBody EventQuotation quotation) {
        EventBilling item = new EventBilling();
        item.setProjectId(quotation.projectId);
        item.setType("quotation");
        item.setAmount(quotation.estimatedAmount);
        item.setDate("");
        item.setStatus(quotation.status);
        item.setDetailsJson(quotation.bookingId + "|" + quotation.description);
        EventBilling saved = billingRepository.save(item);
        quotation.id = saved.getId();
        return quotation;
    }

    @PutMapping("/quotations/{id}")
    public ResponseEntity<EventQuotation> updateQuotation(@PathVariable Long id, @RequestBody EventQuotation updated) {
        Optional<EventBilling> opt = billingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBilling existing = opt.get();
        existing.setAmount(updated.estimatedAmount);
        existing.setStatus(updated.status);
        existing.setDetailsJson(updated.bookingId + "|" + updated.description);
        billingRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/quotations/{id}")
    public ResponseEntity<Void> deleteQuotation(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 16. Testimonials ---
    @GetMapping("/testimonials")
    public List<EventTestimonial> getTestimonials(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "testimonial");
        List<EventTestimonial> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventTestimonial dto = new EventTestimonial();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.clientName = item.getTitle();
            dto.clientRole = item.getSubtitle();
            dto.feedback = item.getDescription();
            dto.rating = item.getPrice() != null ? item.getPrice().intValue() : 5;
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/testimonials")
    public EventTestimonial createTestimonial(@RequestBody EventTestimonial testimonial) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(testimonial.projectId);
        item.setType("testimonial");
        item.setTitle(testimonial.clientName);
        item.setSubtitle(testimonial.clientRole);
        item.setDescription(testimonial.feedback);
        item.setPrice(testimonial.rating != null ? testimonial.rating.doubleValue() : 5.0);
        EventCatalog saved = catalogRepository.save(item);
        testimonial.id = saved.getId();
        return testimonial;
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<EventTestimonial> updateTestimonial(@PathVariable Long id, @RequestBody EventTestimonial updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.clientName);
        existing.setSubtitle(updated.clientRole);
        existing.setDescription(updated.feedback);
        existing.setPrice(updated.rating != null ? updated.rating.doubleValue() : 5.0);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 17. Blogs ---
    @GetMapping("/blogs")
    public List<EventBlog> getBlogs(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "blog");
        List<EventBlog> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventBlog dto = new EventBlog();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.title = item.getTitle();
            dto.content = item.getDescription();
            dto.imageUrl = item.getImageUrl();
            if (item.getSubtitle() != null && item.getSubtitle().contains("|")) {
                String[] parts = item.getSubtitle().split("\\|");
                dto.author = parts[0];
                dto.date = parts.length > 1 ? parts[1] : "";
            } else {
                dto.author = item.getSubtitle();
            }
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/blogs")
    public EventBlog createBlog(@RequestBody EventBlog blog) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(blog.projectId);
        item.setType("blog");
        item.setTitle(blog.title);
        item.setDescription(blog.content);
        item.setSubtitle(blog.author + "|" + blog.date);
        item.setImageUrl(blog.imageUrl);
        EventCatalog saved = catalogRepository.save(item);
        blog.id = saved.getId();
        return blog;
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<EventBlog> updateBlog(@PathVariable Long id, @RequestBody EventBlog updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.title);
        existing.setDescription(updated.content);
        existing.setSubtitle(updated.author + "|" + updated.date);
        existing.setImageUrl(updated.imageUrl);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 18. FAQs ---
    @GetMapping("/faqs")
    public List<EventFaq> getFaqs(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "faq");
        List<EventFaq> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventFaq dto = new EventFaq();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.question = item.getTitle();
            dto.answer = item.getDescription();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/faqs")
    public EventFaq createFaq(@RequestBody EventFaq faq) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(faq.projectId);
        item.setType("faq");
        item.setTitle(faq.question);
        item.setDescription(faq.answer);
        EventCatalog saved = catalogRepository.save(item);
        faq.id = saved.getId();
        return faq;
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<EventFaq> updateFaq(@PathVariable Long id, @RequestBody EventFaq updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.question);
        existing.setDescription(updated.answer);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 19. Contacts ---
    @GetMapping("/contacts")
    public List<EventContact> getContacts(@RequestParam Long projectId) {
        List<EventCustomer> list = customerRepository.findByProjectIdAndType(projectId, "contact");
        List<EventContact> result = new ArrayList<>();
        for (EventCustomer item : list) {
            EventContact dto = new EventContact();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getName();
            dto.email = item.getEmail();
            dto.subject = item.getMessageJson();
            dto.message = item.getNotes();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/contacts")
    public EventContact createContact(@RequestBody EventContact contact) {
        EventCustomer item = new EventCustomer();
        item.setProjectId(contact.projectId);
        item.setType("contact");
        item.setName(contact.name);
        item.setEmail(contact.email);
        item.setMessageJson(contact.subject);
        item.setNotes(contact.message);
        EventCustomer saved = customerRepository.save(item);
        contact.id = saved.getId();
        return contact;
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<EventContact> updateContact(@PathVariable Long id, @RequestBody EventContact updated) {
        Optional<EventCustomer> opt = customerRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCustomer existing = opt.get();
        existing.setName(updated.name);
        existing.setEmail(updated.email);
        existing.setMessageJson(updated.subject);
        existing.setNotes(updated.message);
        customerRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 20. Leads ---
    @GetMapping("/leads")
    public List<EventLead> getLeads(@RequestParam Long projectId) {
        List<EventCustomer> list = customerRepository.findByProjectIdAndType(projectId, "lead");
        List<EventLead> result = new ArrayList<>();
        for (EventCustomer item : list) {
            EventLead dto = new EventLead();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getName();
            dto.email = item.getEmail();
            dto.phone = item.getPhone();
            dto.message = item.getNotes();
            dto.status = item.getStatus();
            try {
                dto.budget = Double.parseDouble(item.getMessageJson());
            } catch (Exception e) {}
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/leads")
    public EventLead createLead(@RequestBody EventLead lead) {
        EventCustomer item = new EventCustomer();
        item.setProjectId(lead.projectId);
        item.setType("lead");
        item.setName(lead.name);
        item.setEmail(lead.email);
        item.setPhone(lead.phone);
        item.setNotes(lead.message);
        item.setStatus(lead.status);
        item.setMessageJson(lead.budget != null ? String.valueOf(lead.budget) : "0");
        EventCustomer saved = customerRepository.save(item);
        lead.id = saved.getId();
        return lead;
    }

    @PutMapping("/leads/{id}")
    public ResponseEntity<EventLead> updateLead(@PathVariable Long id, @RequestBody EventLead updated) {
        Optional<EventCustomer> opt = customerRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCustomer existing = opt.get();
        existing.setName(updated.name);
        existing.setEmail(updated.email);
        existing.setPhone(updated.phone);
        existing.setNotes(updated.message);
        existing.setStatus(updated.status);
        existing.setMessageJson(updated.budget != null ? String.valueOf(updated.budget) : "0");
        customerRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/leads/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 21. Notifications ---
    @GetMapping("/notifications")
    public List<EventNotification> getNotifications(@RequestParam Long projectId) {
        List<EventCustomer> list = customerRepository.findByProjectIdAndType(projectId, "notification");
        List<EventNotification> result = new ArrayList<>();
        for (EventCustomer item : list) {
            EventNotification dto = new EventNotification();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.title = item.getName();
            dto.message = item.getNotes();
            dto.date = item.getMessageJson();
            dto.isRead = "READ".equalsIgnoreCase(item.getStatus());
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/notifications")
    public EventNotification createNotification(@RequestBody EventNotification notification) {
        EventCustomer item = new EventCustomer();
        item.setProjectId(notification.projectId);
        item.setType("notification");
        item.setName(notification.title);
        item.setNotes(notification.message);
        item.setStatus(notification.isRead != null && notification.isRead ? "READ" : "UNREAD");
        item.setMessageJson(notification.date);
        EventCustomer saved = customerRepository.save(item);
        notification.id = saved.getId();
        return notification;
    }

    @PutMapping("/notifications/{id}")
    public ResponseEntity<EventNotification> updateNotification(@PathVariable Long id, @RequestBody EventNotification updated) {
        Optional<EventCustomer> opt = customerRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCustomer existing = opt.get();
        existing.setName(updated.title);
        existing.setNotes(updated.message);
        existing.setStatus(updated.isRead != null && updated.isRead ? "READ" : "UNREAD");
        existing.setMessageJson(updated.date);
        customerRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 22. Coupons ---
    @GetMapping("/coupons")
    public List<EventCoupon> getCoupons(@RequestParam Long projectId) {
        List<EventBilling> list = billingRepository.findByProjectIdAndType(projectId, "coupon");
        List<EventCoupon> result = new ArrayList<>();
        for (EventBilling item : list) {
            EventCoupon dto = new EventCoupon();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.code = item.getDate();
            dto.discountValue = item.getAmountValue();
            dto.active = "ACTIVE".equalsIgnoreCase(item.getStatus());
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/coupons")
    public EventCoupon createCoupon(@RequestBody EventCoupon coupon) {
        EventBilling item = new EventBilling();
        item.setProjectId(coupon.projectId);
        item.setType("coupon");
        item.setDate(coupon.code);
        item.setAmount(coupon.discountValue);
        item.setStatus(coupon.active != null && coupon.active ? "ACTIVE" : "INACTIVE");
        EventBilling saved = billingRepository.save(item);
        coupon.id = saved.getId();
        return coupon;
    }

    @PutMapping("/coupons/{id}")
    public ResponseEntity<EventCoupon> updateCoupon(@PathVariable Long id, @RequestBody EventCoupon updated) {
        Optional<EventBilling> opt = billingRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventBilling existing = opt.get();
        existing.setDate(updated.code);
        existing.setAmount(updated.discountValue);
        existing.setStatus(updated.active != null && updated.active ? "ACTIVE" : "INACTIVE");
        billingRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/coupons/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 23. Website Settings ---
    @GetMapping("/website-settings")
    public ResponseEntity<EventWebsiteSettings> getWebsiteSettings(@RequestParam Long projectId) {
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        EventWebsiteSettings defaultSet = new EventWebsiteSettings();
        defaultSet.projectId = projectId;
        if (opt.isPresent()) {
            EventAgencyInfo agency = opt.get();
            defaultSet.id = agency.getId();
            defaultSet.themeName = agency.getPrimaryColor(); // Mapped to primaryColor
            defaultSet.customCss = agency.getSecondaryColor(); // Mapped to secondaryColor
            defaultSet.headerLayout = agency.getTagline();
            defaultSet.footerLayout = agency.getAboutText();
            return ResponseEntity.ok(defaultSet);
        }
        defaultSet.themeName = "wedding-luxury";
        return ResponseEntity.ok(defaultSet);
    }

    @PostMapping("/website-settings")
    public EventWebsiteSettings saveWebsiteSettings(@RequestParam Long projectId, @RequestBody EventWebsiteSettings settings) {
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        EventAgencyInfo agency;
        if (opt.isPresent()) {
            agency = opt.get();
        } else {
            agency = new EventAgencyInfo();
            agency.setProjectId(projectId);
        }
        agency.setPrimaryColor(settings.themeName);
        agency.setSecondaryColor(settings.customCss);
        agency.setTagline(settings.headerLayout);
        agency.setAboutText(settings.footerLayout);
        EventAgencyInfo saved = agencyInfoRepository.save(agency);
        settings.id = saved.getId();
        return settings;
    }

    // --- 24. SEO Settings ---
    @GetMapping("/seo-settings")
    public ResponseEntity<EventSeoSettings> getSeoSettings(@RequestParam Long projectId) {
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        EventSeoSettings defaultSeo = new EventSeoSettings();
        defaultSeo.projectId = projectId;
        if (opt.isPresent()) {
            EventAgencyInfo agency = opt.get();
            defaultSeo.id = agency.getId();
            defaultSeo.metaTitle = agency.getSeoTitle();
            defaultSeo.metaDescription = agency.getSeoDescription();
            defaultSeo.metaKeywords = agency.getSeoKeywords();
            return ResponseEntity.ok(defaultSeo);
        }
        return ResponseEntity.ok(defaultSeo);
    }

    @PostMapping("/seo-settings")
    public EventSeoSettings saveSeoSettings(@RequestParam Long projectId, @RequestBody EventSeoSettings seo) {
        Optional<EventAgencyInfo> opt = agencyInfoRepository.findByProjectId(projectId);
        EventAgencyInfo agency;
        if (opt.isPresent()) {
            agency = opt.get();
        } else {
            agency = new EventAgencyInfo();
            agency.setProjectId(projectId);
        }
        agency.setSeoTitle(seo.metaTitle);
        agency.setSeoDescription(seo.metaDescription);
        agency.setSeoKeywords(seo.metaKeywords);
        EventAgencyInfo saved = agencyInfoRepository.save(agency);
        seo.id = saved.getId();
        return seo;
    }

    // --- 25. Booking Statuses (Auxiliary) ---
    @GetMapping("/booking-statuses")
    public List<EventBookingStatus> getBookingStatuses(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "booking_status");
        List<EventBookingStatus> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventBookingStatus dto = new EventBookingStatus();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.status = item.getTitle();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/booking-statuses")
    public EventBookingStatus createBookingStatus(@RequestBody EventBookingStatus status) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(status.projectId);
        item.setType("booking_status");
        item.setTitle(status.status);
        EventCatalog saved = catalogRepository.save(item);
        status.id = saved.getId();
        return status;
    }

    @PutMapping("/booking-statuses/{id}")
    public ResponseEntity<EventBookingStatus> updateBookingStatus(@PathVariable Long id, @RequestBody EventBookingStatus updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.status);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/booking-statuses/{id}")
    public ResponseEntity<Void> deleteBookingStatus(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 26. Support Tickets ---
    @GetMapping("/support-tickets")
    public List<EventSupportTicket> getSupportTickets(@RequestParam Long projectId) {
        List<EventCustomer> list = customerRepository.findByProjectIdAndType(projectId, "support");
        List<EventSupportTicket> result = new ArrayList<>();
        for (EventCustomer item : list) {
            EventSupportTicket dto = new EventSupportTicket();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.name = item.getName();
            dto.email = item.getEmail();
            dto.description = item.getNotes();
            dto.status = item.getStatus();
            dto.subject = item.getMessageJson();
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/support-tickets")
    public EventSupportTicket createSupportTicket(@RequestBody EventSupportTicket ticket) {
        EventCustomer item = new EventCustomer();
        item.setProjectId(ticket.projectId);
        item.setType("support");
        item.setName(ticket.name);
        item.setEmail(ticket.email);
        item.setNotes(ticket.description);
        item.setStatus(ticket.status);
        item.setMessageJson(ticket.subject);
        EventCustomer saved = customerRepository.save(item);
        ticket.id = saved.getId();
        return ticket;
    }

    @PutMapping("/support-tickets/{id}")
    public ResponseEntity<EventSupportTicket> updateSupportTicket(@PathVariable Long id, @RequestBody EventSupportTicket updated) {
        Optional<EventCustomer> opt = customerRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCustomer existing = opt.get();
        existing.setName(updated.name);
        existing.setEmail(updated.email);
        existing.setNotes(updated.description);
        existing.setStatus(updated.status);
        existing.setMessageJson(updated.subject);
        customerRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/support-tickets/{id}")
    public ResponseEntity<Void> deleteSupportTicket(@PathVariable Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 27. Reviews ---
    @GetMapping("/reviews")
    public List<EventReview> getReviews(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "review");
        List<EventReview> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventReview dto = new EventReview();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.clientName = item.getTitle();
            dto.feedback = item.getDescription();
            dto.rating = item.getPrice() != null ? item.getPrice().intValue() : 5;
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/reviews")
    public EventReview createReview(@RequestBody EventReview review) {
        EventCatalog item = new EventCatalog();
        item.setProjectId(review.projectId);
        item.setType("review");
        item.setTitle(review.clientName);
        item.setDescription(review.feedback);
        item.setPrice(review.rating != null ? review.rating.doubleValue() : 5.0);
        EventCatalog saved = catalogRepository.save(item);
        review.id = saved.getId();
        return review;
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<EventReview> updateReview(@PathVariable Long id, @RequestBody EventReview updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.clientName);
        existing.setDescription(updated.feedback);
        existing.setPrice(updated.rating != null ? updated.rating.doubleValue() : 5.0);
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 28. Checklist Items ---
    @GetMapping("/checklist-items")
    public List<EventChecklistItem> getChecklistItems(@RequestParam Long projectId) {
        List<EventCatalog> list = catalogRepository.findByProjectIdAndType(projectId, "checklist_item");
        List<EventChecklistItem> result = new ArrayList<>();
        for (EventCatalog item : list) {
            EventChecklistItem dto = new EventChecklistItem();
            dto.id = item.getId();
            dto.projectId = item.getProjectId();
            dto.task = item.getTitle();
            dto.completed = "true".equalsIgnoreCase(item.getDataJson());
            try {
                dto.bookingId = Long.parseLong(item.getSubtitle());
            } catch (Exception e) {}
            result.add(dto);
        }
        return result;
    }

    @PostMapping("/checklist-items")
    public EventChecklistItem createChecklistItem(@RequestBody EventChecklistItem item) {
        EventCatalog cat = new EventCatalog();
        cat.setProjectId(item.projectId);
        cat.setType("checklist_item");
        cat.setTitle(item.task);
        cat.setDataJson(item.completed != null && item.completed ? "true" : "false");
        cat.setSubtitle(item.bookingId != null ? String.valueOf(item.bookingId) : "");
        EventCatalog saved = catalogRepository.save(cat);
        item.id = saved.getId();
        return item;
    }

    @PutMapping("/checklist-items/{id}")
    public ResponseEntity<EventChecklistItem> updateChecklistItem(@PathVariable Long id, @RequestBody EventChecklistItem updated) {
        Optional<EventCatalog> opt = catalogRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        EventCatalog existing = opt.get();
        existing.setTitle(updated.task);
        existing.setDataJson(updated.completed != null && updated.completed ? "true" : "false");
        existing.setSubtitle(updated.bookingId != null ? String.valueOf(updated.bookingId) : "");
        catalogRepository.save(existing);
        updated.id = existing.getId();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/checklist-items/{id}")
    public ResponseEntity<Void> deleteChecklistItem(@PathVariable Long id) {
        if (catalogRepository.existsById(id)) {
            catalogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
