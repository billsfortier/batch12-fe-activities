window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 0);
});

var vodka = document.querySelector('#vodka-sodas');
var beer = document.querySelector('#beers');
var radler = document.querySelector('#radlers');

vodka.addEventListener("click", toggleVodka);
beer.addEventListener("click", toggleBeer);
radler.addEventListener("click", toggleRadler);

var check = document.querySelector('#check');

document.querySelector('#drink-link').addEventListener("click", toggleNav);
document.querySelector('#story-link').addEventListener("click", toggleNav);
document.querySelector('#contact-link').addEventListener("click", toggleNav);

function toggleNav() {
    check.checked = false;
}

function toggleVodka() {
  document.querySelector('#vodka').style.display = "flex";
  document.querySelector('#beer').style.display = "none";
  document.querySelector('#radler').style.display = "none";
}

function toggleBeer() {
  document.querySelector('#beer').style.display = "flex";
  document.querySelector('#vodka').style.display = "none";
  document.querySelector('#radler').style.display = "none";
}

function toggleRadler() {
  document.querySelector('#radler').style.display = "flex";
  document.querySelector('#beer').style.display = "none";
  document.querySelector('#vodka').style.display = "none";
}

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

