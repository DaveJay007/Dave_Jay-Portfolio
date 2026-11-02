// Dave_Jay portfolio: edit profile links, skill levels, project copy and prices here.
const SITE_CONFIG = {
  email: "jusunyakeh3@gmail.com",
  github: "https://github.com/DaveJay007",
  prices: {
    individual: "LE 150",
    group: "LE 350",
    systems: "Custom quote"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // High-polish motion system: scroll progress, subtle pointer lighting and card tilt.
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);
  let scrollTicking = false;
  const updateScrollEffects = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
    document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    document.querySelector(".site-header")?.classList.toggle("header-scrolled", window.scrollY > 24);
    scrollTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollTicking) { window.requestAnimationFrame(updateScrollEffects); scrollTicking = true; }
  }, { passive: true });
  updateScrollEffects();

  if (window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", event => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    }, { passive: true });
    document.querySelectorAll(".panel, .project-card, .skill-card, .price-card, .social-links>a").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--spot-x", `${x * 100}%`);
        card.style.setProperty("--spot-y", `${y * 100}%`);
        if (card.matches(".skill-card, .price-card, .social-links>a")) {
          card.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
          card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--reveal-delay", `${Math.min(Array.from(revealItems).indexOf(entry.target) % 5, 4) * 75}ms`);
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Rotating hero phrase, with a reduced-motion fallback.
  const phrase = document.querySelector(".typed-word");
  const phrases = ["useful digital solutions", "smarter data workflows", "ideas into working projects", "technology with purpose"];
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % phrases.length;
      phrase.animate([{opacity: 0, transform: "translateY(5px)"}, {opacity: 1, transform: "translateY(0)"}], {duration: 360});
      phrase.textContent = phrases[index];
    }, 3000);
  }

  // Skill filters
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".skill-card").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.level !== filter;
      });
    });
  });

  // Project overview dialogs
  const projects = {
    library: {
      title: "Library Management System",
      description: "A library workflow project exploring book records, user activity, and borrowing rules. The intended system helps keep library information organized and makes borrowing status easier to track.",
      details: ["Focus: library operations and record keeping", "Technologies discussed: Python and SQL / PostgreSQL", "Next portfolio step: add approved screenshots, repository link, and confirmed implemented features"]
    },
    pat: {
      title: "Pat Emporium",
      description: "An e-commerce storefront project focused on presenting products clearly, maintaining a consistent brand, and preparing a customer-facing shopping experience.",
      details: ["Focus: product presentation and storefront UX", "Technologies used in project work: React, Vite, and Supabase", "Next portfolio step: add the approved live link and screenshots"]
    },
    school: {
      title: "School Financial System",
      description: "A proposed school information system for managing student and employee records, school fees, and financial information in a more organized way.",
      details: ["Focus: records, fees, and financial tracking", "Status: describe as a concept until implementation status is confirmed", "Next portfolio step: add confirmed modules, diagrams, and implementation evidence"]
    },
    restaurant: {
      title: "Restaurant Operations",
      description: "A restaurant workflow concept focused on order handling and tracking stock moving in and out, helping staff understand operational activity.",
      details: ["Focus: ordering and inventory workflow", "Status: confirm the delivered modules before publishing stronger claims", "Next portfolio step: add a workflow diagram or approved system screenshots"]
    }
  };
  const projectDialog = document.getElementById("project-modal");
  document.querySelectorAll(".project-details").forEach(button => {
    button.addEventListener("click", () => {
      const item = projects[button.dataset.project];
      document.getElementById("modal-title").textContent = item.title;
      document.getElementById("modal-description").textContent = item.description;
      const list = document.createElement("div");
      list.className = "modal-list";
      item.details.forEach(detail => {
        const row = document.createElement("span");
        row.textContent = detail;
        list.appendChild(row);
      });
      const details = document.getElementById("modal-details");
      details.replaceChildren(list);
      projectDialog.showModal();
    });
  });

  // Close dialogs from close buttons or backdrop clicks.
  document.querySelectorAll(".modal-close").forEach(button => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });
  document.getElementById("open-card").addEventListener("click", () => {
    document.getElementById("digital-modal").showModal();
  });

  // Confirmed starting prices in Sierra Leonean leones.
  document.querySelectorAll("[data-price]").forEach(node => {
    const key = node.dataset.price;
    node.textContent = SITE_CONFIG.prices[key];
  });

  // Quote buttons open a prefilled email; no server or form backend is required.
  document.querySelectorAll(".quote-link").forEach(link => {
    const service = link.dataset.service;
    const subject = encodeURIComponent(`Enquiry: ${service}`);
    const body = encodeURIComponent(`Hello David,\n\nI'm interested in ${service}.\n\nBrief description:\n\nDeadline (if applicable):\n\nPlease let me know the starting price and next steps.\n\nThank you.`);
    link.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  });

  // QR code uses the current canonical page URL. It becomes the permanent address after deployment.
  const qrContainer = document.getElementById("qrcode");
  const fallback = document.getElementById("qr-fallback");
  const downloadButton = document.getElementById("download-qr");
  const currentUrl = window.location.href;
  const isLocalPreview = location.protocol === "file:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (window.QRCode && !isLocalPreview) {
    new QRCode(qrContainer, { text: currentUrl, width: 166, height: 166, colorDark: "#07111f", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H });
    fallback.hidden = true;
    downloadButton.disabled = false;
    downloadButton.addEventListener("click", () => {
      const canvas = qrContainer.querySelector("canvas");
      const image = qrContainer.querySelector("img");
      const source = canvas ? canvas.toDataURL("image/png") : image?.src;
      if (!source) return;
      const anchor = document.createElement("a");
      anchor.href = source;
      anchor.download = "Dave-Jay-Portfolio-QR.png";
      anchor.click();
    });
  } else {
    fallback.textContent = isLocalPreview
      ? "Your permanent QR code will appear here after the site is published online."
      : "QR generator is unavailable. Check your connection and reload the page.";
  }
});