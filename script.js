// Md Saad | Portfolio Website
// script.js - works with plain HTML. Every feature checks if the element exists,
// so nothing breaks if a section is missing.

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Smooth scrolling for nav links (href="#about", "#projects", etc.) */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // close mobile menu after click
          const menu = document.querySelector(".nav-links");
          if (menu) menu.classList.remove("open");
        }
      }
    });
  });

  /* 2. Mobile menu toggle
     HTML: <button class="menu-toggle">Menu</button>
           <nav class="nav-links"> ... </nav>
     CSS:  .nav-links.open { display: flex; } */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* 3. Scroll reveal animation
     HTML: add class="reveal" to any element you want to animate
     CSS:  .reveal { opacity: 0; transform: translateY(40px); transition: all .8s ease; }
           .reveal.visible { opacity: 1; transform: none; } */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* 4. Services accordion (only one open at a time)
     HTML: <div class="service-item">
             <div class="service-header">UI/UX DESIGN</div>
             <div class="service-content">Description...</div>
           </div>
     CSS:  .service-content { display: none; }
           .service-item.active .service-content { display: block; } */
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    const header = item.querySelector(".service-header");
    if (!header) return;
    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      serviceItems.forEach((i) => i.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
    });
  });

  /* 5. Highlight the current section in the navbar while scrolling
     CSS: .nav-links a.active { font-weight: 700; } */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  if (sections.length && navAnchors.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
          current = section.getAttribute("id");
        }
      });
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    });
  }

  /* 6. Navbar shadow when scrolled
     HTML: <header class="navbar">
     CSS:  .navbar.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,.1); } */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* 7. Floating preview image on hover (experience / showcase rows)
     HTML: <div class="hover-row" data-img="images/project1.png">...</div>
           <img class="hover-preview" alt=""> (one image placed anywhere)
     CSS:  .hover-preview { position: fixed; pointer-events: none; width: 220px;
                            opacity: 0; transition: opacity .2s; transform: rotate(-6deg); }
           .hover-preview.show { opacity: 1; } */
  const preview = document.querySelector(".hover-preview");
  const hoverRows = document.querySelectorAll(".hover-row");
  if (preview && hoverRows.length) {
    hoverRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const src = row.getAttribute("data-img");
        if (src) preview.src = src;
        preview.classList.add("show");
      });
      row.addEventListener("mousemove", (e) => {
        preview.style.left = e.clientX + 20 + "px";
        preview.style.top = e.clientY - 80 + "px";
      });
      row.addEventListener("mouseleave", () => {
        preview.classList.remove("show");
      });
    });
  }

  /* 8. Back to top button
     HTML: <button id="backToTop">↑</button>
     CSS:  #backToTop { position: fixed; bottom: 24px; right: 24px; display: none; }
           #backToTop.show { display: block; } */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 9. Auto-update the year in the footer
     HTML: <span id="year"></span> */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* 10. Contact form (simple, no backend)
     HTML: <form id="contactForm"> ... </form> */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! I'll get back to you soon.");
      form.reset();
    });
  }
});
