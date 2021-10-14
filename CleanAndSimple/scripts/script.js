'use strict'

let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let body = document.body;

let modalLinks = doc.querySelectorAll('[data-modal-link]');

for (let modalLink of modalLinks) {
    modalLink.addEventListener("click", () => {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
            let modal = doc.getElementById(popupId);
            showOrHideModal(modal);
        }
    });
}

let modalClosers = doc.querySelectorAll('.modal-closer');

for (const modalCloser of modalClosers) {
    modalCloser.addEventListener("click", () => {
        closeModal(modalCloser.closest('.modal-window'), true);
    });
}


// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
    let scrollbarWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;

    return scrollbarWidth;
}

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
    if (modalElement && unlock) {
        let activeModal = doc.querySelector('.modal-window.active');

        if (activeModal) {
            closeModal(activeModal, false);
        } else {
            toggleBodyScroll(false);
        }

        modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", (e) => {

        // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
        if (!e.target.closest('.modal-window__content')) {
            closeModal(modalElement, true);
        }
    })
}

function closeModal(modalWindow, bodyIsScrollable) {
    if (unlock) {
        modalWindow.classList.remove("active");

        if (bodyIsScrollable) {
            toggleBodyScroll(true);
        }
    }
}
function toggleBodyScroll(toggleScrollOn) {

    if (toggleScrollOn && fsMenuIsActive === false) {
        body.style.paddingRight = 0;
        body.classList.remove("fixed");
    } else {
        body.style.paddingRight = returnScrollbarWidth() + 'px';
        body.classList.add('fixed');
    }

    unlock = false;
    // Prevents a new window from opening too quickly.
    setTimeout(() => {
        unlock = true;
    }, transitionTimeout * 1000);
}

doc.addEventListener('keydown', (key) => {

    if (key.code === 'Escape') {
        let activeModal = doc.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;
let spoilerButtons = doc.querySelectorAll('[data-spoiler-button]');
let spoilerContentElements = doc.querySelectorAll('[data-spoiler-content]');

function toggleToSpoilers(e) {
    if (spoilerContentElements.length > 0 &&
        spoilerButtons.length == spoilerContentElements.length) {
        
        for (let i = 0; i < spoilerContentElements.length; i++) {
            spoilerContentElements[i].classList.add('spoiler-content');
            spoilerContentElements[i].hidden = true;
            spoilerButtons[i].classList.add('spoiler-button');
        }

        for (let spoilerButton of spoilerButtons) {
            spoilerButton.addEventListener('click', toggleSpoilerState);
        }
    }
}

function toggleSpoilerState(event) {
    let targetSpoilerButton = event.target;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;
    let animationDuration = 500;

    toggleSpoilerAnimation(spoilerContainer, animationDuration);
    targetSpoilerButton.classList.toggle('active');
    spoilerContainer.classList.toggle('active');
}

// Determines spoilers when the page is loaded and when it is resized.
toggleToSpoilers();
window.addEventListener(`resize`, toggleToSpoilers);

function spoilerUp(spoilerContainer, duration) {
    if (spoilerContainer.classList.contains('_slide') === false) {
        spoilerContainer.classList.add('_slide');
        let containerStyle = spoilerContainer.style;
        
        containerStyle.transitionProperty = 'height, margin, padding';
        containerStyle.transitionDuration = duration + 'ms';
        containerStyle.height = spoilerContainer.clientHeight + 'px';
        spoilerContainer.clientHeight;
        containerStyle.overflow = 'hidden';
        containerStyle.height = 0;
        containerStyle.paddingTop = 0;
        containerStyle.paddingBottom = 0;
        containerStyle.marginTop = 0;
        containerStyle.marginBottom = 0;

        window.setTimeout(() => {
            spoilerContainer.hidden = true;
            containerStyle.removeProperty('height');
            containerStyle.removeProperty('padding-top');
            containerStyle.removeProperty('padding-bottom');
            containerStyle.removeProperty('margin-top');
            containerStyle.removeProperty('margin-bottom');
            containerStyle.removeProperty('overflow');
            containerStyle.removeProperty('transition-duration');
            containerStyle.removeProperty('transition-property');
            spoilerContainer.classList.remove('_slide');
        }, duration);
    }
}
function spoilerDown(spoilerContainer, duration) {
    if (spoilerContainer.classList.contains('_slide') === false) {
        spoilerContainer.classList.add('_slide');

        if (spoilerContainer.hidden) {
            spoilerContainer.hidden = false;
        }
        let containerStyle = spoilerContainer.style;
        let height = spoilerContainer.clientHeight;

        containerStyle.overflow = 'hidden';
        containerStyle.height = 0;
        containerStyle.paddingTop = 0;
        containerStyle.paddingBottom = 0;
        containerStyle.marginTop = 0;
        containerStyle.marginBottom = 0;
        spoilerContainer.clientHeight;

        containerStyle.transitionProperty = 'height, margin, padding';
        containerStyle.transitionDuration = duration + 'ms';
        containerStyle.height = height + 'px';
        containerStyle.removeProperty('padding-top');
        containerStyle.removeProperty('padding-bottom');
        containerStyle.removeProperty('margin-top');
        containerStyle.removeProperty('margin-bottom');

        window.setTimeout(() => {
            containerStyle.removeProperty('height');
            containerStyle.removeProperty('overflow');
            containerStyle.removeProperty('transition-duration');
            containerStyle.removeProperty('transition-property');
            spoilerContainer.classList.remove('_slide');
        }, duration);
    }
}
function toggleSpoilerAnimation(spoilerContainer, duration) {
    if (spoilerContainer.hidden) {
        return spoilerDown(spoilerContainer, duration);
    } else {
        return spoilerUp(spoilerContainer, duration);
    }
};

