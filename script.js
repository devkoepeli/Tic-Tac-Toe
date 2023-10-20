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
            if (fieldValue) {
                tableHTML += fieldValue;
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
                <circle cx="25" cy="25" r="20" stroke="#01B9EF" stroke-width="8" fill="none" />
            </svg>
        </div>
    `;
}


function generateSVGCross() {
    return `
    <div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="5" x2="45" y2="45" stroke="#FDC600" stroke-width="8" />
            <line x1="5" y1="45" x2="45" y2="5" stroke="#FDC600" stroke-width="8" />
        </svg>
    </div>
    `;
}