/* @generated-from: task-id:33709746-eb88-4848-b15b-f1c69bbec225 */
/* Simple Loan Aggregator Landing Page - Interactive Enhancements */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupSmoothScrolling();
    setupKeyboardNavigation();
    setupContactLinks();
    setupTouchOptimizations();
  }

  /**
   * Smooth scrolling for internal navigation links
   */
  function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });
  }

  function handleSmoothScroll(event) {
    const href = event.currentTarget.getAttribute('href');

    // Skip if href is just "#"
    if (href === '#') return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update focus for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();

      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  }

  /**
   * Enhanced keyboard navigation support
   */
  function setupKeyboardNavigation() {
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .service-item, .contact-item'
    );

    interactiveElements.forEach(element => {
      // Ensure interactive elements are keyboard accessible
      if (!element.hasAttribute('tabindex') && !['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
        element.setAttribute('tabindex', '0');
      }

      // Add keyboard event handlers for service and contact items
      if (element.classList.contains('service-item') || element.classList.contains('contact-item')) {
        element.addEventListener('keydown', handleCardKeydown);
      }
    });

    // Add visible focus indicator on keyboard navigation
    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('mousedown', handleMouseDown);
  }

  function handleCardKeydown(event) {
    // Allow Enter or Space to activate card interactions
    if (event.key === 'Enter' || event.key === ' ') {
      const links = event.currentTarget.querySelectorAll('a');
      if (links.length > 0) {
        event.preventDefault();
        links[0].click();
      }
    }
  }

  function handleTabKey(event) {
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  }

  function handleMouseDown() {
    document.body.classList.remove('keyboard-nav');
  }

  /**
   * Enhance contact links with interaction feedback
   */
  function setupContactLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const telLinks = document.querySelectorAll('a[href^="tel:"]');

    emailLinks.forEach(link => {
      link.addEventListener('click', () => {
        logInteraction('email_click', link.href);
      });
    });

    telLinks.forEach(link => {
      link.addEventListener('click', () => {
        logInteraction('phone_click', link.href);
      });
    });
  }

  /**
   * Touch-friendly optimizations for mobile devices
   */
  function setupTouchOptimizations() {
    // Add touch-active class for better mobile feedback
    const interactiveElements = document.querySelectorAll(
      'a, button, .service-item, .contact-item'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    });

    // Prevent double-tap zoom on specific elements
    const noZoomElements = document.querySelectorAll('a, button');
    noZoomElements.forEach(element => {
      element.addEventListener('touchend', preventDoubleTapZoom);
    });
  }

  function handleTouchStart(event) {
    event.currentTarget.classList.add('touch-active');
  }

  function handleTouchEnd(event) {
    event.currentTarget.classList.remove('touch-active');
  }

  let lastTouchEnd = 0;
  function preventDoubleTapZoom(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }

  /**
   * Utility function for logging interactions
   * This provides hooks for analytics integration without dependencies
   */
  function logInteraction(eventType, details) {
    // Progressive enhancement: only log if console is available
    if (typeof console !== 'undefined' && console.log) {
      console.log('[Interaction]', eventType, details);
    }

    // Hook for analytics services (e.g., Google Analytics, if added later)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventType, {
        event_category: 'engagement',
        event_label: details
      });
    }
  }

  /**
   * Add visual feedback class to body when JavaScript is enabled
   */
  document.body.classList.add('js-enabled');

  /**
   * Graceful degradation notice
   * This ensures core functionality works without JavaScript
   */
  if (typeof console !== 'undefined' && console.log) {
    console.log('[Simple Loan Aggregator] Enhanced features loaded successfully');
  }

})();
