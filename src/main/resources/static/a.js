// grid variable
var table;

// game number
var gameId = 0;

// puzzle grid
var puzzle = [];
var rowCount = 9;
var columnCount = 9;
var blockCount = 3;

// solution grid
var solution = [];

// remaining number counts
var remaining = [9, 9, 9, 9, 9, 9, 9, 9, 9];

// variable to check if "Sudoku Solver" solve the puzzle
var isSolved = false;
var canSolved = true;

// stopwatch timer variables
var timer = 0;
var pauseTimer = false;
var intervalId;
var gameOn = false;

function newGame(difficulty) {
    var grid = getGridInit();

    var rows = grid;
    var cols = getColumns(grid);
    var blocks = getBlocks(grid);

    var psNum = generatePossibleNumber(rows, cols, blocks);

    // solve the grid
    solution = solveGrid(psNum, rows, true);

    // reset the game state timer and remaining number
    timer = 0;
    for (var i in remaining) remaining[i] = 9;

    // empty cells from grid depend on difficulty
    // for now it will be:
    // 59 empty cells for very easy
    // 64 empty cells for easy
    // 69 empty cells for normal
    // 74 empty cells for hard
    // 79 empty cells for expert
    puzzle = makeItPuzzle(solution, difficulty);

    // game is on when the difficulty = [0, 4]
    gameOn = difficulty < 5 && difficulty >= 0;

    // update the UI
    ViewPuzzle(puzzle);
    updateRemainingTable();

    // finally, start the timer
    if (gameOn) startTimer();
}

function getGridInit() {
    var rand = [];
    // for each digits from 1 to 9 find a random row and column
    for (var i = 1; i <= rowCount; i++) {
        var row = Math.floor(Math.random() * rowCount);
        var col = Math.floor(Math.random() * columnCount);
        var accept = true;
        for (var j = 0; j < rand.length; j++) {
            // if number exist or there is a number already located in then ignore and try again
            if ((rand[j][0] == i) | ((rand[j][1] == row) & (rand[j][2] == col))) {
                accept = false;

                // try to get a new position for this number
                i--;
                break;
            }
        }
        if (accept) {
            rand.push([i, row, col]);
        }
    }

    // initialize new empty grid
    var result = [];
    for (var i = 0; i < rowCount; i++) {
        var row = "000000000";
        result.push(row);
    }

    // put numbers in the grid
    for (var i = 0; i < rand.length; i++) {
        result[rand[i][1]] = replaceCharAt(
            result[rand[i][1]],
            rand[i][2],
            rand[i][0]
        );
    }

    return result;
}

// return columns from a row grid
function getColumns(grid) {
    var result = [];
    for (var i = 0; i < rowCount; i++) {
        result.push("");
    }
    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < columnCount; j++) {
            result[j] += grid[i][j];
        }
        /*try {
                result[j] += grid[i][j];
            } catch (err) {
                alert(grid);
            }*/
    }
    return result;
}

// return blocks from a row grid
function getBlocks(grid) {
    var result = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < columnCount; j++)
            result[Math.floor(i / 3) * 3 + Math.floor(j / 3)] += grid[i][j];
    }
    return result;
}

// function to replace char in string
function replaceCharAt(string, index, char) {
    if (index > string.length - 1) return string;
    return string.substr(0, index) + char + string.substr(index + 1);
}

// get allowed numbers that can be placed in each cell
function generatePossibleNumber(rows, columns, blocks) {
    var psb = [];

    // for each cell get numbers that are not viewed in a row, column or block
    // if the cell is not empty then, allowed number is the number already exist in it
    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < columnCount; j++) {
            psb[i * rowCount + j] = "";
            if (rows[i][j] != 0) {
                psb[i * rowCount + j] += rows[i][j];
            } else {
                for (var k = "1"; k <= rowCount.toString(); k++) {
                    if (!rows[i].includes(k))
                        if (!columns[j].includes(k))
                            if (
                                !blocks[Math.floor(i / blockCount) * blockCount + Math.floor(j / blockCount)].includes(k)
                            )
                                psb[i * rowCount + j] += k;
                }
            }
        }
    }
    return psb;
}

