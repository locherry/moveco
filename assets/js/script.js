//ChatBubble Animation

const chatBubble = document.querySelector(".chat-bubble");
const chatTexts = document.querySelectorAll(".chat-bubble p-data");
const nextBtn = document.querySelector("button.next");
const prevBtn = document.querySelector("button.previous");

let chatNumber = 0;
let typeSpeed = 30;
let isTyping = false;

function type(chatNumber) {
  if (document.querySelector(".chat-bubble p")) {
    document.querySelector(".chat-bubble p").remove();
  }

  newP = document.createElement("p");
  chatBubble.insertBefore(newP, chatBubble.firstChild);

  letters = textToArray(chatTexts[chatNumber].innerHTML);

  let i = 0;

  if (isTyping) {
    if (typeof letterAdder != "undefined") {
      clearInterval(letterAdder);
    }
  }

  letterAdder = setInterval(() => {
    isTyping = true;

    letter = letters[i];
    newP.innerHTML = newP.innerHTML + letter;
    i++;
    document.querySelector(".chat-bubble").click();
    if (i == letters.length - 1) {
      clearInterval(letterAdder);
      isTyping = false;
    }
  }, typeSpeed);

  // disable or reable arrow button
  if (chatNumber == 0) {
    prevBtn.setAttribute("disabled", "");
  } else if (chatNumber == chatTexts.length - 1) {
    nextBtn.setAttribute("disabled", "");
  }
}

function textToArray(text) {
  array = text.split("").map((e, i) => {
    if (e != "<" && text[i + 1] != ">" && text[i + 2] != ">" && e != ">") {
      return e;
    } else if (
      e == "<" &&
      text[i + 1] == "b" &&
      text[i + 2] == "r" &&
      text[i + 3] == ">"
    ) {
      return "<br>";
    }
    return "";
  });
  let filteredArray = array.filter(
    (letter, i) =>
      (letter !== " " || array[i + 1] !== " ") && letter != "\n" && letter != ""
  );
  return filteredArray;
}

nextBtn.addEventListener("click", (e) => {
  chatNumber += 1;
  type(chatNumber);
  if (prevBtn.hasAttribute("disabled")) {
    prevBtn.removeAttribute("disabled");
  }
  if (nextBtn.classList.contains("pulse")) {
    nextBtn.classList.remove("pulse");
  }
});

prevBtn.addEventListener("click", (e) => {
  chatNumber -= 1;
  type(chatNumber);
  if (nextBtn.hasAttribute("disabled")) {
    nextBtn.removeAttribute("disabled");
  }
  // disable or reable arrow button
});

setTimeout(() => {
  type(chatNumber);
}, 3000);

// Review caroussel

// vars
("use strict");
var testim = document.getElementById("testim"),
  testimDots = Array.prototype.slice.call(
    document.getElementById("testim-dots").children
  ),
  testimContent = Array.prototype.slice.call(
    document.getElementById("testim-content").children
  ),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 6000,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    if (document.activeElement != testim.querySelector(".wrap")) {
      testimTimer = setTimeout(function () {
        playSlide((currentSlide += 1));
      }, testimSpeed);
    } else {
      testimTimer = setTimeout(function () {
        playSlide((currentSlide += 1));
      }, testimSpeed * 6);
    }
  }
  // testimTimer = setInterval(() => {
  //   console.log(document.activeElement);
  //   if (document.activeElement != testim.querySelector(".wrap")) {
  //     playSlide((currentSlide += 1));
  //   }
  // }, testimSpeed);

  testimLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  testimRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide((currentSlide = testimDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key == "ArrowLeft") {
      testimLeftArrow.click();
    } else if (e.key == "ArrowRight") {
      testimRightArrow.click();
    }
  });

  // mobile version
  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }
  });
};

// Activate mobile menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-list");

const menuActivate = function () {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
};

hamburger.addEventListener("click", menuActivate);
menu.addEventListener("click", menuActivate);

// Auto highlight active section

// newSpan = document.createElement("span");
// newSpan.style.position = "fixed";
// newSpan.style.backgroundColor = "red";
// newSpan.style.height = "2px";
// newSpan.style.width = "100%";
// newSpan.style.top = "50%";
// newSpan.style.left = "0";
// document.querySelector("body").appendChild(newSpan);

const options = {
  // root: document.querySelector("#scrollArea"),
  rootMargin: "-50% 0px",
  // threshold: 1.0,
};

const observer = new IntersectionObserver((entries) => {
  const sectionList = [...sections];
  const linkList = [...document.querySelectorAll(".nav-link")];
  for (const entry of entries) {
    if (entry.isIntersecting) {
      linkList.forEach((link) => {
        link.classList.remove("active");
      });
      linkList[sectionList.indexOf(entry.target)].classList.add("active");
      //auto change url
      window.history.replaceState({}, null, linkList[sectionList.indexOf(entry.target)].getAttribute('href'));
    }
  }
  if (!document.querySelector(".nav-link").classList.contains("active")) {
    document.querySelector(".scroll-top").classList.add("visible");
  } else if (
    document.querySelector(".scroll-top").classList.contains("visible")
  ) {
    document.querySelector(".scroll-top").classList.remove("visible");
  }
}, options);

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.overflow = "hidden";
  setTimeout(() => {
    document.documentElement.style.overflow = "visible";

    document.querySelector(".loading-screen").classList.add("invisible");
    window.scrollTo(0, 0);
  }, 3000);
});

// typing animation
(function typingAnimation() {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  // const textArray = ["hard", "fun", "a journey", "LIFE"];
  const textArray = typedTextSpan.getAttribute("data-text").split("; ");
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
  });
})();
