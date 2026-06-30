document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("login");
  if (!button) return;

  const clickSound = new Audio("sound/click.mp3");
  clickSound.preload = "auto";
  clickSound.volume = 1;
  clickSound.addEventListener("error", () => {
    console.warn("sound/click.mp3 の読み込みに失敗しました。sound/success.mp3 を試します。");
    clickSound.src = "sound/success.mp3";
    clickSound.load();
  });
  clickSound.load();

  button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("LOGIN clicked, playing sound...");
    const circle = document.createElement("span");
    circle.className = "ripple";

    const rect = button.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left + "px";
    circle.style.top = e.clientY - rect.top + "px";

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);

    clickSound.currentTime = 0;
    clickSound.play().catch((error) => {
      console.warn("クリック音の再生に失敗しました:", error);
    });
  });

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
  });
});