function solveGrid(possibleNumber, rows, startFromZero) {
    var solution = [];

    // solve Sudoku with a backtracking algorithm
    // Steps are:
    //  1.  get all allowed numbers that fit in each empty cell
    //  2.  generate all possible rows that fit in the first row depend on the allowed number list
    //` 3.  select one row from possible row list and put it in the first row
    //  4.  go to next row and find all possible number that fit in each cell
    //  5.  generate all possible row fit in this row then go to step 3 until reach the last row or there aren't any possible rows left
    //  6.  if next row hasn't any possible left then go the previous row and try the next possibility from possibility rows' list
    //  7.  if the last row has reached and a row fit in it has found then the grid has solved
    var result = nextStep(0, possibleNumber, rows, solution, startFromZero);
    if (result == 1) return solution;
}

function setValues() {
    puzzle = readInput();

    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);

    let possibleNumber = generatePossibleNumber(puzzle, columns, blocks)
    $.ajax({
        url: "/setValues",
        type: "POST",
        dataType : 'json',
        contentType : "application/json",
        data: JSON.stringify({possibleNumber: possibleNumber, rows: puzzle, startFromZero: false}),
        success: function(response)
        {
        },
        error: function(e){
            console.log("ERROR: ", e);
        }
    });

    var delayInMilliseconds = 100;

    setTimeout(function() {
    }, delayInMilliseconds);

}
function refreshNav(algorithm) {
    switch (algorithm) {
        case "backtracking":
            solveSudoku1();
            break;
        case "bee":
            solveSudoku(true);
            break;
        case "swarm":
            solveSudoku(true);
            break;
        case "annealing":
            solveSudoku(true);
            break;
        case "ant":
            solveSudoku(true);
            break;

    }
    /*
    $.ajax({
        type:"post",
        data:{algorithm: algorithm},
        url:"/getAnswers",
        success: function(response){
            $('#nav1').replaceWith(response);
            solveWithOptions(algorithm);
        }
    });

     */
}

function solveWithOptions() {
    /*
    var answer = $('#answer').data('answers');
    answer = answer.map(String);

    canSolved = true;
    isSolved = true;

    //read the current time
    var time = Date.now();

    time = Date.now() - time;
    document.getElementById("timer").innerText = Math.floor(time / 1000) + "." + ("000" + (time % 1000)).slice(-3);
    remaining = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    updateRemainingTable();
    ViewPuzzleByGrid(answer);
     */
}

function solveSudoku1() {
    // read current state
    puzzle = readInput();

    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);

    // check if there is any conflict
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

    // check if invalid input
    if (errors > 0) {
        canSolved = false;
        return 2;
    }

    canSolved = true;
    isSolved = true;

    // check if grid is already solved
    if (correct === 81) {
        return 1;
    }

    //read the current time
    var time = Date.now();

    // solve the grid
    solution = solveSudoku2(convertGrid(puzzle));
    // show result
    // get time
    time = Date.now() - time;

    if (true)
        document.getElementById("timer").innerText =
            Math.floor(time / 1000) + "." + ("000" + (time % 1000)).slice(-3);

    if (solution === undefined) {
        isSolved = false;
        canSolved = false;
        return 3;
    }

    if (true) {
        remaining = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        updateRemainingTable();
        ViewPuzzle(solution);
    }
    return 0;
}

// level is current row number in the grid
function nextStep(level, possibleNumber, rows, solution, startFromZero) {
    // get possible number fit in each cell in this row
    var x = possibleNumber.slice(level * rowCount, (level + 1) * rowCount);
    // generate possible numbers sequence that fit in the current row
    var y = generatePossibleRows(x);
    if (y.length == 0) return 0;

    // to allow check is solution is unique
    var start = startFromZero ? 0 : y.length - 1;
    var stop = startFromZero ? y.length - 1 : 0;
    var step = startFromZero ? 1 : -1;
    var condition = startFromZero ? start <= stop : start >= stop;

    // try every numbers sequence in this list and go to next row
    for (var num = start; condition; num += step) {
        var condition = startFromZero ? num + step <= stop : num + step >= stop;
        for (var i = level + 1; i < rowCount; i++) solution[i] = rows[i];
        solution[level] = y[num];
        if (level < (rowCount - 1)) {
            /*if (solution[4] === undefined) {
                      var x = 0;
                      x++;
                  }*/
            var cols = getColumns(solution);
            var blocks = getBlocks(solution);

            var poss = generatePossibleNumber(solution, cols, blocks);
            if (nextStep(level + 1, poss, rows, solution, startFromZero) === 1) {
                return 1;
            }
        }
        if (level === (rowCount - 1)) {
            return 1;
        }
    }
    return -1;
}

