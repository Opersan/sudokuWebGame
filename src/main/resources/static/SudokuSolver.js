var table;

var gameId = 0;

var puzzle = [];
var gridSize = 9;
var blockSize = 3;
var bitSize = 511;

var solution = [];

var isSolved = false;
var canSolved = true;

var timer = 0;
var pauseTimer = false;
var intervalId;
var gameOn = false;

var sudokuSolver =
    [7, 14, 8, 12, 9, 0, 0, 0, 10, 0, 4, 3, 1, 0, 0, 0,
    9, 15, 0, 13, 7, 0, 6, 12, 0, 0, 11, 14, 3, 4, 16, 0,
    0, 0, 0, 0, 10, 0, 0, 2, 7, 6, 0, 13, 0, 0, 0, 0,
    3, 11, 2, 0, 13, 0, 0, 0, 0, 0, 5, 16, 0, 8, 0, 9,
    0, 9, 0, 8, 0, 2, 0, 0, 16, 1, 6, 0, 0, 15, 0, 0,
    5, 13, 14, 15, 0, 0, 0, 16, 0, 0, 0, 2, 0, 0, 6, 0,
    16, 0, 1, 10, 6, 0, 7, 3, 0, 0, 13, 0, 14, 0,  0,  0,
    0, 0, 0, 2, 0, 13, 0, 0, 0, 0, 0, 4, 0, 16, 0, 0,
    0, 10, 4, 0, 0, 6, 5, 0, 0, 11, 2, 1, 0, 13, 0, 3,
    0, 6, 12, 5, 0, 16, 0, 0, 0, 0, 8, 0, 0, 0, 9, 10,
    8, 7, 9, 0, 1, 14, 11, 10, 0, 0, 16, 0, 0, 0, 4, 2,
    14, 0, 0, 11, 2, 0, 15, 9, 0, 0, 12, 10, 5, 0, 0, 0,
    4, 2, 16, 14, 0, 3, 13, 7, 0, 10, 1, 0, 8, 11, 0, 15,
    6, 12, 11, 7, 4, 9, 0, 1, 5, 13, 15, 8, 0, 0, 10, 0,
    13, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 2, 0, 0, 0,
    0, 0, 15, 0, 16, 11, 12, 14, 0, 2, 3, 0, 6, 9, 0, 13]

var b =
    [
        0, 0, 0, 0, 0, 0, 0, 0, 6,
        0, 3, 0, 0, 7, 1, 0, 4, 0,
        0, 0, 0, 0, 0, 0, 8, 0, 0,
        0, 0, 0, 9, 0, 8, 0, 7, 1,
        1, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 0, 3, 0, 9, 0, 0,
        5, 0, 7, 0, 0, 6, 0, 0, 0,
        2, 0, 0, 0, 0, 0, 7, 0, 0,
        0, 0, 1, 8, 0, 0, 0, 0, 2
    ]


const songs= [
    {
        id: '1',
        songName: `Enter One  <br> 
        <div class="subtitle">Sol Seppy</div>`,
        poster:"img/1.png"
    },
    {
        id: "2",
        songName: `Girls Just Want To Have Fun <br> 
        <div class="subtitle">Cyndi Lauper</div>`,
        poster:"img/2.png"
    },
    {
        id: "3",
        songName: `Ohne Dich <br> 
        <div class="subtitle">Rammstein</div>`,
        poster:"img/3.png"
    },
    {
        id: "4",
        songName: `Got It Lost It<br> 
        <div class="subtitle">Big Scary</div>`,
        poster:"img/4.png"
    },
    {
        id: "5",
        songName: `I know<br> 
        <div class="subtitle">Placebo</div>`,
        poster:"img/5.png"
    },
    {
        id: "6",
        songName: `Losing My Religion<br> 
        <div class="subtitle">R.E.M</div>`,
        poster:"img/6.png"
    },
    {
        id: "7",
        songName: `Gosia<br> 
        <div class="subtitle">The Mayan Factor</div>`,
        poster:"img/7.png"
    },
    {
        id: "8",
        songName: `Holiday<br> 
        <div class="subtitle">Green Day</div>`,
        poster:"img/8.png"
    },
    {
        id: 9,
        songName: `Standing Next To Me<br> 
        <div class="subtitle">The Last Shadow Puppets</div>`,
        poster:"img/9.png"
    },
    {
        id: "10",
        songName: `Daunt<br> 
        <div class="subtitle">Jelani Aryeh</div>`,
        poster:"img/10.png"
    },
    {
        id: "11",
        songName: `They don't care about us <br>
        <div class="subtitle">Michael Jackson</div>`,
        poster:"img/11.png"
    },
    {
        id: "12",
        songName: `Get Lucky <br>
        <div class="subtitle">Daft Punk</div>`,
        poster:"img/12.png"
    },
    {
        id: "13",
        songName: `Don't Blame <br>
        <div class="subtitle">Taylor Swift</div>`,
        poster:"img/13.png"
    },
    {
        id: "14",
        songName: `Save Your Tears <br>
        <div class="subtitle">The Weeknd</div>`,
        poster:"img/14.png"
    },
    {
        id: "15",
        songName: `Toxic <br>
        <div class="subtitle">Britney Spears</div>`,
        poster:"img/15.png"
    },
    {
        id: "16",
        songName: `Rolling In The Deep <br>
        <div class="subtitle">Adele</div>`,
        poster:"img/16.png"
    },
    {
        id: "17",
        songName: `Bohemian Rhapsody <br>
        <div class="subtitle">Queen</div>`,
        poster:"img/17.png"
    },
    {
        id: "18",
        songName: `Blinding Lights <br>
        <div class="subtitle">The Weeknd</div>`,
        poster:"img/18.png"
    },
    {
        id: "19",
        songName: `Can't Get You Out Of My Head <br>
        <div class="subtitle">Kylie Minogue</div>`,
        poster:"img/19.png"
    },
    {
        id: "20",
        songName: `Dream On <br>
        <div class="subtitle">aerosmith</div>`,
        poster:"img/20.png"
    },
    {
        id: "21",
        songName: `Sadderdaze <br>
        <div class="subtitle">The Neighbourhood</div>`,
        poster:"img/21.png"
    },
    {
        id: "22",
        songName: `Grenade <br>
        <div class="subtitle">Bruno Mars</div>`,
        poster:"img/22.png"
    }
]

