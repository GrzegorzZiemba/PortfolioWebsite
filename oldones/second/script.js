// variables global
const slideList = [
  {
    img: "images/bg1.jpg",
    text: "Some text that you want to add as first",
  },
  {
    img: "images/bg2.jpg",
    text: "Second text can also come in there",
  },
  {
    img: "images/bg3.jpg",
    text: "That's awsome ! I'm the third one !",
  },
];

const liElement = document.querySelectorAll(".header__link");
const hamburger = document.querySelector(".header__hamburger");
const list = document.querySelector(".header__list");
const closeItem = document.querySelector(".header__close");
const bannerImage = document.querySelector(".header__banner");
const bannerText = document.querySelector(".header__paragraph");
const dots = [...document.querySelectorAll(".banner__dot")];

let time = 3000;
let active = 0;
// For Scrolling and addaing active class for the next sections

window.addEventListener("scroll", () => {
  liElement.forEach((element) => {
    const sectionElement = document.querySelector(element.dataset.href);

    const scroll = window.scrollY;

    const elementPos = sectionElement.offsetTop;

    if (scroll + 60 >= elementPos) {
      document.querySelector(".active").classList.remove("active");
      element.classList.add("active");
    }
  });
});

liElement.forEach((element) => {
  element.addEventListener("click", () => {
    const sectionElement = document.querySelector(element.dataset.href);
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: sectionElement.offsetTop,
    });
  });
});

// For Hambureger icon

hamburger.addEventListener("click", () => {
  list.classList.add("view");
  closeItem.innerHTML = "X";
  closeItem.addEventListener("click", () => {
    list.classList.remove("view");
  });
});

setInterval(() => {
  if (window.innerWidth >= 930) {
    closeItem.innerHTML = "";
  }
}, 100);

// Slider

const changeDot = () => {
  const activeDot = dots.findIndex((dot) => dot.classList.contains("active"));
  dots[activeDot].classList.remove("active");
  dots[active].classList.add("active");
};

const changeSlide = () => {
  active++;
  if (active === slideList.length) {
    active = 0;
  }
  bannerImage.style.backgroundImage = `url(${slideList[active].img})`;
  console.log(slideList[active]);
  bannerText.textContent = slideList[active].text;
  changeDot();
};

let stopIt = setInterval(changeSlide, time);
