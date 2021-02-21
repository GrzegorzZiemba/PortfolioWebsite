document.querySelector(".menu").addEventListener("click", () => {
	document.querySelectorAll(".target").forEach((item) => {
		item.classList.toggle("change");
	});
});

document.querySelectorAll(".wrapper").forEach((item) => {
	item.addEventListener("click", () => {
		document.querySelectorAll(".target").forEach((item) => {
			item.classList.remove("change");
		});
	});
});

const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [85, 80, 75, 45, 70, 13];

window.addEventListener("scroll", () => {
	mainFn();
});

const mainFn = () => {
	if (window.pageYOffset >= navbarOffsetTop) {
		navbar.classList.add("sticky");
	} else {
		navbar.classList.remove("sticky");
	}

	sections.forEach((section, i) => {
		if (window.pageYOffset >= section.offsetTop - 10) {
			navbarLinks.forEach((navbarLink) => {
				navbarLink.classList.remove("change");
			});
			navbarLinks[i].classList.add("change");
		}
	});

	if (window.pageYOffset + window.innerHeight >= progress.offsetTop) {
		document.querySelectorAll(".progress-percent").forEach((el, i) => {
			el.style.width = `${progressBarPercents[i]}%`;
			el.previousElementSibling.firstElementChild.textContent =
				progressBarPercents[i];
		});
	}
};

mainFn();

window.addEventListener("resize", () => {
	window.location.reload();
});

const testing = document.querySelector(".testInside");

fetch(
	"https://cors-anywhere.herokuapp.com/https://www.codewars.com/api/v1/users/GrzegorzZiemba"
)
	.then((res) => res.json())

	.then((data) => {
		testing.textContent =
			data.username +
			" with " +
			data.honor +
			" at " +
			data.ranks.languages.javascript.name;
	})
	.catch((err) => {
		testing.innerHTML = `Currently unavailable data but you can check it out <a href="https://www.codewars.com/users/GrzegorzZiemba" target="_blank">Here</a>`;
	});
// .then((data) => console.log(data));

const swiper = new Swiper(".swiper-container", {
	// Optional parameters
	direction: "horizontal",
	loop: true,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	// And if we need scrollbar
	scrollbar: {
		el: ".swiper-scrollbar",
	},
});