function newGame(difficulty) {
    var grid = getGridInit();

    var rows = grid;
    var cols = getColumns(grid);
    var blocks = getBlocks(grid);

    var psNum = generatePossibleNumber(rows, cols, blocks);

    solution = solveGrid(psNum, rows, true);

    timer = 0;

    // 59 boş hücre = çok kolay
    // 64 boş hücre = kolay
    // 69 boş hücre = normal
    // 74 boş hücre = zor
    // 79 boş hücre = çok zor
    puzzle = makeItPuzzle(solution, difficulty);
    gameOn = difficulty < 5 && difficulty >= 0;
    ViewPuzzle(puzzle);
    if (gameOn) startTimer();
}

function getGridInit() {
    var rand = [];
    for (var i = 1; i <= gridSize; i++) {
        var row = Math.floor(Math.random() * gridSize);
        var col = Math.floor(Math.random() * gridSize);
        var accept = true;
        for (var j = 0; j < rand.length; j++) {
            if ((rand[j][0] == i) | ((rand[j][1] == row) & (rand[j][2] == col))) {
                accept = false;
                i--;
                break;
            }
        }
        if (accept) {
            rand.push([i, row, col]);
        }
    }

    var result = [];
    for (var i = 0; i < gridSize; i++) {
        var row = "000000000";
        result.push(row);
    }

    for (var i = 0; i < rand.length; i++) {
        result[rand[i][1]] = replaceCharAt(
            result[rand[i][1]],
            rand[i][2],
            rand[i][0]
        );
    }

    return result;
}

function getColumns(grid) {
    var result = [];
    for (var i = 0; i < gridSize; i++) {
        result.push("");
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            result[j] += grid[i][j];
        }
    }
    return result;
}

function getBlocks(grid) {
    var result = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++)
            result[Math.floor(i / 3) * 3 + Math.floor(j / 3)] += grid[i][j];
    }
    return result;
}

function replaceCharAt(string, index, char) {
    if (index > string.length - 1) return string;
    return string.substr(0, index) + char + string.substr(index + 1);
}

function generatePossibleNumber(rows, columns, blocks) {
    var psb = [];
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            psb[i * gridSize + j] = "";
            if (rows[i][j] != 0) {
                psb[i * gridSize + j] += rows[i][j];
            } else {
                for (var k = "1"; k <= gridSize.toString(); k++) {
                    if (!rows[i].includes(k))
                        if (!columns[j].includes(k))
                            if (
                                !blocks[Math.floor(i / blockSize) * blockSize + Math.floor(j / blockSize)].includes(k)
                            )
                                psb[i * gridSize + j] += k;
                }
            }
        }
    }
    return psb;
}

function solveGrid(possibleNumber, rows, startFromZero) {
    var solution = [];

    // Steps are:
    //  1.  get all allowed numbers that fit in each empty cell
    //  2.  generate all possible rows that fit in the first row depend on the allowed number list
    //` 3.  select one row from possible row list and put it in the first row
    //  4.  go to next row and find all possible number that fit in each cell
    //  5.  generate all possible row fit in this row then go to step 3 until reach the last row or there aren't any possible rows left
    //  6.  if next row hasn't any possible left then go the previous row and try the next possibility from possibility rows' list
    //  7.  if the last row has reached and sudokuSolver row fit in it has found then the grid has solved
    var result = nextStep(0, possibleNumber, rows, solution, startFromZero);
    if (result == 1) return solution;
}
function nextStep(level, possibleNumber, rows, solution, startFromZero) {
    var x = possibleNumber.slice(level * gridSize, (level + 1) * gridSize);
    var y = generatePossibleRows(x);
    if (y.length == 0) return 0;

    var start = startFromZero ? 0 : y.length - 1;
    var stop = startFromZero ? y.length - 1 : 0;
    var step = startFromZero ? 1 : -1;
    var condition = startFromZero ? start <= stop : start >= stop;

    for (var num = start; condition; num += step) {
        var condition = startFromZero ? num + step <= stop : num + step >= stop;
        for (var i = level + 1; i < gridSize; i++) solution[i] = rows[i];
        solution[level] = y[num];
        if (level < (gridSize - 1)) {
            var cols = getColumns(solution);
            var blocks = getBlocks(solution);

            var poss = generatePossibleNumber(solution, cols, blocks);
            if (nextStep(level + 1, poss, rows, solution, startFromZero) === 1) {
                return 1;
            }
        }
        if (level === (gridSize - 1)) {
            return 1;
        }
    }
    return -1;
}
function generatePossibleRows(possibleNumber) {
    var result = [];

    function step(level, PossibleRow) {
        if (level === gridSize) {
            result.push(PossibleRow);
            return;
        }
        for (var i in possibleNumber[level]) {
            if (PossibleRow.includes(possibleNumber[level][i])) continue;
            step(level + 1, PossibleRow + possibleNumber[level][i]);
        }
    }

    step(0, "");

    return result;
}

