const hamburger = document.querySelector('.header__hamburger');
const list = document.querySelector('.header__list');
const closeItem = document.querySelector('.header__close')

hamburger.addEventListener('click', () => {
    list.classList.add('view');
    closeItem.innerHTML = "X";
    closeItem.addEventListener('click', () => {
        list.classList.remove('view');
    })
})

setInterval(() => {
    if (window.innerWidth >= 800) {
        closeItem.innerHTML = "";
    }
}, 100);
