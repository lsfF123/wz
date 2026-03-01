/* ========================================
   Portfolio Website - Main JavaScript
   ======================================== */

// ========== Loader (Film Countdown) ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderNumber = document.getElementById('loaderNumber');
  const loaderSweep = document.getElementById('loaderSweep');
  const circumference = 2 * Math.PI * 100; // r=100
  let count = 3;

  function animateSweep() {
    if (loaderSweep) {
      loaderSweep.style.strokeDashoffset = circumference;
      void loaderSweep.offsetWidth; // force reflow
      loaderSweep.style.strokeDashoffset = '0';
    }
  }

  loaderNumber.textContent = count;
  animateSweep();

  const countdownInterval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(countdownInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAllAnimations();
      }, 300);
      return;
    }
    loaderNumber.textContent = count;
    animateSweep();
  }, 1000);
});

document.body.style.overflow = 'hidden';

// ========== Custom Cursor ==========
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .interactive-card, .info-card, input, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ========== Navbar ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// ========== Particles ==========
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = 50;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    const colors = ['rgba(255,107,107,0.6)', 'rgba(78,205,196,0.6)', 'rgba(255,195,113,0.6)', 'rgba(136,176,255,0.6)', 'rgba(162,255,134,0.6)', 'rgba(255,154,206,0.6)', 'rgba(189,147,249,0.6)', 'rgba(255,230,109,0.6)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
  }
}

// ========== Typewriter Effect ==========
const typewriterEl = document.getElementById('typewriter');
const typewriterTexts = [
  'Crafting narratives across written and visual media.',
  'Blending Eastern and Western storytelling perspectives.',
  'Screenwriter. Filmmaker. Visual Storyteller.',
  'Every frame tells a story worth sharing.'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeWriter() {
  const currentText = typewriterTexts[textIndex];
  if (isDeleting) {
    typewriterEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 40;
  } else {
    typewriterEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// ========== Scroll Animations (Intersection Observer) ==========
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.anim-slide-up, .anim-slide-right, .anim-slide-left, .anim-fade-in, .anim-scale-x, .anim-fly-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = getComputedStyle(entry.target).getPropertyValue('--delay') || '0s';
        const delayMs = parseFloat(delay) * 1000;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delayMs);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animElements.forEach(el => observer.observe(el));
}

// ========== Parallax on Scroll ==========
function initParallax() {
  const layers = document.querySelectorAll('.hero-bg-layer');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed);
      layer.style.transform = `translateY(${scrollY * speed * 0.5}px)`;
    });
  });
}

// ========== Image Parallax Effect ==========
function initImageParallax() {
  const cards = document.querySelectorAll('.card-image img, .photo-frame img');

  window.addEventListener('scroll', () => {
    cards.forEach(img => {
      const rect = img.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const translateY = (progress - 0.5) * 30;
        img.style.transform = `translateY(${translateY}px) scale(1.05)`;
      }
    });
  });
}

// ========== Skill Bar Animation ==========
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => observer.observe(fill));
}

// ========== Counter Animation ==========
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 30);
}

