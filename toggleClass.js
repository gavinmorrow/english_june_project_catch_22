/** @param {HTMLElement} elem @param {string} className */
const toggleClass = (elem, className) => {
  if (elem.classList.contains(className)) elem.classList.remove(className);
  else elem.classList.add(className);
};

export default toggleClass;
