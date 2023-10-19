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
            tableHTML += '<td>';
            const fieldValue = fields[i * 3 + j];
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