// ========== Project Filter ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card, index) => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ========== Project Modal ==========
const projectsData = [
  {
    title: 'Alaska Gulf',
    category: 'Music Video',
    desc: 'A cinematic music video set against vast ocean landscapes, capturing themes of solitude, longing, and emotional depth. The visuals weave together sweeping coastal scenery with intimate emotional storytelling.',
    client: 'Independent Artist',
    date: '2024',
    role: 'Director & Cinematographer',
    process: 'Scouted dramatic coastal locations to match the song\'s melancholic atmosphere. Directed talent performances and managed outdoor shoots with natural lighting. Post-production included cinematic color grading for an ocean-toned palette and rhythmic editing synced to the music.',
    image: './images/阿拉斯加.png',
    gallery: []
  },
  {
    title: 'Original Anime Character',
    category: 'Design',
    desc: 'An original 2D anime male protagonist brought to life through dynamic animation and creative character design. The project showcases a fully realized character with unique visual identity, expressive motion, and detailed art style.',
    client: 'Personal Project',
    date: '2024',
    role: 'Character Designer & Animator',
    process: 'Designed the original character from concept sketches through to final illustration, defining personality traits, costume details, and color palette. Created dynamic animation sequences to showcase the character\'s movement and expressions, using frame-by-frame techniques combined with digital tools.',
    image: '',
    gallery: []
  },
  {
    title: 'Alaska Gulf',
    category: 'Music Video',
    desc: 'A cinematic music video for the song "Alaska Gulf" (阿拉斯加海湾), featuring dramatic ocean landscapes and emotional storytelling. The visuals capture themes of solitude, longing, and the vastness of nature.',
    client: 'Independent Artist',
    date: '2024',
    role: 'Director & Cinematographer',
    process: 'Scouted coastal locations to match the song\'s melancholic atmosphere. Directed talent and managed a small crew for outdoor shoots. Post-production included color grading for a cinematic ocean palette and rhythmic editing synced to the music.',
    image: './images/阿拉斯加.png',
    gallery: []
  },
  {
    title: 'Arale',
    category: 'Music Video',
    desc: 'A playful cosplay-themed short video bringing the beloved anime character Arale (阿拉蕾) to life. Shot in vibrant outdoor park settings, the video captures the character\'s cheerful energy and childlike wonder.',
    client: 'Personal Project',
    date: '2023',
    role: 'Director & Stylist',
    process: 'Designed the cosplay look and props referencing the classic anime character. Directed outdoor shoots in parks, working with natural light and colorful compositions. Edited with upbeat pacing to match the character\'s playful personality.',
    image: './images/阿拉蕾.png',
    gallery: []
  },
  {
    title: 'Movie Merchandise Design',
    category: 'Design',
    desc: 'Original merchandise design for the film "Article 20" (第二十条), including 3D rooftop scene modeling in SketchUp, custom keychains, bookmarks, and phone case designs. A complete set of promotional materials bridging film and product design.',
    client: 'Film Promotion Project',
    date: '2024',
    role: 'Designer & 3D Modeler',
    process: 'Created a detailed 3D model of the SU Rooftop scene using SketchUp, then designed a series of merchandise items including keychains, bookmarks, and phone cases featuring original illustrations inspired by the film. Delivered print-ready artwork for production.',
    image: './images/原创设计.png',
    gallery: []
  },
  {
    title: 'Literary & Planning Works',
    category: 'Writing',
    desc: 'A collection of professional writing works including original screenplays ("Ghost" and "Walking"), a movie premiere ceremony plan for "Wild Child" (野孩子), and a business plan for a toy-themed film project.',
    client: 'Academic & Professional',
    date: '2023 - 2024',
    role: 'Writer & Planner',
    process: 'Wrote original screenplays exploring themes of the supernatural and personal journeys. Developed a comprehensive premiere event plan including venue logistics, budget, and scheduling for 30+ attendees. Created a detailed business proposal for a toy-themed film production.',
    image: './images/文字作品.png',
    gallery: []
  },
  {
    title: 'Product Design',
    category: 'Design',
    desc: 'Original product design concepts that blend aesthetics with functionality. From ideation sketches to polished visual presentations, each piece demonstrates a thoughtful approach to form, material, and user experience.',
    client: 'Personal Project',
    date: '2024',
    role: 'Product Designer',
    process: 'Conducted research on user needs and market trends to define design direction. Created concept sketches and iterative prototypes, refining form and function through multiple rounds. Produced final high-fidelity visual presentations showcasing materials, colors, and product details.',
    image: './images/作品1.jpg',
    gallery: ['./images/作品2.jpg', './images/作品3.jpg', './images/作品4.jpg']
  }
];

function openProjectModal(index) {
  const projectEn = projectsData[index];
  const project = (currentLang === 'zh' && projectsDataI18n.zh[index]) ? { ...projectEn, ...projectsDataI18n.zh[index], image: projectEn.image, gallery: projectEn.gallery } : projectEn;
  const modal = document.getElementById('projectModal');

  document.getElementById('modalImage').src = project.image;
  document.getElementById('modalImage').alt = project.title;
  document.getElementById('modalCategory').textContent = project.category;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDesc').textContent = project.desc;
  document.getElementById('modalClient').textContent = project.client;
  document.getElementById('modalDate').textContent = project.date;
  document.getElementById('modalRole').textContent = project.role;
  document.getElementById('modalProcess').textContent = project.process;

  const gallery = document.getElementById('modalGallery');
  gallery.innerHTML = '';
  project.gallery.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = project.title;
    img.loading = 'lazy';
    gallery.appendChild(img);
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.getElementById('projectModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeProjectModal();
});

// ========== Contact Form ==========
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form.style.display = 'none';
  success.classList.add('show');

  setTimeout(() => {
    form.style.display = 'block';
    form.reset();
    success.classList.remove('show');
  }, 4000);
}

// ========== Quiz (Film Genre) ==========
const quizQuestions = [
  { question: 'What kind of story moves you most?', options: ['A quiet, emotional journey', 'An edge-of-your-seat thriller', 'A fantastical adventure', 'A real-life human struggle'] },
  { question: 'Pick your ideal film setting:', options: ['A rainy European city', 'A dark, mysterious alley', 'An alien planet or magical realm', 'A bustling neighborhood'] },
  { question: 'Which director inspires you?', options: ['Wong Kar-wai', 'Christopher Nolan', 'Hayao Miyazaki', 'Jia Zhangke'] }
];

const quizResults = [
  { title: '🎭 Art House / Drama', desc: 'You\'re drawn to emotional depth and poetic visuals. Films like "In the Mood for Love" and "Moonlight" speak to your soul. You value atmosphere, silence, and the beauty of unspoken feelings.' },
  { title: '🔍 Thriller / Suspense', desc: 'You love tension, plot twists, and mind-bending narratives. Films like "Inception" and "Parasite" keep you on the edge. You appreciate clever storytelling and visual precision.' },
  { title: '✨ Fantasy / Animation', desc: 'You\'re captivated by imagination and world-building. Films like "Spirited Away" and "The Lord of the Rings" transport you. You believe cinema is a gateway to infinite possibilities.' },
  { title: '🎬 Realism / Documentary', desc: 'You\'re moved by authentic human stories and social observation. Films like "Nomadland" and "Still Life" resonate with you. You see cinema as a mirror reflecting the real world.' }
];

let currentQuizQuestion = 0;
let quizAnswers = [];

