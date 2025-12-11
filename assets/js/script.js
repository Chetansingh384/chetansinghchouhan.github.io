'use strict';

// loading animation
window.addEventListener('load', function() {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(function() {
      loading.classList.add('hide');
      setTimeout(function() {
        loading.style.display = 'none';
      }, 500);
    }, 500);
  }
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Project modal variables
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectModalOverlay = document.querySelector('[data-project-modal-overlay]');
const projectModalClose = document.querySelector('[data-project-modal-close]');
const projectDetailsButtons = document.querySelectorAll('[data-project-modal]');

// Project modal elements
const projectModalImg = document.querySelector('[data-project-modal-img]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalDescription = document.querySelector('[data-project-modal-description]');
const projectModalFeatures = document.querySelector('[data-project-modal-features]');
const projectModalGithub = document.querySelector('[data-project-modal-github]');

// Open project modal
function openProjectModal(projectId) {
  const projectItem = document.querySelector(`[data-project-id="${projectId}"]`);
  
  if (!projectItem) return;
  
  // Get project data from data attributes
  const projectData = {
    title: projectItem.getAttribute('data-project-title'),
    image: projectItem.getAttribute('data-project-image'),
    detailImage: projectItem.getAttribute('data-project-detail-image'), // Detailed project image
    description: projectItem.getAttribute('data-project-description'),
    features: projectItem.getAttribute('data-project-features'),
    contributors: projectItem.getAttribute('data-project-contributors'),
    github: projectItem.getAttribute('data-project-github')
  };
  
  // Populate modal with project data - use detailed image if available, otherwise use banner image
  const imageToUse = projectData.detailImage || projectData.image;
  if (projectModalImg) projectModalImg.src = imageToUse;
  if (projectModalImg) projectModalImg.alt = projectData.title;
  if (projectModalTitle) projectModalTitle.textContent = projectData.title;
  if (projectModalDescription) projectModalDescription.textContent = projectData.description;
  
  // Populate features list
  if (projectModalFeatures && projectData.features) {
    projectModalFeatures.innerHTML = '';
    const featuresArray = projectData.features.split(',');
    featuresArray.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature.trim();
      projectModalFeatures.appendChild(li);
    });
  }
  
  // Contributors section removed - no longer displayed in project modal
  
  // Set GitHub link - always show button, use main GitHub profile if no specific repo
  if (projectModalGithub) {
    const githubUrl = projectData.github && projectData.github.trim() !== '' 
      ? projectData.github.trim() 
      : 'https://github.com/Chetansingh384';
    
    // Check if it's just the profile link (private repo indicator)
    // A private repo would be just the profile URL without a specific repo path
    const isPrivateRepo = githubUrl === 'https://github.com/Chetansingh384' || 
                         githubUrl === '' ||
                         githubUrl === '#' ||
                         (githubUrl.includes('github.com/Chetansingh384') && 
                          !githubUrl.match(/github\.com\/Chetansingh384\/[^\/]+/));
    
    if (isPrivateRepo) {
      projectModalGithub.href = '#';
      projectModalGithub.onclick = function(e) {
        e.preventDefault();
        showPrivateRepoMessage();
        return false;
      };
    } else {
      projectModalGithub.href = githubUrl;
      projectModalGithub.onclick = null;
    }
    projectModalGithub.style.display = 'inline-flex';
  }
  
  // Show modal
  if (projectModalContainer) projectModalContainer.classList.add('active');
  if (projectModalOverlay) projectModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
  if (projectModalContainer) projectModalContainer.classList.remove('active');
  if (projectModalOverlay) projectModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Add event listeners to detail buttons
if (projectDetailsButtons.length > 0) {
  projectDetailsButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const projectId = this.getAttribute('data-project-modal');
      openProjectModal(projectId);
    });
  });
}

// Close modal events
if (projectModalClose) {
  projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModalOverlay) {
  projectModalOverlay.addEventListener('click', closeProjectModal);
}

