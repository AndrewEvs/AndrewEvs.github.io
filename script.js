// year
document.getElementById('year').textContent = new Date().getFullYear();

// nav background on scroll
const nav = document.getElementById('nav');
const scrollCue = document.querySelector('.hero__scroll');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
  if (scrollCue) scrollCue.style.opacity = window.scrollY > 60 ? '0' : '1';
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// mobile menu
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') links.classList.remove('open');
});

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// animated number counters
const easeOut = t => 1 - Math.pow(1 - t, 3);
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const val = Math.round(easeOut(p) * target);
    el.textContent = prefix + val + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const countIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat__num').forEach(el => countIO.observe(el));

// subtle parallax tilt on project + ai cards (pointer devices only)
if (window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project, .ai-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