function startQuiz() {
  currentQuizQuestion = 0;
  quizAnswers = [];
  document.getElementById('quizOverlay').classList.add('active');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const content = document.getElementById('quizContent');
  const q = quizQuestions[currentQuizQuestion];

  const qLabel = i18n[currentLang].quiz_question_label;
  content.innerHTML = `
    <div style="margin-bottom:8px;font-size:0.85rem;color:var(--text-muted);">${qLabel} ${currentQuizQuestion + 1} / ${quizQuestions.length}</div>
    <h2>${q.question}</h2>
    <div style="margin-top:24px;">
      ${q.options.map((opt, i) => `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`).join('')}
    </div>
  `;
}

function answerQuiz(answerIndex) {
  quizAnswers.push(answerIndex);
  currentQuizQuestion++;

  if (currentQuizQuestion < quizQuestions.length) {
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const content = document.getElementById('quizContent');
  // Simple: pick the most frequent answer
  const counts = [0, 0, 0, 0];
  quizAnswers.forEach(a => counts[a]++);
  const resultIndex = counts.indexOf(Math.max(...counts));
  const result = quizResults[resultIndex];

  content.innerHTML = `
    <div class="quiz-result">
      <div style="font-size:4rem;margin-bottom:20px;">�</div>
      <h3>${result.title}</h3>
      <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:24px;">${result.desc}</p>
      <button class="btn btn-primary" onclick="closeQuiz()">${i18n[currentLang].quiz_done}</button>
    </div>
  `;
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.remove('active');
}

document.getElementById('quizOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeQuiz();
});

// ========== Resources ==========
function showResources() {
  document.getElementById('resourcesOverlay').classList.add('active');
}

function closeResources() {
  document.getElementById('resourcesOverlay').classList.remove('active');
}

document.getElementById('resourcesOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeResources();
});

// ========== Color Generator ==========
function generateColors() {
  const swatches = document.querySelectorAll('.color-swatch');
  const palettes = [
    ['#1a3a4a', '#c8a96e', '#2d1b14', '#8b6914', '#0a0a0f'],  // The Grand Budapest Hotel
    ['#0d1b2a', '#1b2838', '#415a77', '#778da9', '#e0e1dd'],  // Blade Runner
    ['#2b4141', '#d4a373', '#e9c46a', '#264653', '#e76f51'],  // Amélie
    ['#1c1c2e', '#533a71', '#6b5b95', '#d4af37', '#0f0f1a'],  // La La Land
    ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'],  // The Matrix
    ['#2d0a0a', '#8b2500', '#c44536', '#e8c07d', '#1a1a2e'],  // In the Mood for Love
    ['#1b2a1b', '#3d5a3d', '#8fbc8f', '#c8b560', '#0e0e0b'],  // Spirited Away
    ['#2c1810', '#5c3a21', '#c49a6c', '#e6d5b8', '#0a0806']   // The Godfather
  ];

  const palette = palettes[Math.floor(Math.random() * palettes.length)];
  swatches.forEach((swatch, i) => {
    swatch.style.transform = 'scale(0) rotate(180deg)';
    setTimeout(() => {
      swatch.style.background = palette[i];
      swatch.style.transform = 'scale(1) rotate(0deg)';
    }, i * 100 + 200);
  });
}

// ========== WeChat QR Code Popup ==========
function openQRCode() {
  document.getElementById('qrOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQRCode(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) return;
  document.getElementById('qrOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ========== Magnetic Button Effect ==========
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ========== Tilt Effect on Project Cards ==========
function initTiltCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -10;
      const rotateY = (x - 0.5) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ========== Smooth Scroll with Parallax Sections ==========
function initSectionParallax() {
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const header = section.querySelector('.section-header');
        if (header) {
          header.style.transform = `translateY(${(progress - 0.5) * -20}px)`;
        }
      }
    });
  });
}

