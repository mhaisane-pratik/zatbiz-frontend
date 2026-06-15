package com.primezat.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiApiController {

    public static class ChatRequest {
        private String message;
        private String context; // dashboard, builder
        private String activeBlockType; // header, hero, features, etc.

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getContext() {
            return context;
        }

        public void setContext(String context) {
            this.context = context;
        }

        public String getActiveBlockType() {
            return activeBlockType;
        }

        public void setActiveBlockType(String activeBlockType) {
            this.activeBlockType = activeBlockType;
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chatResponse(@RequestBody ChatRequest request) {
        String msg = request.getMessage().trim().toLowerCase();
        String context = request.getContext();
        String activeBlock = request.getActiveBlockType();

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> payload = new HashMap<>();

        response.put("action", "NONE");
        response.put("actionPayload", payload);

        // Routing logic based on query keywords
        if (msg.contains("coffee") || msg.contains("cafe")) {
            response.put("answer", "Here is a cozy coffee shop branding concept I generated for your website. You can click 'Apply Suggestion' to update the selected layout section instantly!");
            response.put("action", "UPDATE_CONTENT");
            payload.put("title", "Bean & Brew Artisans");
            payload.put("subtitle", "Artisanal organic coffee beans roasted locally and brewed with pure precision.");
            payload.put("btn1Text", "Order Online");
            payload.put("btn2Text", "Our Roast Menu");
        } 
        else if (msg.contains("gym") || msg.contains("fit") || msg.contains("sport")) {
            response.put("answer", "I've drafted a premium high-energy heading and subtitle layout suited for fitness coaches and gym studios. Click 'Apply' to load it into the active block.");
            response.put("action", "UPDATE_CONTENT");
            payload.put("title", "Apex Velocity Gym");
            payload.put("subtitle", "Premium training gear, elite coaching staff, and advanced workout tracks to break limits.");
            payload.put("btn1Text", "Claim Free Pass");
            payload.put("btn2Text", "Browse Classes");
        }
        else if (msg.contains("pricing") || msg.contains("price")) {
            response.put("answer", "Sure thing! I am adding a customizable Pricing Cards block to your page layout right now. You can edit the individual plans in the right sidebar.");
            response.put("action", "ADD_BLOCK");
            payload.put("blockType", "pricing");
        }
        else if (msg.contains("faq") || msg.contains("question")) {
            response.put("answer", "Adding a collapsible FAQ Accordion block to answer customer concerns. You can configure questions and replies in the right-side control editor.");
            response.put("action", "ADD_BLOCK");
            payload.put("blockType", "faq");
        }
        else if (msg.contains("portfolio") || msg.contains("creative")) {
            if ("dashboard".equalsIgnoreCase(context)) {
                response.put("answer", "I highly recommend the **Creative Agency** or **Personal Portfolio** templates for designers. The portfolio template includes a clean profile splash hero, visual grid projects list, and minimal footer rows.");
            } else {
                response.put("answer", "Here is a sleek copywriting card preset crafted for portfolios and designer showcases. Tap the apply link to test it on your canvas.");
                response.put("action", "UPDATE_CONTENT");
                payload.put("title", "Sleek Shapes, Creative Focus");
                payload.put("subtitle", "We help modern startups stand out through balanced typography, warm earth color tones, and glassmorphic micro-layouts.");
                payload.put("btn1Text", "View Case Studies");
            }
        }
        else if (msg.contains("theme") || msg.contains("style") || msg.contains("color")) {
            if (msg.contains("sunset") || msg.contains("orange")) {
                response.put("answer", "Swapping the active block preset style over to **Sunset Glow** HSL pastel gradient tones.");
                response.put("action", "SET_THEME");
                payload.put("theme", "sunset");
            } else if (msg.contains("sky") || msg.contains("blue") || msg.contains("emerald")) {
                response.put("answer", "Transitioning active section theme palette over to **Emerald Sky** warm water blues.");
                response.put("action", "SET_THEME");
                payload.put("theme", "deepblue");
            } else if (msg.contains("purple") || msg.contains("cosmic")) {
                response.put("answer", "Applying the vibrant **Cosmic Orchid** theme preset onto the selected visual block.");
                response.put("action", "SET_THEME");
                payload.put("theme", "purple");
            } else if (msg.contains("slate") || msg.contains("light") || msg.contains("gray")) {
                response.put("answer", "Reverting active layout selection back to the minimalist **Light Slate** theme.");
                response.put("action", "SET_THEME");
                payload.put("theme", "slate");
            } else {
                response.put("answer", "You can swap visual block presets using these styles: **Light Slate** (standard white), **Emerald Sky** (indigo-emerald glow), **Cosmic Orchid** (purple shades), or **Sunset Glow** (warm orange gradients). Which one should I set?");
            }
        }
        else if (msg.contains("publish") || msg.contains("save")) {
            response.put("answer", "To publish your website, simply click the **Publish Page** button in the top bar. Your page layout is saved to Spring Boot JPA and is instantly rendered live on the public preview URL!");
        }
        else if (msg.contains("help") || msg.contains("how to") || msg.contains("work")) {
            response.put("answer", "I am your PrimeZat AI Sidekick! You can chat with me to help generate copy, select layout presets, or perform actions. Try typing: \n- *'write a coffee shop banner'*\n- *'add a pricing block'*\n- *'change theme to sunset'*");
        }
        else {
            // General catch-all simulated LLM answer
            response.put("answer", "I understand you are working on your " + 
                (activeBlock != null ? activeBlock : "page") + " layout. I can help you draft copywriting details or insert block components. Try asking me: *'write a copy for a fitness club'* or *'add pricing card block'*!");
        }

        return ResponseEntity.ok(response);
    }
}
