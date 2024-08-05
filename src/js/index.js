import "../css/style.css";

const slides = document.querySelectorAll("img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let slideTimeOut;
let index = 0;
let controlCircles = document.querySelectorAll(".circle");

prev.addEventListener("click", () => {
  clearTimeout(slideTimeOut);
  if (index > 0) {
    slides[index].style.display = "none";
    index--;
    displaySlide(index);
  } else {
    slides[index].style.display = "none";
    index = slides.length - 1;
    displaySlide(index);
  }
});

next.addEventListener("click", () => {
  clearTimeout(slideTimeOut);
  if (index < slides.length - 1) {
    slides[index].style.display = "none";
    index++;
    displaySlide(index);
  } else {
    slides[index].style.display = "none";
    index = 0;
    displaySlide(index);
  }
});

function displaySlide(currentIndex) {
  clearCircles();
  fillCircle(currentIndex);
  slides[currentIndex].style.display = "block";
  slideTimeOut = setTimeout(displayNextSlide, 5000);
}

function displayNextSlide() {
  slides[index].style.display = "none";
  if (index === slides.length - 1) {
    index = 0;
    displaySlide(index);
  } else {
    index++;
    displaySlide(index);
  }
}

function clearCircles() {
  controlCircles.forEach((circle) => {
    circle.classList.remove("active-circle");
  });
}

function fillCircle(index) {
  controlCircles.forEach((circle) => {
    if (index === parseInt(circle.dataset.index, 10)) {
      circle.classList.add("active-circle");
    }
  });
}

controlCircles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    clearTimeout(slideTimeOut);
    clearCircles();
    slides[index].style.display = "none";
    index = +e.target.dataset.index;
    displaySlide(index);
    e.target.classList.add("active-circle");
  });
});

displaySlide(index);
