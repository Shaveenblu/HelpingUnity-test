package com.example.HelpingUnity.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.HelpingUnity.entity.FundRaising;
import com.example.HelpingUnity.entity.User;
import com.example.HelpingUnity.repository.FundRaisingRepository;
import com.example.HelpingUnity.repository.UserRepository;

@RestController
@RequestMapping("api/Fundraisers")
public class FundraisingController {
    @Autowired
    private FundRaisingRepository FundRaisingRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String IMAGE_DIR = "uploaded_images/";

    @PostMapping
    public ResponseEntity<?> createFundRaise(
            @RequestParam String title,
            @RequestParam String country,
            @RequestParam String zipcode,
            @RequestParam String reason,
            @RequestParam String amount,
            @RequestParam String story,
            @RequestParam MultipartFile image,
            @RequestParam Long userId) {

        try {
            // Save image
            String imagePath = IMAGE_DIR + image.getOriginalFilename();
            Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);

            // Save donation
            FundRaising fundraise = new FundRaising();
            fundraise.setTitle(title);
            fundraise.setCountry(country);
            fundraise.setZipcode(zipcode);
            fundraise.setReason(reason);
            fundraise.setAmount(amount);
            fundraise.setImageUrl(imagePath);
            fundraise.setStory(story);
            fundraise.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));

            FundRaisingRepository.save(fundraise);

            return ResponseEntity.ok("Fund created successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<FundRaising>> getAllFundRaise() {
        List<FundRaising> fundraise = FundRaisingRepository.findAll();
        return ResponseEntity.ok(fundraise);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getFundRaise(@PathVariable Long id) {
        return FundRaisingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFundRaise(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String country,
            @RequestParam String zipcode,
            @RequestParam String reason,
            @RequestParam String amount,
            @RequestParam String story,
            @RequestParam MultipartFile image) {

        try {
            return FundRaisingRepository.findById(id).map(fundraise -> {
                fundraise.setTitle(title);
                fundraise.setCountry(country);
                fundraise.setZipcode(zipcode);
                fundraise.setReason(reason);
                fundraise.setAmount(amount);
                fundraise.setStory(story);

                // Update image if provided
                if (!image.isEmpty()) {
                    String imagePath = IMAGE_DIR + image.getOriginalFilename();
                    try {
						Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                    fundraise.setImageUrl(imagePath);
                }

                FundRaisingRepository.save(fundraise);
                return ResponseEntity.ok("Funds updated successfully!");
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFundraise(@PathVariable Long id) {
        if (FundRaisingRepository.existsById(id)) {
        	FundRaisingRepository.deleteById(id);
            return ResponseEntity.ok("Fund deleted successfully!");
        }
        return ResponseEntity.notFound().build();
    }
}
