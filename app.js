const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  }), { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  reduceMotion.addEventListener('change', event => {
    if (event.matches) { document.documentElement.classList.remove('js-motion'); observer.disconnect(); }
  });
}
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu +'; }
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close −' : 'Menu +';
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
const form = document.querySelector('.contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `${data.get('service')} inquiry from ${data.get('name')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
  window.location.href = `mailto:adeyemidavies320@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.querySelector('[role="status"]').textContent = 'Your email draft is ready in your email app. Send it there to complete your inquiry, or email me directly above.';
});
