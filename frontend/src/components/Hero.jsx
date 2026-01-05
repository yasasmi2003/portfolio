import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Code, Server, GitBranch, Mail, Github, Linkedin, 
  FileText, CheckCircle, Smartphone, GraduationCap, ShoppingCart, 
  ArrowRight, Send, User, MessageSquare, Award, BookOpen, Star
} from 'lucide-react';

// --- CUSTOM HOOK FOR SCROLL ANIMATION ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before hitting the absolute bottom
    });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);
};

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [formStatus, setFormStatus] = useState('idle');
  const form = useRef();
  
  // Initialize the scroll animation hook
  useScrollReveal();

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // PASTE YOUR KEYS HERE
    const SERVICE_ID = 'service_123'; 
    const PUBLIC_KEY = 'qYVImGN8gyK713MiA';
    const TEMPLATE_ID = 'template_g9384ty';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY })
      .then(
        () => {
          setFormStatus('success');
          setTimeout(() => {
            setFormStatus('idle');
            form.current.reset();
          }, 3000);
        },
        (error) => {
          alert("Failed to send: " + error.text);
          setFormStatus('idle');
        },
      );
  };

  // --- CSS STYLES & ANIMATIONS ---
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
    
    html { scroll-behavior: smooth; }
    body { margin: 0; padding: 0; overflow-x: hidden; }

    /* --- SCROLL REVEAL CLASSES --- */
    .reveal {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
      will-change: opacity, transform;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* Staggered Animation Delays */
    .delay-100 { transition-delay: 0.1s; }
    .delay-200 { transition-delay: 0.2s; }
    .delay-300 { transition-delay: 0.3s; }
    .delay-400 { transition-delay: 0.4s; }

    /* --- OTHER ANIMATIONS --- */
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
    .animate-float { animation: float 6s ease-in-out infinite; }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin { animation: spin 1s linear infinite; }

    /* Hover Effects */
    .hover-lift { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
    .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.15); }
    
    .hover-scale { transition: transform 0.2s ease; display: inline-block; }
    .hover-scale:hover { transform: scale(1.05); }

    .card-glow:hover {
      border-color: #8b7355 !important;
      box-shadow: 0 0 25px rgba(139, 115, 85, 0.3) !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb { background: #8b7355; borderRadius: 4px; }
  `;

  // Education Data
  const education = [
    {
      degree: "Bachelor of Software Engineering (Honours)",
      school: "Deakin University",
      period: "Current",
      grade: "High Distinction", 
      desc: "Specializing in full-stack development with a focus on scalable architecture.",
      icon: <GraduationCap size={24} color="#fff" />
    },
    {
      degree: "Diploma in Software Engineering (Honours)",
      school: "SLIIT University",
      period: "Completed",
      grade: "First-Class (3.78 GPA)", 
      desc: "Awarded First-Class Honours. Gained strong foundations in OOP and Algorithms.",
      icon: <Award size={24} color="#fff" />
    },
    {
      degree: "G.C.E. Advanced Level",
      school: "Physical Science Stream",
      period: "2022",
      grade: "4 B Passes", 
      desc: "Rigorous coursework in Mathematics, Physics, and Chemistry.",
      icon: <BookOpen size={24} color="#fff" />
    },
    {
      degree: "G.C.E. Ordinary Level",
      school: "Secondary Education",
      period: "2019",
      grade: "9 A Passes", 
      desc: "Achieved perfect distinction scores across all 9 subjects.",
      icon: <Star size={24} color="#fff" />
    }
  ];

  const projects = [
    { 
      title: "FixItNow - Repair System", 
      category: "fullstack", 
      tech: ["Java", "Spring Boot", "React", "MySQL"], 
      description: "Repair & equipment management system including Balance Sheets and P&L statements.", 
      link: "https://github.com/DasunShanaka01/FixItNow", 
      icon: <Server size={48} color="#fff" /> 
    },
    { 
      title: "Mobile Expense Tracker", 
      category: "mobile", 
      tech: ["React Native", "Firebase", "Context API"], 
      description: "Cross-platform financial application with offline data persistence and charting.", 
      link: "#",
      icon: <Smartphone size={48} color="#fff" /> 
    },
    { 
      title: "Student Info Portal", 
      category: "fullstack", 
      tech: ["Java", "JSP", "PostgreSQL"], 
      description: "Secure academic management system handling course registration and automated grading.", 
      link: "#",
      icon: <GraduationCap size={48} color="#fff" /> 
    },
    { 
      title: "E-Commerce Architecture", 
      category: "frontend", 
      tech: ["React", "JavaScript", "CSS3"], 
      description: "High-performance storefront optimized for user retention with responsive galleries.", 
      link: "#",
      icon: <ShoppingCart size={48} color="#fff" /> 
    }
  ];

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>Yasasmi</div>
          <div style={styles.navLinks}>
            {['ABOUT', 'SKILLS', 'EDUCATION', 'PROJECTS', 'CONTACT'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={styles.navLink} className="hover-scale">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.heroSection} id="about">
        <div style={styles.heroContainer}>
          <div style={styles.heroContent} className="reveal active"> {/* Hero starts active */}
            <div style={styles.candidateHeader}>
              <div style={styles.candidateLine}></div>
              <span style={styles.candidateLabel}>SOFTWARE ENGINEERING CANDIDATE</span>
              <div style={styles.candidateLine}></div>
            </div>

            <h1 style={styles.heroTitle} className="reveal active">
              Yasasmi Waranga
            </h1>
            
            <h2 style={styles.heroSubtitle} className="reveal active delay-100">
              IT Undergraduate
            </h2>
            
            <p style={styles.heroDescription} className="reveal active delay-200">
              Building efficient, full-stack digital solutions. 
              Committed to writing clean code that solves complex 
              business logic and improves user workflows.
            </p>

            <div style={styles.heroButtons} className="reveal active delay-300">
              <a 
                href="/Yasasmi_Waranga_CV.pdf" 
                download="Yasasmi_Waranga_CV.pdf" 
                style={styles.btnPrimary} 
                className="hover-lift"
              >
                <FileText size={18} /> Download Resume
              </a>
              
              <a href="#projects" style={styles.btnSecondary} className="hover-lift">
                View Projects
              </a>
            </div>

            <div style={styles.socialLinks} className="reveal active delay-300">
              <a href="#" style={styles.socialLink} className="hover-scale"><Github size={22} /></a>
              <a href="#" style={styles.socialLink} className="hover-scale"><Linkedin size={22} /></a>
              <a href="#" style={styles.socialLink} className="hover-scale"><Mail size={22} /></a>
            </div>
          </div>

          <div style={styles.heroImageWrapper} className="reveal active delay-200">
            <img 
              src="/hero2.png" 
              alt="Yasasmi Waranga" 
              style={styles.heroImage} 
              className="animate-float" 
            />
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" style={styles.skillsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader} className="reveal">
            <h2 style={styles.sectionTitle}>Technical Expertise</h2>
            <p style={styles.sectionSubtitle}>
              A robust toolkit developed through academic rigour and practical application.
            </p>
          </div>

          <div style={styles.skillsGrid}>
            <div style={styles.skillCard} className="reveal delay-100 hover-lift card-glow">
              <div style={styles.skillHeader}>
                <div style={styles.iconCircle}><Code size={24} color="#1a1a1a" /></div>
                <h3 style={styles.skillTitle}>Core & Backend</h3>
              </div>
              <p style={styles.skillDesc}>Building scalable logic and secure data flows.</p>
              <div style={styles.badgeContainer}>
                {['Java', 'Spring Boot', 'MySQL', 'PostgreSQL', 'OOP Patterns', 'REST APIs'].map(tech => (
                  <span key={tech} style={styles.skillBadge}>{tech}</span>
                ))}
              </div>
            </div>

            <div style={styles.skillCard} className="reveal delay-200 hover-lift card-glow">
              <div style={styles.skillHeader}>
                <div style={styles.iconCircle}><Smartphone size={24} color="#1a1a1a" /></div>
                <h3 style={styles.skillTitle}>Frontend & Mobile</h3>
              </div>
              <p style={styles.skillDesc}>Crafting responsive and interactive user experiences.</p>
              <div style={styles.badgeContainer}>
                {['React.js', 'React Native', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Context API', 'UI/UX'].map(tech => (
                  <span key={tech} style={styles.skillBadge}>{tech}</span>
                ))}
              </div>
            </div>

            <div style={styles.skillCard} className="reveal delay-300 hover-lift card-glow">
              <div style={styles.skillHeader}>
                <div style={styles.iconCircle}><GitBranch size={24} color="#1a1a1a" /></div>
                <h3 style={styles.skillTitle}>Tools & Ecosystem</h3>
              </div>
              <p style={styles.skillDesc}>Ensuring code quality, version control, and deployment.</p>
              <div style={styles.badgeContainer}>
                {['Git & GitHub', 'Postman', 'Firebase', 'VS Code', 'IntelliJ IDEA', 'Agile/Scrum'].map(tech => (
                  <span key={tech} style={styles.skillBadge}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" style={styles.educationSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader} className="reveal">
            <h2 style={styles.sectionTitleLight}>Academic Journey</h2>
            <p style={{...styles.sectionSubtitle, color: '#666'}}>
              Foundational knowledge and advanced studies driving engineering success.
            </p>
          </div>
          
          <div style={styles.eduGrid}>
            {education.map((edu, index) => (
              // Stagger animation based on index
              <div key={index} style={styles.eduCard} className={`reveal hover-lift ${index % 2 === 0 ? 'delay-100' : 'delay-200'}`}>
                <div style={styles.eduIconWrapper}>
                  {edu.icon}
                </div>
                <div style={styles.eduTopRow}>
                  <span style={styles.eduDate}>{edu.period}</span>
                  <span style={styles.eduGrade}>{edu.grade}</span>
                </div>
                <h3 style={styles.eduDegree}>{edu.degree}</h3>
                <h4 style={styles.eduSchool}>{edu.school}</h4>
                <div style={styles.eduDivider}></div>
                <p style={styles.eduDesc}>{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" style={styles.projectsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader} className="reveal">
            <h2 style={styles.sectionTitle}>Featured Work</h2>
            <p style={styles.sectionSubtitle}>
              Selected projects demonstrating full-stack capabilities and problem-solving.
            </p>
          </div>

          <div style={styles.projectFilters} className="reveal delay-100">
            {['all', 'fullstack', 'mobile', 'frontend'].map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} style={{ ...styles.filterBtn, ...(activeFilter === filter ? styles.filterBtnActive : {}) }} className="hover-scale">
                {filter.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={styles.showcaseGrid}>
            {filteredProjects.map((project, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.showcaseItem,
                  flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' 
                }} 
                className="reveal delay-100"
              >
                <div style={styles.showcaseVisual} className="hover-lift">
                  <div style={styles.showcaseOverlay}>
                    {project.icon}
                  </div>
                </div>
                <div style={styles.showcaseContent}>
                  <span style={styles.showcaseCategory}>{project.category}</span>
                  <h3 style={styles.showcaseTitle}>{project.title}</h3>
                  <p style={styles.showcaseDesc}>{project.description}</p>
                  <div style={styles.showcaseTechStack}>
                    {project.tech.map(t => <span key={t} style={styles.techPill}>{t}</span>)}
                  </div>
                  <a href={project.link} style={styles.showcaseLink} className="hover-scale">
                    View Source <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader} className="reveal">
            <h2 style={styles.sectionTitleLight}>Get In Touch</h2>
            <p style={{...styles.sectionSubtitle, color: '#666'}}>
              Interested in collaborating or have a question? I'd love to hear from you.
            </p>
          </div>

          <div style={styles.contactWrapper} className="reveal delay-200">
            <form ref={form} style={styles.contactForm} onSubmit={sendEmail}>
              <div style={styles.formGroup}>
                <label style={styles.label}><User size={16} color="#8b7355"/> Your Name</label>
                <input type="text" name="user_name" required style={styles.input} placeholder="John Doe" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}><Mail size={16} color="#8b7355"/> Email Address</label>
                <input type="email" name="user_email" required style={styles.input} placeholder="john@example.com" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}><MessageSquare size={16} color="#8b7355"/> Message</label>
                <textarea name="message" required rows="4" style={styles.textarea} placeholder="Tell me about your project..."></textarea>
              </div>
              
              <button 
                type="submit" 
                style={styles.submitBtn} 
                className="hover-lift"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
              >
                {formStatus === 'submitting' ? (
                  <span className="animate-spin"><CheckCircle size={20} /></span>
                ) : formStatus === 'success' ? (
                  <>Message Sent <CheckCircle size={20} /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent} className="reveal">
          <h2 style={styles.footerTitle}>Yasasmi Waranga</h2>
          <p style={styles.footerText}>Software Engineering Portfolio • Built with React</p>
          <div style={styles.footerSocial}>
            <a href="#" style={{color: '#8b7355'}} className="hover-scale"><Github size={24} /></a>
            <a href="#" style={{color: '#8b7355'}} className="hover-scale"><Linkedin size={24} /></a>
            <a href="#" style={{color: '#8b7355'}} className="hover-scale"><Mail size={24} /></a>
          </div>
          <div style={styles.footerBottom}>© 2024 Yasasmi Waranga. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// STYLES OBJECT
const styles = {
  container: { 
    fontFamily: "'Inter', sans-serif", 
    backgroundColor: '#f5f0e6', 
    color: '#3d3d3d', 
    minHeight: '100vh',
    position: 'relative'
  },
  
  // NAVIGATION
  nav: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    padding: '1.2rem 4rem', 
    zIndex: 1000, 
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 240, 230, 0.95)', 
    backdropFilter: 'blur(12px)', 
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)', 
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)', 
  },
  navContainer: { 
    width: '100%', 
    maxWidth: '1300px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  logo: { 
    fontFamily: "'Playfair Display', serif", 
    fontSize: '1.5rem', 
    fontWeight: 800, 
    color: '#3d2e26', 
    letterSpacing: '-0.5px'
  },
  navLinks: { display: 'flex', gap: '2.5rem' },
  navLink: { 
    textDecoration: 'none', 
    color: '#3d2e26', 
    fontSize: '0.85rem', 
    fontWeight: 600, 
    letterSpacing: '1px', 
    textTransform: 'uppercase',
  },

  // HERO SECTION
  heroSection: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #f5f0e6 45%, #1a1a1a 85%)',
    overflow: 'hidden',
    padding: '0 2rem',
    marginTop: '0' 
  },
  heroContainer: {
    maxWidth: '1300px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  heroContent: {
    maxWidth: '600px',
    zIndex: 10,
    paddingTop: '6rem' 
  },
  candidateHeader: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginBottom: '1rem' 
  },
  candidateLine: { 
    width: '60px', 
    height: '1px', 
    backgroundColor: '#666' 
  },
  candidateLabel: { 
    fontSize: '0.75rem', 
    fontWeight: 600, 
    letterSpacing: '1.5px', 
    color: '#555', 
    textTransform: 'uppercase',
    fontFamily: "'Inter', sans-serif"
  },
  heroTitle: { 
    fontFamily: "'Playfair Display', serif", 
    fontSize: '4.5rem', 
    fontWeight: 700, 
    lineHeight: '1.1', 
    color: '#3d2e26', 
    marginBottom: '0.5rem'
  },
  heroSubtitle: { 
    fontFamily: "'Playfair Display', serif", 
    fontSize: '2rem', 
    fontStyle: 'italic', 
    color: '#5c4d42', 
    marginBottom: '2rem' 
  },
  heroDescription: { 
    fontSize: '1.05rem', 
    lineHeight: 1.7, 
    color: '#555', 
    marginBottom: '3rem', 
    maxWidth: '480px' 
  },
  heroButtons: { display: 'flex', gap: '1rem', marginBottom: '3rem' },
  btnPrimary: { 
    padding: '0.9rem 2.2rem', 
    backgroundColor: '#5c4d42', 
    color: '#f5f0e6', 
    borderRadius: '50px', 
    textDecoration: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.6rem', 
    fontWeight: 500, 
    fontSize: '0.95rem'
  },
  btnSecondary: { 
    padding: '0.9rem 2.2rem', 
    backgroundColor: 'transparent', 
    color: '#5c4d42', 
    border: '1px solid #5c4d42', 
    borderRadius: '50px', 
    textDecoration: 'none', 
    fontWeight: 500, 
    fontSize: '0.95rem' 
  },
  socialLinks: { display: 'flex', gap: '1.5rem' },
  socialLink: { color: '#5c4d42', opacity: 0.8 },
  heroImageWrapper: {
    flex: 1,
    height: '90vh',
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
    position: 'relative',
    marginTop: '6rem' 
  },
  heroImage: {
    width: '100%',
    maxWidth: '550px',
    height: 'auto',
    objectFit: 'contain',
    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
    filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
  },

  // SKILLS SECTION (DARK)
  skillsSection: { 
    padding: '8rem 2rem', 
    background: 'linear-gradient(to bottom, #1a1a1a, #252525)', 
    position: 'relative',
    color: '#fff'
  },
  sectionContainer: { maxWidth: '1200px', margin: '0 auto' },
  sectionHeader: { textAlign: 'center', marginBottom: '5rem' },
  sectionTitle: { 
    fontFamily: "'Playfair Display', serif", 
    fontSize: '3rem', 
    color: '#f5f0e6',
    position: 'relative',
    display: 'inline-block'
  },
  sectionSubtitle: {
    color: '#aaa',
    marginTop: '1rem',
    fontSize: '1.1rem',
    fontWeight: 300
  },
  // Light Title for Education & Contact section
  sectionTitleLight: {
    fontFamily: "'Playfair Display', serif", 
    fontSize: '3rem', 
    color: '#3d2e26',
    position: 'relative',
    display: 'inline-block'
  },
  skillsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
    gap: '2.5rem' 
  },
  skillCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    padding: '3rem 2rem', 
    borderRadius: '16px', 
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    transition: 'all 0.4s ease'
  },
  skillHeader: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginBottom: '1rem' 
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#8b7355', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(139, 115, 85, 0.4)'
  },
  skillTitle: { 
    fontFamily: "'Playfair Display', serif", 
    fontSize: '1.5rem', 
    color: '#f5f0e6', 
    margin: 0
  },
  skillDesc: {
    fontSize: '0.95rem',
    color: '#b0b0b0',
    marginBottom: '2rem',
    lineHeight: '1.6'
  },
  badgeContainer: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '0.8rem' 
  },
  skillBadge: { 
    padding: '0.5rem 1rem', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    color: '#eaddcf', 
    borderRadius: '50px', 
    fontSize: '0.85rem', 
    fontWeight: 500, 
    letterSpacing: '0.5px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'default'
  },

  // EDUCATION SECTION (LIGHT)
  educationSection: { 
    padding: '8rem 2rem', 
    backgroundColor: '#f5f0e6',
    position: 'relative'
  },
  eduGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
    gap: '3.5rem 2rem', 
    marginTop: '2rem'
  },
  eduCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2.5rem 2.5rem 2.5rem 2.5rem',
    position: 'relative', 
    boxShadow: '0 10px 40px -15px rgba(0,0,0,0.05)',
    borderTop: '4px solid #8b7355', 
    display: 'flex',
    flexDirection: 'column'
  },
  eduIconWrapper: {
    position: 'absolute',
    top: '-28px', 
    left: '2rem',
    width: '56px',
    height: '56px',
    backgroundColor: '#8b7355',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 5px 15px rgba(139, 115, 85, 0.4)'
  },
  eduTopRow: {
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: '1rem',
    marginBottom: '1rem'
  },
  eduDate: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    alignSelf: 'center'
  },
  eduGrade: {
    backgroundColor: '#f5f0e6',
    color: '#8b7355',
    padding: '0.3rem 0.8rem',
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: 700
  },
  eduDegree: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem',
    color: '#3d2e26',
    margin: '0.5rem 0 0.3rem 0',
    lineHeight: 1.2
  },
  eduSchool: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#666',
    margin: '0 0 1.2rem 0'
  },
  eduDivider: {
    width: '40px',
    height: '2px',
    backgroundColor: '#eee',
    marginBottom: '1.2rem'
  },
  eduDesc: {
    fontSize: '0.95rem',
    color: '#777',
    lineHeight: 1.6
  },

  // --- DARK PROJECTS SECTION ---
  projectsSection: { 
    padding: '8rem 2rem', 
    backgroundColor: '#1a1a1a', // Dark background
    color: '#fff'
  }, 
  projectFilters: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '1rem', 
    marginBottom: '5rem' 
  },
  filterBtn: { 
    padding: '0.6rem 1.5rem', 
    backgroundColor: 'transparent', 
    border: '1px solid #8b7355', 
    borderRadius: '50px', 
    fontWeight: 600, 
    cursor: 'pointer', 
    fontSize: '0.8rem', 
    color: '#8b7355' 
  },
  filterBtnActive: { 
    backgroundColor: '#8b7355', 
    color: '#f5f0e6' 
  },
  
  showcaseGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem', 
    maxWidth: '1200px',
    margin: '0 auto'
  },
  showcaseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    flexWrap: 'wrap' 
  },
  
  showcaseVisual: {
    flex: '1 1 400px', 
    height: '350px',
    backgroundColor: '#262626', 
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  showcaseOverlay: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #262626 0%, #333 100%)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s ease'
  },
  
  showcaseContent: {
    flex: '1 1 400px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  showcaseCategory: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#8b7355',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '0.5rem'
  },
  showcaseTitle: {
    fontFamily: "'Playfair Display', serif", 
    fontSize: '2.5rem', 
    color: '#f5f0e6', // Light text
    margin: '0 0 1rem 0',
    lineHeight: 1.1
  },
  showcaseDesc: {
    fontSize: '1rem',
    color: '#aaa', // Light grey text
    lineHeight: 1.7,
    marginBottom: '2rem'
  },
  showcaseTechStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.8rem',
    marginBottom: '2.5rem'
  },
  techPill: {
    padding: '0.4rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Glass style
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#eaddcf',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  showcaseLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#f5f0e6',
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    borderBottom: '2px solid #8b7355',
    paddingBottom: '2px',
    width: 'fit-content'
  },

  // --- CONTACT SECTION STYLES ---
  contactSection: {
    padding: '8rem 2rem',
    backgroundColor: '#f5f0e6', // Alternating light
    position: 'relative'
  },
  contactWrapper: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  contactForm: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#3d2e26',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  input: {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: "'Inter', sans-serif"
  },
  submitBtn: {
    padding: '1rem',
    backgroundColor: '#5c4d42',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  },

  footer: { padding: '5rem 2rem', backgroundColor: '#111', color: '#f5ebe0', textAlign: 'center' },
  footerContent: { maxWidth: '800px', margin: '0 auto' },
  footerTitle: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' },
  footerText: { color: '#888', marginBottom: '2rem' },
  footerEmail: { fontSize: '1.2rem', color: '#f4ecd8', textDecoration: 'none', fontWeight: 700 },
  footerSocial: { display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' },
  footerBottom: { fontSize: '0.8rem', opacity: 0.5, marginTop: '3rem' }
};