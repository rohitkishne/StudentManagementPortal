const formData = document.getElementById("student-form")
const studentDisply = document.getElementById("student-data-body")
const sortStudent = document.getElementById("search")

let studentData = [];

formData.addEventListener("submit", function(event) {

    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let gpa = document.getElementById("gpa").value;
    let age = document.getElementById("age").value;
    let degree = document.getElementById("degree").value;

    let data = {
        name : name,
        email : email,
        gpa : gpa,
        age : age,
        degree : degree
    }

    studentData.push(data);

    displayData();

    formData.reset();
})


function displayData() {
    studentDisply.innerHTML = '';
    studentData.forEach((student ,index) => {
        studentDisply.innerHTML += `
                                <tr>
                                    <td>${index+1}</td>
                                    <td>${student.name}</td>
                                    <td>${student.email}</td>
                                    <td>${student.age}</td>
                                    <td>${student.gpa}</td>
                                    <td>${student.degree}</td>
                                    <td>
                                        <button id="update-student" class="update-student" onclick="update('${index}')"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
                                        <button id="delete-student" class="delete-student" onclick="deleteStudent('${index}')"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>
                                    </td>
                                    
                                </tr>  
                                    `
    });
}



function deleteStudent(index) {
    studentData.splice(index,1);
    displayData();
}

const updateStudentBtn = document.getElementById("update-btn");
const addStudent = document.getElementById("add-student");

function openUpdateButton() {
    updateStudentBtn.style.display = 'block'
    addStudent.style.display = 'none'

}
function closeUpdateBtn() {
    updateStudentBtn.style.display = 'none'
    addStudent.style.display = 'block'
    formData.reset();

}

 
function update(index) {
    openUpdateButton();
    let updateStudent = studentData[index];

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let gpa = document.getElementById("gpa");
    let age = document.getElementById("age");
    let degree = document.getElementById("degree");

    name.value = updateStudent.name;
    email.value = updateStudent.email;
    gpa.value = updateStudent.gpa;
    age.value = updateStudent.age;
    degree.value = updateStudent.degree;

    function updateStudentHandler(event) {
        event.preventDefault();
        updateStudent = {
            name: name.value,
            email: email.value,
            gpa: gpa.value,
            age: age.value,
            degree: degree.value
        }
        studentData[index] = updateStudent;
        displayData();
        closeUpdateBtn();
        
    }

    updateStudentBtn.removeEventListener("click", updateStudentHandler);
    updateStudentBtn.addEventListener("click", updateStudentHandler);
}

sortStudent.addEventListener("keyup", (event) =>{
    const searchkeyword = event.target.value;
    let filterStudent = searchStudent(searchkeyword);
    if(searchkeyword === '')
    {
        displayData(studentData);
    }
    else
    {
        studentDisply.innerHTML = '';
        filterStudent.forEach((student ,index) => {
        studentDisply.innerHTML += `
                                <tr>
                                    <td>${index+1}</td>
                                    <td>${student.name}</td>
                                    <td>${student.email}</td>
                                    <td>${student.age}</td>
                                    <td>${student.gpa}</td>
                                    <td>${student.degree}</td>
                                    <td>
                                        <button id="update-student" class="update-student" onclick="update(event,'${index}')"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i></button>
                                        <button id="delete-student" class="delete-student" onclick="deleteStudent('${index}')"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>
                                    </td>
                                    
                                </tr>  
                                    `
    });
    }

})

function searchStudent(searchkeyword) {
    return studentData.filter((stud) => {
        return stud.name.toLowerCase().includes(searchkeyword.toLowerCase()) ||
        stud.email.toLowerCase().includes(searchkeyword.toLowerCase()) ||
        stud.degree.toLowerCase().includes(searchkeyword.toLowerCase());
    })
}
