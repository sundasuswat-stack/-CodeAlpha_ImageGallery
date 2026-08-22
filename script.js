// ---------- Elements ----------
const galleryImages = document.querySelectorAll(".gallery img");
const filterBtns     = document.querySelectorAll(".filter-btn");

const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn     = document.getElementById("closeBtn");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");

let currentIndex = 0;
let visibleImages = Array.from(galleryImages); // images currently shown (based on filter)

// ---------- Filtering ----------
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // active button style
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    galleryImages.forEach(img => {
      if (filter === "all" || img.classList.contains(filter)) {
        img.classList.remove("hide");
      } else {
        img.classList.add("hide");
      }
    });

    // update the list used by the lightbox to only the visible ones
    visibleImages = Array.from(galleryImages).filter(img => !img.classList.contains("hide"));
  });
});

// ---------- Open lightbox ----------
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    currentIndex = visibleImages.indexOf(img);
    showImage(currentIndex);
    lightbox.classList.add("active");
  });
});

function showImage(index) {
  lightboxImg.src = visibleImages[index].src;
  lightboxImg.alt = visibleImages[index].alt;
}

// ---------- Close lightbox ----------
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// ---------- Next / Prev ----------
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage(currentIndex);
});

// ---------- Keyboard support (bonus) ----------
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});