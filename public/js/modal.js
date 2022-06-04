const btn = document.querySelector("#delete");
const closeModal = document.querySelector("#no");
const h3 = document.querySelector("#msgText");
const modal = document.querySelector(".modal-container");
const modalClose = document.querySelector(".close")

btn.addEventListener("click", () => {
  modal.style.display = "flex";
})

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});