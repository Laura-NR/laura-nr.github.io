//Import the translations object from the translations.js file
import translations from "./translations.js";

//Functionning of the menu/sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the elements
  const hideSidebarButton = document.querySelector("#hideSideBarButton");
  const showSidebarButton = document.querySelector("#showSideBarButton");

  // Attach event listeners
  hideSidebarButton.addEventListener("click", hideSidebar);
  showSidebarButton.addEventListener("click", showSidebar);

  const modal = document.getElementById("project-modal");
  const closeModal = document.querySelector(".close-modal");

  // Inside DOMContentLoaded:
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const projectId = card.getAttribute('data-project-id');
      
      // Safety check for translation structure
      const data = translations[currentLang]?.sections?.projects?.[projectId];

      if (data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-description').innerText = data.description;
        document.getElementById('modal-image').src = card.querySelector('img').src;
        // tech stack text can be pulled from the card paragraph
        document.getElementById('modal-tech-stack').innerText = card.querySelector('.tech-stack-preview').innerText;
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Stop background scroll
      }
    });
  });

  // Update closeModal:
  closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scroll
  };

  const downloadLinks = document.querySelectorAll('a[download]');
  downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const langMap = {
        'en': 'cv-english.png',
        'es': 'cv-spanish.png',
        'de': 'cv-german.png',
        'fr': 'cv-french.png'
      };
      
      const fileName = langMap[currentLang] || 'cv-french.png';
      link.href = `resources/images/${fileName}`;
      link.download = fileName;
    });
  });

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', hideSidebar);
  });
});

// Function to display stars in the background
function stars() {
  let scene = document.querySelector(".scene");
  if (!scene) return; // Safety check

  // 1. Clear existing stars if the function is re-called (e.g., on resize)
  const existingStars = scene.querySelectorAll('i');
  existingStars.forEach(s => s.remove());

  // 2. Set number of stars based on screen width
  let count = window.innerWidth <= 768 ? 200 : 600;
  
  // 3. Use a more reliable height calculation
  // We use the scrollHeight of the main element to ensure stars cover the whole page
  let docHeight = scene.scrollHeight;

  for (let i = 0; i < count; i++) {
    let star = document.createElement("i");
    
    // Calculate random values once
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * docHeight);
    let duration = Math.random() * 10;
    let size = Math.random() * 2;

    // Apply styles
    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";

    // Use a fixed animation duration range to prevent "slow" resets
    star.style.animationDuration = 5 + duration + "s";
    star.style.animationDelay = duration + "s";

    scene.appendChild(star);
  }
}

// Run the function
stars();

window.addEventListener('resize', () => {
    clearTimeout(window.drawTimeout);
    window.drawTimeout = setTimeout(drawConstellation, 100);
});

const languageData = {
  en: `<li class="dropbtn current-language-desktop dropdown-item" id="current-language-desktop" data-lang="en">
        English
        <svg
          style="margin-left: 6px"
          width="16px"
          height="16px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#EEE"
            d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
          ></path>
          <path
            fill="#CE1124"
            d="M21 5h-6v10H0v6h15v10h6V21h15v-6H21z"
          ></path>
        </svg>
      </li>`,
  es: `<li data-lang="es" class="dropdown-item">
        Español
        <svg
          style="margin-left: 6px"
          width="16px"
          height="16px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#C60A1D"
            d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
          ></path>
          <path fill="#FFC400" d="M0 12h36v12H0z"></path>
          <path
            fill="#EA596E"
            d="M9 17v3a3 3 0 1 0 6 0v-3H9z"
          ></path>
          <path fill="#F4A2B2" d="M12 16h3v3h-3z"></path>
          <path fill="#DD2E44" d="M9 16h3v3H9z"></path>
          <ellipse
            fill="#EA596E"
            cx="12"
            cy="14.5"
            rx="3"
            ry="1.5"
          ></ellipse>
          <ellipse
            fill="#FFAC33"
            cx="12"
            cy="13.75"
            rx="3"
            ry=".75"
          ></ellipse>
          <path fill="#99AAB5" d="M7 16h1v7H7zm9 0h1v7h-1z"></path>
          <path
            fill="#66757F"
            d="M6 22h3v1H6zm9 0h3v1h-3zm-8-7h1v1H7zm9 0h1v1h-1z"
          ></path>
        </svg>
      </li>`,
  de: `<li data-lang="de" class="dropdown-item">
        Deutsch
        <svg
          style="margin-left: 6px"
          width="16px"
          height="16px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#FFCD05"
            d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z"
          ></path>
          <path fill="#ED1F24" d="M0 14h36v9H0z"></path>
          <path
            fill="#141414"
            d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z"
          ></path>
        </svg>
      </li>`,
  fr: `<li data-lang="fr" class="dropdown-item">
        Français
        <svg
          style="margin-left: 6px"
          width="16px"
          height="16px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#ED2939"
            d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
          ></path>
          <path
            fill="#002495"
            d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
          ></path>
          <path fill="#EEE" d="M12 5h12v26H12z"></path>
        </svg>
      </li>`,
};

