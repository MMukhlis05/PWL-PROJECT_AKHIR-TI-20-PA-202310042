//map.length = 15 (coll); 
const illuminateMaze = document.getElementsByClassName("illuminate-maze");
for (var i = 0; i < map.length; i++) {
  const myBlock = document.createElement("div");
  myBlock.classList.add("illuminate-line");
  myBlock.setAttribute("id", i);
  illuminateMaze[0].appendChild(myBlock);

  for (var j = 0; j < map[i].length; j++) {
    const block = document.createElement("div");
    block.classList.add("illuminate-block", "illuminate-block" + j);
    block.setAttribute("illuminate-line", i);
    block.setAttribute("illuminate-block", j);
    
    if (map[i][j] === "W") {
        block.classList.add("w");
    } else if (map[i][j] === "S") {
      block.classList.add("start");
        const player = document.createElement("div");
        player.classList.add("illuminate-block","s");
        block.appendChild(player);
    } else if (map[i][j] === "F") {
        block.classList.add("f");
    } else {
        block.classList.add("illuminate-space");
    }
    myBlock.appendChild(block);
  }
}

//controles
const body = document.querySelector("body");
body.addEventListener("keydown", movimentacao);

function movimentacao(evt){
    const keyName = evt.key;
    
    let player = document.querySelector(".s");
    let playerLine = player.parentElement.getAttribute("illuminate-line");
    let playerblock = player.parentElement.getAttribute("illuminate-block");
    
    if (keyName === "ArrowUp" || keyName === "w") {

      let lineTarget = Number(playerLine) - 1;

      let alvo = document.getElementById(lineTarget);
      alvo = alvo.children[playerblock];

      if (map[lineTarget][playerblock] === " ") {
        alvo.appendChild(player);

      } else if (map[lineTarget][playerblock] === "F"){
        alvo.appendChild(player);
        stopGame();

      } else {
        console.log("Jalan buntu woi");
      }

    } else if (keyName === "ArrowRight" || keyName === "d") {

      let blockAlvo = Number(playerblock) + 1;
      let alvo = document.getElementById(playerLine);
      alvo = alvo.children[blockAlvo];
      if (map[playerLine][blockAlvo] === " ") {
        alvo.appendChild(player);

      } else if (map[playerLine][blockAlvo] === "F"){
        alvo.appendChild(player);
        stopGame();

      } else {
        console.log("Jalan buntu woi");
      }
    
    } else if (keyName === "ArrowDown" || keyName === "s") {

      let lineTarget = Number(playerLine) + 1;

      let alvo = document.getElementById(lineTarget);
      alvo = alvo.children[playerblock];

      if (map[lineTarget][playerblock] === " ") {
        alvo.appendChild(player);

      } else if (map[lineTarget][playerblock] === "F"){
        alvo.appendChild(player);
        stopGame();
        
      } else {
        console.log("Jalan buntu woi");
      }
    } else if (keyName === "ArrowLeft" || keyName === "a") {
      let blockAlvo = Number(playerblock) - 1;
      let alvo = document.getElementById(playerLine);
      alvo = alvo.children[blockAlvo];
      if (map[playerLine][blockAlvo] === " ") {
        alvo.appendChild(player);
        
      } else if (map[playerLine][blockAlvo] === "F"){
        alvo.appendChild(player);
        stopGame();

      } else {
        console.log("Jalan buntu woi ak");
      }

    }
}

//message below maze
function messageIlluminate() {

  const a = document.getElementsByClassName("illuminate-maze");
  const b = document.createElement("div");
  
  body.removeEventListener("keydown", movimentacao);
  b.setAttribute("id", "msgIlluminate");
  a[0].appendChild(b);
}
