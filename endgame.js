const username = document.getElementById("username");
const savescore = document.getElementById("scoresavebtn");
const finalscore = document.getElementById("finalScore");
const recentHighScore = localStorage.getItem("MaxScore");
finalscore.innerText = recentHighScore;
const MAX_HIGHSCORES = 5;
//In LocalStorage data storage is in the form of Key and Value Pairs Value stored will be in String That's y
// for Storage means "setItem" will use Stringify and on "getItem" we are using parse for fetch data.
const getScores = JSON.parse(localStorage.getItem("getScores")) || [];
console.log(getScores);
username.addEventListener("keyup", () => {
  savescore.disabled = !username.value; //falsy check => it checks for null,undefined,emptyString
});
const saveHighestScore = (e) => {
  console.log(e.target);
  e.preventDefault();
  const score = {
    scoreValue: recentHighScore,
    user: username.value,
  };
  getScores.push(score);
  getScores.sort((a, b) => {
    return b.scoreValue - a.scoreValue;
  });
  getScores.splice(MAX_HIGHSCORES);
  console.log(getScores);
  localStorage.setItem("getScores", JSON.stringify(getScores));
};