// generate possible numbers sequence that fit in the current row
function generatePossibleRows(possibleNumber) {
    var result = [];

    function step(level, PossibleRow) {
        if (level === rowCount) {
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

// empty cell from grid depends on the difficulty to make the puzzle
function makeItPuzzle(grid, difficulty) {
    /*
          difficulty:
          // expert   : 0;
          // hard     : 1;
          // Normal   : 2;
          // easy     : 3;
          // very easy: 4;
      */

    // empty_cell_count = 5 * difficulty + 20
    // when difficulty = 13, empty_cell_count = 85 > (81 total cells count)
    // so the puzzle is showen as solved grid
    if (!(difficulty < 5 && difficulty > -1)) difficulty = 13;
    var remainedValues = 81;
    var puzzle = grid.slice(0);

    // function to remove value from a cell and its symmetry then return remained values
    function clearValue(grid, x, y, remainedValues) {
        function getSymmetry(x, y) {
            var symX = 8 - x; //Symmetry
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

    // remove value from a cell and its symmetry to reach the expected empty cells amount
    while (remainedValues > difficulty * 5 + 20) {
        var x = Math.floor(Math.random() * 9);
        var y = Math.floor(Math.random() * 9);
        remainedValues = clearValue(puzzle, x, y, remainedValues);
    }
    return puzzle;
}

// view grid in html page
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
                remaining[grid[i][j] - 1]--;
            }
        }
    }
}

// read current grid
function readInput() {
    var result = [];
    for (var i = 0; i < rowCount; i++) {
        result.push("");
        for (var j = 0; j < columnCount; j++) {
            var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
            if (input.value == "" || input.value.length > 1 || input.value == "0") {
                input.value = "";
                result[i] += "0";
            } else result[i] += input.value;
        }
    }
    return result;
}



// check value if it is correct or wrong
// return:
//  0 for value can't be changed
//  1 for correct value
//  2 for value that hasn't any conflict with other values
//  3 for value that conflict with value in its row, column or block
//  4 for incorrect input
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

// remove old class from input and add a new class to represent current cell's state
function addClassToCell(input, className) {
    // remove old class from input
    input.classList.remove("right-cell");
    input.classList.remove("worning-cell");
    input.classList.remove("wrong-cell");

    if (className != undefined) input.classList.add(className);
}

// update value of remaining numbers in html page
function updateRemainingTable() {
    for (var i = 1; i < 10; i++) {
        var item = document.getElementById("remain-" + i);
        item.innerText = remaining[i - 1];
        item.classList.remove("red");
        item.classList.remove("gray");
        if (remaining[i - 1] === 0) item.classList.add("gray");
        else if (remaining[i - 1] < 0 || remaining[i - 1] > 9)
            item.classList.add("red");
    }
}

// start stopwatch timer
function startTimer() {
    var timerDiv = document.getElementById("timer");
    clearInterval(intervalId);

    // update stopwatch value every one second
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

// solve sudoku function
// input: changeUI boolean      true to allow function to change UI
// output:
//  0 when everything goes right
//  1 when grid is already solved
//  2 when Invalid input
//  3 when no solution
function solveSudoku(changeUI) {
    // read current state
    puzzle = readInput();

    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);

    // check if there is any conflict
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

    // check if invalid input
    if (errors > 0) {
        canSolved = false;
        return 2;
    }

    canSolved = true;
    isSolved = true;

    // check if grid is already solved
    if (correct === 81) {
        return 1;
    }

    //read the current time
    var time = Date.now();

    // solve the grid
    solution = solveGrid(
        generatePossibleNumber(puzzle, columns, blocks),
        puzzle,
        true
    );

    // show result
    // get time
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
        remaining = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        updateRemainingTable();
        ViewPuzzle(solution);
    }
    return 0;
}

// hide more option menu
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

// UI Comunication functions

// function that must run when document loaded
window.onload = function () {
    mainFunction();
};