// Load projects and skills from localStorage
function loadAdminProjects() {
  try {
    const storedProjects = localStorage.getItem('portfolio_projects');
    if (!storedProjects) return;

    const projects = JSON.parse(storedProjects);
    const projectList = document.querySelector('.project-list');
    if (!projectList) return;

    projects.forEach(project => {
      // Check if project already exists
      const existingProject = document.querySelector(`[data-project-id="${project.id}"]`);
      if (existingProject) return; // Skip if already exists

      // Create project item
      const projectItem = document.createElement('li');
      projectItem.className = 'project-item active';
      projectItem.setAttribute('data-filter-item', '');
      projectItem.setAttribute('data-category', project.category);
      projectItem.setAttribute('data-project-id', project.id);
      projectItem.setAttribute('data-project-title', project.title);
      projectItem.setAttribute('data-project-category', project.category);
      projectItem.setAttribute('data-project-github', project.github || '');
      projectItem.setAttribute('data-project-image', project.image || './assets/images/project-1.jpg');
      projectItem.setAttribute('data-project-detail-image', project.detailImage || project.image || './assets/images/project-1.jpg');
      projectItem.setAttribute('data-project-description', project.description || '');
      projectItem.setAttribute('data-project-features', project.features || '');
      // Handle contributors - ensure empty values are properly set
      let contributorsValue = '';
      if (project.contributors) {
        if (typeof project.contributors === 'string') {
          contributorsValue = project.contributors.trim() || '';
        } else {
          contributorsValue = JSON.stringify(project.contributors || []);
        }
      }
      // If empty, set to empty string (not '[]')
      if (contributorsValue === '[]' || contributorsValue === 'null' || contributorsValue === '') {
        contributorsValue = '';
      }
      projectItem.setAttribute('data-project-contributors', contributorsValue);

      const githubLink = project.github && project.github.trim() ? project.github : '';
      const githubButtonStyle = githubLink ? '' : 'style="opacity: 0.5; pointer-events: none;"';

      projectItem.innerHTML = `
        <div class="project-card">
          <div class="project-card-image">
            <img src="${project.image || './assets/images/project-1.jpg'}" alt="${project.title}" loading="lazy">
          </div>
          <p class="project-title">${project.title}</p>
          <p class="project-powered">Powered By</p>
          <p class="project-category">${project.category}</p>
          <div class="project-buttons">
            <a href="${githubLink}" target="_blank" class="project-btn project-btn-github" ${githubButtonStyle}>
              <ion-icon name="logo-github"></ion-icon>
              GitHub
            </a>
            <button class="project-btn project-btn-details" data-project-modal="${project.id}">
              <ion-icon name="information-circle-outline"></ion-icon>
              Details
            </button>
          </div>
        </div>
      `;

      projectList.appendChild(projectItem);

      // Add event listener to details button
      const detailsBtn = projectItem.querySelector('[data-project-modal]');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const projectId = this.getAttribute('data-project-modal');
          openProjectModal(projectId);
        });
      }
    });
  } catch (e) {
    console.error('Error loading admin projects:', e);
  }
}

function loadAdminSkills() {
  try {
    const storedSkills = localStorage.getItem('portfolio_skills');
    if (!storedSkills) return;

    const skills = JSON.parse(storedSkills);
    const skillsContent = document.querySelector('.skills-content');
    if (!skillsContent) return;
    
    // Group skills by category
    const skillsByCategory = {};
    skills.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    // Process each category
    Object.keys(skillsByCategory).forEach(categoryName => {
      // Try to find existing category
      let categoryDiv = null;
      const existingCategories = document.querySelectorAll('.skills-category');
      existingCategories.forEach(cat => {
        const title = cat.querySelector('.skills-category-title');
        if (title && title.textContent.trim() === categoryName) {
          categoryDiv = cat;
        }
      });

      // Create category if it doesn't exist
      if (!categoryDiv) {
        categoryDiv = document.createElement('div');
        categoryDiv.className = 'skills-category';
        categoryDiv.innerHTML = `
          <h3 class="skills-category-title">${categoryName}</h3>
          <div class="skills-grid"></div>
        `;
        skillsContent.appendChild(categoryDiv);
      }

      const skillsGrid = categoryDiv.querySelector('.skills-grid');
      if (!skillsGrid) return;

      skillsByCategory[categoryName].forEach(skill => {
        // Check if skill already exists
        const existingSkills = skillsGrid.querySelectorAll('.skill-item-modern');
        let skillExists = false;
        existingSkills.forEach(item => {
          const nameEl = item.querySelector('.skill-name');
          if (nameEl && nameEl.textContent.trim() === skill.name) {
            skillExists = true;
          }
        });
        if (skillExists) return; // Skip if already exists

        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item-modern';

        let iconHtml = '';
        if (skill.icon) {
          if (skill.icon.type === 'image') {
            iconHtml = `<img src="${skill.icon.src}" alt="${skill.name}" loading="lazy" class="skill-icon">`;
          } else if (skill.icon.type === 'ionicon') {
            iconHtml = `<ion-icon name="${skill.icon.name}"></ion-icon>`;
          } else if (skill.icon.type === 'svg') {
            iconHtml = skill.icon.code;
          }
        }

        skillItem.innerHTML = `
          <div class="skill-icon-wrapper">
            ${iconHtml}
          </div>
          <span class="skill-name">${skill.name}</span>
        `;

        skillsGrid.appendChild(skillItem);
      });
    });
  } catch (e) {
    console.error('Error loading admin skills:', e);
  }
}

