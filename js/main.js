'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const typingText = document.getElementById('typing-text');
  const projectsGrid = document.getElementById('projects-grid');
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  // Mobile navigation
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }

  // Small, dependency-free typing effect
  if (typingText) {
    const words = ['Developer', 'Java Programmer', 'Python Learner', 'Web Developer'];
    let word = 0;
    let char = 0;
    let deleting = false;
    const type = () => {
      const current = words[word];
      typingText.textContent = deleting ? current.slice(0, --char) : current.slice(0, ++char);
      let delay = deleting ? 55 : 85;
      if (!deleting && char === current.length) { deleting = true; delay = 1200; }
      else if (deleting && char === 0) { deleting = false; word = (word + 1) % words.length; delay = 350; }
      setTimeout(type, delay);
    };
    type();
  }

  // Reveal on scroll with a safe fallback for reduced motion.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const projects = [
    {
      title: 'VoteSphere – Flutter Voting System',
      category: 'flutter',
      type: 'mobile',
      description: 'Flutter voting application with voter and administrator roles, local SQLite storage, election management, one-vote-per-user rules and controlled result declaration.',
      tech: ['Flutter', 'Dart', 'SQLite', 'Provider'],
      github: 'https://github.com/baldhapreet-web/VoteSphere-Flutter-Voting-System'
    },
    {
      title: 'Bike Service App',
      category: 'mobile',
      type: 'mobile',
      description: 'Android application for bike servicing with authentication, service booking, service-status tracking, delivery scheduling, history and feedback workflows.',
      tech: ['Java', 'Android Studio', 'Firebase'],
      github: 'https://github.com/baldhapreet-web/BikeServiceApp'
    },
    {
      title: 'Jontu Chhaas Masala Website',
      category: 'web',
      type: 'web',
      description: 'Premium responsive brand website developed for Jontu Chhaas Masala with product showcase, gallery, animations, contact section and SEO-focused structure.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/baldhapreet-web/jontumasala',
      demo: 'https://jontumasala.vercel.app/'
    },
    {
      title: 'AgriGrow – Smart Farming Website',
      category: 'web',
      type: 'web',
      description: 'Responsive multi-page farming website focused on smart agriculture, sustainable farming solutions and a clean professional user interface.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/baldhapreet-web/agrigrow'
    },
    {
      title: 'Smart Voting System',
      category: 'web',
      type: 'web',
      description: 'Web-based voting system from my academic portfolio, focused on user authentication, vote management and a responsive user experience using PHP and MySQL.',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
      github: 'https://github.com/baldhapreet-web'
    }
  ];

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));

  const renderProjects = filter => {
    const visible = filter === 'all' ? projects : projects.filter(project => project.category === filter || project.type === filter);
    if (!projectsGrid) return;
    projectsGrid.innerHTML = visible.map((project, index) => `
      <article class="project-card reveal visible" data-category="${escapeHtml(project.category)}">
        <div class="project-number">${String(index + 1).padStart(2, '0')}</div>
        <div class="project-topline"><span>${escapeHtml(project.type.toUpperCase())}</span><span>2026</span></div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tech-list">${project.tech.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer">Source Code ↗</a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Site ↗</a>` : ''}
        </div>
      </article>
    `).join('');
  };

  renderProjects('all');

  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.filter || 'all');
    });
  });

  // Contact form opens the user's email client instead of pretending to send data to a backend.
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:baldhapreet@gmail.com?subject=${subject}&body=${body}`;
      if (formNote) formNote.textContent = 'Opening your email application…';
    });
  }

  // Active navigation state
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const updateActiveNav = () => {
    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});