let currentLang = 'en'; // Default language

// Function to change language
function setLanguage(lang) {
  if (!translations[lang]) return; // Check if the language exists
  currentLang = lang;

  // Select all elements with `data-i18n`
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n").split(".");
    let translation = translations[lang];

    // Navigate through the translation object
    keys.forEach((key) => {
      if (translation) translation = translation[key];
    });

    // Update the element's text content if translation exists
    if (translation) {
      // Check if the element is an INPUT or TEXTAREA
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translation; // Set placeholder
      } else {
        el.textContent = translation; // Set text content for other elements
      }
    } 
  });

  document.querySelectorAll("[data-i18n-tooltip]").forEach((el) => {
    const keys = el.getAttribute("data-i18n-tooltip").split(".");
    let translation = translations[lang];
    keys.forEach((key) => { if (translation) translation = translation[key]; });
    
    if (translation) {
      el.setAttribute("data-tooltip", translation);
    }
  });
}

function populateLanguageDropdown(currentLang) {
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownContents = document.querySelectorAll('.dropdown-content');

  dropdowns.forEach((dropdown, index) => {
    const dropdownContent = dropdownContents[index];
    dropdownContent.innerHTML = '';

    // 1. Remove the old "current" button if it exists
    const existingBtn = dropdown.querySelector('.dropbtn');
    if (existingBtn) existingBtn.remove();

    // 2. Create the NEW current language button
    // We create a temporary element just to parse the string, then extract the LI
    const tempCurrent = document.createElement('div');
    tempCurrent.innerHTML = languageData[currentLang];
    const currentBtn = tempCurrent.firstElementChild;
    
    // Ensure it has the correct classes for your CSS selectors
    currentBtn.classList.add('dropbtn'); 
    
    // Insert it BEFORE the dropdown content ul
    dropdown.insertBefore(currentBtn, dropdownContent);

    // 3. Add the OTHER languages into the dropdown list
    Object.keys(languageData).forEach((lang) => {
      if (lang !== currentLang) {
        const tempOther = document.createElement("div");
        tempOther.innerHTML = languageData[lang];
        const otherLi = tempOther.firstElementChild;
        
        // Ensure standard class is present for the border hover
        otherLi.classList.add('dropdown_item');
        
        otherLi.addEventListener("click", () => changeLanguage(lang));
        dropdownContent.appendChild(otherLi);
      }
    });
  });
}

// Function to change the language
function changeLanguage(lang) {
  // Save selected language to localStorage
  localStorage.setItem("selectedLanguage", lang);

  // Update the language dropdowns in navbar and sidebar
  populateLanguageDropdown(lang);

  // Apply translations to the page
  setLanguage(lang);
  hideSidebar();
  console.log(`Language changed to: ${lang}`);
}

// Initialize the dropdown with the default language or the one saved in localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Get the language from localStorage or default to 'en' (English)
  const defaultLanguage = localStorage.getItem("selectedLanguage") || "en";
  console.log(`Default language: ${defaultLanguage}`);

  // Populate the language dropdowns
  populateLanguageDropdown(defaultLanguage);

  // Set the language
  setLanguage(defaultLanguage);
});

// Initialize EmailJS
emailjs.init("GhjKA_0F-EliFpdSc"); // Replace with your actual Public Key from EmailJS

// Contact form submission event
document.getElementById("contact_form").addEventListener("submit", function (event) {
  event.preventDefault();

  const errorDiv = document.getElementById("error_msg");
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Reset error message
  errorDiv.textContent = "";
  errorDiv.style.display = "none";

  // Regex for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName || !lastName || !email || !subject || !message) {
    errorDiv.textContent = "Please fill out all fields.";
    errorDiv.style.display = "block";
    return;
  }

  if (!emailPattern.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
    errorDiv.style.display = "block";
    return;
  }

  // If valid, send via EmailJS
  const formData = { firstName, lastName, email, subject, message };

  emailjs.send("service_psmj8un", "template_x3t1dtk", formData).then(
    function (response) {
      errorDiv.textContent = "Thank you! Your message has been sent.";
      errorDiv.style.color = "#ffcc70"; // Success gold
      errorDiv.style.display = "block";
      document.getElementById("contact_form").reset();
    },
    function (error) {
      errorDiv.textContent = "Oops! There was a problem sending your message.";
      errorDiv.style.color = "#ff4d4d"; // Error red
      errorDiv.style.display = "block";
    }
  );
});

