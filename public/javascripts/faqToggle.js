/*
 * Toggle Nav Hamburger
 */
/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
  const $questions = document.querySelectorAll(".question");

  $questions.forEach((el) => {
    el.addEventListener("click", () => {
      const $target = el.nextElementSibling;
      $target.classList.toggle("open");
    });
  });
});