// Load admin data when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadAdminProjects();
  loadAdminSkills();
  
  // Re-initialize project modal buttons after loading
  const projectDetailsButtons = document.querySelectorAll('[data-project-modal]');
  if (projectDetailsButtons.length > 0) {
    projectDetailsButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const projectId = this.getAttribute('data-project-modal');
        openProjectModal(projectId);
      });
    });
  }
  
  // Initialize portfolio data from HTML
  initializePortfolioData();
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && projectModalContainer && projectModalContainer.classList.contains('active')) {
    closeProjectModal();
  }
});

// Show private repo message
function showPrivateRepoMessage() {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'private-repo-toast';
  toast.innerHTML = `
    <div class="private-repo-toast-content">
      <ion-icon name="lock-closed-outline"></ion-icon>
      <div class="private-repo-toast-text">
        <strong>Repository is Private</strong>
        <p>This project repository is currently private or not available for public access.</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Add click handlers to all GitHub buttons in project cards
document.addEventListener('DOMContentLoaded', function() {
  // Handle project card GitHub buttons
  const projectCardGithubButtons = document.querySelectorAll('.project-btn-github');
  projectCardGithubButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Check if it's just the profile link (private repo indicator)
      const isPrivateRepo = !href || 
                           href === 'https://github.com/Chetansingh384' || 
                           href === '#' ||
                           (href.includes('github.com/Chetansingh384') && 
                            !href.match(/github\.com\/Chetansingh384\/[^\/]+/));
      
      if (isPrivateRepo) {
        e.preventDefault();
        showPrivateRepoMessage();
        return false;
      }
    });
  });
});

/*-----------------------------------*\
  #ADMIN PANEL JAVASCRIPT
\*-----------------------------------*/

// Storage keys
const STORAGE_KEY_PROJECTS = 'portfolio_projects';
const STORAGE_KEY_SKILLS = 'portfolio_skills';
const ADMIN_SESSION_KEY = 'portfolio_admin_session';
const INITIALIZED_KEY = 'portfolio_initialized';

// Extract projects from HTML on page load
function extractProjectsFromHTML() {
  const projectItems = document.querySelectorAll('.project-item[data-project-id]');
  const projects = [];
  
  projectItems.forEach(item => {
    const projectId = item.getAttribute('data-project-id');
    if (!projectId) return;
    
    const project = {
      id: projectId,
      title: item.getAttribute('data-project-title') || '',
      category: item.getAttribute('data-project-category') || '',
      description: item.getAttribute('data-project-description') || '',
      features: item.getAttribute('data-project-features') || '',
      image: item.getAttribute('data-project-image') || '',
      detailImage: item.getAttribute('data-project-detail-image') || '',
      github: item.getAttribute('data-project-github') || '',
      contributors: item.getAttribute('data-project-contributors') || '',
    };
    
    projects.push(project);
  });
  
  return projects;
}

// Extract skills from HTML on page load
function extractSkillsFromHTML() {
  const skillItems = document.querySelectorAll('.skill-item-modern');
  const skills = [];
  const skillsByCategory = {};
  
  // Get all skill categories
  const skillCategories = document.querySelectorAll('.skills-category');
  
  skillCategories.forEach(categoryDiv => {
    const categoryTitle = categoryDiv.querySelector('.skills-category-title');
    const categoryName = categoryTitle ? categoryTitle.textContent.trim() : 'Programming Skills';
    const skillGrid = categoryDiv.querySelector('.skills-grid');
    
    if (!skillGrid) return;
    
    const categorySkills = skillGrid.querySelectorAll('.skill-item-modern');
    categorySkills.forEach(skillItem => {
      const skillName = skillItem.querySelector('.skill-name');
      if (!skillName) return;
      
      const name = skillName.textContent.trim();
      if (!name) return;
      
      // Get icon
      let iconData = null;
      const iconWrapper = skillItem.querySelector('.skill-icon-wrapper');
      if (iconWrapper) {
        const img = iconWrapper.querySelector('img');
        const ionicon = iconWrapper.querySelector('ion-icon');
        const svg = iconWrapper.querySelector('svg');
        
        if (img && img.src) {
          iconData = {
            type: 'image',
            src: img.src
          };
        } else if (ionicon) {
          iconData = {
            type: 'ionicon',
            name: ionicon.getAttribute('name') || ''
          };
        } else if (svg) {
          iconData = {
            type: 'svg',
            code: svg.outerHTML
          };
        }
      }
      
      const skill = {
        id: `skill-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name: name,
        category: categoryName,
        icon: iconData
      };
      
      skills.push(skill);
    });
  });
  
  return skills;
}

