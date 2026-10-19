export function setupAnimations() {
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Leave content visible without entrance effects when reduced motion is requested.
  if (preferReducedMotion) return

  animateHero()
  animateAbout()
  animateServices()
  animateTestimonials()
  animateContact()
  animateFooter()
}

function animateHero() {
  animateOnScroll('#hero-text-img-container', [
    { opacity: 0, transform: 'translateY(24px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 1000 })
}

// Slide the story columns inward and reveal their divider independently.
function animateAbout() {
  animateOnScroll('#about-section > div', (element, index) => [
    { opacity: 0, transform: `translateX(${index === 0 ? -16 : 16}px)` },
    { opacity: 1, transform: 'translateX(0)' }
  ], { duration: 1050, stagger: 120 })

  animateOnScroll('#about-line-horizontal', [
    { transform: 'scaleX(0)', transformOrigin: 'left' },
    { transform: 'scaleX(1)', transformOrigin: 'left' }
  ], { duration: 1100, delay: 200 })
}

// Fade the section headings, then uncover each service row from left to right.
function animateServices() {
  animateOnScroll('#services-header, #services-title-container', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 800, stagger: 100 })

  animateOnScroll('.services-container', [
    { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
    { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
  ], { duration: 1200, stagger: 120, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
}

// Give successive cards opposite starting tilts before they settle into place.
function animateTestimonials() {
  animateOnScroll('#testimonials-header, #testimonials-title', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 900, stagger: 100 })

  animateOnScroll('.testimonial-card', (element, index) => [
    { opacity: 0, transform: `scale(0.96) rotate(${index % 2 === 0 ? -0.7 : 0.7}deg)` },
    { opacity: 1, transform: 'scale(1) rotate(0deg)' }
  ], { duration: 1050, stagger: 140, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
}

// Combine a headline reveal with an overshoot on the email link.
function animateContact() {
  animateOnScroll('#contact-header, #contact-blurb', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 900 })

  animateOnScroll('#contact-title', [
    { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(18px)' },
    { clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' }
  ], { duration: 1100, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })

  animateOnScroll('#contact-button', [
    { opacity: 0, transform: 'scale(0.88)', offset: 0 },
    { opacity: 1, transform: 'scale(1.04)', offset: 0.7 },
    { opacity: 1, transform: 'scale(1)', offset: 1 }
  ], { duration: 800, delay: 150 })
}

// Stagger the columns and animate the divider and copyright separately.
function animateFooter() {
  animateOnScroll('#footer-links-container > div', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 1000, stagger: 140 })

  animateOnScroll('.footer-line-horizontal', [
    { transform: 'scaleX(0)', transformOrigin: 'left' },
    { transform: 'scaleX(1)', transformOrigin: 'left' }
  ], { duration: 1250 })

  animateOnScroll('#footer-copyright', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 900, delay: 200 })
}

// Observe matching blocks and play each entrance once. Keyframes can be an array
// or a function of the element and its position; options override the default timing.
function animateOnScroll(selector, keyframes, { stagger = 0, ...animationOptions } = {}) {
  // Older browsers retain the normal visible content if observation is unavailable.
  if (!('IntersectionObserver' in window)) return

  const elements = document.querySelectorAll(selector)
  const observer = new IntersectionObserver((entries) => {
    // Restart the stagger for each observer callback so new arrivals wait only for this batch.
    let visibleIndex = 0

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const element = entry.target
      // Stop observing before animating so scrolling back cannot replay the entrance.
      observer.unobserve(element)

      // Skip the effect if focus is already inside; its initial frame could hide a control in use.
      if (element.contains(document.activeElement)) return

      // Use the original document order for effects such as alternating card tilts.
      const elementIndex = Array.from(elements).indexOf(element)
      const elementKeyframes = typeof keyframes === 'function'
        ? keyframes(element, elementIndex)
        : keyframes

      element.animate(
        elementKeyframes,
        {
          duration: 750,
          easing: 'ease-out',
          // Apply the first frame during the delay, then release styles when the animation ends.
          fill: 'backwards',
          ...animationOptions,
          delay: (animationOptions.delay ?? 0) + visibleIndex * stagger
        }
      )

      visibleIndex += 1
    })
  }, { threshold: 0.1 })

  elements.forEach((element) => observer.observe(element))
}
