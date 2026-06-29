package com.primezat.demo.controller;

import com.primezat.demo.model.*;
import com.primezat.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gym-management")
@CrossOrigin(origins = "*")
public class GymManagementApiController {

    @Autowired private GymMemberRepository memberRepository;
    @Autowired private GymTrainerRepository trainerRepository;
    @Autowired private GymClassRepository classRepository;
    @Autowired private GymClassBookingRepository bookingRepository;
    @Autowired private GymAttendanceRepository attendanceRepository;
    @Autowired private GymWorkoutPlanRepository workoutPlanRepository;
    @Autowired private GymDietPlanRepository dietPlanRepository;
    @Autowired private GymPaymentRepository paymentRepository;
    @Autowired private GymExpenseRepository expenseRepository;
    @Autowired private GymEquipmentRepository equipmentRepository;
    @Autowired private GymOfferRepository offerRepository;

    // --- Gym Members ---
    @GetMapping("/members")
    public ResponseEntity<List<GymMember>> getMembers(@RequestParam Long projectId) {
        return ResponseEntity.ok(memberRepository.findByProjectId(projectId));
    }

    @GetMapping("/members/profile")
    public ResponseEntity<GymMember> getMemberProfile(@RequestParam Long projectId, @RequestParam String email) {
        Optional<GymMember> opt = memberRepository.findByProjectIdAndEmail(projectId, email);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        // Self-heal: Create a default member profile if they sign in for the first time
        GymMember defaultMember = new GymMember();
        defaultMember.setProjectId(projectId);
        defaultMember.setEmail(email);
        defaultMember.setName(email.split("@")[0]);
        defaultMember.setMembershipPlan("Silver Starter Pass");
        defaultMember.setMembershipStatus("Active");
        defaultMember.setExpiryDate("2026-12-31");
        defaultMember.setCurrentWeight(75.5);
        defaultMember.setHeight(178.0);
        defaultMember.setBmi(23.8);
        return ResponseEntity.ok(memberRepository.save(defaultMember));
    }