// Initialize localStorage with HTML projects and skills
function initializePortfolioData() {
  const initialized = localStorage.getItem(INITIALIZED_KEY);
  if (initialized === 'true') {
    // Already initialized, merge HTML items with existing data
    mergeHTMLDataWithStorage();
    return;
  }
  
  // First time initialization
  const htmlProjects = extractProjectsFromHTML();
  const htmlSkills = extractSkillsFromHTML();
  
  // Save to localStorage
  if (htmlProjects.length > 0) {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(htmlProjects));
  }
  
  if (htmlSkills.length > 0) {
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(htmlSkills));
  }
  
  localStorage.setItem(INITIALIZED_KEY, 'true');
}

// Merge HTML data with existing storage (to avoid duplicates)
function mergeHTMLDataWithStorage() {
  const htmlProjects = extractProjectsFromHTML();
  const htmlSkills = extractSkillsFromHTML();
  
  // Merge projects
  const existingProjects = getProjects();
  const existingProjectIds = new Set(existingProjects.map(p => p.id));
  
  htmlProjects.forEach(htmlProject => {
    if (!existingProjectIds.has(htmlProject.id)) {
      existingProjects.push(htmlProject);
    } else {
      // Update existing project with HTML data if it's missing fields
      const index = existingProjects.findIndex(p => p.id === htmlProject.id);
      if (index !== -1) {
        // Merge, keeping admin-added data but filling missing fields
        existingProjects[index] = { ...htmlProject, ...existingProjects[index] };
      }
    }
  });
  
  saveProjects(existingProjects);
  
  // Merge skills
  const existingSkills = getSkills();
  const existingSkillIds = new Set(existingSkills.map(s => s.id));
  
  htmlSkills.forEach(htmlSkill => {
    if (!existingSkillIds.has(htmlSkill.id)) {
      existingSkills.push(htmlSkill);
    }
  });
  
  saveSkills(existingSkills);
}

// Check authentication
function checkAuth() {
  const session = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!session || session !== 'active') {
    // Show login modal instead of redirecting
    showLoginModal();
    return false;
  }
  return true;
}

// Show login modal
function showLoginModal() {
  const loginModal = document.getElementById('login-modal-container');
  if (loginModal) {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Hide login modal
function hideLoginModal() {
  const loginModal = document.getElementById('login-modal-container');
  if (loginModal) {
    loginModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Logout function
function logout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  // Hide admin panel and redirect to about
  const adminPanel = document.querySelector('.admin-panel');
  if (adminPanel) {
    adminPanel.style.display = 'none';
    
    // Reset password prompt for next time
    const adminPasswordPrompt = document.getElementById('admin-password-prompt');
    const adminPanelContent = document.getElementById('admin-panel-content');
    if (adminPasswordPrompt) adminPasswordPrompt.style.display = 'flex';
    if (adminPanelContent) adminPanelContent.style.display = 'none';
    
    // Switch to About page
    const aboutNav = document.querySelector('[data-nav-link]');
    if (aboutNav) aboutNav.click();
  }
}

// Initialize admin panel
(function initAdmin() {
  // Auto-logout on page refresh/load
  window.addEventListener('beforeunload', function() {
    // Clear session on page unload
    localStorage.removeItem(ADMIN_SESSION_KEY);
  });
  
  // Also clear on page load to ensure fresh start
  if (typeof window.performance !== 'undefined' && window.performance.navigation.type === 1) {
    // Page was reloaded
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
  
  // Check if admin section exists in index
  const adminPanel = document.querySelector('.admin-panel');
  
  if (adminPanel) {
    document.addEventListener('DOMContentLoaded', function() {
      // Clear session on every page load (auto-logout)
      localStorage.removeItem(ADMIN_SESSION_KEY);
      // Setup admin password form
      const adminPasswordForm = document.getElementById('admin-password-form');
      const adminPasswordInput = document.getElementById('admin-password-input');
      const adminPasswordToggle = document.getElementById('admin-password-toggle');
      const adminPasswordPrompt = document.getElementById('admin-password-prompt');
      const adminPanelContent = document.getElementById('admin-panel-content');

      // Password toggle
      if (adminPasswordToggle && adminPasswordInput) {
        adminPasswordToggle.addEventListener('click', function() {
          const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          adminPasswordInput.setAttribute('type', type);
          const icon = adminPasswordToggle.querySelector('ion-icon');
          if (icon) {
            icon.setAttribute('name', type === 'password' ? 'eye-outline' : 'eye-off-outline');
          }
        });
      }

      // Admin password form submission
      if (adminPasswordForm) {
        adminPasswordForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const password = adminPasswordInput ? adminPasswordInput.value : '';
          
          if (password === getAdminPassword()) {
            // Set session
            localStorage.setItem(ADMIN_SESSION_KEY, 'active');
            
            // Hide password prompt, show admin panel
            if (adminPasswordPrompt) adminPasswordPrompt.style.display = 'none';
            if (adminPanelContent) adminPanelContent.style.display = 'block';
            
            // Initialize admin functionality
            initializeTabs();
            initializeProjects();
            initializeSkills();
            loadData();
          } else {
            const errorDiv = document.getElementById('admin-password-error');
            if (errorDiv) {
              errorDiv.textContent = 'Incorrect password. Please try again.';
              errorDiv.classList.add('show');
              setTimeout(() => {
                errorDiv.classList.remove('show');
              }, 5000);
            }
            if (adminPasswordInput) {
              adminPasswordInput.value = '';
              adminPasswordInput.focus();
            }
          }
        });
      }

      // Check if user is already authenticated
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (session && session === 'active') {
        // Hide password prompt, show admin panel
        if (adminPasswordPrompt) adminPasswordPrompt.style.display = 'none';
        if (adminPanelContent) adminPanelContent.style.display = 'block';
        
        // Initialize admin functionality
        initializeTabs();
        initializeProjects();
        initializeSkills();
        loadData();
      } else {
        // Hide admin panel if not logged in
        adminPanel.style.display = 'none';
      }

      // Setup admin link - show login modal or admin panel
      const adminLoginLink = document.getElementById('admin-login-link');
      if (adminLoginLink) {
        adminLoginLink.addEventListener('click', function(e) {
          e.preventDefault();
          const session = localStorage.getItem(ADMIN_SESSION_KEY);
          if (!session || session !== 'active') {
            // Show login modal
            showLoginModal();
          } else {
            // Switch to admin page directly
            const adminPage = document.querySelector('.admin-panel');
            if (adminPage) {
              // Hide password prompt, show admin panel
              const adminPasswordPrompt = document.getElementById('admin-password-prompt');
              const adminPanelContent = document.getElementById('admin-panel-content');
              if (adminPasswordPrompt) adminPasswordPrompt.style.display = 'none';
              if (adminPanelContent) adminPanelContent.style.display = 'block';
              
              // Show admin panel page
              adminPage.style.display = 'block';
              
              // Switch navigation to admin
              const allArticles = document.querySelectorAll('article[data-page]');
              allArticles.forEach(article => {
                article.classList.remove('active');
              });
              adminPage.classList.add('active');
              
              // Update navbar
              const navLinks = document.querySelectorAll('.navbar-link');
              navLinks.forEach(link => link.classList.remove('active'));
              
              window.scrollTo(0, 0);
              
              // Load data
              setTimeout(() => {
                if (typeof loadData === 'function') {
                  loadData();
                }
                if (typeof loadAdminProjects === 'function') {
                  loadAdminProjects();
                }
                if (typeof loadAdminSkills === 'function') {
                  loadAdminSkills();
                }
              }, 100);
            }
          }
        });
      }

      // Setup logout button
      const logoutBtn = document.getElementById('admin-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
          logout();
        });
      }
    });

  }
})();

