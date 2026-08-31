/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC — SEENI SYED BASITH S
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initProjectFilters();
  initCertificateModal();
  initContactForm();
  initProtectedDemos();
});

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* 2. ScrollSpy & Active Link Highlighter */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 3. Project Filter Tabs */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* 4. Certificate Image Modal Viewer */
function initCertificateModal() {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalTitle = document.getElementById('certModalTitle');
  const closeBtn = document.getElementById('certModalClose');

  if (!modal) return;

  document.querySelectorAll('.cert-preview-box').forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      const title = box.closest('.cert-card').querySelector('.cert-title').textContent;

      if (img) {
        modalImg.src = img.src;
        modalTitle.textContent = title;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* 6. Resume PDF Download / Generator Trigger */
function downloadResume() {
  showToast("Preparing Seeni Syed Basith's Resume PDF...");

  // Create dynamic printable resume document window
  const printWin = window.open('', '_blank');
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resume - Seeni Syed Basith S (AI/ML Engineer)</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.5; }
        h1 { margin-bottom: 4px; color: #0f172a; font-size: 24px; }
        .subtitle { font-size: 14px; font-weight: bold; color: #0284c7; margin-bottom: 12px; }
        .contact-line { font-size: 12px; color: #475569; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
        h2 { font-size: 16px; color: #0369a1; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 18px; margin-bottom: 8px; text-transform: uppercase; }
        p, li { font-size: 13px; }
        ul { padding-left: 18px; margin: 6px 0; }
        .project-title { font-weight: bold; font-size: 14px; color: #0f172a; }
        .tech-tag { font-family: monospace; font-size: 11px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
        .flex-between { display: flex; justify-content: space-between; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>SEENI SYED BASITH S</h1>
      <div class="subtitle">Machine Learning / AI Engineer Fresher</div>
      <div class="contact-line">
        Email: seenibasith57@gmail.com | Phone: +91 9080534215 | Location: Tamil Nadu, India | GitHub: github.com/seenibasith57-os | LinkedIn: linkedin.com/in/seeni5
      </div>

      <h2>Professional Summary</h2>
      <p>Passionate AI/ML fresher with a B.E. in CSE (AI & ML) and strong expertise in Python, machine learning algorithms, computer vision, data analysis, and model deployment. Proven hands-on track record building end-to-end ML healthcare systems, OpenCV computer vision applications, and NLP chatbots.</p>

      <h2>Education</h2>
      <div class="flex-between">
        <span>B.E. Computer Science and Engineering (AI & ML)</span>
        <span>Sethu Institute of Technology</span>
      </div>
      <p style="margin-top:2px; font-weight:bold; color:#0369a1;">CGPA: 8.384</p>

      <h2>Key Projects</h2>
      <div class="project-title">1. CardioSense — Heart Health Risk Assessment System</div>
      <p>Developed an ML application predicting heart health risk and computing personalized scores with downloadable PDF reports.</p>
      <p><span class="tech-tag">Python</span> <span class="tech-tag">XGBoost</span> <span class="tech-tag">Random Forest</span> <span class="tech-tag">Scikit-learn</span> <span class="tech-tag">Streamlit</span> <span class="tech-tag">Plotly</span></p>

      <div class="project-title" style="margin-top:10px;">2. Face Mask Detection System</div>
      <p>Built a real-time vision classifier combining OpenCV face detection with MobileNetV2 deep learning model.</p>
      <p><span class="tech-tag">TensorFlow</span> <span class="tech-tag">Keras</span> <span class="tech-tag">MobileNetV2</span> <span class="tech-tag">OpenCV</span> <span class="tech-tag">Caffe SSD</span></p>

      <div class="project-title" style="margin-top:10px;">3. Medical Assistant Chatbot</div>
      <p>Built an AI medical query chatbot providing health information through an intuitive conversational GUI.</p>
      <p><span class="tech-tag">Python</span> <span class="tech-tag">NLP</span> <span class="tech-tag">Machine Learning</span> <span class="tech-tag">Streamlit</span></p>

      <h2>Technical Skills</h2>
      <ul>
        <li><strong>Languages &amp; Data:</strong> Python, SQL, Data Preprocessing, Feature Engineering</li>
        <li><strong>ML &amp; Algorithms:</strong> Supervised Learning, XGBoost, Random Forest, Logistic Regression, Linear Regression, KNN</li>
        <li><strong>Libraries:</strong> Pandas, NumPy, Scikit-learn, Matplotlib, Plotly</li>
        <li><strong>Deep Learning &amp; CV:</strong> TensorFlow, Keras, OpenCV, MobileNetV2</li>
        <li><strong>Tools &amp; Visualization:</strong> Streamlit, Power BI, Excel, Git, VS Code, Jupyter Notebook, Kaggle</li>
      </ul>

      <h2>Certifications &amp; Internship</h2>
      <ul>
        <li><strong>AI &amp; Machine Learning Internship (2 Months):</strong> Edu Tantr (April 2026 – June 2026)</li>
        <li><strong>Power BI for Beginners:</strong> Simplilearn / SkillUp / Microsoft (Aug 2026, ID: 10622543)</li>
        <li><strong>Data Analysis using Python:</strong> CodeChef (July 2026, ID: 1dee563)</li>
        <li><strong>Python with Beginner DSA:</strong> CodeChef (July 2026, ID: d3b87bb)</li>
        <li><strong>SQL Roadmap for Data Analysis:</strong> CodeChef (July 2026, ID: b681e47)</li>
      </ul>
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `);
  printWin.document.close();
}

/* 7. Contact Form Handling */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Message sent successfully! Thank you for reaching out.");
    form.reset();
  });
}

/* 8. Toast Helper Notification */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* 9. Copy Link Toast Helper */
function copyLink(url, label) {
  navigator.clipboard.writeText(url).then(() => {
    showToast(`Copied ${label} link to clipboard!`);
  }).catch(() => {
    showToast(`Link: ${url}`);
  });
}

/* 10. Protected Demo Gateway */
const DEMO_ACCESS_CODE = "DEMO2026";
const DEMO_SESSION_KEY = "portfolioDemoAccessGranted";

function initProtectedDemos() {
  const modal = document.getElementById("demoProtectionModal");
  const form = document.getElementById("demoProtectionForm");
  const input = document.getElementById("demoAccessCode");
  const closeBtn = document.getElementById("demoProtectionClose");
  const errorBox = document.getElementById("demoProtectionError");
  const remember = document.getElementById("demoRememberAccess");
  const toggle = document.getElementById("demoCodeToggle");
  const title = document.getElementById("demoProtectionTitle");
  const status = document.getElementById("demoProtectionStatus");

  if (!modal || !form || !input) return;

  let pendingUrl = "";
  let pendingName = "Live Demo";

  function openProtection(url, name) {
    pendingUrl = url || "";
    pendingName = name || "Live Demo";
    if (!pendingUrl) return;

    if (sessionStorage.getItem(DEMO_SESSION_KEY) === "true") {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
      showToast(`Opening ${pendingName}...`);
      return;
    }

    if (title) title.textContent = `${pendingName} Demo`;
    if (status) status.textContent = "Protected access • Enter the demo code to continue";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("demo-modal-open");
    setTimeout(() => input.focus(), 120);
  }

  function closeProtection() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("demo-modal-open");
    form.reset();
    if (errorBox) errorBox.textContent = "";
    input.classList.remove("demo-input-error");
  }

  document.querySelectorAll(".protected-demo-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openProtection(button.dataset.demoUrl, button.dataset.demoName);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = input.value.trim();

    if (code !== DEMO_ACCESS_CODE) {
      if (errorBox) errorBox.textContent = "Incorrect access code. Please try again.";
      input.classList.remove("demo-input-error");
      void input.offsetWidth;
      input.classList.add("demo-input-error");
      input.focus();
      return;
    }

    if (remember && remember.checked) {
      sessionStorage.setItem(DEMO_SESSION_KEY, "true");
    }

    closeProtection();
    showToast("Access verified. Opening demo...");
    setTimeout(() => window.open(pendingUrl, "_blank", "noopener,noreferrer"), 180);
  });

  closeBtn?.addEventListener("click", closeProtection);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProtection();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) closeProtection();
  });

  toggle?.addEventListener("click", () => {
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    toggle.textContent = visible ? "👁" : "🙈";
    toggle.setAttribute("aria-label", visible ? "Show access code" : "Hide access code");
  });
}
