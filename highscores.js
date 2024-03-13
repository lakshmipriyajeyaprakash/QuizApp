const highScoreLists = document.getElementById("highScoreList");
const highScoreList = JSON.parse(localStorage.getItem("getScores"));
console.log(highScoreList);
highScoreLists.innerHTML = highScoreList
  .map((highscore) => {
    return `<li class="high-score"><span>${highscore.user}</span> ${highscore.scoreValue}</li>`;
  })
  .join("");