// Tab switching
function initializeTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  const sections = document.querySelectorAll('.admin-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active section
      sections.forEach(s => s.classList.remove('active'));
      const targetSection = document.getElementById(`${targetTab}-section`);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

// Projects management
function initializeProjects() {
  const addBtn = document.getElementById('add-project-btn');
  const formContainer = document.getElementById('project-form-container');
  const form = document.getElementById('project-form');
  const cancelBtn = document.getElementById('cancel-project-btn');
  const projectsList = document.getElementById('projects-list');

  if (!addBtn || !formContainer || !form) return;

  let editingProjectId = null;

  // Show form
  addBtn.addEventListener('click', function() {
    editingProjectId = null;
    form.reset();
    formContainer.style.display = 'block';
    const projectIdInput = document.getElementById('project-id');
    if (projectIdInput) projectIdInput.readOnly = false;
  });

  // Hide form
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      formContainer.style.display = 'none';
      form.reset();
      editingProjectId = null;
    });
  }

  // Handle image file upload
  const imageFileInput = document.getElementById('project-image-file');
  if (imageFileInput) {
    imageFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageInput = document.getElementById('project-image');
          if (imageInput) imageInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle detail image file upload
  const detailImageFileInput = document.getElementById('project-detail-image-file');
  if (detailImageFileInput) {
    detailImageFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const detailImageInput = document.getElementById('project-detail-image');
          if (detailImageInput) detailImageInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectData = {
      id: document.getElementById('project-id').value.trim(),
      title: document.getElementById('project-title').value.trim(),
      category: document.getElementById('project-category').value.trim(),
      description: document.getElementById('project-description').value.trim(),
      features: document.getElementById('project-features').value.trim(),
      image: document.getElementById('project-image').value.trim(),
      detailImage: document.getElementById('project-detail-image').value.trim() || null,
      github: document.getElementById('project-github').value.trim() || '',
      contributors: document.getElementById('project-contributors').value.trim() || '',
      abstract: document.getElementById('project-abstract') ? document.getElementById('project-abstract').value.trim() : ''
    };

    if (!projectData.id || !projectData.title) {
      alert('Please fill in all required fields');
      return;
    }

    // Get existing projects
    const projects = getProjects();
    
    if (editingProjectId) {
      // Update existing project
      const index = projects.findIndex(p => p.id === editingProjectId);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData };
      }
    } else {
      // Add new project
      projects.push(projectData);
    }

    // Save to localStorage
    saveProjects(projects);
    
    // Refresh admin list
    displayProjects();
    
    // Refresh main website projects
    if (typeof loadAdminProjects === 'function') {
      loadAdminProjects();
    }
    
    // Reset form
    form.reset();
    formContainer.style.display = 'none';
    editingProjectId = null;

    alert('Project saved successfully! It will appear on the website.');
  });

  // Display projects
  window.displayProjects = function() {
    if (!projectsList) return;
    const projects = getProjects();
    projectsList.innerHTML = '';

    if (projects.length === 0) {
      projectsList.innerHTML = `
        <div class="empty-state">
          <ion-icon name="folder-outline"></ion-icon>
          <h3>No Projects Yet</h3>
          <p>Click "Add New Project" to get started</p>
        </div>
      `;
      return;
    }

    projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'admin-item';
      
      const imageSrc = project.image || './assets/images/project-1.jpg';
      
      item.innerHTML = `
        <div class="admin-item-header">
          <div>
            <div class="admin-item-title">${project.title}</div>
            <div class="admin-item-content">${project.category}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-project-id="${project.id}" title="Edit">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button class="admin-item-btn delete" data-project-id="${project.id}" title="Delete">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
        <img src="${imageSrc}" alt="${project.title}" class="admin-item-image" onerror="this.src='./assets/images/project-1.jpg'">
        <div class="admin-item-content">${project.description.substring(0, 100)}...</div>
      `;

      // Edit button
      const editBtn = item.querySelector('.edit');
      if (editBtn) {
        editBtn.addEventListener('click', function() {
          editingProjectId = project.id;
          populateProjectForm(project);
          formContainer.style.display = 'block';
          const projectIdInput = document.getElementById('project-id');
          if (projectIdInput) projectIdInput.readOnly = true;
        });
      }

      // Delete button
      const deleteBtn = item.querySelector('.delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
          if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            deleteProject(project.id);
            displayProjects();
            // Refresh main website
            if (typeof loadAdminProjects === 'function') {
              loadAdminProjects();
            }
          }
        });
      }

      projectsList.appendChild(item);
    });
  };

  function populateProjectForm(project) {
    const idInput = document.getElementById('project-id');
    const titleInput = document.getElementById('project-title');
    const categoryInput = document.getElementById('project-category');
    const descInput = document.getElementById('project-description');
    const featuresInput = document.getElementById('project-features');
    const imageInput = document.getElementById('project-image');
    const detailImageInput = document.getElementById('project-detail-image');
    const githubInput = document.getElementById('project-github');
    const contributorsInput = document.getElementById('project-contributors');
    const abstractInput = document.getElementById('project-abstract');

    if (idInput) idInput.value = project.id || '';
    if (titleInput) titleInput.value = project.title || '';
    if (categoryInput) categoryInput.value = project.category || '';
    if (descInput) descInput.value = project.description || '';
    if (featuresInput) featuresInput.value = project.features || '';
    if (imageInput) imageInput.value = project.image || '';
    if (detailImageInput) detailImageInput.value = project.detailImage || '';
    if (githubInput) githubInput.value = project.github || '';
    if (contributorsInput) {
      contributorsInput.value = typeof project.contributors === 'string' 
        ? project.contributors 
        : (project.contributors ? JSON.stringify(project.contributors) : '');
    }
    if (abstractInput) abstractInput.value = project.abstract || '';
  }
}

