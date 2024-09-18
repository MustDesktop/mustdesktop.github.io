document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.getElementById('save-button').addEventListener('click', () => {
        const name = document.getElementById('table-name').value;
        const day = document.getElementById('day').value;
        const crn = document.getElementById('crn').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        if (name && day && crn && startTime && endTime) {
            const tableBody = document.querySelector('#time-table-list tbody');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${day}</td>
                <td>${crn}</td>
                <td>${startTime} to ${endTime}</td>
                <td>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
            
            // Clear form fields
            document.getElementById('schedule-form').reset();
            
            // Add delete and edit functionality
            row.querySelector('.delete-button').addEventListener('click', () => {
                tableBody.removeChild(row);
                saveData();
            });

            row.querySelector('.edit-button').addEventListener('click', () => {
                document.getElementById('table-name').value = name;
                document.getElementById('day').value = day;
                document.getElementById('crn').value = crn;
                document.getElementById('start-time').value = startTime;
                document.getElementById('end-time').value = endTime;
                tableBody.removeChild(row);
                saveData();
            });

            saveData();
        }
    });

    document.getElementById('export-excel').addEventListener('click', () => {
        exportTableToExcel();
    });

    document.getElementById('export-image').addEventListener('click', () => {
        exportTableToImage();
    });
});

function saveData() {
    const tables = [];
    const rows = document.querySelectorAll('#time-table-list tbody tr');
    
    rows.forEach(row => {
        const name = row.children[0].textContent;
        const day = row.children[1].textContent;
        const crn = row.children[2].textContent;
        const time = row.children[3].textContent;
        tables.push({ name, day, crn, time });
    });

    localStorage.setItem('timeTables', JSON.stringify(tables));
}

function loadData() {
    const savedTables = JSON.parse(localStorage.getItem('timeTables')) || [];
    const tableBody = document.querySelector('#time-table-list tbody');

    savedTables.forEach(table => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${table.name}</td>
            <td>${table.day}</td>
            <td>${table.crn}</td>
            <td>${table.time}</td>
            <td>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add delete and edit functionality
        row.querySelector('.delete-button').addEventListener('click', () => {
            tableBody.removeChild(row);
            saveData();
        });

        row.querySelector('.edit-button').addEventListener('click', () => {
            document.getElementById('table-name').value = table.name;
            document.getElementById('day').value = table.day;
            document.getElementById('crn').value = table.crn;
            document.getElementById('start-time').value = table.time.split(' to ')[0];
            document.getElementById('end-time').value = table.time.split(' to ')[1];
            tableBody.removeChild(row);
            saveData();
        });
    });
}

function exportTableToExcel() {
    const table = document.getElementById('time-table-list');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    // Remove the 'Actions' column before exporting
    const ws = wb.Sheets.Sheet1;
    const range = XLSX.utils.decode_range(ws['!ref']);
    const actionsColumnIndex = 4; // Index of the 'Actions' column
    for (let R = range.s.r; R <= range.e.r; ++R) {
        const address = XLSX.utils.encode_cell({ r: R, c: actionsColumnIndex });
        delete ws[address];
    }
    XLSX.writeFile(wb, 'time_table.xlsx');
}

function exportTableToImage() {
    const table = document.getElementById('time-table-list');
    html2canvas(table, {
        backgroundColor: "#f0f0f0" // Set the background color
    }).then(canvas => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'time_table.png';
        link.click();
    });
}
function exportTableToImage() {
    const table = document.getElementById('time-table-list');
    const actionColumnIndex = 4; // Index of the 'Actions' column

    // Temporarily hide the 'Actions' column
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        row.children[actionColumnIndex].style.display = 'none';
    });

    // Generate the image
    html2canvas(table, {
        backgroundColor: "#f0f0f0" // Set the background color
    }).then(canvas => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'time_table.png';
        link.click();

        // Restore the 'Actions' column visibility
        rows.forEach(row => {
            row.children[actionColumnIndex].style.display = '';
        });
    });
}
function exportTableToExcel() {
    const table = document.getElementById('time-table-list');
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table, {
        raw: true,
        // Exclude the 'Actions' column (index 3) from the export
        ignoreCols: [3]
    });

    // Optional: Set custom column headers if needed
    worksheet['!cols'] = [
        { width: 20 }, // Name
        { width: 15 }, // Day
        { width: 15 }  // Time
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Time Table');
    XLSX.writeFile(workbook, 'time_table.xlsx');
}
