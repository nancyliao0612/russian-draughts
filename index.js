// develope the queue data structure using arrays
// give every piece on the check board a number, which comes from their ID
const checkBoard = [
  null,
  0,
  null,
  1,
  null,
  2,
  null,
  3,
  4,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  null,
  8,
  null,
  9,
  null,
  10,
  null,
  11,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  12,
  null,
  13,
  null,
  14,
  null,
  15,
  null,
  null,
  16,
  null,
  17,
  null,
  18,
  null,
  19,
  20,
  null,
  21,
  null,
  22,
  null,
  23,
  null,
];

/* ---- Select the Elements ---- */

// grad all cells/datas from the board 獲取所有的棋盤格
const datas = document.querySelectorAll("td");
// grad all black pieces 獲取黑色旗子
let blackPieces = document.querySelectorAll("p");
// grad all white pieces 獲取白色旗子
let whitePieces = document.querySelectorAll("span");
// black player's turn 輪到黑色玩家
const blackPlayer = document.querySelectorAll(".blackPlayer");
// white player's turn 輪到白色玩家
const whitePlayer = document.querySelectorAll(".whitePlayer");

/* ---- Player's Info 玩家資訊 ---- */
let playerTurn = true;
let blackScore = 12; // record the black player's score 紀錄黑棋玩家的分數，分數歸零時，對方獲勝，遊戲結束
let whiteScore = 12; // record the white player's score 紀錄白旗玩家的分數，分數歸零時，對方獲勝，遊戲結束
let playerPieces; // 讓玩家可以點擊其他旗子，隨意切換

/* ---- Pieces Info 旗子資訊 ---- */
// 當點擊旗子時，clickedPiece 物件內的屬性也會根據情況動態調整
let clickedPiece = {
  pieceID: 0,
  pieceIndexOnBoard: 0, // 該旗子在棋盤哪個位置
  becomeKing: false,
  // move one step 移動一步
  RightForward: false, // -7
  LeftForward: false, // -9
  LeftBackward: false, // +7
  RightBackward: false, // +9
  // jump and eat 跳吃！
  JumpRightForward: false, // -14
  JumpLeftForward: false, // -18
  JumpLeftBackward: false, // +14
  JumpRightBackward: false, // +18
};

// 點擊黑旗
// 點擊白旗
// 點擊棋盤格
// 黑棋走到最後一排，升級國王
// 白棋走到最後一排，升級國王

/* ---- addEventListner 點擊旗子 ---- */