// Constellation lines animation
function drawConstellation() {
  const container = document.getElementById('constellation-container');
  const svg = document.getElementById('constellation-svg');
  const path = document.getElementById('constellation-path');
  
  // A more geometric path: Handle -> Top Bowl -> Bottom Bowl -> Close Bowl
  const skillIdsWeb = [
    'skill-react',   // Handle start
    'skill-vue',     // Handle mid
    'skill-node',    // Handle end / Bowl corner
    'skill-php',     // Bowl top
    'skill-docker',  // Bowl outer top
    'skill-mongo',   // Bowl outer bottom
    'skill-postgres',// Bowl bottom
    'skill-node'     // Close the bowl
  ]; 

  const skillIdsMobile = [
    'skill-java',
    'skill-react',
    'skill-vue',
    'skill-node',
    'skill-php',
    'skill-docker',
    'skill-postgres',
    'skill-mongo'
  ];
  const isMobile = window.matchMedia('(max-width: 800px)').matches;
  const activeIds = isMobile ? skillIdsMobile : skillIdsWeb;
  let points = "";

  activeIds.forEach(id => {
      const el = document.getElementById(id);
      const glow = el.querySelector('.star-glow');
      
      // Get position relative to the container
      const rect = glow.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + (rect.width / 2);  
      const y = rect.top - containerRect.top + (rect.height / 2);
      
      points += `${x},${y} `;
  });

  path.setAttribute('points', points.trim());
}

// Draw on load and on resize
window.addEventListener('load', drawConstellation);
window.addEventListener('resize', drawConstellation);


function initGravityStars() {
  const section = document.getElementById('parcours');
  const starCount = 15;
  const starsArray = [];

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'gravity-star';
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    section.appendChild(star);
    starsArray.push({
      el: star,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 500,
      vx: 0,
      vy: 0
    });
  }

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    starsArray.forEach((star, i) => {
      const dx = mouseX - star.x;
      const dy = mouseY - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Pull stars toward mouse
      if (dist < 300) {
        star.vx += dx * 0.001;
        star.vy += dy * 0.001;
      }

      star.x += star.vx;
      star.y += star.vy;
      star.vx *= 0.95; // Friction
      star.vy *= 0.95;

      star.el.style.transform = `translate(${star.x}px, ${star.y}px)`;
    });
  });
}
window.addEventListener('load', initGravityStars);

/**
 * Interactive Nebula Cluster with Repel Effect
 */
function initCursorCluster() {
  const canvas = document.getElementById('cursor-cluster-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 50; 
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isRepelling = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Track Mouse Movement
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Repel on Click
  window.addEventListener('mousedown', () => isRepelling = true);
  window.addEventListener('mouseup', () => isRepelling = false);

  class StarParticle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = 0;
      this.speedY = 0;
      
      // Using Expert Gold and White from your site
      this.color = Math.random() > 0.4 ? "#ffffff" : "#ffcc70"; 
      
      this.offsetX = (Math.random() - 0.5) * 250; 
      this.offsetY = (Math.random() - 0.5) * 250;
      
      this.friction = 0.95;
      this.ease = 0.01 + Math.random() * 0.015;
    }

    update() {
      let targetX = mouse.x + this.offsetX;
      let targetY = mouse.y + this.offsetY;

      let dx = targetX - this.x;
      let dy = targetY - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // --- REPEL LOGIC ---
      if (isRepelling && distance < 200) {
        // Push stars away from the actual mouse position (not the offset target)
        let pushX = mouse.x - this.x;
        let pushY = mouse.y - this.y;
        let pushDist = Math.sqrt(pushX * pushX + pushY * pushY);
        
        if (pushDist < 150) {
          this.speedX -= (pushX / pushDist) * 2;
          this.speedY -= (pushY / pushDist) * 2;
        }
      }

      // Normal following movement
      this.speedX += dx * this.ease;
      this.speedY += dy * this.ease;

      this.speedX *= this.friction;
      this.speedY *= this.friction;

      this.x += this.speedX;
      this.y += this.speedY;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      
      if (this.color === "#ffcc70") {
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#ffcc70";
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new StarParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('load', initCursorCluster);