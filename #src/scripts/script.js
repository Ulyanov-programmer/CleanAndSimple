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

