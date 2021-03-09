document.addEventListener("DOMContentLoaded", function () {
	//Writting Robot

	const typedText = document.querySelector(".mainsec.first .span__dev");

	const textArray = ["JavaScript", "CSS", "HTML", "React", "Node", "Redux"];
	const typingDelay = 90;
	const erasingDelay = 80;
	const newTextDelay = 1000; // Delay between current and next text
	let textArrayIndex = 0;
	let charIndex = 0;

	function type() {
		if (charIndex < textArray[textArrayIndex].length) {
			typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
			charIndex++;
			setTimeout(type, typingDelay);
		} else {
			setTimeout(erase, newTextDelay);
		}
	}

	function erase() {
		if (charIndex > 0) {
			typedText.textContent = textArray[textArrayIndex].substring(
				0,
				charIndex - 1
			);
			charIndex--;
			setTimeout(erase, erasingDelay);
		} else {
			textArrayIndex++;
			if (textArrayIndex >= textArray.length) textArrayIndex = 0;
			setTimeout(type, typingDelay + 1100);
		}
	}

	setTimeout(type, newTextDelay);

	const box = document.querySelector(".mainsec.first .animated__section");
	const text = "Future Frontend Developer";

	let wordIndex = 0;
	let delateIndex = wordIndex;

	let oldTime = 0;
	const speed = 80; //czym większa wartość tym wolniejszy typing

	const typing = (newTime) => {
		if (newTime - oldTime > speed) {
			oldTime = newTime;
			const letter = text.substr(wordIndex, 1);
			box.textContent += letter;
			wordIndex++;
		}

		requestAnimationFrame(typing);
	};

	typing();

	// For Scroller/Swiper funnctions  function
	const scroller = new Scroller();

	document.addEventListener("wheel", (event) => scroller.listenScroll(event));
	// document.addEventListener("swipeLeft", () => scroller.scroll(1));
	// document.addEventListener("swipeRight", () => scroller.scroll(-1));
	document.addEventListener("keydown", (event) => {
		switch (event.keyCode) {
			case 40:
				return scroller.scroll(1);
			case 38:
				return scroller.scroll(-1);

			default:
				return;
		}
	});

	//for templates:
	const slideList = [
		{
			img: "images/First-500.jpg",
			text: "First template - inspiration by Treehouse free tempalte",
			a: "first/index.html",
		},
		{
			img: "images/second-500.jpg",
			text: "My second template that i wrote - inspiration by Pluton ",
			a: "second/index.html",
		},
	];
	const templateImage = document.querySelector(
		".mainsec.second .image__container"
	);
	const templateParagraph = document.querySelector(
		".imageparagraph__container"
	);
	const getAHref = document.querySelector(".get__template");
	const dots = [...document.querySelectorAll(".image__dot")];

	let time = 3000;
	let active = 0;

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
		templateImage.style.backgroundImage = `url(${slideList[active].img})`;

		templateParagraph.textContent = slideList[active].text;
		getAHref.href = slideList[active].a;
		changeDot();
	};

	setInterval(changeSlide, time);
});
