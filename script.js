let fields = [
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,
    null
]


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
            tableHTML += `<td id="table-cell${i * 3 + j}" onclick="addIcon(${i * 3 + j})">`;
            const fieldValue = fields[i * 3 + j]; // calculating each field to get the value out of the array
            // starting after each i iteration with 0, 3, 6
            if (fieldValue === 'circle') {
                tableHTML += generateSVGCircle()
            }
            if (fieldValue === 'cross') {
                tableHTML += generateSVGCross();
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}


function addIcon(index) {
    fields[index] = 'cross';
    render();
}


function generateSVGCircle() {
    return `
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" stroke="#01B9EF" stroke-width="8" fill="none">
            <animate attributeName="r" from="0" to="20" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="stroke-opacity" from="0" to="1" dur="300ms" begin="0s" fill="freeze" />
        </circle>
        </svg>
    </div>
    `;
}


function generateSVGCross() {
    return `
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="25" x2="25" y2="25" stroke="#FDC600" stroke-width="8">
            <animate attributeName="x1" from="25" to="5" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="y1" from="25" to="5" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="x2" from="25" to="45" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="y2" from="25" to="45" dur="300ms" begin="0s" fill="freeze" />
            </line>
            <line x1="25" y1="25" x2="25" y2="25" stroke="#FDC600" stroke-width="8">
            <animate attributeName="x1" from="25" to="5" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="y1" from="25" to="45" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="x2" from="25" to="45" dur="300ms" begin="0s" fill="freeze" />
            <animate attributeName="y2" from="25" to="5" dur="300ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    </div>
  `;
}