function mainFunction() {
    // assigne table to its value
    table = document.getElementById("puzzle-grid");
    // add ripple effect to all buttons in layout
    var rippleButtons = document.getElementsByClassName("button");
    for (var i = 0; i < rippleButtons.length; i++) {
        rippleButtons[i].onmousedown = function (e) {
            // get ripple effect's position depend on mouse and button position
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            // add div that represents the ripple
            var rippleItem = document.createElement("div");
            rippleItem.classList.add("ripple");
            rippleItem.setAttribute("style", "left: " + x + "px; top: " + y + "px");

            // if ripple item should have special color... get and apply it
            var rippleColor = this.getAttribute("ripple-color");
            if (rippleColor) rippleItem.style.background = rippleColor;
            this.appendChild(rippleItem);

            // set timer to remove the dif after the effect ends
            setTimeout(function () {
                rippleItem.parentElement.removeChild(rippleItem);
            }, 1500);
        };
    }
    for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < columnCount; j++) {
            var input = table.rows[i].cells[j].getElementsByTagName("input")[0];

            // add function to remove color from cells and update remaining numbers table when it get changed
            input.onchange = function () {
                //remove color from cell
                addClassToCell(this);
                var element = this;
                // check if the new value entered is allowed
                function checkInput(element) {
                    if ((rowCount == 4 && (element.value < 0 || element.value > 4)) ||
                        (rowCount == 9 && (element.value < 0 || element.value > 9)) ||
                        (rowCount == 16 && (element.value < 0 || element.value > 16))) {
                        if (element.value != "?" && element.value != "؟") {
                            element.value = "";
                            if (rowCount == 4) alert("only numbers [1-4] and question mark '?' are allowed!!");
                            else if (rowCount == 9) alert("only numbers [1-9] and question mark '?' are allowed!!");
                            else if (rowCount == 16) alert("only numbers [1-16] and question mark '?' are allowed!!");
                        }
                    }
                }
                checkInput(this);

                // compare old value and new value then update remaining numbers table
                if (this.value > 0 && this.value < 10) remaining[this.value - 1]--;
                if (this.oldvalue !== "") {
                    if (this.oldvalue > 0 && this.oldvalue < 10)
                        remaining[this.oldvalue - 1]++;
                }

                //reset canSolved value when change any cell
                canSolved = true;

                updateRemainingTable();
            };

            //change cell 'old value' when it got focused to track numbers and changes on grid
            input.onfocus = function () {
                this.oldvalue = this.value;
            };
        }
    }
}

// function to hide dialog opened in window
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

// show hamburger menu
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

// start new game
function startGameButtonClick() {
    var difficulties = document.getElementsByName("difficulty");
    // difficulty:
    //  0 expert
    //  1 hard
    //  2 normal
    //  3 easy
    //  4 very easy
    //  5 solved

    // initial difficulty to 5 (solved)
    var difficulty = 5;

    // get difficulty value
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
    document.getElementById("game-number").innerText = "game #" + gameId;

    // hide solver buttons
    // show other buttons
    document.getElementById("moreoption-sec").style.display = "block";
    document.getElementById("pause-btn").style.display = "block";
    document.getElementById("check-btn").style.display = "block";
    document.getElementById("isunique-btn").style.display = "none";
    document.getElementById("solve-btn").style.display = "none";
    document.getElementById("solve-dropdown").style.display = "none";

    // prepare view for new game
    document.getElementById("timer-label").innerText = "Time";
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("game-difficulty-label").innerText = "Game difficulty";

    document.getElementById("game-difficulty").innerText =
        difficulty < difficulties.length
            ? difficulties[difficulty].value
            : "solved";
}