function makeItPuzzle(grid, difficulty) {
    if (!(difficulty < 5 && difficulty > -1)) difficulty = 13;
    var remainedValues = 81;
    var puzzle = grid.slice(0);

    function clearValue(grid, x, y, remainedValues) {
        function getSymmetry(x, y) {
            var symX = 8 - x;
            var symY = 8 - y;
            return [symX, symY];
        }
        var sym = getSymmetry(x, y);
        if (grid[y][x] != 0) {
            grid[y] = replaceCharAt(grid[y], x, "0");
            remainedValues--;
            if (x != sym[0] && y != sym[1]) {
                grid[sym[1]] = replaceCharAt(grid[sym[1]], sym[0], "0");
                remainedValues--;
            }
        }
        return remainedValues;
    }

    while (remainedValues > difficulty * 5 + 20) {
        var x = Math.floor(Math.random() * 9);
        var y = Math.floor(Math.random() * 9);
        remainedValues = clearValue(puzzle, x, y, remainedValues);
    }
    return puzzle;
}

function ViewPuzzle(grid) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
            addClassToCell(table.rows[i].cells[j].getElementsByTagName("input")[0]);
            if (grid[i][j] == "0") {
                input.disabled = false;
                input.value = "";
            } else {
                input.disabled = true;
                input.value = grid[i][j];
            }
        }
    }
}

function readInput() {
    var result = [];
    for (var i = 0; i < gridSize; i++) {
        result.push("");
        for (var j = 0; j < gridSize; j++) {
            var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
            if (input.value == "" || input.value.length > 1 || input.value == "0") {
                input.value = "";
                result[i] += "0";
            }else result[i] += input.value;
        }
    }
    return result;
}

function checkValue(value, row, column, block, defaultValue, currentValue) {
    if (value === "" || value === "0") return 0;
    if (!(value > "0" && value < ":")) return 4;
    if (value === defaultValue) return 0;
    if (
        row.indexOf(value) != row.lastIndexOf(value) ||
        column.indexOf(value) != column.lastIndexOf(value) ||
        block.indexOf(value) != block.lastIndexOf(value)
    ) {
        return 3;
    }
    if (value !== currentValue) return 2;
    return 1;
}

function addClassToCell(input, className) {
    input.classList.remove("right-cell");
    input.classList.remove("warning-cell");
    input.classList.remove("wrong-cell");

    if (className != undefined) input.classList.add(className);
}

function startTimer() {
    var timerDiv = document.getElementById("timer");
    clearInterval(intervalId);

    pauseTimer = false;
    intervalId = setInterval(function () {
        if (!pauseTimer) {
            timer++;
            var min = Math.floor(timer / 60);
            var sec = timer % 60;
            timerDiv.innerText =
                (("" + min).length < 2 ? "0" + min : min) +
                ":" +
                (("" + sec).length < 2 ? "0" + sec : sec);
        }
    }, 1000);
}

function solveSudoku(changeUI) {
    puzzle = readInput();

    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);

    var errors = 0;
    var correct = 0;

    for (var i = 0; i < puzzle.length; i++) {
        for (var j = 0; j < puzzle[i].length; j++) {
            var result = checkValue(
                puzzle[i][j],
                puzzle[i],
                columns[j],
                blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)],
                -1,
                -1
            );
            correct = correct + (result === 2 ? 1 : 0);
            errors = errors + (result > 2 ? 1 : 0);
            addClassToCell(
                table.rows[i].cells[j].getElementsByTagName("input")[0],
                result > 2 ? "wrong-cell" : undefined
            );
        }
    }

    if (errors > 0) {
        canSolved = false;
        return 2;
    }

    canSolved = true;
    isSolved = true;

    if (correct === 81) {
        return 1;
    }

    var time = Date.now();

    solution = solveGrid(
        generatePossibleNumber(puzzle, columns, blocks),
        puzzle,
        true
    );

    time = Date.now() - time;

    if (changeUI)
        document.getElementById("timer").innerText =
            Math.floor(time / 1000) + "." + ("000" + (time % 1000)).slice(-3);

    if (solution === undefined) {
        isSolved = false;
        canSolved = false;
        return 3;
    }

    if (changeUI) {
        ViewPuzzle(solution);
    }
    return 0;
}