// ========== Text Reveal Animation ==========
function initTextReveal() {
  const titles = document.querySelectorAll('.section-title:not(.anim-fly-in)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        entry.target.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(30px) rotate(5deg)';
          span.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.04}s`;
          entry.target.appendChild(span);

          setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0) rotate(0)';
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titles.forEach(title => observer.observe(title));
}

// ========== Showcase duplication for infinite scroll ==========
function initShowcase() {
  const track = document.getElementById('showcaseTrack');
  if (track) {
    const items = track.innerHTML;
    track.innerHTML = items + items + items;
  }
}

// ========== i18n Internationalization ==========
let currentLang = 'en';

const i18n = {
  en: {
    nav_home: 'Home', nav_about: 'About', nav_portfolio: 'Portfolio', nav_hobbies: 'Hobbies', nav_contact: 'Contact',
    hero_tag: 'Screenwriting · Filmmaking · Visual Storytelling',
    hero_greeting: "Hello, I'm",
    hero_btn_portfolio: 'View Portfolio', hero_btn_contact: 'Contact Me', hero_scroll: 'Scroll Down',
    about_title: 'About Me',
    stat_videos: 'Videos Produced', stat_languages: 'Languages', stat_students: 'Students Mentored',
    about_subtitle: 'Multidisciplinary Storyteller',
    about_text1: 'A creative media professional with a passion for crafting narratives across written and visual media. I combine formal training in creative media with hands-on experience in event production, multicultural research, and content creation.',
    about_text2: 'Adept at blending Eastern and Western perspectives, fluent in English, Mandarin, and Cantonese. Currently refining skills in screenwriting and documentary filmmaking while leveraging a background in education and cross-cultural collaboration.',
    skills_title: 'Professional Skills',
    skill_film: 'Filmmaking & Video Production', skill_screen: 'Screenwriting & Storytelling',
    skill_adobe: 'Adobe Suite (Premiere, AE, Ps, Ai)', skill_copy: 'Bilingual Copywriting',
    timeline_title: 'Education & Experience',
    tl1_title: 'Diploma in Creative Media',
    tl1_desc: 'Caritas Bianchi College of Careers, Hong Kong · Screenwriting, Visual Storytelling, Documentary Production, Transmedia Narratives',
    tl2_title: 'Creative Content Assistant',
    tl2_desc: 'HK-Macao Youth Innovation & Entrepreneurship Center · Produced 15+ promotional videos, scripted bilingual content, collaborated on documentary shorts',
    tl3_title: 'Communication Studies',
    tl3_desc: 'Hong Kong Polytechnic University (CPCE) · Foundational coursework in media ethics and narrative analysis',
    tl4_title: 'Teaching Assistant & Storytelling Mentor',
    tl4_desc: 'Qufu Hope Primary & Middle School · Designed creative writing workshops for 50+ students, documented activities through photo essays and short films',
    tl5_title: 'Guoyang No. 4 Middle School',
    tl5_desc: 'Led the school\'s first student-run podcast "Voices of Youth", blending interviews and creative fiction',
    portfolio_title: 'Selected Works',
    filter_all: 'All', filter_film: 'Short Film', filter_video: 'Music Video',
    filter_design: 'Design', filter_writing: 'Writing',
    view_details: 'View Details',
    p0_title: 'Alaska Gulf',
    p0_desc: 'A cinematic music video set against vast ocean landscapes, capturing themes of solitude, longing, and emotional depth',
    p1_title: 'Original Anime Character',
    p1_desc: 'An original 2D anime male protagonist brought to life through dynamic animation and creative character design',
    p2_title: 'Alaska Gulf',
    p2_desc: 'A cinematic music video featuring ocean landscapes and emotional storytelling, capturing solitude and longing',
    p3_title: 'Arale',
    p3_desc: 'A playful cosplay-themed short video bringing the beloved anime character to life in vibrant outdoor settings',
    p4_title: 'Movie Merchandise Design',
    p4_desc: 'Original merchandise design including 3D scene modeling, keychains, bookmarks, and phone cases for film promotion',
    p5_title: 'Literary & Planning Works',
    p5_desc: 'A collection of screenplays, movie premiere event plans, and film business proposals',
    p6_title: 'Product Design',
    p6_desc: 'Original product design concepts blending aesthetics with functionality, from ideation sketches to polished visual presentations',
    hobbies_title: 'Hobbies & Interests',
    hobby_photo_title: 'Photography',
    hobby_photo_desc: 'Capturing fleeting moments through the lens — from street scenes to cinematic portraits, finding beauty in light and shadow.',
    hobby_pet_title: 'Pet Parent',
    hobby_pet_desc: 'A devoted pet parent — my furry companion is a constant source of joy, comfort, and creative inspiration.',
    hobby_pet_label: 'My Best Friend',
    fun_card_title: 'ABOUT ME',
    fun_card_sub: 'Get to know me better ✦',
    fun_name_label: "I'm",
    fun_school: 'Hong Kong Baptist University',
    fun_from: 'From Qingdao, Shandong',
    fun_birthday: 'Feb 23 · Pisces ♓',
    fun_likes_title: 'Things I Love',
    fun_travel: 'Traveling the world',
    fun_pets: '9 cats & 4 dogs at home',
    fun_photography: 'Photography',
    fun_tag1: 'TAG#',
    fun_tag2: 'Retired Night Owl 🌙',
    fun_tag3: 'PS Super VIP ✨',
    fun_tag4: 'Film Enthusiast 🎬',
    fun_tag5: 'Cat & Dog Person 🐱🐶',
    modal_client: 'Client', modal_date: 'Date', modal_role: 'Role', modal_process: 'Process',
    interactive_title: 'Interactive',
    quiz_title: 'Film Genre Quiz', quiz_desc: 'Discover which film genre matches your creative personality', quiz_btn: 'Take the Quiz',
    resource_title: 'Classic Film Quotes', resource_desc: 'Iconic lines from cinema history to inspire your storytelling', resource_btn: 'Explore Quotes',
    color_title: 'Cinema Color Palette', color_desc: 'Generate color palettes inspired by iconic films', color_btn: 'Generate Palette',
    res_modal_title: 'Classic Film Quotes',
    res1_title: '"Here\'s looking at you, kid."', res1_desc: '— Casablanca (1942)',
    res2_title: '"Life is like a box of chocolates."', res2_desc: '— Forrest Gump (1994)',
    res3_title: '"May the Force be with you."', res3_desc: '— Star Wars (1977)',
    contact_title: 'Get In Touch',
    contact_form_title: 'Send a Message',
    form_name: 'Your Name', form_email: 'Email Address', form_subject: 'Subject', form_message: 'Your Message',
    form_submit: 'Send Message',
    form_success_title: 'Message Sent!', form_success_desc: "Thank you for reaching out. I'll get back to you soon.",
    info_email: 'Email', info_phone: 'Phone', info_location: 'Location',
    info_wechat: 'WeChat', info_wechat_hint: 'Click to scan QR code',
    qr_title: 'Scan to Add WeChat', qr_hint: 'Open WeChat and scan the QR code to connect',
    footer_desc: 'Crafting stories across written and visual media.',
    footer_links: 'Quick Links', footer_social: 'Social',
    quiz_question_label: 'Question',
    quiz_done: 'Done'
  },
  zh: {
    nav_home: '首页', nav_about: '关于我', nav_portfolio: '作品集', nav_hobbies: '兴趣爱好', nav_contact: '联系我',
    hero_tag: '编剧 · 影视制作 · 视觉叙事',
    hero_greeting: '你好，我是',
    hero_btn_portfolio: '浏览作品', hero_btn_contact: '联系我', hero_scroll: '向下滚动',
    about_title: '关于我',
    stat_videos: '视频作品', stat_languages: '语言能力', stat_students: '指导学生',
    about_subtitle: '跨领域叙事者',
    about_text1: '一位热衷于在文字与视觉媒体中构建叙事的创意媒体专业人士。我将创意媒体的专业训练与活动制作、多元文化研究和内容创作的实践经验相结合。',
    about_text2: '善于融合东西方视角，精通英语、普通话和粤语。目前正在精进编剧和纪录片制作技能，同时发挥教育和跨文化合作的背景优势。',
    skills_title: '专业技能',
    skill_film: '影视制作与视频制作', skill_screen: '编剧与叙事',
    skill_adobe: 'Adobe 套件 (Premiere, AE, Ps, Ai)', skill_copy: '双语文案写作',
    timeline_title: '教育与工作经历',
    tl1_title: '创意媒体文凭',
    tl1_desc: '香港明爱白英奇专业学校 · 编剧基础、视觉叙事、纪录片制作、跨媒体叙事',
    tl2_title: '创意内容助理',
    tl2_desc: '港澳青年创新创业中心 · 制作 15+ 宣传视频，撰写双语内容，参与纪录短片制作',
    tl3_title: '传播学',
    tl3_desc: '香港理工大学 (CPCE) · 媒体伦理与叙事分析基础课程',
    tl4_title: '助教与叙事导师',
    tl4_desc: '曲阜希望小学与中学 · 为 50+ 学生设计创意写作工作坊，通过图文纪实和短片记录课堂活动',
    tl5_title: '涡阳第四中学',
    tl5_desc: '创办学校首个学生播客「青年之声」，融合访谈与创意小说',
    portfolio_title: '精选作品',
    filter_all: '全部', filter_film: '短片', filter_video: '音乐视频',
    filter_design: '设计', filter_writing: '文字作品',
    view_details: '查看详情',
    p0_title: '阿拉斯加海湾',
    p0_desc: '一支以壮阔海洋景观为背景的电影感音乐视频，捕捉孤独、思念与情感深度',
    p1_title: '原创动漫角色',
    p1_desc: '一个通过动态动画和创意角色设计赋予生命的原创二次元男主角',
    p2_title: '阿拉斯加海湾',
    p2_desc: '一支以海洋景观和情感叙事为特色的电影感音乐视频，捕捉孤独与思念',
    p3_title: '阿拉蕾',
    p3_desc: '一支活泼的角色扮演主题短视频，在户外公园中重现经典动漫角色的欢乐活力',
    p4_title: '电影周边原创设计',
    p4_desc: '包含 3D 场景建模、钥匙扣、书签和手机壳的电影宣传周边原创设计',
    p5_title: '文字与策划作品',
    p5_desc: '原创剧本、电影首映礼策划方案和电影商业计划书合集',
    p6_title: '产品设计',
    p6_desc: '将美学与功能性融合的原创产品设计，从概念草图到精致的视觉呈现',
    hobbies_title: '兴趣爱好',
    hobby_photo_title: '摄影',
    hobby_photo_desc: '用镜头捕捉转瞬即逝的美好——从街头巷尾到电影感人像，在光影之间发现生活的诗意。',
    hobby_pet_title: '养宠',
    hobby_pet_desc: '一位忠实的铲屎官——毛茸茸的小伙伴是快乐、治愈和创作灵感的不竭源泉。',
    hobby_pet_label: '我最好的朋友',
    fun_card_title: 'ABOUT ME',
    fun_card_sub: '更多关于我 ✦',
    fun_name_label: '我是',
    fun_school: '香港浸会大学',
    fun_from: '来自山东青岛',
    fun_birthday: '2月23日 · 双鱼座 ♓',
    fun_likes_title: '喜欢的事',
    fun_travel: '喜欢旅游',
    fun_pets: '家里9猫4狗',
    fun_photography: '摄影',
    fun_tag1: 'TAG#',
    fun_tag2: '退役熬夜选手 🌙',
    fun_tag3: 'PS超级VIP用户 ✨',
    fun_tag4: '电影发烧友 🎬',
    fun_tag5: '猫狗双全 🐱🐶',
    modal_client: '客户', modal_date: '时间', modal_role: '角色', modal_process: '项目过程',
    interactive_title: '趣味互动',
    quiz_title: '电影风格测试', quiz_desc: '测测哪种电影类型最符合你的创作个性', quiz_btn: '开始测试',
    resource_title: '经典电影台词', resource_desc: '电影史上的经典台词，激发你的叙事灵感', resource_btn: '探索台词',
    color_title: '电影配色方案', color_desc: '生成经典电影风格的配色方案', color_btn: '生成配色',
    res_modal_title: '经典电影台词',
    res1_title: '"永远年轻，永远热泪盈眶。"', res1_desc: '—— 《了不起的盖茨比》',
    res2_title: '"生活就像一盒巧克力，你永远不知道下一颗是什么味道。"', res2_desc: '—— 《阿甘正传》(1994)',
    res3_title: '"愿原力与你同在。"', res3_desc: '—— 《星球大战》(1977)',
    contact_title: '联系我',
    contact_form_title: '发送消息',
    form_name: '您的姓名', form_email: '电子邮箱', form_subject: '主题', form_message: '您的留言',
    form_submit: '发送消息',
    form_success_title: '消息已发送！', form_success_desc: '感谢您的留言，我会尽快回复您。',
    info_email: '电子邮箱', info_phone: '联系电话', info_location: '所在地址',
    info_wechat: '微信', info_wechat_hint: '点击扫码添加',
    qr_title: '扫码添加微信', qr_hint: '打开微信扫一扫二维码即可添加',
    footer_desc: '用文字与影像，讲述值得分享的故事。',
    footer_links: '快速链接', footer_social: '社交媒体',
    quiz_question_label: '问题',
    quiz_done: '完成'
  }
};

const typewriterTextsI18n = {
  en: [
    'Crafting narratives across written and visual media.',
    'Blending Eastern and Western storytelling perspectives.',
    'Screenwriter. Filmmaker. Visual Storyteller.',
    'Every frame tells a story worth sharing.'
  ],
  zh: [
    '用文字与影像，讲述值得分享的故事。',
    '融合东西方视角，创造独特叙事体验。',
    '编剧 · 导演 · 视觉叙事者。',
    '每一帧画面，都承载着一个故事。'
  ]
};

const quizQuestionsI18n = {
  en: [
    { question: 'What kind of story moves you most?', options: ['A quiet, emotional journey', 'An edge-of-your-seat thriller', 'A fantastical adventure', 'A real-life human struggle'] },
    { question: 'Pick your ideal film setting:', options: ['A rainy European city', 'A dark, mysterious alley', 'An alien planet or magical realm', 'A bustling neighborhood'] },
    { question: 'Which director inspires you?', options: ['Wong Kar-wai', 'Christopher Nolan', 'Hayao Miyazaki', 'Jia Zhangke'] }
  ],
  zh: [
    { question: '什么样的故事最打动你？', options: ['安静而深情的心灵旅程', '紧张刺激的悬疑故事', '充满想象的奇幻冒险', '真实的人间百态'] },
    { question: '你理想中的电影场景是？', options: ['细雨中的欧洲老城', '黑暗神秘的小巷', '外星球或魔法世界', '热闹的街坊邻里'] },
    { question: '哪位导演最启发你？', options: ['王家卫', '克里斯托弗·诺兰', '宫崎骏', '贾樟柯'] }
  ]
};

const quizResultsI18n = {
  en: [
    { title: '🎭 Art House / Drama', desc: 'You\'re drawn to emotional depth and poetic visuals. Films like "In the Mood for Love" and "Moonlight" speak to your soul. You value atmosphere, silence, and the beauty of unspoken feelings.' },
    { title: '🔍 Thriller / Suspense', desc: 'You love tension, plot twists, and mind-bending narratives. Films like "Inception" and "Parasite" keep you on the edge. You appreciate clever storytelling and visual precision.' },
    { title: '✨ Fantasy / Animation', desc: 'You\'re captivated by imagination and world-building. Films like "Spirited Away" and "The Lord of the Rings" transport you. You believe cinema is a gateway to infinite possibilities.' },
    { title: '🎬 Realism / Documentary', desc: 'You\'re moved by authentic human stories and social observation. Films like "Nomadland" and "Still Life" resonate with you. You see cinema as a mirror reflecting the real world.' }
  ],
  zh: [
    { title: '🎭 文艺片 / 剧情片', desc: '你被情感深度和诗意画面所吸引。《花样年华》《月光男孩》这样的电影直击你的灵魂。你重视氛围、留白，以及未说出口的情感之美。' },
    { title: '🔍 悬疑片 / 惊悚片', desc: '你热爱紧张感、反转和烧脑叙事。《盗梦空间》《寄生虫》让你欲罢不能。你欣赏巧妙的叙事结构和精准的视觉表达。' },
    { title: '✨ 奇幻片 / 动画片', desc: '你被想象力和世界观构建所吸引。《千与千寻》《指环王》带你穿越时空。你相信电影是通往无限可能的大门。' },
    { title: '🎬 现实主义 / 纪录片', desc: '你被真实的人间故事和社会观察所打动。《无依之地》《三峡好人》与你产生共鸣。你认为电影是映照现实世界的一面镜子。' }
  ]
};

const projectsDataI18n = {
  zh: [
    { title: '阿拉斯加海湾', category: '音乐视频', desc: '一支以壮阔海洋景观为背景的电影感音乐视频，将海岸线的磅礴景色与细腻的情感叙事交织，捕捉孤独、思念与情感深度。', client: '独立艺术家', date: '2024', role: '导演 & 摄影', process: '勘景壮观的海岸线外景，匹配歌曲忧郁氛围。指导演员表演并管理户外拍摄团队，利用自然光线拍摄。后期包括电影感海洋色调调色和与音乐节奏同步的剪辑。' },
    { title: '原创动漫角色', category: '设计', desc: '一个通过动态动画和创意角色设计赋予生命的原创二次元男主角。展示了一个拥有独特视觉身份、富有表现力的动作和精细画风的完整角色。', client: '个人项目', date: '2024', role: '角色设计师 & 动画师', process: '从概念草图到最终插画完成原创角色设计，确定人物性格特征、服装细节和配色方案。创作动态动画序列展示角色的动作和表情，结合逐帧绘制技术与数字工具。' },
    { title: '阿拉斯加海湾', category: '音乐视频', desc: '为歌曲《阿拉斯加海湾》制作的电影感音乐视频，以壮阔的海洋景观和情感叙事为特色，捕捉孤独与思念的主题。', client: '独立艺术家', date: '2024', role: '导演 & 摄影', process: '勘景海岸线外景，匹配歌曲忧郁氛围。指导演员表演并管理小型拍摄团队。后期包括电影感海洋色调调色和与音乐节奏同步的剪辑。' },
    { title: '阿拉蕾', category: '音乐视频', desc: '一支活泼的角色扮演主题短视频，在户外公园中重现经典动漫角色阿拉蕾的欢乐活力，充满童趣与活力。', client: '个人项目', date: '2023', role: '导演 & 造型', process: '设计参考经典动漫角色的 Cosplay 造型和道具。在公园进行户外拍摄，利用自然光和丰富色彩构图。以轻快节奏剪辑，匹配角色活泼个性。' },
    { title: '电影周边原创设计', category: '设计', desc: '为电影《第二十条》设计的原创周边，包括 SketchUp 天台场景 3D 建模、定制钥匙扣、书签和手机壳设计，一套完整的电影宣传物料。', client: '电影宣传项目', date: '2024', role: '设计师 & 3D 建模', process: '使用 SketchUp 创建 SU 天台场景的精细 3D 模型，然后设计系列周边产品，包括以电影原创插画为灵感的钥匙扣、书签和手机壳。交付可印刷的成品设计稿。' },
    { title: '文字与策划作品', category: '文字作品', desc: '专业文字作品合集，包括原创剧本（《鬼律》《走去》）、电影《野孩子》首映礼策划方案，以及玩具总动员电影商业计划书。', client: '学术与专业', date: '2023 - 2024', role: '编剧 & 策划', process: '撰写探索超自然与个人旅程主题的原创剧本。制定包含场地后勤、预算和 30+ 人排期的首映礼策划方案。编写玩具主题电影制作的详细商业计划书。' },
    { title: '产品设计', category: '设计', desc: '将美学与功能性融合的原创产品设计作品。从概念草图到精致的视觉呈现，每件作品都展现了对造型、材质和用户体验的深思熟虑。', client: '个人项目', date: '2024', role: '产品设计师', process: '调研用户需求和市场趋势以确定设计方向。创建概念草图和迭代原型，通过多轮打磨优化形式与功能。制作最终的高保真视觉呈现，展示材质、色彩和产品细节。' }
  ]
};

function applyLanguage(lang) {
  currentLang = lang;
  const translations = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Update typewriter texts
  typewriterTexts.length = 0;
  typewriterTextsI18n[lang].forEach(t => typewriterTexts.push(t));
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;

  // Update quiz data
  quizQuestions.length = 0;
  quizQuestionsI18n[lang].forEach(q => quizQuestions.push(q));
  quizResults.length = 0;
  quizResultsI18n[lang].forEach(r => quizResults.push(r));

  // Update lang toggle button
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    const spans = toggle.querySelectorAll('span');
    if (lang === 'en') {
      spans[0].className = 'lang-active';
      spans[0].textContent = 'EN';
      spans[2].className = 'lang-inactive';
      spans[2].textContent = '中文';
    } else {
      spans[0].className = 'lang-inactive';
      spans[0].textContent = 'EN';
      spans[2].className = 'lang-active';
      spans[2].textContent = '中文';
    }
  }

  // Update html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Re-apply fly-in titles after language change
  initFlyInTitles();
}

function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  applyLanguage(newLang);
}

// ========== Video Card Hover Play ==========
function hoverVideoPlay(cardImage) {
  const video = cardImage.querySelector('.card-video');
  if (video) {
    video.play().catch(() => {});
  }
}

function hoverVideoPause(cardImage) {
  const video = cardImage.querySelector('.card-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// ========== Fullscreen Video Modal ==========
function openVideoModal(src) {
  const overlay = document.getElementById('videoOverlay');
  const player = document.getElementById('videoModalPlayer');
  const source = document.getElementById('videoModalSource');
  source.src = src;
  player.load();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Wait for curtain animation then play
  setTimeout(() => {
    player.play().catch(() => {});
  }, 1000);
}

function closeVideoModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) return;
  const overlay = document.getElementById('videoOverlay');
  const player = document.getElementById('videoModalPlayer');
  player.pause();
  player.currentTime = 0;
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ========== Hero Photo Switch ==========
function switchHeroPhoto(thumb) {
  const mainPhoto = document.querySelector('.hero-photo-main');
  if (!mainPhoto) return;
  const oldSrc = mainPhoto.src;
  mainPhoto.style.opacity = '0';
  setTimeout(() => {
    mainPhoto.src = thumb.src;
    thumb.src = oldSrc;
    mainPhoto.style.opacity = '1';
  }, 300);
}

// ========== Photo Viewer ==========
function openPhotoViewer(el) {
  const img = el.querySelector('img');
  if (!img) return;
  const overlay = document.getElementById('photoViewer');
  document.getElementById('photoViewerImg').src = img.src;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePhotoViewer(e) {
  if (e && e.target.tagName === 'IMG') return;
  const overlay = document.getElementById('photoViewer');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ========== Film Countdown Timer ==========
function initFilmCountdown() {
  const numEl = document.getElementById('countdownNum');
  if (!numEl) return;
  let count = 8;
  setInterval(() => {
    count--;
    if (count < 1) count = 8;
    numEl.textContent = count;
  }, 1000);
}

// ========== Parallax Photo Wall (JS-driven fixed) ==========
function initParallaxWall() {
  const container = document.getElementById('pwScrollContainer');
  const wall = document.getElementById('parallaxWall');
  if (!container || !wall) return;
  const items = container.querySelectorAll('.pw-img');

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const containerH = container.offsetHeight;
    const windowH = window.innerHeight;
    const scrollRange = containerH - windowH;
    if (scrollRange <= 0) return;

    // Phase 1: container top hasn't reached viewport top yet → wall at top of container
    if (rect.top >= 0) {
      wall.classList.remove('is-fixed', 'is-bottom');
    }
    // Phase 2: scrolling through → wall fixed to viewport
    else if (rect.top < 0 && rect.bottom > windowH) {
      wall.classList.add('is-fixed');
      wall.classList.remove('is-bottom');
    }
    // Phase 3: container bottom reached viewport bottom → wall at bottom of container
    else {
      wall.classList.remove('is-fixed');
      wall.classList.add('is-bottom');
    }

    // progress: 0 → 1 as we scroll through the container
    const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

    items.forEach(item => {
      const speed = parseFloat(item.getAttribute('data-speed')) || 0.6;
      // Images travel from below viewport to above it
      const startY = windowH + 80;
      const endY = -500;
      const y = startY + (endY - startY) * progress * speed;
      item.style.transform = `translateY(${y}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ========== Card Glow Effect (Apple-style) ==========
function initCardGlow() {
  const cards = document.querySelectorAll('.project-card, .interactive-card, .hobby-card');
  cards.forEach(card => {
    // Inject glow elements
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    const glowBorder = document.createElement('div');
    glowBorder.className = 'card-glow-border';
    card.style.position = 'relative';
    card.appendChild(glow);
    card.appendChild(glowBorder);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', x + 'px');
      card.style.setProperty('--glow-y', y + 'px');
    });
  });
}