// Skills management
function initializeSkills() {
  const addBtn = document.getElementById('add-skill-btn');
  const formContainer = document.getElementById('skill-form-container');
  const form = document.getElementById('skill-form');
  const cancelBtn = document.getElementById('cancel-skill-btn');
  const skillsList = document.getElementById('skills-list');
  const iconTypeSelect = document.getElementById('skill-icon-type');

  if (!addBtn || !formContainer || !form) return;

  let editingSkillId = null;

  // Show/hide icon input based on type
  if (iconTypeSelect) {
    iconTypeSelect.addEventListener('change', function() {
      const type = this.value;
      const imageGroup = document.getElementById('skill-icon-image-group');
      const ioniconGroup = document.getElementById('skill-icon-ionicon-group');
      const svgGroup = document.getElementById('skill-icon-svg-group');
      
      if (imageGroup) imageGroup.style.display = type === 'image' ? 'flex' : 'none';
      if (ioniconGroup) ioniconGroup.style.display = type === 'ionicon' ? 'flex' : 'none';
      if (svgGroup) svgGroup.style.display = type === 'svg' ? 'flex' : 'none';
    });
  }

  // Show form
  addBtn.addEventListener('click', function() {
    editingSkillId = null;
    form.reset();
    formContainer.style.display = 'block';
    if (iconTypeSelect) iconTypeSelect.dispatchEvent(new Event('change'));
  });

  // Hide form
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      formContainer.style.display = 'none';
      form.reset();
      editingSkillId = null;
    });
  }

  // Handle icon file upload
  const iconFileInput = document.getElementById('skill-icon-file');
  if (iconFileInput) {
    iconFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const iconImageInput = document.getElementById('skill-icon-image');
          if (iconImageInput) iconImageInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const iconType = iconTypeSelect ? iconTypeSelect.value : 'image';
    let iconData = null;

    if (iconType === 'image') {
      const iconImageInput = document.getElementById('skill-icon-image');
      iconData = {
        type: 'image',
        src: iconImageInput ? iconImageInput.value.trim() : ''
      };
    } else if (iconType === 'ionicon') {
      const iconIoniconInput = document.getElementById('skill-icon-ionicon');
      iconData = {
        type: 'ionicon',
        name: iconIoniconInput ? iconIoniconInput.value.trim() : ''
      };
    } else if (iconType === 'svg') {
      const iconSvgInput = document.getElementById('skill-icon-svg');
      iconData = {
        type: 'svg',
        code: iconSvgInput ? iconSvgInput.value.trim() : ''
      };
    }

    const skillNameInput = document.getElementById('skill-name');
    const skillCategoryInput = document.getElementById('skill-category');
    
    const skillData = {
      id: Date.now().toString(),
      name: skillNameInput ? skillNameInput.value.trim() : '',
      category: skillCategoryInput ? skillCategoryInput.value : 'Programming Skills',
      icon: iconData
    };

    if (!skillData.name || !iconData) {
      alert('Please fill in all required fields');
      return;
    }

    // Get existing skills
    const skills = getSkills();
    
    if (editingSkillId) {
      // Update existing skill
      const index = skills.findIndex(s => s.id === editingSkillId);
      if (index !== -1) {
        skills[index] = { ...skills[index], ...skillData, id: editingSkillId };
      }
    } else {
      // Add new skill
      skills.push(skillData);
    }

    // Save to localStorage
    saveSkills(skills);
    
    // Refresh admin list
    displaySkills();
    
    // Refresh main website skills
    if (typeof loadAdminSkills === 'function') {
      loadAdminSkills();
    }
    
    // Reset form
    form.reset();
    formContainer.style.display = 'none';
    editingSkillId = null;

    alert('Skill saved successfully! It will appear on the website.');
  });

  // Display skills
  window.displaySkills = function() {
    if (!skillsList) return;
    const skills = getSkills();
    skillsList.innerHTML = '';

    if (skills.length === 0) {
      skillsList.innerHTML = `
        <div class="empty-state">
          <ion-icon name="star-outline"></ion-icon>
          <h3>No Skills Yet</h3>
          <p>Click "Add New Skill" to get started</p>
        </div>
      `;
      return;
    }

    skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'admin-item';
      
      let iconHtml = '';
      if (skill.icon) {
        if (skill.icon.type === 'image') {
          iconHtml = `<img src="${skill.icon.src}" alt="${skill.name}" class="admin-item-icon" onerror="this.style.display='none'">`;
        } else if (skill.icon.type === 'ionicon') {
          iconHtml = `<ion-icon name="${skill.icon.name}" style="font-size: 48px; color: var(--orange-yellow-crayola);"></ion-icon>`;
        } else if (skill.icon.type === 'svg') {
          iconHtml = `<div style="width: 48px; height: 48px;">${skill.icon.code}</div>`;
        }
      }
      
      item.innerHTML = `
        <div class="admin-item-header">
          <div>
            <div class="admin-item-title">${skill.name}</div>
            <div class="admin-item-content">${skill.category}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-skill-id="${skill.id}" title="Edit">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button class="admin-item-btn delete" data-skill-id="${skill.id}" title="Delete">
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div style="text-align: center; margin: 15px 0;">
          ${iconHtml}
        </div>
      `;

      // Edit button
      const editBtn = item.querySelector('.edit');
      if (editBtn) {
        editBtn.addEventListener('click', function() {
          editingSkillId = skill.id;
          populateSkillForm(skill);
          formContainer.style.display = 'block';
          if (iconTypeSelect) iconTypeSelect.dispatchEvent(new Event('change'));
        });
      }

      // Delete button
      const deleteBtn = item.querySelector('.delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
          if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
            deleteSkill(skill.id);
            displaySkills();
            // Refresh main website
            if (typeof loadAdminSkills === 'function') {
              loadAdminSkills();
            }
          }
        });
      }

      skillsList.appendChild(item);
    });
  };

  function populateSkillForm(skill) {
    const nameInput = document.getElementById('skill-name');
    const categoryInput = document.getElementById('skill-category');
    const iconTypeInput = document.getElementById('skill-icon-type');
    
    if (nameInput) nameInput.value = skill.name || '';
    if (categoryInput) categoryInput.value = skill.category || 'Programming Skills';
    
    if (skill.icon && iconTypeInput) {
      iconTypeInput.value = skill.icon.type || 'image';
      if (skill.icon.type === 'image') {
        const iconImageInput = document.getElementById('skill-icon-image');
        if (iconImageInput) iconImageInput.value = skill.icon.src || '';
      } else if (skill.icon.type === 'ionicon') {
        const iconIoniconInput = document.getElementById('skill-icon-ionicon');
        if (iconIoniconInput) iconIoniconInput.value = skill.icon.name || '';
      } else if (skill.icon.type === 'svg') {
        const iconSvgInput = document.getElementById('skill-icon-svg');
        if (iconSvgInput) iconSvgInput.value = skill.icon.code || '';
      }
    }
  }
}