function addEventListnerToPieces() {
  if (playerTurn) {
    // if it's whites turn
    for (let i = 0; i < whitePieces.length; i++) {
      // 前面選取了白旗，現在是添加監聽事件功能！也就是點擊白旗後，要執行甚麼動作？
      whitePieces[i].addEventListener("click", grabPieces);
    }
  } else {
    // if it's blacks turn
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].addEventListener("click", grabPieces);
    }
  }

  function grabPieces() {
    if (playerTurn) {
      playerPieces = whitePieces;
    } else {
      playerPieces = blackPieces;
    }
    removeClickedPiece();
    resetColor();
  }

  // removes the onclick attribute
  function removeClickedPiece() {
    for (let i = 0; i < datas.length; i++) {
      // loops through all the datas on the board
      datas[i].removeAttribute("onclick");
    }
  }

  // 重新設定點擊旗子後的顏色
  function resetColor() {
    for (let i = 0; i < playerPieces.length; i++) {
      playerPieces[i].style.border = "1px solid white";
    }
    resetClickedPieceProperties();
    grabClickedPiece();
  }

  // 重新設定旗子的屬性
  function resetClickedPieceProperties() {
    // object.property
    clickedPiece.pieceID = 0;
    clickedPiece.pieceIndexOnBoard = 0;
    clickedPiece.becomeKing = false;
    // 移動一步
    clickedPiece.RightForward = false; // -7
    clickedPiece.LeftForward = false; // -9
    clickedPiece.LeftBackward = false; // +7
    clickedPiece.RightBackward = false; // +9
    // 跳吃！
    clickedPiece.JumpRightForward = false; // -14
    clickedPiece.JumpLeftForward = false; // -18
    clickedPiece.JumpLeftBackward = false; // +14
    clickedPiece.JumpRightBackward = false; // +18
  }

  // returns the index of that piece's place on the board
  let locatePiece = function (pieceID) {
    let parsed = parseInt(pieceID);
    return checkBoard.indexOf(parsed);
  };

  // find where the piece is located with its ID and index on the board
  function grabClickedPiece() {
    clickedPiece.pieceID = parseInt(event.target.id); //turn the string into a number
    clickedPiece.pieceIndexOnBoard = locatePiece(clickedPiece.pieceID);
    KingOrNot();
    console.log(clickedPiece);
  }

  // 檢查選擇的旗子是不是國王
  function KingOrNot() {
    if (
      document.getElementById(clickedPiece.pieceID).classList.contains("king")
    ) {
      clickedPiece.becomeKing = true;
    } else {
      clickedPiece.becomeKing = false;
    }
    checkAvailableSpaces();
  }

  // gets the moves that the selected piece can make
  function checkAvailableSpaces() {
    if (
      // 要有空位，再加上那一格不是淺咖啡色，才可以移動該旗子
      checkBoard[clickedPiece.pieceIndexOnBoard - 7] === null &&
      datas[clickedPiece.pieceIndexOnBoard - 7].classList.contains("empty") !==
        true
    ) {
      clickedPiece.RightForward = true;
    }
    if (
      checkBoard[clickedPiece.pieceIndexOnBoard - 9] === null &&
      datas[clickedPiece.pieceIndexOnBoard - 9].classList.contains("empty") !==
        true
    ) {
      clickedPiece.LeftForward = true;
    }
    if (
      checkBoard[clickedPiece.pieceIndexOnBoard + 7] === null &&
      datas[clickedPiece.pieceIndexOnBoard + 7].classList.contains("empty") !==
        true
    ) {
      clickedPiece.LeftBackward = true;
    }
    if (
      checkBoard[clickedPiece.pieceIndexOnBoard + 9] === null &&
      datas[clickedPiece.pieceIndexOnBoard + 9].classList.contains("empty") !==
        true
    ) {
      clickedPiece.RightBackward = true;
    }
    checkAvailableJumpSpaces();
  }

  // 吃掉旗子！！
  function checkAvailableJumpSpaces() {
    // 確保跳過去的那格（+14）要是空的
    // >=12 要確保被跳的旗子是黑色
    if (playerTurn) {
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard + 14] === null &&
        datas[clickedPiece.pieceIndexOnBoard + 14].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 7] < 12 &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 7] !== null
      ) {
        clickedPiece.JumpLeftBackward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard + 18] === null &&
        datas[clickedPiece.pieceIndexOnBoard + 18].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 9] < 12 &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 9] !== null
      ) {
        clickedPiece.JumpRightBackward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard - 14] === null &&
        datas[clickedPiece.pieceIndexOnBoard - 14].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 7] < 12 &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 7] !== null
      ) {
        clickedPiece.JumpRightForward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard - 18] === null &&
        datas[clickedPiece.pieceIndexOnBoard - 18].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 9] < 12 &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 9] !== null
      ) {
        clickedPiece.JumpLeftForward = true;
      }
    } else {
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard + 14] === null &&
        datas[clickedPiece.pieceIndexOnBoard + 14].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 7] >= 12
      ) {
        clickedPiece.JumpLeftBackward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard + 18] === null &&
        datas[clickedPiece.pieceIndexOnBoard + 18].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard + 9] >= 12
      ) {
        clickedPiece.JumpRightBackward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard - 14] === null &&
        datas[clickedPiece.pieceIndexOnBoard - 14].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 7] >= 12
      ) {
        clickedPiece.JumpRightForward = true;
      }
      if (
        checkBoard[clickedPiece.pieceIndexOnBoard - 18] === null &&
        datas[clickedPiece.pieceIndexOnBoard - 18].classList.contains(
          "empty"
        ) !== true &&
        checkBoard[clickedPiece.pieceIndexOnBoard - 9] >= 12
      ) {
        clickedPiece.JumpLeftForward = true;
      }
    }
    checkPieceProperties();
  }

  function checkPieceProperties() {
    if (clickedPiece.becomeKing) {
      givePieceColor(); //給被點擊的旗子「顏色」
    } else {
      givePieceColor(); //給被點擊的旗子「顏色」
    }
  }

  // 如果旗子是可以走的話，點擊下去要給予顏色
  // gives the piece a brown highlight for the user to show its movable
  function givePieceColor() {
    if (
      clickedPiece.JumpRightForward ||
      clickedPiece.JumpLeftForward ||
      clickedPiece.JumpLeftBackward ||
      clickedPiece.JumpRightBackward ||
      clickedPiece.RightForward ||
      clickedPiece.LeftForward ||
      clickedPiece.LeftBackward ||
      clickedPiece.RightBackward
    ) {
      document.getElementById(clickedPiece.pieceID).style.border =
        "3px solid darkgoldenrod";
      movePieces();
    } else {
      // 如果上述情況不成立，代表無法移動該旗子，nothing can do!
      return;
    }
  }

  function movePieces() {
    if (clickedPiece.RightForward) {
      datas[clickedPiece.pieceIndexOnBoard - 7].setAttribute(
        "onclick",
        "move(-7)"
      );
    }
    if (clickedPiece.LeftForward) {
      datas[clickedPiece.pieceIndexOnBoard - 9].setAttribute(
        "onclick",
        "move(-9)"
      );
    }
    if (clickedPiece.RightBackward) {
      datas[clickedPiece.pieceIndexOnBoard + 9].setAttribute(
        "onclick",
        "move(9)"
      );
    }
    if (clickedPiece.LeftBackward) {
      datas[clickedPiece.pieceIndexOnBoard + 7].setAttribute(
        "onclick",
        "move(7)"
      );
    }
    if (clickedPiece.JumpRightForward) {
      datas[clickedPiece.pieceIndexOnBoard - 14].setAttribute(
        "onclick",
        "move(-14)"
      );
    }
    if (clickedPiece.JumpLeftForward) {
      datas[clickedPiece.pieceIndexOnBoard - 18].setAttribute(
        "onclick",
        "move(-18)"
      );
    }
    if (clickedPiece.JumpRightBackward) {
      datas[clickedPiece.pieceIndexOnBoard + 18].setAttribute(
        "onclick",
        "move(18)"
      );
    }
    if (clickedPiece.JumpLeftBackward) {
      datas[clickedPiece.pieceIndexOnBoard + 14].setAttribute(
        "onclick",
        "move(14)"
      );
    }
  }
}

