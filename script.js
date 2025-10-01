const button = document.getElementById("revealButton");
const message = document.getElementById("message");
const music = document.getElementById("bgMusic");
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseContent = document.getElementById("surpriseContent");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let showHearts = true;
let animationFrame;

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showHearts) {
    hearts.forEach((heart, index) => {
      ctx.font = `${heart.size}px Arial`;
      ctx.fillStyle = "rgba(255,100,150,0.8)";
      ctx.fillText("❤", heart.x, heart.y);
      heart.y -= heart.speed;
      if (heart.y < -20) {
        hearts[index] = {
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          size: 15 + Math.random() * 20,
          speed: 1 + Math.random() * 2
        };
      }
    });
    animationFrame = requestAnimationFrame(drawHearts);
  }
}

function initHearts() {
  for (let i = 0; i < 30; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 15 + Math.random() * 20,
      speed: 1 + Math.random() * 2
    });
  }
  drawHearts();
}

initHearts();

function typeWriter(text, i = 0, callback) {
  if (i < text.length) {
    message.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 60);
  } else if (callback) {
    callback();
  }
}

button.addEventListener("click", () => {
  button.style.display = "none";
  music.play();

  // Confetti burst 🎉
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });

  // Stop hearts → switch to fireworks/confetti
  showHearts = false;
  cancelAnimationFrame(animationFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Continuous fireworks
  setInterval(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 1000);

  // Show love message with callback
  const loveMessage = "Happy Birthday Dummy G \n My Ayesha has turned 18 yayyy!!. 💖";
  message.style.opacity = 1;
  typeWriter(loveMessage, 0, () => {
    // After typing finishes → show 2nd button
    surpriseButton.style.display = "inline-block";
  });
});

surpriseButton.addEventListener("click", () => {
  surpriseButton.style.display = "none";
  surpriseContent.style.display = "block";
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
