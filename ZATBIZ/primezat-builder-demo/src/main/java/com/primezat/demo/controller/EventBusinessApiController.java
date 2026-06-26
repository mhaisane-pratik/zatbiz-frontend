package com.primezat.demo.controller;

import com.primezat.demo.model.*;
import com.primezat.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "*")
public class EventBusinessApiController {

    @Autowired private EventAgencyInfoRepository agencyInfoRepository;
    @Autowired private EventCategoryRepository categoryRepository;
    @Autowired private EventServiceRepository serviceRepository;
    @Autowired private EventPackageRepository packageRepository;
    @Autowired private EventPortfolioRepository portfolioRepository;
    @Autowired private EventGalleryRepository galleryRepository;
    @Autowired private EventBookingRepository bookingRepository;
    @Autowired private EventBookingStatusRepository bookingStatusRepository;
    @Autowired private EventCustomerRepository customerRepository;
    @Autowired private EventVendorRepository vendorRepository;
    @Autowired private EventTeamMemberRepository teamMemberRepository;
    @Autowired private EventCalendarEventRepository calendarEventRepository;
    @Autowired private EventPaymentRepository paymentRepository;
    @Autowired private EventInvoiceRepository invoiceRepository;
    @Autowired private EventExpenseRepository expenseRepository;
    @Autowired private EventQuotationRepository quotationRepository;
    @Autowired private EventTestimonialRepository testimonialRepository;
    @Autowired private EventBlogRepository blogRepository;
    @Autowired private EventFaqRepository faqRepository;
    @Autowired private EventContactRepository contactRepository;
    @Autowired private EventLeadRepository leadRepository;
    @Autowired private EventNotificationRepository notificationRepository;
    @Autowired private EventCouponRepository couponRepository;
    @Autowired private EventWebsiteSettingsRepository websiteSettingsRepository;
    @Autowired private EventSeoSettingsRepository seoSettingsRepository;
    @Autowired private EventSupportTicketRepository supportTicketRepository;
    @Autowired private EventReviewRepository reviewRepository;
    @Autowired private EventChecklistItemRepository checklistItemRepository;

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
            return agencyInfoRepository.save(existing);
        }
        return agencyInfoRepository.save(info);
    }

    // --- 2. Categories ---
    @GetMapping("/categories")
    public List<EventCategory> getCategories(@RequestParam Long projectId) {
        return categoryRepository.findByProjectId(projectId);
    }

    @PostMapping("/categories")
    public EventCategory createCategory(@RequestBody EventCategory category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<EventCategory> updateCategory(@PathVariable Long id, @RequestBody EventCategory updated) {
        if (!categoryRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(categoryRepository.save(updated));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 3. Services ---
    @GetMapping("/services")
    public List<EventService> getServices(@RequestParam Long projectId) {
        return serviceRepository.findByProjectId(projectId);
    }

    @PostMapping("/services")
    public EventService createService(@RequestBody EventService service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<EventService> updateService(@PathVariable Long id, @RequestBody EventService updated) {
        if (!serviceRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(serviceRepository.save(updated));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 4. Packages ---
    @GetMapping("/packages")
    public List<EventPackage> getPackages(@RequestParam Long projectId) {
        return packageRepository.findByProjectId(projectId);
    }

    @PostMapping("/packages")
    public EventPackage createPackage(@RequestBody EventPackage pack) {
        return packageRepository.save(pack);
    }

    @PutMapping("/packages/{id}")
    public ResponseEntity<EventPackage> updatePackage(@PathVariable Long id, @RequestBody EventPackage updated) {
        if (!packageRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(packageRepository.save(updated));
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        if (packageRepository.existsById(id)) {
            packageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 5. Portfolios ---
    @GetMapping("/portfolios")
    public List<EventPortfolio> getPortfolios(@RequestParam Long projectId) {
        return portfolioRepository.findByProjectId(projectId);
    }

    @PostMapping("/portfolios")
    public EventPortfolio createPortfolio(@RequestBody EventPortfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    @PutMapping("/portfolios/{id}")
    public ResponseEntity<EventPortfolio> updatePortfolio(@PathVariable Long id, @RequestBody EventPortfolio updated) {
        if (!portfolioRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(portfolioRepository.save(updated));
    }

    @DeleteMapping("/portfolios/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        if (portfolioRepository.existsById(id)) {
            portfolioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 6. Gallery ---
    @GetMapping("/galleries")
    public List<EventGallery> getGalleries(@RequestParam Long projectId) {
        return galleryRepository.findByProjectId(projectId);
    }

    @PostMapping("/galleries")
    public EventGallery createGallery(@RequestBody EventGallery gallery) {
        return galleryRepository.save(gallery);
    }

    @PutMapping("/galleries/{id}")
    public ResponseEntity<EventGallery> updateGallery(@PathVariable Long id, @RequestBody EventGallery updated) {
        if (!galleryRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(galleryRepository.save(updated));
    }

    @DeleteMapping("/galleries/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        if (galleryRepository.existsById(id)) {
            galleryRepository.deleteById(id);
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
        if (!bookingRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(bookingRepository.save(updated));
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
        return customerRepository.findByProjectId(projectId);
    }

    @PostMapping("/customers")
    public EventCustomer createCustomer(@RequestBody EventCustomer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<EventCustomer> updateCustomer(@PathVariable Long id, @RequestBody EventCustomer updated) {
        if (!customerRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(customerRepository.save(updated));
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
        return vendorRepository.findByProjectId(projectId);
    }

    @PostMapping("/vendors")
    public EventVendor createVendor(@RequestBody EventVendor vendor) {
        return vendorRepository.save(vendor);
    }

    @PutMapping("/vendors/{id}")
    public ResponseEntity<EventVendor> updateVendor(@PathVariable Long id, @RequestBody EventVendor updated) {
        if (!vendorRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(vendorRepository.save(updated));
    }

    @DeleteMapping("/vendors/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        if (vendorRepository.existsById(id)) {
            vendorRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 10. Team Members ---
    @GetMapping("/team-members")
    public List<EventTeamMember> getTeamMembers(@RequestParam Long projectId) {
        return teamMemberRepository.findByProjectId(projectId);
    }

    @PostMapping("/team-members")
    public EventTeamMember createTeamMember(@RequestBody EventTeamMember member) {
        return teamMemberRepository.save(member);
    }

    @PutMapping("/team-members/{id}")
    public ResponseEntity<EventTeamMember> updateTeamMember(@PathVariable Long id, @RequestBody EventTeamMember updated) {
        if (!teamMemberRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(teamMemberRepository.save(updated));
    }

    @DeleteMapping("/team-members/{id}")
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long id) {
        if (teamMemberRepository.existsById(id)) {
            teamMemberRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 11. Calendar Events ---
    @GetMapping("/calendar-events")
    public List<EventCalendarEvent> getCalendarEvents(@RequestParam Long projectId) {
        return calendarEventRepository.findByProjectId(projectId);
    }

    @PostMapping("/calendar-events")
    public EventCalendarEvent createCalendarEvent(@RequestBody EventCalendarEvent item) {
        return calendarEventRepository.save(item);
    }

    @PutMapping("/calendar-events/{id}")
    public ResponseEntity<EventCalendarEvent> updateCalendarEvent(@PathVariable Long id, @RequestBody EventCalendarEvent updated) {
        if (!calendarEventRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(calendarEventRepository.save(updated));
    }

    @DeleteMapping("/calendar-events/{id}")
    public ResponseEntity<Void> deleteCalendarEvent(@PathVariable Long id) {
        if (calendarEventRepository.existsById(id)) {
            calendarEventRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 12. Payments ---
    @GetMapping("/payments")
    public List<EventPayment> getPayments(@RequestParam Long projectId) {
        return paymentRepository.findByProjectId(projectId);
    }

    @PostMapping("/payments")
    public EventPayment createPayment(@RequestBody EventPayment payment) {
        return paymentRepository.save(payment);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<EventPayment> updatePayment(@PathVariable Long id, @RequestBody EventPayment updated) {
        if (!paymentRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(paymentRepository.save(updated));
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 13. Invoices ---
    @GetMapping("/invoices")
    public List<EventInvoice> getInvoices(@RequestParam Long projectId) {
        return invoiceRepository.findByProjectId(projectId);
    }

    @PostMapping("/invoices")
    public EventInvoice createInvoice(@RequestBody EventInvoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @PutMapping("/invoices/{id}")
    public ResponseEntity<EventInvoice> updateInvoice(@PathVariable Long id, @RequestBody EventInvoice updated) {
        if (!invoiceRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(invoiceRepository.save(updated));
    }

    @DeleteMapping("/invoices/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 14. Expenses ---
    @GetMapping("/expenses")
    public List<EventExpense> getExpenses(@RequestParam Long projectId) {
        return expenseRepository.findByProjectId(projectId);
    }

    @PostMapping("/expenses")
    public EventExpense createExpense(@RequestBody EventExpense expense) {
        return expenseRepository.save(expense);
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<EventExpense> updateExpense(@PathVariable Long id, @RequestBody EventExpense updated) {
        if (!expenseRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(expenseRepository.save(updated));
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 15. Quotations ---
    @GetMapping("/quotations")
    public List<EventQuotation> getQuotations(@RequestParam Long projectId) {
        return quotationRepository.findByProjectId(projectId);
    }

    @PostMapping("/quotations")
    public EventQuotation createQuotation(@RequestBody EventQuotation quotation) {
        return quotationRepository.save(quotation);
    }

    @PutMapping("/quotations/{id}")
    public ResponseEntity<EventQuotation> updateQuotation(@PathVariable Long id, @RequestBody EventQuotation updated) {
        if (!quotationRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(quotationRepository.save(updated));
    }

    @DeleteMapping("/quotations/{id}")
    public ResponseEntity<Void> deleteQuotation(@PathVariable Long id) {
        if (quotationRepository.existsById(id)) {
            quotationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 16. Testimonials ---
    @GetMapping("/testimonials")
    public List<EventTestimonial> getTestimonials(@RequestParam Long projectId) {
        return testimonialRepository.findByProjectId(projectId);
    }

    @PostMapping("/testimonials")
    public EventTestimonial createTestimonial(@RequestBody EventTestimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<EventTestimonial> updateTestimonial(@PathVariable Long id, @RequestBody EventTestimonial updated) {
        if (!testimonialRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(testimonialRepository.save(updated));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        if (testimonialRepository.existsById(id)) {
            testimonialRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 17. Blogs ---
    @GetMapping("/blogs")
    public List<EventBlog> getBlogs(@RequestParam Long projectId) {
        return blogRepository.findByProjectId(projectId);
    }

    @PostMapping("/blogs")
    public EventBlog createBlog(@RequestBody EventBlog blog) {
        return blogRepository.save(blog);
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<EventBlog> updateBlog(@PathVariable Long id, @RequestBody EventBlog updated) {
        if (!blogRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(blogRepository.save(updated));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 18. FAQs ---
    @GetMapping("/faqs")
    public List<EventFaq> getFaqs(@RequestParam Long projectId) {
        return faqRepository.findByProjectId(projectId);
    }

    @PostMapping("/faqs")
    public EventFaq createFaq(@RequestBody EventFaq faq) {
        return faqRepository.save(faq);
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<EventFaq> updateFaq(@PathVariable Long id, @RequestBody EventFaq updated) {
        if (!faqRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(faqRepository.save(updated));
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        if (faqRepository.existsById(id)) {
            faqRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 19. Contacts ---
    @GetMapping("/contacts")
    public List<EventContact> getContacts(@RequestParam Long projectId) {
        return contactRepository.findByProjectId(projectId);
    }

    @PostMapping("/contacts")
    public EventContact createContact(@RequestBody EventContact contact) {
        return contactRepository.save(contact);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<EventContact> updateContact(@PathVariable Long id, @RequestBody EventContact updated) {
        if (!contactRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(contactRepository.save(updated));
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 20. Leads ---
    @GetMapping("/leads")
    public List<EventLead> getLeads(@RequestParam Long projectId) {
        return leadRepository.findByProjectId(projectId);
    }

    @PostMapping("/leads")
    public EventLead createLead(@RequestBody EventLead lead) {
        return leadRepository.save(lead);
    }

    @PutMapping("/leads/{id}")
    public ResponseEntity<EventLead> updateLead(@PathVariable Long id, @RequestBody EventLead updated) {
        if (!leadRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(leadRepository.save(updated));
    }

    @DeleteMapping("/leads/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        if (leadRepository.existsById(id)) {
            leadRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 21. Notifications ---
    @GetMapping("/notifications")
    public List<EventNotification> getNotifications(@RequestParam Long projectId) {
        return notificationRepository.findByProjectId(projectId);
    }

    @PostMapping("/notifications")
    public EventNotification createNotification(@RequestBody EventNotification notification) {
        return notificationRepository.save(notification);
    }

    @PutMapping("/notifications/{id}")
    public ResponseEntity<EventNotification> updateNotification(@PathVariable Long id, @RequestBody EventNotification updated) {
        if (!notificationRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(notificationRepository.save(updated));
    }

    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        if (notificationRepository.existsById(id)) {
            notificationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 22. Coupons ---
    @GetMapping("/coupons")
    public List<EventCoupon> getCoupons(@RequestParam Long projectId) {
        return couponRepository.findByProjectId(projectId);
    }

    @PostMapping("/coupons")
    public EventCoupon createCoupon(@RequestBody EventCoupon coupon) {
        return couponRepository.save(coupon);
    }

    @PutMapping("/coupons/{id}")
    public ResponseEntity<EventCoupon> updateCoupon(@PathVariable Long id, @RequestBody EventCoupon updated) {
        if (!couponRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(couponRepository.save(updated));
    }

    @DeleteMapping("/coupons/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        if (couponRepository.existsById(id)) {
            couponRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 23. Website Settings ---
    @GetMapping("/website-settings")
    public ResponseEntity<EventWebsiteSettings> getWebsiteSettings(@RequestParam Long projectId) {
        Optional<EventWebsiteSettings> opt = websiteSettingsRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        EventWebsiteSettings defaultSet = new EventWebsiteSettings();
        defaultSet.setProjectId(projectId);
        defaultSet.setThemeName("wedding-luxury");
        return ResponseEntity.ok(defaultSet);
    }

    @PostMapping("/website-settings")
    public EventWebsiteSettings saveWebsiteSettings(@RequestParam Long projectId, @RequestBody EventWebsiteSettings settings) {
        settings.setProjectId(projectId);
        Optional<EventWebsiteSettings> opt = websiteSettingsRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            EventWebsiteSettings existing = opt.get();
            existing.setThemeName(settings.getThemeName());
            existing.setCustomCss(settings.getCustomCss());
            existing.setHeaderLayout(settings.getHeaderLayout());
            existing.setFooterLayout(settings.getFooterLayout());
            return websiteSettingsRepository.save(existing);
        }
        return websiteSettingsRepository.save(settings);
    }

    // --- 24. SEO Settings ---
    @GetMapping("/seo-settings")
    public ResponseEntity<EventSeoSettings> getSeoSettings(@RequestParam Long projectId) {
        Optional<EventSeoSettings> opt = seoSettingsRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        EventSeoSettings defaultSeo = new EventSeoSettings();
        defaultSeo.setProjectId(projectId);
        return ResponseEntity.ok(defaultSeo);
    }

    @PostMapping("/seo-settings")
    public EventSeoSettings saveSeoSettings(@RequestParam Long projectId, @RequestBody EventSeoSettings seo) {
        seo.setProjectId(projectId);
        Optional<EventSeoSettings> opt = seoSettingsRepository.findByProjectId(projectId);
        if (opt.isPresent()) {
            EventSeoSettings existing = opt.get();
            existing.setMetaTitle(seo.getMetaTitle());
            existing.setMetaDescription(seo.getMetaDescription());
            existing.setMetaKeywords(seo.getMetaKeywords());
            return seoSettingsRepository.save(existing);
        }
        return seoSettingsRepository.save(seo);
    }

    // --- 25. Booking Statuses (Auxiliary) ---
    @GetMapping("/booking-statuses")
    public List<EventBookingStatus> getBookingStatuses(@RequestParam Long projectId) {
        return bookingStatusRepository.findByProjectId(projectId);
    }

    @PostMapping("/booking-statuses")
    public EventBookingStatus createBookingStatus(@RequestBody EventBookingStatus status) {
        return bookingStatusRepository.save(status);
    }

    @PutMapping("/booking-statuses/{id}")
    public ResponseEntity<EventBookingStatus> updateBookingStatus(@PathVariable Long id, @RequestBody EventBookingStatus updated) {
        if (!bookingStatusRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(bookingStatusRepository.save(updated));
    }

    @DeleteMapping("/booking-statuses/{id}")
    public ResponseEntity<Void> deleteBookingStatus(@PathVariable Long id) {
        if (bookingStatusRepository.existsById(id)) {
            bookingStatusRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 26. Support Tickets ---
    @GetMapping("/support-tickets")
    public List<EventSupportTicket> getSupportTickets(@RequestParam Long projectId) {
        return supportTicketRepository.findByProjectId(projectId);
    }

    @PostMapping("/support-tickets")
    public EventSupportTicket createSupportTicket(@RequestBody EventSupportTicket ticket) {
        return supportTicketRepository.save(ticket);
    }

    @PutMapping("/support-tickets/{id}")
    public ResponseEntity<EventSupportTicket> updateSupportTicket(@PathVariable Long id, @RequestBody EventSupportTicket updated) {
        if (!supportTicketRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(supportTicketRepository.save(updated));
    }

    @DeleteMapping("/support-tickets/{id}")
    public ResponseEntity<Void> deleteSupportTicket(@PathVariable Long id) {
        if (supportTicketRepository.existsById(id)) {
            supportTicketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 27. Reviews ---
    @GetMapping("/reviews")
    public List<EventReview> getReviews(@RequestParam Long projectId) {
        return reviewRepository.findByProjectId(projectId);
    }

    @PostMapping("/reviews")
    public EventReview createReview(@RequestBody EventReview review) {
        return reviewRepository.save(review);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<EventReview> updateReview(@PathVariable Long id, @RequestBody EventReview updated) {
        if (!reviewRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(reviewRepository.save(updated));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // --- 28. Checklist Items ---
    @GetMapping("/checklist-items")
    public List<EventChecklistItem> getChecklistItems(@RequestParam Long projectId) {
        return checklistItemRepository.findByProjectId(projectId);
    }

    @PostMapping("/checklist-items")
    public EventChecklistItem createChecklistItem(@RequestBody EventChecklistItem item) {
        return checklistItemRepository.save(item);
    }

    @PutMapping("/checklist-items/{id}")
    public ResponseEntity<EventChecklistItem> updateChecklistItem(@PathVariable Long id, @RequestBody EventChecklistItem updated) {
        if (!checklistItemRepository.existsById(id)) return ResponseEntity.notFound().build();
        updated.setId(id);
        return ResponseEntity.ok(checklistItemRepository.save(updated));
    }

    @DeleteMapping("/checklist-items/{id}")
    public ResponseEntity<Void> deleteChecklistItem(@PathVariable Long id) {
        if (checklistItemRepository.existsById(id)) {
            checklistItemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
