document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("login");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameHistoryList = document.getElementById("username-history");
  if (!button) return;

  const HISTORY_KEY = "loginHistory";
  const MAX_HISTORY = 5;

  const clickSound = new Audio("sound/click.mp3");
  clickSound.preload = "auto";
  clickSound.volume = 1;
  clickSound.addEventListener("error", () => {
    console.warn("sound/click.mp3 の読み込みに失敗しました。sound/success.mp3 を試します。");
    clickSound.src = "sound/success.mp3";
    clickSound.load();
  });
  clickSound.load();

  function getSavedUsernames() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn("履歴の読み込みに失敗しました:", error);
      return [];
    }
  }

  function updateUsernameDatalist(history) {
    if (!usernameHistoryList) return;
    usernameHistoryList.innerHTML = "";
    history.forEach((username) => {
      const option = document.createElement("option");
      option.value = username;
      usernameHistoryList.appendChild(option);
    });
  }

  function saveUsernameHistory(username) {
    if (!username) return;
    const normalized = username.trim();
    if (!normalized) return;

    const history = getSavedUsernames();
    const existingIndex = history.findIndex((item) => item === normalized);
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    history.unshift(normalized);
    history.splice(MAX_HISTORY);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    updateUsernameDatalist(history);
  }

  const savedUsernames = getSavedUsernames();
  if (savedUsernames.length > 0) {
    updateUsernameDatalist(savedUsernames);
    if (usernameInput && !usernameInput.value) {
      usernameInput.value = savedUsernames[0];
    }
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (usernameInput) {
      saveUsernameHistory(usernameInput.value);
    }
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