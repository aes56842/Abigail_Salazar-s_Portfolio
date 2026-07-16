// Reveal project spreads as they scroll into view
const spreads = document.querySelectorAll('.project-spread');

if ('IntersectionObserver' in window && spreads.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  spreads.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  spreads.forEach((el) => el.classList.add('is-visible'));
}