// 當點擊旗子時
function move(num) {
  //移動旗子，所以要讓原本點擊的旗子消失
  document.getElementById(clickedPiece.pieceID).remove();
  datas[clickedPiece.pieceIndexOnBoard].innerHTML = ""; //empty string
  if (playerTurn) {
    if (clickedPiece.becomeKing) {
      // 當白旗變成國王時，改變其顏色
      datas[
        clickedPiece.pieceIndexOnBoard + num
      ].innerHTML = `<span class="lightPiece king" id="${clickedPiece.pieceID}"></span>`;
      whitePieces = document.querySelectorAll("span");
    } else {
      datas[
        clickedPiece.pieceIndexOnBoard + num
      ].innerHTML = `<span class="lightPiece" id="${clickedPiece.pieceID}"></span>`;
      whitePieces = document.querySelectorAll("span");
    }
  } else {
    if (clickedPiece.becomeKing) {
      // 當黑旗變成國王時，改變其顏色
      datas[
        clickedPiece.pieceIndexOnBoard + num
      ].innerHTML = `<p class="darkPiece king" id="${clickedPiece.pieceID}"></p>`;
      blackPieces = document.querySelectorAll("p");
    } else {
      datas[
        clickedPiece.pieceIndexOnBoard + num
      ].innerHTML = `<p class="darkPiece" id="${clickedPiece.pieceID}"></p>`;
      blackPieces = document.querySelectorAll("p");
    }
  }
  // 不能直接傳入物件，而是要先存在一個 variable
  let indexOfPiece = clickedPiece.pieceIndexOnBoard;
  // 如果是跳吃的情況，總共會有三個參數：原始位置、被吃掉旗子的位置、跳過去的位置
  if (num === 14 || num === -14 || num === 18 || num === -18) {
    updateData(indexOfPiece, indexOfPiece + num, indexOfPiece + num / 2);
  } else {
    // 如果只是一般的移動，就只有兩個參數：原始位置＆新的位置
    updateData(indexOfPiece, indexOfPiece + num);
  }
}