function hideMoreOptionMenu() {
    var moreOptionList = document.getElementById("more-option-list");
    if (moreOptionList.style.visibility == "visible") {
        moreOptionList.style.maxWidth = "40px";
        moreOptionList.style.minWidth = "40px";
        moreOptionList.style.maxHeight = "10px";
        moreOptionList.style.opacity = "0";
        setTimeout(function () {
            moreOptionList.style.visibility = "hidden";
        }, 175);
    }
}
window.onload = function () {
    mainFunction();
};

function mainFunction() {
    table = document.getElementById("puzzle-grid");
    var rippleButtons = document.getElementsByClassName("button");
    for (var i = 0; i < rippleButtons.length; i++) {
        rippleButtons[i].onmousedown = function (e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            var rippleItem = document.createElement("div");
            rippleItem.classList.add("ripple");
            rippleItem.setAttribute("style", "left: " + x + "px; top: " + y + "px");

            var rippleColor = this.getAttribute("ripple-color");
            if (rippleColor) rippleItem.style.background = rippleColor;
            this.appendChild(rippleItem);

            setTimeout(function () {
                rippleItem.parentElement.removeChild(rippleItem);
            }, 1500);
        };
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var input = table.rows[i].cells[j].getElementsByTagName("input")[0];

            input.onchange = function () {
                addClassToCell(this);
                var element = this;
                function checkInput1(element) {
                    if ((gridSize == 4 && (element.value < 0 || element.value > 4)) ||
                        (gridSize == 9 && (element.value < 0 || element.value > 9)) ||
                        (gridSize == 16 && (element.value < 0 || element.value > 16))) {
                        if (element.value != "?" && element.value != "؟") {
                            element.value = "";
                            if (gridSize == 4) alert("only numbers [1-4] and question mark '?' are allowed!!");
                            else if (gridSize == 9) alert("only numbers [1-9] and question mark '?' are allowed!!");
                            else if (gridSize == 16) alert("only numbers [1-16] and question mark '?' are allowed!!");
                        }
                    }
                }
                checkInput1(this);

                if (this.value > 0 && this.value < 10) remaining[this.value - 1]--;
                if (this.oldvalue !== "") {
                    if (this.oldvalue > 0 && this.oldvalue < 10)
                        remaining[this.oldvalue - 1]++;
                }

                canSolved = true;
            };

            input.onfocus = function () {
                this.oldvalue = this.value;
            };
        }
    }
    setGrid(9, 3);
}

window.onclick = function (event) {
    var d1 = document.getElementById("dialog");
    var d2 = document.getElementById("about-dialog");
    var m1 = document.getElementById("more-option-list");

    if (event.target == d1) {
        hideDialogButtonClick("dialog");
    } else if (event.target == d2) {
        hideDialogButtonClick("about-dialog");
    } else if (m1.style.visibility == "visible") {
        hideMoreOptionMenu();
    }
};

function checkInput(element) {
    if ((gridSize === 9 && !(element.value > 0 && element.value < 10)) ||
        (gridSize === 16 && !(element.value > 0 && element.value < 17))) {
        if (element.value != "?" && element.value != "؟") {
            element.value = "";
            if (gridSize == 9) alert("Sadece [1-9] aralığında ve soru işareti izinli!");
            else if (gridSize == 16) alert("Sadece [1-16] aralığında ve soru işareti izinli!");
        }
    }
}

function HamburgerButtonClick() {
    var div = document.getElementById("hamburger-menu");
    var menu = document.getElementById("nav-menu");
    div.style.display = "block";
    div.style.visibility = "visible";
    setTimeout(function () {
        div.style.opacity = 1;
        menu.style.left = 0;
    }, 50);
}

function startGameButtonClick() {
    setGrid(9, 3);
    document.getElementById("customRadioInline2").checked = true;
    var difficulties = document.getElementsByName("difficulty");
    //  zorluk:
    //  0 çok zor
    //  1 zor
    //  2 normal
    //  3 kolay
    //  4 çok kolay
    //  5 çözülü

    var difficulty = 5;

    for (var i = 0; i < difficulties.length; i++) {
        if (difficulties[i].checked) {
            newGame(4 - i);
            difficulty = i;
            break;
        }
    }
    if (difficulty > 4) newGame(5);

    hideDialogButtonClick("dialog");
    gameId++;
    document.getElementById("game-number").innerText = "oyun #" + gameId;

    document.getElementById("moreoption-sec").style.display = "block";
    document.getElementById("pause-btn").style.display = "block";
    document.getElementById("check-btn").style.display = "block";
    document.getElementById("isunique-btn").style.display = "none";
    document.getElementById("radio-group").style.display = "none";
    document.getElementById("isunique-btn").style.display = "none";

    document.getElementById("timer-label").innerText = "Zaman";
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("game-difficulty-label").innerText = "Zorluk";

    document.getElementById("game-difficulty").innerText =
        difficulty < difficulties.length
            ? difficulties[difficulty].value
            : "solved";
}