// ========== Fly-In Title Animation (words from left/right) ==========
function initFlyInTitles() {
  const flyTitles = document.querySelectorAll('.anim-fly-in');
  flyTitles.forEach(title => {
    const text = title.textContent.trim();
    title.innerHTML = '';
    const words = text.split(/\s+/);
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word ' + (i % 2 === 0 ? 'from-left' : 'from-right');
      span.textContent = word;
      span.style.transitionDelay = (i * 0.08 + 0.1) + 's';
      title.appendChild(span);
    });
  });
}

// ========== Per-Section Unique Entrance Animations ==========
function initSectionAnimations() {
  const sections = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('section-visible');
        // Stagger children
        const animType = section.getAttribute('data-anim');
        let children;
        if (animType === 'fly-in') children = section.querySelectorAll('.about-grid > *');
        else if (animType === 'flip-in') children = section.querySelectorAll('.project-card');
        else if (animType === 'zoom-in') children = section.querySelectorAll('.interactive-card');
        else if (animType === 'rise-up') children = section.querySelectorAll('.contact-grid > *');
        if (children) {
          children.forEach((child, i) => {
            child.style.transitionDelay = (i * 0.12 + 0.15) + 's';
          });
        }
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(s => observer.observe(s));
}

// ========== Dark / Light Theme Toggle ==========
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-theme');
    btn.querySelector('.theme-icon').textContent = '🌙';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.querySelector('.theme-icon').textContent = isLight ? '🌙' : '☀️';
  });
}

// ========== Initialize Everything ==========
function initAllAnimations() {
  createParticles();
  typeWriter();
  initFlyInTitles();        // Must run before scroll observers
  initScrollAnimations();
  initSectionAnimations();
  initTextReveal();
  initParallax();
  initImageParallax();
  initSkillBars();
  initCounters();
  initMagneticButtons();
  initTiltCards();
  initSectionParallax();
  initShowcase();
  initFilmCountdown();
  initCardGlow();
  initParallaxWall();
  initThemeToggle();
}

// ========== Keyboard shortcut: ESC to close modals ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeQuiz();
    closeResources();
    closeQRCode();
    closeVideoModal();
    closePhotoViewer();
  }
});
