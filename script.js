document.addEventListener('DOMContentLoaded', function() {
  // ===== DARK/LIGHT MODE TOGGLE =====
  const modeToggle = document.getElementById('mode-toggle');
  const modeIcon = document.getElementById('mode-icon');
  const html = document.documentElement;
  
  // Check for saved user preference or use system preference
  const savedMode = localStorage.getItem('mindnest-mode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply initial mode
  if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    html.classList.add('dark');
    modeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  
  // Toggle mode function
  function toggleDarkMode() {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('mindnest-mode', isDark ? 'dark' : 'light');
    
    // Update icon
    if (isDark) {
      modeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      modeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  }
  
  // Event listener
  modeToggle.addEventListener('click', toggleDarkMode);
  
  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }
  
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking on links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });
  
  // ===== CHATBOT FUNCTIONALITY =====
  const chatContainer = document.getElementById('chat-container');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  
  // Sample bot responses
  const botResponses = {
    greetings: ["Hello! How can I help you today?", "Hi there! What's on your mind?", "Welcome back! How can I assist you?"],
    stress: ["I understand stress can be challenging. Let's try a breathing exercise together.", 
             "When feeling stressed, try the 4-7-8 technique: Breathe in for 4, hold for 7, exhale for 8."],
    sleep: ["Good sleep is essential. Try maintaining a consistent bedtime routine.", 
            "I can guide you through a sleep meditation if you'd like."],
    default: ["I'm here to support your mental wellness. Could you tell me more?", 
              "Would you like to try a mindfulness exercise or talk about what's on your mind?"]
  };
  
  // Add message to chat
  function addMessage(text, sender = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    
    // Add typing animation for bot messages
    if (sender === 'bot') {
      messageDiv.style.opacity = '0';
      messageDiv.style.transform = 'translateY(10px)';
    }
    
    chatContainer.appendChild(messageDiv);
    
    // Animate the message
    if (sender === 'bot') {
      setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
      }, 50);
    }
    
    // Scroll to bottom
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message');
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
    return typingDiv;
  }
  
  // Generate bot response
  function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    else if (message.includes('stress') || message.includes('anxious') || message.includes('overwhelm')) {
      return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
    }
    else if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return botResponses.sleep[Math.floor(Math.random() * botResponses.sleep.length)];
    }
    else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  }
  
  // Handle form submission
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    // Add user message
    addMessage(userMessage, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Simulate bot thinking time
    setTimeout(() => {
      // Remove typing indicator
      chatContainer.removeChild(typingIndicator);
      
      // Add bot response
      const botResponse = generateBotResponse(userMessage);
      addMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 1000);
  });
  
  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== ANIMATIONS ON SCROLL =====
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .gallery-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialize elements with animation properties
  document.querySelectorAll('.feature-card, .gallery-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});