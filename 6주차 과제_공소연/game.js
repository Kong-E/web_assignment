// 5초안에 누르면 실패, 5초 기다리면 성공

let gameStarted = false;
const myButton = document.getElementById("myButton");

myButton.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (gameStarted) {
          gameStarted = false;
          resolve("성공");
        }
      }, 5000);

      myButton.addEventListener(
        "click",
        () => {
          if (gameStarted) {
            gameStarted = false;
            reject("실패");
          }
        },
        { once: true }
      );
    });

    promise
      .then((result) => {
        alert(result);
      })
      .catch((error) => {
        alert(error);
      });
  }
});
