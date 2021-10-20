const hamburger = document.querySelector('.js-hamburger');
const mobileNav = document.querySelector('.js-mobile-nav');
const header = document.querySelector('.js-header');
const overlayNav = document.querySelector('.js-overlay-nav');
const overlayModal = document.querySelector('.js-overlay-modal');
const choosePledge = document.querySelector('.js-choose-pledge');
const modal = document.querySelector('.js-modal');
const btnsContinue = document.querySelectorAll('.js-continue');

const thanksBox = document.querySelector('.thanks-box');
const gotItBtn = document.querySelector('.thanks-box-got-it');

const overallSum = document.querySelector('.js-total-sum');
const totalBackers = document.querySelector('.js-number-of-pledge');

// convert textContent string with commas into number without commas
function formatTotalValue(value) {
	let valueCopy = value.split('');
	let indexOfComa = valueCopy.indexOf(',');
	
	if (indexOfComa > -1) {
		valueCopy.splice(indexOfComa, 1);
	}
	
	return +valueCopy.join('');
}

// format values into string with commas
function formatComma(input) {
	
	let comaValue = input.split('');
	// third from the end, delete 0 elements and put comma in that place
	// ocigledno je da nece raditi za vece brojeve ali ce da posluzi za xx,xxx i x,xxx
	comaValue.splice(-3, 0, ',');
	
	return comaValue.join('');
}

console.log(formatComma((98915).toString()));

console.log(formatTotalValue('98,914') + 1);

let priceToAdd = 0;

// Mobile nav
hamburger.addEventListener('click', function() {
  if (!mobileNav.classList.contains('active')) {
    hamburger.setAttribute('src', './images/icon-close-menu.svg')
    mobileNav.classList.add('active');
		overlayNav.style.display = 'block';
  } else {
		mobileNav.classList.remove('active');
    hamburger.setAttribute('src', './images/icon-hamburger.svg');
		overlayNav.style.display = 'none';
  }
});


// Back this project button
choosePledge.addEventListener('click', function() {
	if (!modal.classList.contains('active-modal')) {
		modal.classList.add('active-modal');
		overlayModal.style.display = 'block';
		
		// Grab close button
		modal.querySelector('.js-close-icon').addEventListener('click', function() {
			if (modal.classList.contains('active-modal')) {
				modal.classList.remove('active-modal');
				overlayModal.style.display = 'none';
			}
		});
		
		modal.querySelectorAll('.js-choose-stand').forEach(pledge => {
			pledge.addEventListener('click', function(e) {
				// if there is any active "enter your pledge box" close it
				if (document.querySelector('.active-article')) {
					document.querySelector('.active-article').classList.remove('active-article');
				}
				const currentActive = e.target.closest('article');
				// add enter your pledge box 
				// toggleActiveClass(currentActive);
				currentActive.classList.add('active-article');
			});
		});
	} 
});

// event listener for continue buttons 
btnsContinue.forEach(btn => {
	priceToAdd = 0;
	btn.addEventListener('click', function(e) {
		// grab value from input field and convert it to number
		priceToAdd = +e.target.parentElement.querySelector('input').value;
		
		// display thanks for support
		thanksBox.classList.add('active-thanks-box');
		// close choosing modal 
		modal.classList.remove('active-modal');
	});
});

// event listener for got it button
gotItBtn.addEventListener('click', function(e) {
	// close all popups and dark-transparent overlay
	thanksBox.classList.remove('active-thanks-box');
	overlayModal.style.display = 'none';
	console.log(priceToAdd);
	
	// update overall sum and total backers
	console.log(totalBackers.textContent);
	// need to convert added values to string because formatComma function will not work with numbers
	totalBackers.textContent = formatComma((formatTotalValue(totalBackers.textContent) + 1).toString());
	overallSum.textContent = formatComma((formatTotalValue(overallSum.textContent) + priceToAdd).toString());
})