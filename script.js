let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]


let currentPlayer = 'circle'; // Startspieler (circle beginnt)
let gameIsOver = false; // checking end of game


document.addEventListener('DOMContentLoaded', init);


function init() {
    render();
}


function render() {
    const container = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) { // tabellenzeile
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) { // tabellenzelle
            tableHTML += `<td id="table-cell${i * 3 + j}" onclick="addIcon(${i * 3 + j})"></td>`;
        } // calulating each field to get the value out of the array, starting after each i iteration with 0, 3, 6
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}


function addIcon(index) {
    if (fields[index] === null && !gameIsOver) {
        fields[index] = currentPlayer;
        const cell = document.getElementById(`table-cell${index}`);
        cell.innerHTML = (currentPlayer === 'circle') ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // remove the onclick-attribute, to prevent further clicks
        changePlayer();
        checkGameStatus(); // Überprüfe das Spielende nach jedem Zug
    }
}


function changePlayer() {
    currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle'; // ternary operator
}


function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination; // winninCombinations[0] -> [0, 1, 2] -> const [0, 1, 2]
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) { // fields[0] = 'circle' stimmen die Werte überein?
            gameIsOver = true;
            if (gameIsOver) {
                drawWinningLine(a, b, c);
            }
            return;
        }
    }
    isGameFinished();
}


function isGameFinished() { // überprüfen ob jedes Feld ungleich null ist, gefüllt
    if (fields.every(field => field !== null)) {
        gameIsOver = true;
    }
}


function drawWinningLine(a, b, c) {
    const container = document.getElementById('content');
    const x1 = a % 3 * 100 + 50; // x-Koordinate des ersten Elements
    const y1 = Math.floor(a / 3) * 100 + 50; // y-Koordinate des ersten Elements
    const x2 = c % 3 * 100 + 50; // x-Koordinate des dritten Elements
    const y2 = Math.floor(c / 3) * 100 + 50; // y-Koordinate des dritten Elements

    const lineSVG = `
        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="5" />
            <animate attributeName="stroke-opacity" from="0" to="1" dur="250ms" begin="0s" fill="freeze" />
        </svg>
    `;

    const lineElement = document.createElement('div');
    lineElement.innerHTML = lineSVG;
    lineElement.style.position = 'absolute';
    lineElement.style.top = '0';
    lineElement.style.left = '0';
    lineElement.style.right = '0';
    container.appendChild(lineElement);
}


function generateCircleSVG() {
    return `
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" stroke="#01B9EF" stroke-width="8" fill="none">
            <animate attributeName="r" from="0" to="20" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="stroke-opacity" from="0" to="1" dur="250ms" begin="0s" fill="freeze" />
        </circle>
        </svg>
    </div>
    `;
}


function generateCrossSVG() {
    return `
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="25" x2="25" y2="25" stroke="#FDC600" stroke-width="8">
            <animate attributeName="x1" from="25" to="5" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="y1" from="25" to="5" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="x2" from="25" to="45" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="y2" from="25" to="45" dur="250ms" begin="0s" fill="freeze" />
            </line>
            <line x1="25" y1="25" x2="25" y2="25" stroke="#FDC600" stroke-width="8">
            <animate attributeName="x1" from="25" to="5" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="y1" from="25" to="45" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="x2" from="25" to="45" dur="250ms" begin="0s" fill="freeze" />
            <animate attributeName="y2" from="25" to="5" dur="250ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    </div>
  `;
}