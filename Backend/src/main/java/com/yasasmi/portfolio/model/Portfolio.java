package com.yasasmi.portfolio.model;  // must match folder path

public class Portfolio {
    private String name;
    private String role;
    private String university;
    private String bio;
    private String[] skills;
    private Project[] projects;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String[] getSkills() { return skills; }
    public void setSkills(String[] skills) { this.skills = skills; }
    public Project[] getProjects() { return projects; }
    public void setProjects(Project[] projects) { this.projects = projects; }

    public static class Project {
        private String title;
        private String description;
        private String link;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getLink() { return link; }
        public void setLink(String link) { this.link = link; }
    }
}
