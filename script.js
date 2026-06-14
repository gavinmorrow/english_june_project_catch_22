import { assertIsClass } from "./assertIsClass.js";
import { assertHTMLElem, assertHTMLElems } from "./assertHtmlElem.js";
import NonNull from "./NonNull.js";

const map = {
  elem: NonNull(document.getElementById("map-img")),
  isVisible: false,
  handle() {
    const wrapper = NonNull(document.getElementById("map"));

    const offsetFromTopOfMap = scrollY - wrapper.offsetTop;
    const scrollPercent = offsetFromTopOfMap / this.elem.clientHeight;

    if (scrollPercent >= 0 && scrollPercent <= 1) {
      const ribbon = NonNull(document.getElementById("ribbon"));
      ribbon.style.opacity = `${scrollPercent}`;
      // Math.max is for overscroll, where the value becomes negative
      ribbon.style.marginTop = `${(Math.random() * 1 - 0.5) * (Math.max(0, this.elem.clientHeight - offsetFromTopOfMap) / (innerHeight / 5)) ** 4}px`;
    }
    if (scrollPercent >= 1 && scrollPercent <= 2) {
      const bologna = NonNull(document.getElementById("bologna"));
      bologna.style.setProperty(
        "--overlay-opacity",
        `${(scrollPercent / 2 + 0.5 - 1) ** 2}`,
      );
    }
  },
};

const pages = [map];

const intersectionObserver = new IntersectionObserver(
  (entries, _observer) => {
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
  },
  { threshold: [1] },
);
for (const page of pages) {
  intersectionObserver.observe(page.elem);
}

document.addEventListener("scroll", (event) => {
  for (const page of pages) {
    if (page.isVisible) page.handle();
  }
});