function pauseGameButtonClick() {
    var icon = document.getElementById("pause-icon");
    var label = document.getElementById("pause-text");

    if (pauseTimer) {
        icon.innerText = "pause";
        label.innerText = "Pause";
        table.style.opacity = 1;
    } else {
        icon.innerText = "play_arrow";
        label.innerText = "Continue";
        table.style.opacity = 0;
    }

    pauseTimer = !pauseTimer;
}

function checkButtonClick() {
    if (gameOn) {
        timer += 60;
        var currentGrid = [];

        currentGrid = readInput();

        var columns = getColumns(currentGrid);
        var blocks = getBlocks(currentGrid);

        var errors = 0;
        var currects = 0;

        for (var i = 0; i < currentGrid.length; i++) {
            for (var j = 0; j < currentGrid[i].length; j++) {
                if (currentGrid[i][j] == "0") continue;

                var result = checkValue(
                    currentGrid[i][j],
                    currentGrid[i],
                    columns[j],
                    blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)],
                    puzzle[i][j],
                    solution[i][j]
                );

                addClassToCell(
                    table.rows[i].cells[j].getElementsByTagName("input")[0],
                    result === 1
                        ? "right-cell"
                        : result === 2
                            ? "warning-cell"
                            : result === 3
                                ? "wrong-cell"
                                : undefined
                );

                if (result === 1 || result === 0) {
                    currects++;
                } else if (result === 3) {
                    errors++;
                }
            }
        }

        if (currects === 81) {
            gameOn = false;
            pauseTimer = true;
            document.getElementById("game-difficulty").innerText = "Solved";
            clearInterval(intervalId);
            alert("Congrats, You solved it.");
        } else if (errors === 0 && currects === 0) {
            alert(
                "Congrats, You solved it, but this is not the solution that I want."
            );
        }
    }
}

function restartButtonClick() {
    if (gameOn) {
        for (var i in remaining) remaining[i] = 9;

        ViewPuzzle(puzzle);

        timer = -1;
    }
}

function SurrenderButtonClick() {
    if (gameOn) {
        for (var i in remaining) remaining[i] = 9;
        ViewPuzzle(solution);

        gameOn = false;
        pauseTimer = true;
        clearInterval(intervalId);

        document.getElementById("game-difficulty").innerText = "Solved";
    }
}

function hintButtonClick() {
    if (gameOn) {
        var empty_cells_list = [];
        var wrong_cells_list = [];
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
                if (input.value == "" || input.value.length > 1 || input.value == "0") {
                    empty_cells_list.push([i, j]);
                } else {
                    if (input.value !== solution[i][j]) wrong_cells_list.push([i, j]);
                }
            }
        }

        if (empty_cells_list.length === 0 && wrong_cells_list.length === 0) {
            gameOn = false;
            pauseTimer = true;
            document.getElementById("game-difficulty").innerText = "Solved";
            clearInterval(intervalId);
            alert("Congrats, You solved it.");
        } else {
            timer += 60;

            var input;
            if (
                (Math.random() < 0.5 && empty_cells_list.length > 0) ||
                wrong_cells_list.length === 0
            ) {
                var index = Math.floor(Math.random() * empty_cells_list.length);
                input = table.rows[empty_cells_list[index][0]].cells[
                    empty_cells_list[index][1]
                    ].getElementsByTagName("input")[0];
                input.oldvalue = input.value;
                input.value =
                    solution[empty_cells_list[index][0]][empty_cells_list[index][1]];
            } else {
                var index = Math.floor(Math.random() * wrong_cells_list.length);
                input = table.rows[wrong_cells_list[index][0]].cells[
                    wrong_cells_list[index][1]
                    ].getElementsByTagName("input")[0];
                input.oldvalue = input.value;
                remaining[input.value - 1]++;
                input.value =
                    solution[wrong_cells_list[index][0]][wrong_cells_list[index][1]];
            }

        }

        var count = 0;
        for (var i = 0; i < 6; i++) {
            setTimeout(function () {
                if (count % 2 == 0) input.classList.add("right-cell");
                else input.classList.remove("right-cell");
                count++;
            }, i * 750);
        }
    }
}

function showDialogClick(dialogId) {
    hideHamburgerClick();

    var dialog = document.getElementById(dialogId);
    var dialogBox = document.getElementById(dialogId + "-box");
    dialogBox.focus();
    dialog.style.opacity = 0;
    dialogBox.style.marginTop = "-500px";
    dialog.style.display = "block";
    dialog.style.visibility = "visible";

    setTimeout(function () {
        dialog.style.opacity = 1;
        dialogBox.style.marginTop = "64px";
    }, 200);
}

function moreOptionButtonClick() {
    var moreOptionList = document.getElementById("more-option-list");

    setTimeout(function () {
        if (moreOptionList.style.visibility == "hidden") {
            moreOptionList.style.visibility = "visible";
            setTimeout(function () {
                moreOptionList.style.maxWidth = "160px";
                moreOptionList.style.minWidth = "160px";
                moreOptionList.style.maxHeight = "160px";
                moreOptionList.style.opacity = "1";
            }, 50);
        }
    }, 50);
}

