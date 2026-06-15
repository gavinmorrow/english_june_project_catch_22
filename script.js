import { assertIsClass } from "./assertIsClass.js";
import { assertHTMLElem, assertHTMLElems } from "./assertHtmlElem.js";
import NonNull from "./NonNull.js";
import toggleClass from "./toggleClass.js";
import newspaper from "./newspaper.js";

const map = {
  elem: NonNull(document.getElementById("map-img")),
  isVisible: false,
  bo: false,
  wasMoved: false,
  /** @type {number|NodeJS.Timeout|null} */
  timeout1: null,
  /** @type {number|NodeJS.Timeout|null} */
  timeout2: null,
  handle() {
    const wrapper = NonNull(document.getElementById("map"));

    const offsetFromTopOfMap = scrollY - wrapper.offsetTop;
    const scrollPercent = offsetFromTopOfMap / this.elem.clientHeight;

    const ribbon = NonNull(document.getElementById("ribbon"));
    ribbon.style.opacity = `${Math.max(0, Math.min(scrollPercent, 1))}`;
    if (0 <= scrollPercent && scrollPercent <= 1) {
      // Math.max is for overscroll, where the value becomes negative
      ribbon.style.marginTop = `${(Math.random() * 1 - 0.5) * (Math.max(0, this.elem.clientHeight - offsetFromTopOfMap) / (innerHeight / 5)) ** 4}px`;
    }
    if (1 <= scrollPercent && scrollPercent <= 5) {
      const bologna = NonNull(document.getElementById("bologna"));
      let x = scrollPercent;
      if (2 < scrollPercent && scrollPercent < 4) x = 2;
      else if (scrollPercent >= 4) x = scrollPercent - 2;
      const opacity = ((-((x - 2) ** 2) + 1) * 7) / 8;
      bologna.style.setProperty("--overlay-opacity", `${opacity}`);
      const bolognaPin = NonNull(document.getElementById("bologna-pin"));
      const pianosaPin = NonNull(document.getElementById("pianosa-pin"));
      if (1.5 <= scrollPercent && scrollPercent <= 4.5) {
        bolognaPin.classList.add("big");
        pianosaPin.classList.add("big");
      } else {
        bolognaPin.classList.remove("big");
        pianosaPin.classList.remove("big");
      }
      const arrow = NonNull(document.getElementById("arrow"));
      if (scrollPercent < 1.9) {
        this.bo = false;
        if (this.wasMoved) {
          if (this.timeout1 !== null) clearTimeout(this.timeout1);
          if (this.timeout2 !== null) clearTimeout(this.timeout2);
          this.wasMoved = false;
          bo();
          bo();
        }
      } else if (4.5 < scrollPercent) {
        this.bo = false;
        if (!this.wasMoved) {
          if (this.timeout1 !== null) clearTimeout(this.timeout1);
          if (this.timeout2 !== null) clearTimeout(this.timeout2);
          this.wasMoved = true;
          bo();
          bo();
        }
      }
      if (1.9 <= scrollPercent && scrollPercent <= 2.5) {
        if (!this.bo) {
          if (!this.wasMoved) {
            this.timeout1 = setTimeout(bo, 3000);
            this.timeout2 = setTimeout(bo, 7000);
          } else {
            bo();
            bo();
          }
          this.wasMoved = !this.wasMoved;
          this.bo = true;
        }
      }
      if (1.9 <= scrollPercent && scrollPercent <= 4.5)
        arrow.classList.add("show");
      else arrow.classList.remove("show");
    }

    newspaper(scrollPercent, 2, 2.9, "Bologna Captured", "yay.m4a");
    newspaper(scrollPercent, 3.1, 4, "Major — de Coverley missing");
  },
};

const pages = [map];

const intersectionObserver = new IntersectionObserver((entries, _observer) => {
  for (const entry of entries) {
    let atLeastOnePage = false;
    for (const page of pages) {
      if (entry.target == page.elem) {
        page.isVisible = entry.isIntersecting;
        atLeastOnePage = true;
      }
    }
    if (!atLeastOnePage) {
      console.error("Unknown target", { target: entry.target });
      throw new Error("Unknown target");
    }
  }
});
for (const page of pages) {
  intersectionObserver.observe(page.elem);
}

document.addEventListener("scroll", (event) => {
  for (const page of pages) {
    if (page.isVisible) page.handle();
  }
});
// Reset to last scroll position
setTimeout(() => {
  const top = scrollY;
  window.scroll({ top: 0 });
  window.scroll({ top });
}, 20);

const bo = () => {
  const bolognaPin = NonNull(document.getElementById("bologna-pin"));
  const arrow = NonNull(document.getElementById("arrow"));
  const bo = NonNull(document.getElementById("bo"));
  const ribbon = NonNull(document.getElementById("ribbon"));
  if (bo.style.display == "block") {
    bo.style.display = "";
    toggleClass(ribbon, "moved");
    toggleClass(bolognaPin, "moved");
    toggleClass(arrow, "moved");
  } else bo.style.display = "block";
};
