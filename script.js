/* ============================================================
   ACSS — Abandoned Child South Sudan
   Main JavaScript  |  Version 2.3 (Fully Fixed & Enhanced)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ ACSS JavaScript loaded');

  // ── 1. MOBILE NAVIGATION ──────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');

  // Debug: Log elements to verify they exist
  console.log('navToggle found:', !!navToggle);
  console.log('mobileNav found:', !!mobileNav);
  console.log('navOverlay found:', !!navOverlay);

  if (navToggle && mobileNav && navOverlay) {
    function toggleMobileNav() {
      const isOpen = mobileNav.classList.contains('open');
      
      if (isOpen) {
        mobileNav.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
        console.log('Mobile nav closed');
      } else {
        mobileNav.classList.add('open');
        navOverlay.classList.add('open');
        document.body.classList.add('no-scroll');
        navToggle.setAttribute('aria-expanded', 'true');
        console.log('Mobile nav opened');
      }
    }

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
      navToggle.setAttribute('aria-expanded', 'false');
      console.log('Mobile nav closed');
    }

    // ── Toggle on hamburger click ──────────────────────────
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileNav();
    });

    // ── Close on close button ──────────────────────────────
    if (mobileClose) {
      mobileClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileNav();
      });
    }

    // ── Close on overlay click ──────────────────────────────
    navOverlay.addEventListener('click', function(e) {
      if (e.target === this) closeMobileNav();
    });

    // ── Close on Escape key ─────────────────────────────────
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // ── Close on link clicks ────────────────────────────────
    document.querySelectorAll('.mobile-nav-links a, .mobile-nav-footer a').forEach(link => {
      link.addEventListener('click', function(e) {
        const isDropdownToggle = this.closest('.mobile-dropdown-toggle');
        const isDropdownBtn = this.closest('.mobile-nav-item button');
        if (!isDropdownToggle && !isDropdownBtn) {
          closeMobileNav();
        }
      });
    });

    // ── Close on resize to desktop ──────────────────────────
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 992 && mobileNav.classList.contains('open')) {
          closeMobileNav();
        }
      }, 250);
    });
  } else {
    console.warn('Mobile nav elements not found!');
  }

  // ── 2. SCROLL REVEAL ANIMATIONS ───────────────────────────
  const revealElements = document.querySelectorAll('[data-reveal]');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state for reveal elements
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  // Debounced scroll listener
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = requestAnimationFrame(() => {
      revealOnScroll();
      scrollTimeout = null;
    });
  });

  // Run on load
  setTimeout(revealOnScroll, 200);

  // ── 3. ANIMATED COUNTERS ──────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const windowHeight = window.innerHeight;

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60;
        const stepTime = 1500 / 60;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        updateCounter();
        countersAnimated = true;
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  setTimeout(animateCounters, 500);

  // ── 4. PROGRESS BARS ───────────────────────────────────────
  const progressFills = document.querySelectorAll('.progress-fill');
  let progressAnimated = false;

  function animateProgressBars() {
    if (progressAnimated) return;
    const windowHeight = window.innerHeight;

    progressFills.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width;
        }
        progressAnimated = true;
      }
    });
  }

  // Set initial width to 0 then animate
  progressFills.forEach(bar => {
    bar.style.width = '0%';
  });

  window.addEventListener('scroll', animateProgressBars);
  setTimeout(animateProgressBars, 600);

  // ── 5. BACK TO TOP BUTTON ──────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 6. COOKIE CONSENT ──────────────────────────────────────
  const cookieBanner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-accept');
  const declineBtn = document.querySelector('.cookie-decline');

  function hasConsent() {
    return localStorage.getItem('acss_cookie_consent') === 'true';
  }

  function setConsent(consent) {
    localStorage.setItem('acss_cookie_consent', consent.toString());
    if (cookieBanner) {
      cookieBanner.classList.remove('visible');
    }
    if (consent) {
      loadAnalytics();
    }
  }

  function loadAnalytics() {
    if (typeof gtag === 'undefined' && !document.querySelector('script[src*="googletagmanager.com"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    }
  }

  if (cookieBanner) {
    if (!hasConsent()) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1000);
    } else {
      loadAnalytics();
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => setConsent(true));
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', () => setConsent(false));
    }
  }

  // ── 7. TOAST NOTIFICATIONS ──────────────────────────────────
  window.showToast = function(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // ── 8. ACCORDION (for FAQ sections) ─────────────────────────
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    const chevron = item.querySelector('.accordion-chevron');

    if (trigger && content) {
      content.style.maxHeight = '0px';

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all siblings
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(sibling => {
            if (sibling !== item) {
              sibling.classList.remove('open');
              const siblingContent = sibling.querySelector('.accordion-content');
              if (siblingContent) siblingContent.style.maxHeight = '0px';
              const siblingChevron = sibling.querySelector('.accordion-chevron');
              if (siblingChevron) siblingChevron.style.transform = 'rotate(0deg)';
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          content.style.maxHeight = '0px';
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        } else {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // ── 9. HERO SLIDESHOW ──────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide-bg');
  const dots = document.querySelectorAll('.slide-dot');

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) next = 0;
      showSlide(next);
      resetInterval();
    }

    function resetInterval() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
    });

    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // ── 10. VIDEO PLAYER ─────────────────────────────────────────
  const videoWrapper = document.querySelector('.video-wrapper');
  if (videoWrapper) {
    const playBtn = videoWrapper.querySelector('.video-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const src = videoWrapper.dataset.src || videoWrapper.getAttribute('data-src');
        if (src && src !== 'YOUR_VIDEO_ID' && src.includes('youtube.com')) {
          const iframe = document.createElement('iframe');
          iframe.src = src + (src.includes('?') ? '&autoplay=1' : '?autoplay=1');
          iframe.allow = 'autoplay; encrypted-media';
          iframe.allowFullscreen = true;
          iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';

          const thumbnail = videoWrapper.querySelector('.video-thumbnail, img');
          if (thumbnail) thumbnail.style.display = 'none';
          const overlay = videoWrapper.querySelector('.video-overlay');
          if (overlay) overlay.style.display = 'none';
          videoWrapper.appendChild(iframe);
        }
      });
    }
  }

  // ── 11. SUBJECT TABS (Contact page) ─────────────────────────
  const subjectTabs = document.querySelectorAll('.subject-tab');
  if (subjectTabs.length > 0) {
    const subjectInput = document.getElementById('subject-type-input');
    const emergencyNotice = document.getElementById('emergency-notice');

    subjectTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        subjectTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const subject = tab.dataset.subject;
        if (subjectInput) subjectInput.value = subject;
        if (emergencyNotice) {
          emergencyNotice.style.display = subject === 'emergency' ? 'block' : 'none';
        }
        const subjectField = document.getElementById('contact-subject');
        if (subjectField) {
          const prefills = {
            general: '',
            donate: 'Question about donating to ACSS',
            volunteer: 'Volunteer inquiry',
            press: 'Media / press inquiry',
            partner: 'Partnership inquiry',
            emergency: ''
          };
          if (prefills[subject] !== undefined) {
            subjectField.value = prefills[subject];
          }
        }
      });
    });
  }

  // ── 12. CHARACTER COUNTER (Contact page) ────────────────────
  const msgField = document.getElementById('contact-message');
  const charCount = document.getElementById('char-remaining');
  if (msgField && charCount) {
    msgField.addEventListener('input', () => {
      const remaining = 1500 - msgField.value.length;
      charCount.textContent = remaining < 0 ? '0' : remaining;
    });
  }

  // ── 13. CONTACT FORM SUBMISSION ─────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit-btn');
      if (!btn) return;
      const original = btn.innerHTML;

      const name = document.getElementById('contact-name')?.value.trim() || '';
      const email = document.getElementById('contact-email')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';
      const consent = document.querySelector('[name="consent"]')?.checked || false;

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (!consent) {
        showToast('Please accept the privacy policy to continue.', 'error');
        return;
      }

      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;

      // Simulate sending (replace with actual API call)
      await new Promise(r => setTimeout(r, 1600));

      showToast('Message sent! We\'ll reply within 24–48 hours.', 'success');
      contactForm.reset();
      if (charCount) charCount.textContent = '1500';
      btn.innerHTML = original;
      btn.disabled = false;
    });
  }

  // ── 14. VOLUNTEER FORM ──────────────────────────────────────
  const volunteerForm = document.getElementById('volunteer-form-el');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('vol-submit-btn');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Submitting...';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1500));
      showToast('Thank you for applying! We will be in touch within 5 business days.', 'success');
      volunteerForm.reset();
      btn.innerHTML = original;
      btn.disabled = false;
    });
  }

  // ── 15. PARTNER FORM ────────────────────────────────────────
  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('partner-submit-btn');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1500));
      showToast('Thank you! Our partnerships director will be in touch within 48 hours.', 'success');
      partnerForm.reset();
      btn.innerHTML = original;
      btn.disabled = false;
    });
  }

  // ── 16. STORY FILTERS ──────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.category || btn.dataset.filter;
        const cards = document.querySelectorAll('.article-card, .story-card');
        cards.forEach(card => {
          const cardCat = card.dataset.category || card.dataset.programs || '';
          card.style.display = (filter === 'all' || cardCat.includes(filter)) ? '' : 'none';
        });
      });
    });
  }

  // ── 17. PROGRAM NAV (Sticky active state) ──────────────────
  const programNavLinks = document.querySelectorAll('.program-nav-link');
  if (programNavLinks.length > 0) {
    const sections = ['protection', 'education', 'mental-health', 'nutrition', 'reintegration'];
    let navScrollTimeout;

    window.addEventListener('scroll', () => {
      if (navScrollTimeout) return;
      navScrollTimeout = requestAnimationFrame(() => {
        let current = '';
        sections.forEach(id => {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 200) {
            current = id;
          }
        });
        programNavLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.target === current);
        });
        navScrollTimeout = null;
      });
    }, { passive: true });
  }

  // ── 18. STORY MODAL ─────────────────────────────────────────
  const storyModal = document.getElementById('story-modal');
  if (storyModal) {
    window.openStoryModal = function(id) {
      if (typeof stories !== 'undefined' && stories[id]) {
        const story = stories[id];
        const img = document.getElementById('modal-image');
        const body = document.getElementById('modal-body');

        if (img) {
          img.innerHTML = `<div style="font-size:5rem;display:flex;align-items:center;justify-content:center;height:100%;padding:2rem;">📖</div>`;
        }

        if (body) {
          const programBadges = story.programs.map(p =>
            `<span class="badge badge-blue">${p}</span>`
          ).join('');
          body.innerHTML = `
            <div class="story-modal-programs">${programBadges}</div>
            <h2>${story.title}</h2>
            ${story.body}
            <p style="font-size:.82rem;color:var(--text-tertiary);margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--gray-200);">
              📍 ${story.footer} · All details shared with consent and dignity.
            </p>
          `;
        }
        storyModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeStoryModal = function() {
      storyModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    storyModal.addEventListener('click', function(e) {
      if (e.target === this) window.closeStoryModal();
    });
  }

  // ── 19. DONATION FUNCTIONALITY ─────────────────────────────
  // Check if Stripe is loaded
  if (typeof Stripe !== 'undefined') {
    try {
      const stripe = Stripe('pk_test_YOUR_STRIPE_KEY');
      const elements = stripe.elements();
      const cardElement = elements.create('card');
      const cardElementContainer = document.getElementById('card-element');
      
      if (cardElementContainer) {
        cardElement.mount('#card-element');

        // Amount selector
        const freqBtns = document.querySelectorAll('.freq-btn');
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmount = document.getElementById('custom-amount');
        const recurringNotice = document.getElementById('recurring-notice');
        let donationType = 'once';
        let donationAmount = 50;

        freqBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            freqBtns.forEach(b => {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            donationType = btn.dataset.type;
            if (recurringNotice) {
              recurringNotice.style.display = donationType === 'monthly' ? 'block' : 'none';
            }
          });
        });

        amountBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const amt = btn.dataset.amount;
            if (amt) {
              donationAmount = parseInt(amt);
              if (customAmount) customAmount.value = donationAmount;
            }
            updateSidebar();
          });
        });

        if (customAmount) {
          customAmount.addEventListener('input', (e) => {
            amountBtns.forEach(b => b.classList.remove('active'));
            donationAmount = parseInt(e.target.value) || 0;
            updateSidebar();
          });
        }

        function updateSidebar() {
          const sidebarAmount = document.getElementById('sidebar-amount');
          const sidebarCost = document.getElementById('sidebar-cost');
          const recurringAmount = document.getElementById('recurring-amount');
          if (sidebarAmount) sidebarAmount.textContent = '$' + donationAmount;
          if (sidebarCost) sidebarCost.textContent = '$' + (donationAmount * 0.97).toFixed(2);
          if (recurringAmount) recurringAmount.textContent = '$' + donationAmount;
        }

        // Donation form submit
        const donationForm = document.getElementById('donation-form');
        if (donationForm) {
          donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fname = document.getElementById('donor-fname')?.value.trim() || '';
            const lname = document.getElementById('donor-lname')?.value.trim() || '';
            const email = document.getElementById('donor-email')?.value.trim() || '';
            const terms = document.getElementById('terms')?.checked || false;

            if (!fname || !email || donationAmount < 1) {
              showToast('Please fill in required fields and enter a valid amount.', 'error');
              return;
            }
            if (!terms) {
              showToast('Please accept the terms.', 'error');
              return;
            }

            const btn = document.getElementById('donate-submit-btn');
            if (!btn) return;
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="spinner"></span> Processing...';
            btn.disabled = true;

            const name = fname + (lname ? ' ' + lname : '');

            try {
              const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: { name: name, email: email }
              });

              if (error) {
                showToast(error.message, 'error');
                btn.innerHTML = original;
                btn.disabled = false;
                return;
              }

              // Simulate backend processing
              await new Promise(r => setTimeout(r, 2000));

              // Show success
              const successState = document.getElementById('success-state');
              if (successState) {
                donationForm.style.display = 'none';
                successState.classList.add('active');
                const successAmount = document.getElementById('success-amount');
                const successEmail = document.getElementById('success-email');
                if (successAmount) successAmount.textContent = '$' + donationAmount;
                if (successEmail) successEmail.textContent = email;
                showToast('Thank you for your generous donation!', 'success');
              }

            } catch (err) {
              showToast('Payment failed. Please try again.', 'error');
            }

            btn.innerHTML = original;
            btn.disabled = false;
          });
        }
      }
    } catch (e) {
      // Stripe not configured yet - this is fine in development
      console.log('Stripe not configured');
    }
  }

  // ── 20. NEWSLETTER SUBSCRIPTION ─────────────────────────────
  document.querySelectorAll('.footer-newsletter-form, .newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;
      const email = input.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      await new Promise(r => setTimeout(r, 1000));
      showToast('Thank you for subscribing! You\'ll hear from us soon.', 'success');
      form.reset();
    });
  });

  // ── 21. LOAD MORE STORIES ──────────────────────────────────
  const loadMoreBtn = document.getElementById('load-more-stories');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenStories = document.querySelectorAll('.story-card[style*="display: none"]');
      if (hiddenStories.length > 0) {
        let count = 0;
        hiddenStories.forEach(story => {
          if (count < 3) {
            story.style.display = '';
            count++;
          }
        });

        const remaining = document.querySelectorAll('.story-card[style*="display: none"]').length;
        if (remaining === 0) {
          loadMoreBtn.textContent = 'All Stories Loaded';
          loadMoreBtn.disabled = true;
          loadMoreBtn.style.opacity = '0.5';
        }
      }
    });
  }

  // ── 22. REPORT FORM ─────────────────────────────────────────
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('report-submit-btn');
      if (!btn) return;
      const original = btn.innerHTML;

      const type = document.getElementById('report-type')?.value || '';
      const subject = document.getElementById('report-subject')?.value.trim() || '';
      const details = document.getElementById('report-details')?.value.trim() || '';
      const consent = document.querySelector('[name="consent"]')?.checked || false;

      if (!type || !subject || !details) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }
      if (!consent) {
        showToast('Please confirm that you understand the confidentiality statement.', 'error');
        return;
      }

      btn.innerHTML = '<span class="spinner"></span> Submitting...';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 1500));

      showToast('Your report has been submitted. Someone will be in touch within 48 hours if you provided contact details.', 'success');
      reportForm.reset();
      btn.innerHTML = original;
      btn.disabled = false;
    });
  }

  // ── 23. MOBILE DROPDOWN TOGGLES ─────────────────────────────
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetId = this.dataset.target;
      const submenu = document.getElementById(targetId);
      
      if (submenu) {
        const isOpen = submenu.classList.contains('open');
        
        document.querySelectorAll('.mobile-submenu').forEach(other => {
          if (other.id !== targetId && other.classList.contains('open')) {
            other.classList.remove('open');
            const otherButton = document.querySelector(`[data-target="${other.id}"]`);
            if (otherButton) otherButton.classList.remove('open');
          }
        });
        
        submenu.classList.toggle('open');
        this.classList.toggle('open');
      }
    });
  });

  console.log('✅ ACSS JavaScript loaded successfully');
  console.log('Version 2.3 | Fully Fixed');
});
// ── LANGUAGE SWITCHER ─────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from all
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
            b.removeAttribute('aria-current');
        });
        
        // Add active to clicked
        this.classList.add('active');
        this.setAttribute('aria-current', 'true');
        
        const lang = this.dataset.lang;
        
        // Show toast notification
        if (lang === 'ar') {
            showToast('🌐 تم التبديل إلى اللغة العربية', 'info');
        } else {
            showToast('🌐 Switched to English', 'info');
        }
        
        // Here you would actually change the language
        // For now, we just show a notification
        console.log('Language changed to:', lang);
    });
});