// Storage functions
function getProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects:', e);
  }
}

function deleteProject(projectId) {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== projectId);
  saveProjects(filtered);
}

function getSkills() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SKILLS);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveSkills(skills) {
  try {
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));
  } catch (e) {
    console.error('Error saving skills:', e);
  }
}

function deleteSkill(skillId) {
  const skills = getSkills();
  const filtered = skills.filter(s => s.id !== skillId);
  saveSkills(filtered);
}

// Load and display data
function loadData() {
  if (typeof displayProjects === 'function') {
    displayProjects();
  }
  if (typeof displaySkills === 'function') {
    displaySkills();
  }
}

/*-----------------------------------*\
  #LOGIN MODAL JAVASCRIPT
\*-----------------------------------*/

// Obfuscated password - decoded at runtime
function getAdminPassword() {
  // Simple base64-like obfuscation (not real security, just hides from plain view)
  const encoded = 'Y2hldGFuMjE3Mw=='; // base64 of 'chetan2173'
  try {
    return atob(encoded);
  } catch(e) {
    // Fallback if atob not available
    return String.fromCharCode(...[99, 104, 101, 116, 97, 110, 50, 49, 55, 51]);
  }
}

// Initialize login modal
(function initLogin() {
  document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('login-modal-container');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');
    const loginModalClose = document.getElementById('login-modal-close');
    const loginModalOverlay = document.getElementById('login-modal-overlay');

    // Password toggle functionality
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = passwordToggle.querySelector('ion-icon');
        if (icon) {
          if (type === 'password') {
            icon.setAttribute('name', 'eye-outline');
          } else {
            icon.setAttribute('name', 'eye-off-outline');
          }
        }
      });
    }

    // Close modal buttons
    if (loginModalClose) {
      loginModalClose.addEventListener('click', hideLoginModal);
    }

    if (loginModalOverlay) {
      loginModalOverlay.addEventListener('click', hideLoginModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && loginModal && loginModal.style.display !== 'none') {
        hideLoginModal();
      }
    });

    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = passwordInput ? passwordInput.value : '';
        const errorDiv = document.getElementById('login-error');
        
          // Check against password
          if (password === getAdminPassword()) {
          localStorage.setItem(ADMIN_SESSION_KEY, 'active');
          
          // Hide login modal
          hideLoginModal();
          
            // Switch to admin page directly
            setTimeout(() => {
              // Find and click the admin page navigation
              const adminPage = document.querySelector('.admin-panel');
              if (adminPage) {
                // Hide password prompt, show admin panel
                const adminPasswordPrompt = document.getElementById('admin-password-prompt');
                const adminPanelContent = document.getElementById('admin-panel-content');
                if (adminPasswordPrompt) adminPasswordPrompt.style.display = 'none';
                if (adminPanelContent) adminPanelContent.style.display = 'block';
                
                // Show admin panel page
                adminPage.style.display = 'block';
                
                // Switch navigation to admin
                const allArticles = document.querySelectorAll('article[data-page]');
                allArticles.forEach(article => {
                  article.classList.remove('active');
                });
                adminPage.classList.add('active');
                
                // Update navbar
                const navLinks = document.querySelectorAll('.navbar-link');
                navLinks.forEach(link => link.classList.remove('active'));
                
                window.scrollTo(0, 0);
                
                // Initialize admin functionality
                initializeTabs();
                initializeProjects();
                initializeSkills();
                loadData();
              }
            }, 100);
        } else {
          showLoginError('Incorrect password. Please try again.');
          if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
          }
        }
      });
    }
  });
})();

function showLoginError(message) {
  const errorDiv = document.getElementById('login-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    setTimeout(() => {
      errorDiv.classList.remove('show');
    }, 5000);
  }
}

// Galaxy background feature removed