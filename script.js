//js runs often faster then html iitself. so we use DOMContentLoaded to execute once html has been loaded.
document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('employee-form');
    let tableBody = document.getElementById('employee-body');


    //using addEventListener to see if user has clicked submit or not
      if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
//getting data from the web
//document.getelement searches by name email
            let newEmployee = {
                id: Date.now(), // Unique ID based on time
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                position: document.getElementById('position').value,
                department: document.getElementById('department').value,
                salary: document.getElementById('salary').value
            };
//creates new employee, localStorage only stores string, json.parse to convert string into js object
            let employees = JSON.parse(localStorage.getItem('employees')) || []; //data saved in local is checked first if not it is left as it is

            employees.push(newEmployee); //adds employee at the end of the  list
            localStorage.setItem('employees', JSON.stringify(employees));//local storage holds only string, json.stringify js object into string so that you can store locally

            alert('Employee Registered Successfully!');
            form.reset();
            
        });
    }

    // This section only runs if the table body is found on the current page
    if (tableBody) {
        let employees = JSON.parse(localStorage.getItem('employees'));

        // If storage is empty (first time user), set up original employees
        if (!employees || employees.length === 0) {
            employees = [
                { id: 1, name: "Sandeep", email: "sandeep@email.com", department: "Software developer", position: "Frontend developer", salary: "90000" },
                { id: 2, name: "Chinni", email: "chinni@email.com", department: "Marketing", position: "HR", salary: "75000" },
                { id: 3, name: "Dikshya", email: "dikshya@email.com", department: "Software developer", position: "Backend Java developer", salary: "70000" },
                { id: 4, name: "Lama", email: "Lama@email.com", department: "Quality Analysts", position: "Tester", salary: "85000" },
                { id: 5, name: "Nitesh", email: "nitesh@email.com", department: "Business Analysts", position: "Lead Analysts", salary: "95000" }
            ];
            localStorage.setItem('employees', JSON.stringify(employees));
        }

        // Render the table
        renderTable(employees, tableBody);
    }
});

//outside dom and it runs first
function renderTable(employees, container) {
    container.innerHTML = ''; // Clear existing rows
    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>$${Number(emp.salary).toLocaleString()}</td>
            <td><button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button></td>
        `;
        container.appendChild(row);
    });
}

//delete funtion
function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees = employees.filter(emp => emp.id !== id);
        localStorage.setItem('employees', JSON.stringify(employees));
        location.reload(); 
    }
}