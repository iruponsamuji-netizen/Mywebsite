document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.getElementById("stars") || document.body;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = (2 + Math.random() * 5) + "s";
    starsContainer.appendChild(star);
  }
});