function hideDialogButtonClick(dialogId) {
    var dialog = document.getElementById(dialogId);
    var dialogBox = document.getElementById(dialogId + "-box");
    dialog.style.opacity = 0;
    dialogBox.style.marginTop = "-500px";

    setTimeout(function () {
        dialog.style.visibility = "collapse";
    }, 500);
}

function hideHamburgerClick() {
    var div = document.getElementById("hamburger-menu");
    var menu = document.getElementById("nav-menu");
    menu.style.left = "-256px";

    setTimeout(function () {
        div.style.opacity = 0;
        div.style.visibility = "collapse";
    }, 200);
}

function sudokuSolverMenuClick() {
    hideHamburgerClick();

    if (gameOn) {
        gameOn = false;
        clearInterval(intervalId);
    }

    solution = [];
    canSolved = true;
    isSolved = false;

    var grid = [];
    for (var i = 0; i < gridSize; i++) {
        grid.push("");
        for (var j = 0; j < gridSize; j++) {
            grid[i] += "0";
        }
    }
    ViewPuzzle(grid);


    document.getElementById("moreoption-sec").style.display = "none";
    document.getElementById("pause-btn").style.display = "none";
    document.getElementById("check-btn").style.display = "none";
    document.getElementById("isunique-btn").style.display = "block";
    document.getElementById("radio-group").style.display = "flex";

    document.getElementById("timer-label").innerText = "Süre";
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("game-difficulty-label").innerText = "Eşsiz mi";
    document.getElementById("game-difficulty").innerText = "Tanımsız";
    document.getElementById("game-number").innerText = "#Sudoku_Çözücü";

    document
        .getElementById("puzzle-grid")
        .rows[0].cells[0].getElementsByTagName("input")[0]
        .focus();
}

function isUniqueButtonClick() {
    if (!isSolved) {
        if (canSolved) solveSudoku(false);
    }
    if (!isSolved) {
        alert("Çözülemez Olduğundan Kontrol Edilemiyor!");
        return;
    }

    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);
    var solution2 = solveGrid(generatePossibleNumber(puzzle, columns, blocks), puzzle,false);

    var unique = true;
    for (var i = 0; i < solution.length; i++) {
        for (var j = 0; j < solution[i].length; j++) {
            if (solution[i][j] !== solution2[i][j]) {
                unique = false;
                break;
            }
            if (!unique) break;
        }
    }

    document.getElementById("game-difficulty").innerText = unique ? "Evet" : "Hayır";
}

function setGrid(gridSize1, blockSize1) {
    gridSize = gridSize1;
    blockSize = blockSize1;
    if (gridSize === 9) bitSize = 511;
    else if (gridSize === 16) bitSize = 65535;
    gridSettings();
}
function gridSettings() {
    var table = document.getElementById("puzzle-grid");
    var index = 1;
    if (gridSize === 16) document.getElementById("game-status").style.width = "200px";
    else document.getElementById("game-status").style.width = "inherit";
    if (gridSize === 9) blockSize = 3;
    else if (gridSize === 16) blockSize = 4;
    table.innerHTML = "";
    for(var i = 0; i < gridSize; i++) {
        var row = table.insertRow(i);
        if (gridSize == 9) row.classList.add("tr-3");
        else if (gridSize == 16) row.classList.add("tr-4");

        for(var j = 0; j < gridSize; j++) {
            var cell1 = row.insertCell(j);
            if (gridSize==9) {
                cell1.innerHTML= '<input class="js-field" onchange="checkInput(this)" maxLength="1" type="text" data-index="' + (index) +'" data-row="' + i +'" data-col="' + j +'"/>';
                cell1.classList.add("td-3");
                index++;
            }
            else if (gridSize == 16) {
                cell1.classList.add("td-4");
                cell1.innerHTML= '<input class="js-field" onchange="checkInput(this)" maxLength="2" type="text" data-index="' + (index) +'" data-row="' + i +'" data-col="' + j +'"/>';
                index++;
            }

        }
    };
    sudokuSolverMenuClick();
    var so = new Sudoku(document.getElementById("sudoku"));
}

class Sudoku {
    constructor(container, { controls = true, pauseOnGuess = false } = {}) {
        this.container = document.getElementById("puzzle-grid");
        const controlContainer = document.getElementById("controls");
        this._pauseOnGuess = pauseOnGuess;
        this.init(controls);
        if (controls) {
            controlContainer.querySelector(".js-solve").addEventListener("click", ev => this.solve());
            controlContainer.querySelector(".js-play").addEventListener("click", ev => this.stepSolve());
            controlContainer.querySelector(".js-pause").addEventListener("click", ev => this.pause());
            controlContainer.querySelector(".js-continue").addEventListener("click", ev => this.load());
            controlContainer.querySelector(".js-reset").addEventListener("click", ev => this.reset());
        }
    }