// Changes the board states data on the back end
function updateData(pieceIndexOnBoard, modifiedIndex, removePiece) {
  checkBoard[pieceIndexOnBoard] = null; // 原始位置的旗子不復存在
  // 更換該旗子在棋盤上的位置
  checkBoard[modifiedIndex] = parseInt(clickedPiece.pieceID);
  // 輪到黑旗；旗子的 index<12 代表這是黑旗；>=57 代表到最後一排 => 給該旗子國王的 class
  if (playerTurn && clickedPiece.pieceID >= 12 && modifiedIndex <= 7) {
    document.getElementById(clickedPiece.pieceID).classList.add("king");
  }
  if (
    playerTurn === false &&
    clickedPiece.pieceID < 12 &&
    modifiedIndex >= 57
  ) {
    document.getElementById(clickedPiece.pieceID).classList.add("king");
  }
  if (removePiece) {
    checkBoard[removePiece] = null; // 被跳吃的旗子不復存在
    if (playerTurn && clickedPiece.pieceID >= 12) {
      datas[removePiece].innerHTML = "";
      blackScore--;
    }
    if (playerTurn === false && clickedPiece.pieceID < 12) {
      datas[removePiece].innerHTML = "";
      whiteScore--;
    }
  }
  // reset pieces' properties 重新設定旗子的屬性
  clickedPiece.pieceID = -1;
  clickedPiece.pieceIndexOnBoard = -1;
  clickedPiece.becomeKing = false;
  clickedPiece.RightForward = false; // -7
  clickedPiece.LeftForward = false; // -9
  clickedPiece.LeftBackward = false; // +7
  clickedPiece.RightBackward = false; // +9
  clickedPiece.JumpRightForward = false; // -14
  clickedPiece.JumpLeftForward = false; // -18
  clickedPiece.JumpLeftBackward = false; // +14
  clickedPiece.JumpRightBackward = false; // +18
  for (let i = 0; i < datas.length; i++) {
    // loops through all the datas on the board
    datas[i].removeAttribute("onclick");
  }
  removeEventListeners();
}

function removeEventListeners() {
  if (playerTurn) {
    for (let i = 0; i < whitePieces.length; i++) {
      whitePieces[i].removeEventListener("click", function grabPieces() {
        if (playerTurn) {
          playerPieces = whitePieces;
        } else {
          playerPieces = blackPieces;
        }
        removeClickedPiece();
        resetColor();
      });
    }
  } else {
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].removeEventListener("click", function grabPieces() {
        if (playerTurn) {
          playerPieces = whitePieces;
        } else {
          playerPieces = blackPieces;
        }
        removeClickedPiece();
        resetColor();
      });
    }
  }
  checkWhoWin();
}

// Check who wins the game
function checkWhoWin() {
  // if white player runs out of pieces
  if (whiteScore === 0) {
    for (let i = 0; i < blackPlayer.length; i++) {
      whitePlayer[i].style.display = "none";
      blackPlayer[i].style.color = "#5c3d2e";
      blackPlayer[i].textContent = "Congratulation! Black player wins!";
    }
  } else if (blackScore === 0) {
    for (let i = 0; i < whitePlayer.length; i++) {
      blackPlayer[i].style.display = "none";
      whitePlayer[i].style.color = "#5c3d2e";
      whitePlayer[i].textContent = "Congratulation! white player wins!";
    }
  }
  switchPlayer();
}

console.log(whitePieces.length);
console.log(blackPieces.length);

// Switches players turn 改變字的顏色
function switchPlayer() {
  if (playerTurn) {
    playerTurn = false;
    for (let i = 0; i < whitePlayer.length; i++) {
      blackPlayer[i].style.color = "#5c3d2e";
      whitePlayer[i].style.color = "#5c3d2e4f"; // light brown
    }
  } else {
    playerTurn = true;
    for (let i = 0; i < blackPlayer.length; i++) {
      blackPlayer[i].style.color = "#5c3d2e4f";
      whitePlayer[i].style.color = "#5c3d2e";
    }
  }
  addEventListnerToPieces();
}

addEventListnerToPieces();