// pause \ continue button click function
function pauseGameButtonClick() {
    var icon = document.getElementById("pause-icon");
    var label = document.getElementById("pause-text");

    // change icon and label of the button and hide or show the grid
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

// check grid if correct
function checkButtonClick() {
    // check if game is started
    if (gameOn) {
        // add one minute to the stopwatch as a cost of grid's check
        timer += 60;
        var currentGrid = [];

        // read gritd status
        currentGrid = readInput();

        var columns = getColumns(currentGrid);
        var blocks = getBlocks(currentGrid);

        var errors = 0;
        var currects = 0;

        for (var i = 0; i < currentGrid.length; i++) {
            for (var j = 0; j < currentGrid[i].length; j++) {
                if (currentGrid[i][j] == "0") continue;

                // check value if it is correct or wrong
                var result = checkValue(
                    currentGrid[i][j],
                    currentGrid[i],
                    columns[j],
                    blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)],
                    puzzle[i][j],
                    solution[i][j]
                );

                // remove old class from input and add a new class to represent current cell's state
                addClassToCell(
                    table.rows[i].cells[j].getElementsByTagName("input")[0],
                    result === 1
                        ? "right-cell"
                        : result === 2
                            ? "worning-cell"
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

        // if all values are correct and they equal original values then game over and the puzzle has been solved
        // if all values are correct and they aren't equal original values then game over but the puzzle has not been solved yet
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

// restart game
function restartButtonClick() {
    if (gameOn) {
        // reset remaining number table
        for (var i in remaining) remaining[i] = 9;

        // review puzzle
        ViewPuzzle(puzzle);

        // update remaining numbers table
        updateRemainingTable();

        // restart the timer
        // -1 is because it take 1 sec to update the timer so it will start from 0
        timer = -1;
    }
}

// surrender
function SurrenderButtonClick() {
    if (gameOn) {
        // reset remaining number table
        for (var i in remaining) remaining[i] = 9;

        // review puzzle
        ViewPuzzle(solution);

        // update remaining numbers table
        updateRemainingTable();

        // stop the game
        gameOn = false;
        pauseTimer = true;
        clearInterval(intervalId);

        // mark game as solved
        document.getElementById("game-difficulty").innerText = "Solved";
    }
}

// hint
function hintButtonClick() {
    if (gameOn) {
        // get list of empty cells and list of wrong cells
        var empty_cells_list = [];
        var wrong_cells_list = [];
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < columnCount; j++) {
                var input = table.rows[i].cells[j].getElementsByTagName("input")[0];
                if (input.value == "" || input.value.length > 1 || input.value == "0") {
                    empty_cells_list.push([i, j]);
                } else {
                    if (input.value !== solution[i][j]) wrong_cells_list.push([i, j]);
                }
            }
        }

        // check if gird is solved if so stop the game
        if (empty_cells_list.length === 0 && wrong_cells_list.length === 0) {
            gameOn = false;
            pauseTimer = true;
            document.getElementById("game-difficulty").innerText = "Solved";
            clearInterval(intervalId);
            alert("Congrats, You solved it.");
        } else {
            // add one minute to the stopwatch as a cost for given hint
            timer += 60;

            // get random cell from empty or wrong list and put the currect value in it
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
                remaining[input.value - 1]--;
            } else {
                var index = Math.floor(Math.random() * wrong_cells_list.length);
                input = table.rows[wrong_cells_list[index][0]].cells[
                    wrong_cells_list[index][1]
                    ].getElementsByTagName("input")[0];
                input.oldvalue = input.value;
                remaining[input.value - 1]++;
                input.value =
                    solution[wrong_cells_list[index][0]][wrong_cells_list[index][1]];
                remaining[input.value - 1]--;
            }

            // update remaining numbers table
            updateRemainingTable();
        }

        // make updated cell blinking
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
    // to hide navigation bar if it opened
    hideHamburgerClick();

    var dialog = document.getElementById(dialogId);
    var dialogBox = document.getElementById(dialogId + "-box");
    dialogBox.focus();
    dialog.style.opacity = 0;
    dialogBox.style.marginTop = "-500px";
    dialog.style.display = "block";
    dialog.style.visibility = "visible";

    // to view and move the dialog to the correct position after it set visible
    setTimeout(function () {
        dialog.style.opacity = 1;
        dialogBox.style.marginTop = "64px";
    }, 200);
}

// show more option menu
function moreOptionButtonClick() {
    var moreOptionList = document.getElementById("more-option-list");

    // timeout to avoid hide menu immediately in window event
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
        //dialog.style.display = "none";
    }, 500);
}

// hide hamburger menu when click outside
function hideHamburgerClick() {
    var div = document.getElementById("hamburger-menu");
    var menu = document.getElementById("nav-menu");
    menu.style.left = "-256px";

    setTimeout(function () {
        div.style.opacity = 0;
        //divstyle.display = "none";
        div.style.visibility = "collapse";
    }, 200);
}

// sudoku solver section

