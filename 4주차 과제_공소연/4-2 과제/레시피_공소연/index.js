const body = document.querySelector("body");
const header = document.querySelector("header");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const heartContainer = document.querySelector(".heart-container");

function showHeart() {
  // 그냥 해봄
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💗";
  heart.style.right = Math.random() * 100 + "%"; // Set a random horizontal position for the heart
  heartContainer.appendChild(heart);

  setTimeout(function () {
    heart.style.animation = "move-heart 1s ease-in-out forwards"; // Add an animation effect to move the heart upwards and fade out
  }, 10); // Wait for 10ms before starting the animation to make sure it gets applied properly
}

button1.addEventListener("click", function () {
  // 클릭할 때마다 문서의 너비가 50px 씩 늘어나는 버튼
  const currentDocumentWidth = document.documentElement.clientWidth;
  const newWidth = currentDocumentWidth + 50;
  document.documentElement.style.width = `${newWidth}px`;

  showHeart();
});

button2.addEventListener("click", function () {
  // 클릭할 때마다 검은색, 흰색, 검은색, 흰색...
  body.classList.toggle("black");

  showHeart();
});

button3.addEventListener("click", function () {
  // 클릭할 때마다 헤더 키우기
  const currentHeaderHeight = header.clientHeight;
  const headerSizeUp = confirm("헤더를 키우시겠습니까?");
  if (headerSizeUp) {
    const newHeight = currentHeaderHeight + 10;
    header.style.height = `${newHeight}px`;
  }

  showHeart();
});