    @PostMapping("/members")
    public ResponseEntity<GymMember> saveMember(@RequestBody GymMember member) {
        if (member.getEmail() == null || member.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<GymMember> opt = memberRepository.findByProjectIdAndEmail(member.getProjectId(), member.getEmail());
        if (opt.isPresent()) {
            GymMember existing = opt.get();
            existing.setName(member.getName());
            existing.setPhone(member.getPhone());
            existing.setEmergencyContactName(member.getEmergencyContactName());
            existing.setEmergencyContactPhone(member.getEmergencyContactPhone());
            existing.setMedicalInformation(member.getMedicalInformation());
            existing.setProfilePhotoUrl(member.getProfilePhotoUrl());
            existing.setMembershipPlan(member.getMembershipPlan());
            existing.setMembershipStatus(member.getMembershipStatus());
            existing.setExpiryDate(member.getExpiryDate());
            existing.setCurrentWeight(member.getCurrentWeight());
            existing.setHeight(member.getHeight());
            existing.setBmi(member.getBmi());
            existing.setBodyMeasurements(member.getBodyMeasurements());
            existing.setProgressPhotos(member.getProgressPhotos());
            existing.setAssignedTrainerId(member.getAssignedTrainerId());
            existing.setAssignedTrainerName(member.getAssignedTrainerName());
            return ResponseEntity.ok(memberRepository.save(existing));
        }
        return ResponseEntity.ok(memberRepository.save(member));
    }

    @PutMapping("/members/{id}")
    public ResponseEntity<GymMember> updateMember(@PathVariable Long id, @RequestBody GymMember updates) {
        Optional<GymMember> opt = memberRepository.findById(id);
        if (opt.isPresent()) {
            GymMember member = opt.get();
            member.setName(updates.getName());
            member.setPhone(updates.getPhone());
            member.setEmergencyContactName(updates.getEmergencyContactName());
            member.setEmergencyContactPhone(updates.getEmergencyContactPhone());
            member.setMedicalInformation(updates.getMedicalInformation());
            member.setProfilePhotoUrl(updates.getProfilePhotoUrl());
            member.setMembershipPlan(updates.getMembershipPlan());
            member.setMembershipStatus(updates.getMembershipStatus());
            member.setExpiryDate(updates.getExpiryDate());
            member.setCurrentWeight(updates.getCurrentWeight());
            member.setHeight(updates.getHeight());
            member.setBmi(updates.getBmi());
            member.setBodyMeasurements(updates.getBodyMeasurements());
            member.setProgressPhotos(updates.getProgressPhotos());
            member.setAssignedTrainerId(updates.getAssignedTrainerId());
            member.setAssignedTrainerName(updates.getAssignedTrainerName());
            return ResponseEntity.ok(memberRepository.save(member));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/members/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Gym Trainers ---
    @GetMapping("/trainers")
    public ResponseEntity<List<GymTrainer>> getTrainers(@RequestParam Long projectId) {
        List<GymTrainer> trainers = trainerRepository.findByProjectId(projectId);
        if (trainers.isEmpty()) {
            // Seed a default trainer if empty
            GymTrainer defaultTrainer = new GymTrainer();
            defaultTrainer.setProjectId(projectId);
            defaultTrainer.setName("Coach Marcus Irons");
            defaultTrainer.setEmail("coach.marcus@fitzone.com");
            defaultTrainer.setPhone("+1 (555) 018-9922");
            defaultTrainer.setCertifications("CSCS, CrossFit L2, CPR/AED");
            defaultTrainer.setSchedule("Mon-Fri 7:00 AM - 3:00 PM");
            defaultTrainer.setSalary(45000.0);
            trainerRepository.save(defaultTrainer);
            trainers = trainerRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(trainers);
    }

    @PostMapping("/trainers")
    public ResponseEntity<GymTrainer> saveTrainer(@RequestBody GymTrainer trainer) {
        return ResponseEntity.ok(trainerRepository.save(trainer));
    }

    @PutMapping("/trainers/{id}")
    public ResponseEntity<GymTrainer> updateTrainer(@PathVariable Long id, @RequestBody GymTrainer updates) {
        Optional<GymTrainer> opt = trainerRepository.findById(id);
        if (opt.isPresent()) {
            GymTrainer trainer = opt.get();
            trainer.setName(updates.getName());
            trainer.setEmail(updates.getEmail());
            trainer.setPhone(updates.getPhone());
            trainer.setCertifications(updates.getCertifications());
            trainer.setSchedule(updates.getSchedule());
            trainer.setSalary(updates.getSalary());
            return ResponseEntity.ok(trainerRepository.save(trainer));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        trainerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Gym Classes ---
    @GetMapping("/classes")
    public ResponseEntity<List<GymClass>> getClasses(@RequestParam Long projectId) {
        List<GymClass> classes = classRepository.findByProjectId(projectId);
        if (classes.isEmpty()) {
            // Seed some default classes if empty
            GymClass c1 = new GymClass();
            c1.setProjectId(projectId);
            c1.setClassName("Morning HIIT Burn");
            c1.setTrainerName("Coach Marcus Irons");
            c1.setScheduleTime("Mon, Wed, Fri 8:00 AM");
            c1.setCapacity(20);
            c1.setBookedCount(4);
            classRepository.save(c1);

            GymClass c2 = new GymClass();
            c2.setProjectId(projectId);
            c2.setClassName("Power Weightlifting");
            c2.setTrainerName("Coach Marcus Irons");
            c2.setScheduleTime("Tue, Thu 6:00 PM");
            c2.setCapacity(15);
            c2.setBookedCount(6);
            classRepository.save(c2);

            classes = classRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(classes);
    }

    @PostMapping("/classes")
    public ResponseEntity<GymClass> saveClass(@RequestBody GymClass gymClass) {
        if (gymClass.getBookedCount() == null) gymClass.setBookedCount(0);
        return ResponseEntity.ok(classRepository.save(gymClass));
    }

    @PutMapping("/classes/{id}")
    public ResponseEntity<GymClass> updateClass(@PathVariable Long id, @RequestBody GymClass updates) {
        Optional<GymClass> opt = classRepository.findById(id);
        if (opt.isPresent()) {
            GymClass gymClass = opt.get();
            gymClass.setClassName(updates.getClassName());
            gymClass.setTrainerName(updates.getTrainerName());
            gymClass.setScheduleTime(updates.getScheduleTime());
            gymClass.setCapacity(updates.getCapacity());
            gymClass.setBookedCount(updates.getBookedCount());
            return ResponseEntity.ok(classRepository.save(gymClass));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/classes/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Gym Class Bookings ---
    @GetMapping("/bookings")
    public ResponseEntity<List<GymClassBooking>> getBookings(@RequestParam Long projectId) {
        return ResponseEntity.ok(bookingRepository.findByProjectId(projectId));
    }

    @GetMapping("/bookings/member")
    public ResponseEntity<List<GymClassBooking>> getMemberBookings(@RequestParam Long projectId, @RequestParam String email) {
        return ResponseEntity.ok(bookingRepository.findByProjectIdAndMemberEmail(projectId, email));
    }

    @PostMapping("/bookings")
    public ResponseEntity<GymClassBooking> saveBooking(@RequestBody GymClassBooking booking) {
        booking.setStatus("Booked");
        GymClassBooking saved = bookingRepository.save(booking);

        // Increment booking count on the class
        Optional<GymClass> classOpt = classRepository.findById(booking.getGymClassId());
        if (classOpt.isPresent()) {
            GymClass gymClass = classOpt.get();
            gymClass.setBookedCount(gymClass.getBookedCount() + 1);
            classRepository.save(gymClass);
        }
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<GymClassBooking> cancelBooking(@PathVariable Long id) {
        Optional<GymClassBooking> opt = bookingRepository.findById(id);
        if (opt.isPresent()) {
            GymClassBooking booking = opt.get();
            if (!"Cancelled".equals(booking.getStatus())) {
                booking.setStatus("Cancelled");
                bookingRepository.save(booking);

                // Decrement class count
                Optional<GymClass> classOpt = classRepository.findById(booking.getGymClassId());
                if (classOpt.isPresent()) {
                    GymClass gymClass = classOpt.get();
                    gymClass.setBookedCount(Math.max(0, gymClass.getBookedCount() - 1));
                    classRepository.save(gymClass);
                }
            }
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.notFound().build();
    }

    // --- Gym Attendance ---
    @GetMapping("/attendance")
    public ResponseEntity<List<GymAttendance>> getAttendance(@RequestParam Long projectId) {
        return ResponseEntity.ok(attendanceRepository.findByProjectId(projectId));
    }

    @GetMapping("/attendance/member")
    public ResponseEntity<List<GymAttendance>> getMemberAttendance(@RequestParam Long projectId, @RequestParam String email) {
        return ResponseEntity.ok(attendanceRepository.findByProjectIdAndMemberEmail(projectId, email));
    }

    @PostMapping("/attendance")
    public ResponseEntity<GymAttendance> saveAttendance(@RequestBody GymAttendance attendance) {
        return ResponseEntity.ok(attendanceRepository.save(attendance));
    }

    // --- Gym Workout Plans ---
    @GetMapping("/workouts")
    public ResponseEntity<List<GymWorkoutPlan>> getWorkouts(@RequestParam Long projectId) {
        return ResponseEntity.ok(workoutPlanRepository.findByProjectId(projectId));
    }

    @GetMapping("/workouts/member")
    public ResponseEntity<List<GymWorkoutPlan>> getMemberWorkouts(@RequestParam Long projectId, @RequestParam String email) {
        List<GymWorkoutPlan> list = workoutPlanRepository.findByProjectIdAndMemberEmail(projectId, email);
        if (list.isEmpty()) {
            // Seed a basic workout routine
            String[] days = {"Monday", "Wednesday", "Friday"};
            String[] routines = {
                "Bench Press (4x10), Overhead Shoulder Press (3x12), Triceps Pushdowns (3x15)",
                "Deadlifts (4x6), Lat Pulldowns (3x10), Barbell Bicep Curls (3x12)",
                "Barbell Squats (4x10), Leg Press (3x12), Standing Calf Raises (4x15)"
            };
            for (int i = 0; i < days.length; i++) {
                GymWorkoutPlan plan = new GymWorkoutPlan();
                plan.setProjectId(projectId);
                plan.setMemberEmail(email);
                plan.setDayOfWeek(days[i]);
                plan.setExercises(routines[i]);
                workoutPlanRepository.save(plan);
            }
            list = workoutPlanRepository.findByProjectIdAndMemberEmail(projectId, email);
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping("/workouts")
    public ResponseEntity<GymWorkoutPlan> saveWorkout(@RequestBody GymWorkoutPlan plan) {
        // If a plan exists for this day and email, update it, otherwise create new
        List<GymWorkoutPlan> existing = workoutPlanRepository.findByProjectIdAndMemberEmail(plan.getProjectId(), plan.getMemberEmail());
        for (GymWorkoutPlan ex : existing) {
            if (ex.getDayOfWeek().equalsIgnoreCase(plan.getDayOfWeek())) {
                ex.setExercises(plan.getExercises());
                return ResponseEntity.ok(workoutPlanRepository.save(ex));
            }
        }
        return ResponseEntity.ok(workoutPlanRepository.save(plan));
    }

    // --- Gym Diet Plans ---
    @GetMapping("/diets")
    public ResponseEntity<List<GymDietPlan>> getDiets(@RequestParam Long projectId) {
        return ResponseEntity.ok(dietPlanRepository.findByProjectId(projectId));
    }

    @GetMapping("/diets/member")
    public ResponseEntity<GymDietPlan> getMemberDiet(@RequestParam Long projectId, @RequestParam String email) {
        Optional<GymDietPlan> opt = dietPlanRepository.findByProjectIdAndMemberEmail(projectId, email);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        GymDietPlan defaultDiet = new GymDietPlan();
        defaultDiet.setProjectId(projectId);
        defaultDiet.setMemberEmail(email);
        defaultDiet.setDietChart("Breakfast: Oatmeal & Egg Whites\nLunch: Grilled Chicken & Brown Rice\nDinner: Baked Salmon & Asparagus");
        defaultDiet.setWaterGoal("3.5 Liters");
        return ResponseEntity.ok(dietPlanRepository.save(defaultDiet));
    }

    @PostMapping("/diets")
    public ResponseEntity<GymDietPlan> saveDiet(@RequestBody GymDietPlan plan) {
        Optional<GymDietPlan> opt = dietPlanRepository.findByProjectIdAndMemberEmail(plan.getProjectId(), plan.getMemberEmail());
        if (opt.isPresent()) {
            GymDietPlan existing = opt.get();
            existing.setDietChart(plan.getDietChart());
            existing.setWaterGoal(plan.getWaterGoal());
            return ResponseEntity.ok(dietPlanRepository.save(existing));
        }
        return ResponseEntity.ok(dietPlanRepository.save(plan));
    }

    // --- Gym Payments ---
    @GetMapping("/payments")
    public ResponseEntity<List<GymPayment>> getPayments(@RequestParam Long projectId) {
        List<GymPayment> payments = paymentRepository.findByProjectId(projectId);
        if (payments.isEmpty()) {
            // Seed a initial payment record
            GymPayment p1 = new GymPayment();
            p1.setProjectId(projectId);
            p1.setMemberEmail("member@gmail.com");
            p1.setAmount(1500.00);
            p1.setPaymentDate("2026-06-20");
            p1.setPaymentMethod("Online");
            p1.setStatus("Paid");
            p1.setPlanName("Silver Starter Pass");
            paymentRepository.save(p1);
            payments = paymentRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/payments/member")
    public ResponseEntity<List<GymPayment>> getMemberPayments(@RequestParam Long projectId, @RequestParam String email) {
        return ResponseEntity.ok(paymentRepository.findByProjectIdAndMemberEmail(projectId, email));
    }

    @PostMapping("/payments")
    public ResponseEntity<GymPayment> savePayment(@RequestBody GymPayment payment) {
        return ResponseEntity.ok(paymentRepository.save(payment));
    }

    // --- Gym Expenses ---
    @GetMapping("/expenses")
    public ResponseEntity<List<GymExpense>> getExpenses(@RequestParam Long projectId) {
        List<GymExpense> expenses = expenseRepository.findByProjectId(projectId);
        if (expenses.isEmpty()) {
            GymExpense e1 = new GymExpense();
            e1.setProjectId(projectId);
            e1.setExpenseName("Gym Facility Rent");
            e1.setAmount(12000.00);
            e1.setExpenseDate("2026-06-01");
            e1.setCategory("Rent");
            expenseRepository.save(e1);

            GymExpense e2 = new GymExpense();
            e2.setProjectId(projectId);
            e2.setExpenseName("Electricity Bill");
            e2.setAmount(3200.00);
            e2.setExpenseDate("2026-06-15");
            e2.setCategory("Electricity");
            expenseRepository.save(e2);

            expenses = expenseRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(expenses);
    }

    @PostMapping("/expenses")
    public ResponseEntity<GymExpense> saveExpense(@RequestBody GymExpense expense) {
        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Gym Equipment ---
    @GetMapping("/equipment")
    public ResponseEntity<List<GymEquipment>> getEquipment(@RequestParam Long projectId) {
        List<GymEquipment> equipment = equipmentRepository.findByProjectId(projectId);
        if (equipment.isEmpty()) {
            GymEquipment eq1 = new GymEquipment();
            eq1.setProjectId(projectId);
            eq1.setName("Commercial Treadmill T80");
            eq1.setPurchaseDate("2026-01-10");
            eq1.setMaintenanceSchedule("Every 3 Months");
            eq1.setWarrantyDetails("3 Years Warranty");
            equipmentRepository.save(eq1);

            GymEquipment eq2 = new GymEquipment();
            eq2.setProjectId(projectId);
            eq2.setName("Olympic Barbell & Bumper Plates");
            eq2.setPurchaseDate("2026-02-15");
            eq2.setMaintenanceSchedule("Monthly Check");
            eq2.setWarrantyDetails("Lifetime Barbell Warranty");
            equipmentRepository.save(eq2);

            equipment = equipmentRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(equipment);
    }

    @PostMapping("/equipment")
    public ResponseEntity<GymEquipment> saveEquipment(@RequestBody GymEquipment item) {
        return ResponseEntity.ok(equipmentRepository.save(item));
    }

    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Gym Offers ---
    @GetMapping("/offers")
    public ResponseEntity<List<GymOffer>> getOffers(@RequestParam Long projectId) {
        List<GymOffer> offers = offerRepository.findByProjectId(projectId);
        if (offers.isEmpty()) {
            GymOffer o1 = new GymOffer();
            o1.setProjectId(projectId);
            o1.setCode("FIT20");
            o1.setDiscountAmount(20.0);
            o1.setType("Percentage");
            o1.setStatus("Active");
            offerRepository.save(o1);

            GymOffer o2 = new GymOffer();
            o2.setProjectId(projectId);
            o2.setCode("WELCOME100");
            o2.setDiscountAmount(100.0);
            o2.setType("Flat");
            o2.setStatus("Active");
            offerRepository.save(o2);

            offers = offerRepository.findByProjectId(projectId);
        }
        return ResponseEntity.ok(offers);
    }

    @PostMapping("/offers")
    public ResponseEntity<GymOffer> saveOffer(@RequestBody GymOffer offer) {
        return ResponseEntity.ok(offerRepository.save(offer));
    }

    @DeleteMapping("/offers/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