function sudokuSolverMenuClick() {
    // hide hamburger menu
    hideHamburgerClick();

    //stop current game if its running
    if (gameOn) {
        gameOn = false;
        clearInterval(intervalId);
    }

    solution = [];
    canSolved = true;
    isSolved = false;

    // generate empty grid
    var grid = [];
    for (var i = 0; i < rowCount; i++) {
        grid.push("");
        for (var j = 0; j < columnCount; j++) {
            grid[i] += "0";
        }
    }

    // view empty grid... allow user to edit all cells
    ViewPuzzle(grid);

    // update remaining table
    remaining = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    updateRemainingTable();

    // show solve and check unique buttons
    // hide other buttons
    document.getElementById("moreoption-sec").style.display = "none";
    document.getElementById("pause-btn").style.display = "none";
    document.getElementById("check-btn").style.display = "none";
    document.getElementById("isunique-btn").style.display = "block";
    document.getElementById("solve-btn").style.display = "block";
    document.getElementById("solve-dropdown").style.display = "block";

    // change status card view
    // timer for time takes to solve grid
    // gameid show text "sudoku solver"
    // difficulty show if grid solved is unique
    document.getElementById("timer-label").innerText = "Solve time";
    document.getElementById("timer").innerText = "00:00";
    document.getElementById("game-difficulty-label").innerText = "Is unique";
    document.getElementById("game-difficulty").innerText = "Unknown";
    document.getElementById("game-number").innerText = "#Soduko_Solver";

    //focus first cell
    document
        .getElementById("puzzle-grid")
        .rows[0].cells[0].getElementsByTagName("input")[0]
        .focus();
}

function solveButtonClick() {
    if (gameOn) {
        gameOn = false;
        clearInterval(intervalId);
    }

    var result = solveSudoku(true);
    switch (result) {
        case 0:
            alert("SOLVED");
            break;
        case 1:
            alert("This grid is already solved");
            break;
        case 2:
            alert("This grid can't be solved because of an invalid input");
            break;
        case 3:
            alert("this grid has no solution");
            break;
    }
}

function isUniqueButtonClick() {
    // check if gird is already solved
    // if not try to solve it

    if (!isSolved) {
        if (canSolved) solveSudoku(false);
    }
    if (!isSolved) {
        alert("Can't check this grid because it is unsolvable!");
        return;
    }

    // solve it again but start from the end
    var columns = getColumns(puzzle);
    var blocks = getBlocks(puzzle);
    var solution2 = solveGrid(generatePossibleNumber(puzzle, columns, blocks), puzzle,false);

    // if tow solutions are equals then it is unique and vice versa
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

    //display the result
    document.getElementById("game-difficulty").innerText = unique ? "Yes" : "No";
}

function gridSettings(rowCount, columnCount) {
    var table = document.getElementById("puzzle-grid");
    var index = 1;
    if (rowCount === 16) document.getElementById("game-status").style.width = "200px";
    else document.getElementById("game-status").style.width = "inherit";
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    if (rowCount === 4) blockCount = 2;
    else if (rowCount === 9) blockCount = 3;
    else if (rowCount === 16) blockCount = 4;
    table.innerHTML = "";
    for(var i = 0; i < rowCount; i++) {
        var row = table.insertRow(i);
        if (rowCount == 4) row.classList.add("tr-2");
        else if (rowCount == 9) row.classList.add("tr-3");
        else if (rowCount == 16) row.classList.add("tr-4");

        for(var j = 0; j < columnCount; j++) {
            var cell1 = row.insertCell(j);
            if (rowCount == 4) {
                cell1.classList.add("td-2");
                cell1.innerHTML = "<input type=\"text\" maxlength=\"1\" onchange=\"checkInput(this)\" disabled />";
            }
            else if (rowCount==9) {
                cell1.innerHTML= '<input class="js-field" maxLength="1" type="text" data-index="' + (index) +'" data-row="' + i +'" data-col="' + j +'"/>';
                cell1.classList.add("td-3");
                index++;
                //cell1.innerHTML = "<input type=\"text\" maxlength=\"1\" onchange=\"checkInput(this)\" disabled />";
            }
            else if (rowCount == 16) {
                cell1.classList.add("td-4");
                cell1.innerHTML= '<input class="js-field" maxLength="2" type="text" data-index="' + (index) +'" data-row="' + i +'" data-col="' + j +'"/>';
                index++;
            }

        }
    }
    mainFunction();
    sudokuSolverMenuClick();
    var so = new Sudoku(document.getElementById("sudoku"));
}

