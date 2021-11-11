'use strict'

let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_spoiler.js');
@@include('_fsNavmenu.js');

function showImgFullscreen(e) {
    let targetImg = e.target.closest('img')

    let imgModal = doc.querySelector('#imageModal')
    let imgModalContent = imgModal.querySelector('.modal-window__content');

    if (!targetImg) {
        regurn;
    } else {
        imgModalContent.innerHTML = '';

        let imageClone = targetImg.cloneNode();
        imageClone.classList.add('modal-window__image');
        imgModalContent.insertAdjacentElement('afterbegin', imageClone);

        showOrHideModal(imgModal);
    }
}

let postImgBlocks = doc.querySelectorAll('.post__images-block');
for (const postImgBlock of postImgBlocks) {
    postImgBlock.addEventListener('click', showImgFullscreen);
}


const fsSwiper = new Swiper('.fs-slider', {
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
    },
    pagination: {
        el: '.fs-slider__pagination',
        clickable: true,
    },
    watchOverflow: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    }
});

const customersSwiper = new Swiper('.customers-quotes__slider', {
    pagination: {
        el: '.customers-quotes__pagination',
    },

    breakpoints: {
        // when window width is >= 1270px
        1270: {
            slidesPerView: 1.5,
            spaceBetween: 70,
        },
    },

    loop: true,
    autoHeight: true,
    watchOverflow: true,
});

const blogSwiper = new Swiper('.blog__slider', {
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
    },
    navigation: {
        nextEl: ".blog__slider-button-next",
        prevEl: ".blog__slider-button-prev",
    },
    pagination: {
        el: '.blog__slider-pagination',
        clickable: true,
    },

    autoHeight: true,
    watchOverflow: true,
    spaceBetween: 50,


    breakpoints: {
        // when window width is >= 1270px
        768: {
            allowTouchMove: false,
            autoplay: { delay: 999999999 },
        },
    },
});
