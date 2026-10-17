export function setupAnimations() {
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

function animateAbout() {
  // Bring the two halves of the story together from opposite sides.
  animateOnScroll('#about-section > div', (element, index) => [
    { opacity: 0, transform: `translateX(${index === 0 ? -16 : 16}px)` },
    { opacity: 1, transform: 'translateX(0)' }
  ], { duration: 1050, stagger: 120 })

  animateOnScroll('#about-line-horizontal', [
    { transform: 'scaleX(0)', transformOrigin: 'left' },
    { transform: 'scaleX(1)', transformOrigin: 'left' }
  ], { duration: 1100, delay: 200 })
}

function animateServices() {
  // Uncover the service rows from left to right, like opening a brief.
  animateOnScroll('#services-header, #services-title-container', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 800, stagger: 100 })

  animateOnScroll('.services-container', [
    { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
    { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
  ], { duration: 1200, stagger: 120, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
}

function animateTestimonials() {
  animateOnScroll('#testimonials-header, #testimonials-title', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 900, stagger: 100 })

  // Cards settle into place with alternating, very slight tilts.
  animateOnScroll('.testimonial-card', (element, index) => [
    { opacity: 0, transform: `scale(0.96) rotate(${index % 2 === 0 ? -0.7 : 0.7}deg)` },
    { opacity: 1, transform: 'scale(1) rotate(0deg)' }
  ], { duration: 1050, stagger: 140, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
}

function animateContact() {
  animateOnScroll('#contact-header, #contact-blurb', [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 900 })

  // Reveal the headline upward, then give the email CTA a small pop.
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

function animateFooter() {
  // A quiet finish: fade across the columns, then draw the closing rule.
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

// Reveal each content block once when it enters the viewport.
// Section backgrounds and layout stay in place throughout the animation.
function animateOnScroll(selector, keyframes, { stagger = 0, ...animationOptions } = {}) {
  if (!('IntersectionObserver' in window)) return

  const elements = document.querySelectorAll(selector)
  const observer = new IntersectionObserver((entries) => {
    let visibleIndex = 0

    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const element = entry.target
      observer.unobserve(element)

      // Keep a block visible if someone has already tabbed into it.
      if (element.contains(document.activeElement)) return

      const elementIndex = Array.from(elements).indexOf(element)
      const elementKeyframes = typeof keyframes === 'function'
        ? keyframes(element, elementIndex)
        : keyframes

      element.animate(
        elementKeyframes,
        {
          duration: 750,
          easing: 'ease-out',
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
