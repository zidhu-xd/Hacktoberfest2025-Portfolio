const board = document.getElementById("board");
              const cells = [];
              let currentPlayer = "";
              let playerSymbol = "X";
              let computerSymbol = "O";
              let gameActive = false;
              let playerName = ""; 

   
              
    function startGame() {
                gameActive = true;
          
                if (Math.random() < 0.5) {
                  currentPlayer = "Your";
                } else {
                  currentPlayer = "Raj's";
                  setTimeout(computerMove, 500);
                }
          
                document.getElementById("turn-info").textContent = `${currentPlayer} turn (you are "${playerSymbol}")`;
          
                cells.forEach((cell) => (cell.textContent = ""));
              }
          
              for (let i = 0; i < 9; i++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cells.push(cell);
                board.appendChild(cell);
          
                cell.addEventListener("click", () => {
                  if (cell.textContent === "" && currentPlayer === "Your" && gameActive) {
                    cell.textContent = playerSymbol;
                    if (checkWinner(playerSymbol)) {
                      alert("Your");
                      resetBoard();
                    } else if (cells.every((cell) => cell.textContent !== "")) {
                      alert("It's a draw!");
                      resetBoard();
                    } else {
                      currentPlayer = "Raj's";
                      document.getElementById("turn-info").textContent = `${currentPlayer} turn`;
                      setTimeout(computerMove, 500);
                    }
                  }
                });
              }
          
    function checkWinner(player) {
                const winningCombinations = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6],
                ];
          
                return winningCombinations.some((combination) =>
                  combination.every((index) => cells[index].textContent === player)
                );
              }
          
    function computerMove() {
                if (!gameActive) return;
          
                const emptyCells = cells.filter((cell) => cell.textContent === "");
                if (emptyCells.length > 0) {
                  const bestMove = findBestMove();
                  cells[bestMove].textContent = computerSymbol;
          
                  if (checkWinner(computerSymbol)) {
                    alert("Raj Won");
                    resetBoard();
                  } else if (cells.every((cell) => cell.textContent !== "")) {
                    alert("It's a draw!");
                    resetBoard();
                  }
                }
                currentPlayer = "Your";
                document.getElementById("turn-info").textContent = `${currentPlayer} turn (you are "${playerSymbol}")`;
              }
          
    function resetBoard() {
                gameActive = false;
                cells.forEach((cell) => (cell.textContent = ""));
                currentPlayer = "Your";
                document.getElementById("turn-info").textContent = `${currentPlayer} turn (you are "${playerSymbol}")`;
              }
          
    function minimax(board, depth, isMaximizing) {
                const scores = {
                  X: -1,
                  O: 1,
                  draw: 0,
                };
          
                const result = checkWin(board);
                if (result !== null) {
                  return scores[result];
                }
          
                if (isMaximizing) {
                  let bestScore = -Infinity;
                  for (let i = 0; i < 9; i++) {
                    if (board[i] === "") {
                      board[i] = computerSymbol;
                      const score = minimax(board, depth + 1, false);
                      board[i] = "";
                      bestScore = Math.max(score, bestScore);
                    }
                  }
                  return bestScore;
                } else {
                  let bestScore = Infinity;
                  for (let i = 0; i < 9; i++) {
                    if (board[i] === "") {
                      board[i] = playerSymbol;
                      const score = minimax(board, depth + 1, true);
                      board[i] = "";
                      bestScore = Math.min(score, bestScore);
                    }
                  }
                  return bestScore;
                }
              }
          
    function findBestMove() {
                let bestScore = -Infinity;
                let bestMove = -1;
          
                for (let i = 0; i < 9; i++) {
                  if (cells[i].textContent === "") {
                    cells[i].textContent = computerSymbol;
                    const score = minimax(cells.map((cell) => cell.textContent), 0, false);
                    cells[i].textContent = "";
                    if (score > bestScore) {
                      bestScore = score;
                      bestMove = i;
                    }
                  }
                }
          
                return bestMove;
              }
          
    function checkWin(board) {
                const winningCombinations = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6],
                ];
          
                for (const combination of winningCombinations) {
                  const [a, b, c] = combination;
                  if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                  }
                }
          
                if (board.every((cell) => cell !== "")) {
                  return "draw";
                }
          
                return null;
              }
    function slider(input) {
                        const item = document.querySelector(`#${input}`);
                        const slideArr = [...document.querySelector(".slides").children];
                        slideArr.forEach((element) => element.classList.remove("active"));
                        item.classList.add("active");
                      }

                      let slideIndex = 1;
                      setInterval(() => {
                        slideIndex++;
                        if (slideIndex === 7) 
                        slideIndex = 1;
                        slider(`slide${slideIndex}`);
                      }, 2000);
                      document.addEventListener("DOMContentLoaded", function () {
                            var container = document.querySelector(".container");
                            var scrollThreshold = container.offsetTop;

                            window.addEventListener("scroll", function () {
                              if (window.pageYOffset > scrollThreshold) {
                                container.classList.add("fixed");
                              } else {
                                container.classList.remove("fixed");
                              }
                            });
                          });
                          
                          
    document.addEventListener("DOMContentLoaded", function () {
                    const textElements = [
                    "Text for Slide 1",
                    "Text for Slide 2",
                    "Text for Slide 3",
                    "Text for Slide 4",
                    "Text for Slide 5",
                    "Text for Slide 6",
                    ];

                    let currentSlideIndex = 0;
                    const textContainer = document.getElementById("text-container");

                    function typeWriter() {
                    if (currentSlideIndex < textElements.length) {
                        const currentText = textElements[currentSlideIndex];
                        const currentSlide = document.getElementById(`slide${currentSlideIndex + 1}`);
                        const overlay = currentSlide.querySelector(".overlay div");

                        let charIndex = 0;
                        function type() {
                        if (charIndex < currentText.length) {
                            overlay.textContent += currentText.charAt(charIndex);
                            charIndex++;
                            setTimeout(type, 50); 
                        } else {
                            setTimeout(erase, 1000); 
                        }
                        }

                        function erase() {
                        if (charIndex > 0) {
                            overlay.textContent = currentText.substring(0, charIndex - 1);
                            charIndex--;
                            setTimeout(erase, 30); 
                        } else {
                            currentSlideIndex++;
                            setTimeout(typeWriter, 500); 
                        }
                        }

                        type();
                    }
                    }
                    typeWriter();
                });


                

   // Add this script to your existing JavaScript file or in a separate file

// document.addEventListener("DOMContentLoaded", function () {
//     var homeSection = document.getElementById("home");
//     var homeOffset = homeSection.offsetTop - window.innerHeight + 100;
  
//     function checkScroll() {
//       if (window.scrollY > homeOffset && !homeSection.classList.contains("active")) {
//         homeSection.classList.add("active");
//       }
//     }
  
//     // Check on page load
//     checkScroll();
  
//     // Check on scroll
//     window.addEventListener("scroll", checkScroll);
//   });
//   // Add this script to your existing JavaScript file or in a separate file

document.addEventListener("DOMContentLoaded", function () {
    var homeSection = document.getElementById("home");
  
    function checkScroll() {
      if (window.scrollY > homeSection.offsetTop - window.innerHeight + 100 && !homeSection.classList.contains("active")) {
        homeSection.classList.add("active");
      }
    }
  
    checkScroll();
  
    window.addEventListener("scroll", checkScroll);
  });
  