class Sudoku {
    constructor(container, { controls = true, pauseOnGuess = false } = {}) {
        this.container = document.getElementById("puzzle-grid");
        var controlContainer = document.getElementById("controls");
        this._pauseOnGuess = pauseOnGuess;
        this.init(controls);
        if (controls) {
            controlContainer.querySelector(".js-solve").addEventListener("click", ev => this.solve());
            controlContainer.querySelector(".js-play").addEventListener("click", ev => this.stepSolve());
            controlContainer.querySelector(".js-pause").addEventListener("click", ev => this.pause());
            controlContainer.querySelector(".js-continue").addEventListener("click", ev => this.continue());
            controlContainer.querySelector(".js-reset").addEventListener("click", ev => this.reset());
            controlContainer.querySelector(".js-clear").addEventListener("click", ev => this.clearBoard());
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
                log(container, `Allowed digits:
      ${b2ds(analyze(this.readBoard()).allowed[index]).join(", ")}`);
            });
            input.addEventListener("keydown", ev => {
                let idx = +input.dataset.index;
                if (ev.keyCode >= 48 && ev.keyCode <= 57) {
                    input.value = String.fromCharCode(ev.keyCode);
                    if (input.value == "0") input.value = "";
                    input.select();
                    ev.preventDefault();
                } else {
                    let parent = input.parentNode;
                    let next;
                    switch (ev.keyCode) {
                        case 38: // ↑
                            next = idx - 9; break;
                        case 40: // ↓
                            next = idx + 9; break;
                        case 39: // →
                            next = idx + 1; break;
                        case 37: // ←
                            next = idx - 1; break;
                    }
                    if (next != null) {
                        if (next < 0) next += 81;
                        next %= 81;
                        next = parent.querySelector(`input[data-index="${next}"]`);
                        next.focus();
                        next.select();
                        ev.preventDefault();
                    }
                }
            });
        });
    }

    pause() {
        clearTimeout(this._playTimer);
        this.container.classList.add("paused");
    }

    continue() {
        this.container.classList.remove("paused");
        this._playCont();
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
        this.writeBoard(this._initBoard || [], true);
    }

    _reset() {
        let el = this.container;
        clearTimeout(this._playTimer);
        el.classList.remove("solved", "playing", "paused");
        log(el, "");
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
            stats();
            self.writeBytes(board);
            el.classList.add("solved");
        } else {
            stats();
            alert("no solution");
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
            log(el, `${dcount} digits placed<br>${backtrack} take-backs<br>${guesswork} guesses<br>${Date.now() - time} milliseconds`);
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
            log(el, `${backtrack} take-backs<br>${guesswork} guesses`);
            el.classList.remove("playing");
            if (success) {
                self.writeBytes(board);
                el.classList.add("solved");
            } else {
                alert("no solution");
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
                    stats();
                    cb(false);
                } else if (moves & m) {
                    dcount++;
                    stats();
                    board[index] = m;
                    self.writeBytes(board);
                    el.querySelector('input[data-index="' + index + '"]').classList.add("current");
                    self._playTimer = setTimeout(self._playCont = () =>
                        solve(success => success ? cb(true) : loop(moves ^ m, m << 1)), 100);
                } else loop(moves, m << 1);
            };
            loop(moves, 1);
        }
        function stats() {
            log(el, `${dcount} digits placed<br>${backtrack} take-backs<br>${guesswork} guesses`);
        }
    }
}

function i2rc(index) {
    return { row: index / 9 | 0, col: index % 9 };
}

function rc2i(row, col) {
    return row * 9 + col;
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

function log(el, txt) {
    let out = el.querySelector(".js-console");
    if (out)
        out.innerHTML = txt;
}

function getMoves(board, index) {
    let { row, col } = i2rc(index);
    let r1 = 3 * (row / 3 | 0);
    let c1 = 3 * (col / 3 | 0);
    let moves = 0;
    for (let r = r1, i = 0; r < r1 + 3; r++) {
        for (let c = c1; c < c1 + 3; c++, i++) {
            moves |= board[rc2i(r, c)]
                | board[rc2i(row, i)]
                | board[rc2i(i, col)];
        }
    }
    return moves ^ 511;
}

function unique(allowed, index, value) {
    let { row, col } = i2rc(index);
    let r1 = 3 * (row / 3 | 0);
    let c1 = 3 * (col / 3 | 0);
    let ir = 9 * row;
    let ic = col;
    let uniq_row = true, uniq_col = true, uniq_3x3 = true;
    for (let r = r1; r < r1 + 3; ++r) {
        for (let c = c1; c < c1 + 3; ++c, ++ir, ic += 9) {
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
    for (let i = 0; i < 81; i++) if (!board[i]) {
        let moves = allowed[i];
        let len = 0;
        for (let m = 1; moves; m <<= 1) if (moves & m) {
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