// Sticky header background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scroll and active nav link toggling
const navLinks = document.querySelectorAll('nav ul li a');
const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href')));

function setActiveLink() {
  let index = sections.findIndex(
    section =>
      section.offsetTop <= window.scrollY + 80 &&
      section.offsetTop + section.offsetHeight > window.scrollY + 80
  );
  navLinks.forEach(link => link.classList.remove('active'));
  if(index !== -1) navLinks[index].classList.add('active');
}
window.addEventListener('scroll', setActiveLink);

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});

// Intersection Observer for posts fade-in
const posts = document.querySelectorAll('article.post');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
posts.forEach(post => observer.observe(post));
