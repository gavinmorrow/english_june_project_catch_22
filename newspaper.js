import NonNull from "./NonNull.js";

/** @type {Map<string, boolean>} */
const playedAudio = new Map();
/**
 * @param {number} scrollPercent
 * @param {number} start
 * @param {number} end
 * @param {string} headline
 * @param {string?} audio */
const newspaper = (scrollPercent, start, end, headline, audio = null) => {
  const news = NonNull(document.getElementById("news"));

  const totalScroll = end - start;
  const scrollFromStart = scrollPercent - start;

  if (
    scrollFromStart < totalScroll * -0.1 ||
    scrollFromStart > totalScroll * 1.1
  ) {
    playedAudio.set(headline, false);
    return;
  }
  news.textContent = headline;

  let percentThrough = Math.max(
    0,
    Math.min(scrollFromStart / (totalScroll / 2), 2),
  );
  let bottom;
  if (percentThrough <= 1) bottom = 15 - Math.abs(percentThrough) * 15;
  else bottom = (percentThrough - 1) * 15;
  news.style.bottom = `${-bottom}vh`;

  if (percentThrough >= 1 && !playedAudio.get(headline) && audio !== null) {
    const a = new Audio(audio);
    a.play().catch((err) => {
      console.error(err);
      alert("yaaaaay");
      throw err;
    });
    playedAudio.set(headline, true);
  }
};

export default newspaper;
