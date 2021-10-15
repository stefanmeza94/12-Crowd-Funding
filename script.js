const hamburger = document.querySelector('.js-hamburger');
const mobileNav = document.querySelector('.js-mobile-nav');
const header = document.querySelector('.js-header');

hamburger.addEventListener('click', function() {
  if (!mobileNav.classList.contains('active')) {
    hamburger.setAttribute('src', './images/icon-close-menu.svg')
    mobileNav.classList.add('active');
  } else {
    mobileNav.classList.remove('active');
    hamburger.setAttribute('src', './images/icon-hamburger.svg');
  }
});