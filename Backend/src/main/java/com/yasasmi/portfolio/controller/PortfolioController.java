package com.yasasmi.portfolio.controller;
import com.yasasmi.portfolio.model.Portfolio;  // must match Portfolio.java package

import com.yasasmi.portfolio.model.Portfolio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {

    @GetMapping("/api/portfolio")  // <-- This is your URL
    public Portfolio getPortfolio() {
        Portfolio portfolio = new Portfolio();
        portfolio.setName("Yasasmi Waranga");
        portfolio.setRole("Software Engineering Student");
        portfolio.setUniversity("Deakin University");
        portfolio.setBio("Aspiring Software Engineer focusing on web and mobile applications.");
        portfolio.setSkills(new String[]{"Java", "Spring Boot", "React", "SQL", "JavaScript"});

        Portfolio.Project project1 = new Portfolio.Project();
        project1.setTitle("Online Repair Marketplace");
        project1.setDescription("A platform connecting clients with repair technicians, including booking and payments.");
        project1.setLink("https://github.com/Yasasmi/repair-marketplace");

        Portfolio.Project project2 = new Portfolio.Project();
        project2.setTitle("Peer Note Sharing Platform");
        project2.setDescription("Students can share, upload, and download study notes with AI recommendations.");
        project2.setLink("https://github.com/Yasasmi/peer-notes");

        portfolio.setProjects(new Portfolio.Project[]{project1, project2});
        return portfolio;
    }
}