    init(controls = true) {
        let container = this.container;
        let fields = container.querySelectorAll("input.js-field");
        fields.forEach(input => {
            input.addEventListener("click", ev => {
                input.focus();
                input.select();
            });
            input.addEventListener("focus", ev => {
                let index = +input.dataset.index;
            });
            input.addEventListener("keydown", ev => {
                let idx = +input.dataset.index;
                let parent = input.parentNode.parentNode.parentNode;
                let next;
                switch (ev.keyCode) {
                    case 38:
                        next = idx - gridSize; break;
                    case 40:
                        next = idx + gridSize; break;
                    case 39:
                        next = idx + 1; break;
                    case 37:
                        next = idx - 1; break;
                }
                if (next != null) {
                    if (next < 0) next += gridSize * gridSize;
                    next %= gridSize * gridSize;
                    next = parent.querySelector('input[data-index="' + next + '"]');
                    next.focus();
                    next.select();
                    ev.preventDefault();
                }

            });
        });
    }

    pause() {
        clearTimeout(this._playTimer);
        this.container.classList.add("paused");
    }

    load() {
        this.writeBoard(sudokuSolver);
    }

    readBoard(init = false) {
        return [...this.container.querySelectorAll("input.js-field")]
            .map(el => {
                if (init) el.classList.toggle("init", el.value);
                return el.value ? d2b(parseInt(el.value, 10)) : 0;
            });
    }

    writeBoard(values, init = false) {
        let el = this.container;
        [...el.querySelectorAll("input.js-field")].forEach((el, i) => {
            el.value = values[i] || "";
            el.classList.remove("current");
            if (init) {
                el.classList.toggle("init", values[i]);
            }
        });
        if (init) {
            this._initBoard = values;
            this._reset();
        }
    }

    writeBytes(values, init = false) {
        this.writeBoard(values.map(b2d), init);
    }

    clearBoard() {
        let el = this.container;
        [...el.querySelectorAll("input.js-field")].forEach(el => {
            el.value = "";
            el.classList.remove("init");
        });
        this._reset();
    }

    reset() {
        let el = this.container;
        this.writeBoard(this._initBoard || [], true);
        let inputs = el.querySelectorAll("input");
        [].forEach.call(inputs, function(input) {
            input.classList.remove("right-cell");
            input.classList.remove("warning-cell");
            input.classList.remove("wrong-cell");
        });

        let out =  document.getElementById("game-status").querySelector(".js-console");
        let digits = out.querySelector("#js-console-digits");
        let takebacks = out.querySelector("#js-console-takebacks");
        let guess = out.querySelector("#js-console-guess");
        let time = out.querySelector("#js-console-time");
        digits.style.display = "none";
        digits.previousElementSibling.style.display = "none";
        digits.innerHTML = 0;
        takebacks.style.display = "none";
        takebacks.previousElementSibling.style.display = "none";
        takebacks.innerHTML = 0;
        guess.style.display = "none";
        guess.previousElementSibling.style.display = "none";
        guess.innerHTML = 0;
        time.style.display = "none";
        time.previousElementSibling.style.display = "none";
        time.innerHTML = 0;
    }

    _reset() {
        let el = this.container;
        clearTimeout(this._playTimer);
        el.classList.remove("solved", "playing", "paused");
        let inputs = el.querySelectorAll("input");
        [].forEach.call(inputs, function(input) {
            input.classList.remove("right-cell");
        });
        log();
    }

    solve() {
        let self = this;
        let el = self.container;
        let board = self.readBoard(true);
        let backtrack = 0;
        let guesswork = 0;
        let dcount = 0;
        let time = Date.now();
        if (solve()) {
            self.writeBytes(board);
            el.classList.add("solved");
            let inputs = el.querySelectorAll("input");
            [].forEach.call(inputs, function(input) {
                input.classList.add("right-cell");
            });
            stats();
        } else {
            stats();
            alert("Çözümü Yok!");
        }
        function solve() {
            let { index, moves, len } = analyze(board);
            if (index == null) return true;
            if (len > 1) guesswork++;
            for (let m = 1; moves; m <<= 1) {
                if (moves & m) {
                    dcount++;
                    board[index] = m;
                    if (solve()) return true;
                    moves ^= m;
                }
            }
            board[index] = 0;
            ++backtrack;
            return false;
        }
        function stats() {
            log(dcount, backtrack, guesswork, Date.now() - time);
        }
    }

