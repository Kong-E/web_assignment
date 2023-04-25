let gameStarted = false;
const myButton = document.getElementById("myButton");

myButton.addEventListener("click", startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;

    let rejectFun = () => {};

    const clickPromise = new Promise((resolve, reject) => {
      rejectFun = () => {
        gameStarted = false;
        reject("실패");
      };

      setTimeout(() => {
        gameStarted = false;
        resolve("성공");
      }, 3000);
      myButton.addEventListener("click", rejectFun);
    });

    clickPromise
      .then((message) => {
        alert(message);
        myButton.removeEventListener("click", rejectFun);
      })
      .catch((error) => {
        alert(error);
        myButton.removeEventListener("click", rejectFun);
      });
  }
}