    stepSolve() {
        let self = this;
        let el = self.container;
        el.classList.add("playing");
        let board = self.readBoard(true);
        let backtrack = 0;
        let guesswork = 0;
        let dcount = 0;
        solve(success => {
            log(backtrack,  guesswork);
            el.classList.remove("playing");
            if (success) {
                self.writeBytes(board);
                el.classList.add("solved");
            } else {
                alert("Çözümü Yok!");
            }
        });
        function solve(cb) {
            let { index, moves, len } = analyze(board);
            if (index == null) return cb(true);
            if (self._pauseOnGuess) {
                el.querySelector('input[data-index="' + index + '"]').classList.add("current");
            }
            if (len > 1) {
                guesswork++;
                if (self._pauseOnGuess) {
                    self._playCont = () => loop(moves, 1);
                    stats();
                    self.pause();
                    return;
                }
            }
            function loop(moves, m){
                if (!moves) {
                    board[index] = 0;
                    ++backtrack;
                    if (el.querySelector('input[data-index="' + (index + 1) + '"]').classList.contains("right-cell")) {
                        el.querySelector('input[data-index="' + (index + 1) + '"]').classList.remove("right-cell");
                        el.querySelector('input[data-index="' + (index + 1) + '"]').classList.add("warning-cell");
                    }
                    stats();
                    cb(false);
                } else if (moves & m) {
                    dcount++;
                    stats();
                    board[index] = m;
                    self.writeBytes(board);
                    el.querySelector('input[data-index="' + (index + 1) + '"]').classList.add("current");
                    el.querySelector('input[data-index="' + (index + 1) + '"]').classList.add("right-cell");
                    if (el.querySelector('input[data-index="' + (index + 1) + '"]').classList.contains("warning-cell")) {
                        el.querySelector('input[data-index="' + (index + 1) + '"]').classList.remove("warning-cell");
                    }
                    self._playTimer = setTimeout(self._playCont = () =>
                        solve(success => success ? cb(true) : loop(moves ^ m, m << 1)), 250);
                } else loop(moves, m << 1);
            };
            loop(moves, 1);
        }
        function stats() {
            log(dcount, backtrack , guesswork);
        }
    }
}


function i2rc(index) {
    return { row: index / gridSize | 0, col: index % gridSize };
}

function rc2i(row, col) {
    return row * gridSize + col;
}

function d2b(digit) {
    return 1 << (digit - 1);
}

function b2d(byte) {
    for (var i = 0; byte; byte >>= 1, i++);
    return i;
}

function b2ds(byte) {
    let digits = [];
    for (let i = 1; byte; byte >>= 1, i++)
        if (byte & 1) digits.push(i);
    return digits;
}

function log(digitCount = 0, takebackCount = 0, guessCount = 0, timeSpent = 0) {
    let out =  document.getElementById("game-status").querySelector(".js-console");
    let digits = out.querySelector("#js-console-digits");
    let takebacks = out.querySelector("#js-console-takebacks");
    let guess = out.querySelector("#js-console-guess");
    let time = out.querySelector("#js-console-time");
    if (out) {
        if (digitCount) {
            digits.style.display = "block";
            digits.previousElementSibling.style.display = "block";
            digits.innerHTML = digitCount;
        }
        if (takebackCount) {
            takebacks.style.display = "block";
            takebacks.previousElementSibling.style.display = "block";
            takebacks.innerHTML = takebackCount;
        }
        if (guessCount) {
            guess.style.display = "block";
            guess.previousElementSibling.style.display = "block";
            guess.innerHTML = guessCount;
        }
        if (timeSpent) {
            time.style.display = "block";
            time.previousElementSibling.style.display = "block";
            time.innerHTML = timeSpent + ' ms';
        }
    }
}

function getMoves(board, index) {
    let { row, col } = i2rc(index);
    let r1 = blockSize * (row / blockSize | 0);
    let c1 = blockSize * (col / blockSize | 0);
    let moves = 0;
    for (let r = r1, i = 0; r < r1 + blockSize; r++) {
        for (let c = c1; c < c1 + blockSize; c++, i++) {
            moves |= board[rc2i(r, c)]
                | board[rc2i(row, i)]
                | board[rc2i(i, col)];
        }
    }
    return moves ^ bitSize;
}

function unique(allowed, index, value) {
    let { row, col } = i2rc(index);
    let r1 = blockSize * (row / blockSize | 0);
    let c1 = blockSize * (col / blockSize | 0);
    let ir = gridSize * row;
    let ic = col;
    let uniq_row = true, uniq_col = true, uniq_3x3 = true;
    for (let r = r1; r < r1 + blockSize; ++r) {
        for (let c = c1; c < c1 + blockSize; ++c, ++ir, ic += gridSize) {
            if (uniq_3x3) {
                let i = rc2i(r, c);
                if (i != index && allowed[i] & value) uniq_3x3 = false;
            }
            if (uniq_row) {
                if (ir != index && allowed[ir] & value) uniq_row = false;
            }
            if (uniq_col) {
                if (ic != index && allowed[ic] & value) uniq_col = false;
            }
            if (!(uniq_3x3 || uniq_row || uniq_col)) return false;
        }
    }
    return uniq_row || uniq_col || uniq_3x3;
}

function analyze(board) {
    let allowed = board.map((x, i) => x ? 0 : getMoves(board, i));
    let bestIndex, bestLen = 100;
    for (let i = 0; i < (gridSize * gridSize); i++) if (!board[i]) {
        let moves = allowed[i];
        let len = 0;
        for (let m = 1; moves; m <<= 1)
            if (moves & m) {
                ++len;
                if (unique(allowed, i, m)) {
                    allowed[i] = m;
                    len = 1;
                    break;
                }
                moves ^= m;
        }
        if (len < bestLen) {
            bestLen = len;
            bestIndex = i;
            if (!bestLen) break;
        }
    }
    return {
        index: bestIndex,
        moves: allowed[bestIndex],
        len: bestLen,
        allowed: allowed
    };
}

