const inputBox = document.querySelector('.inputfield input')
const addBtn = document.querySelector('.inputfield button');
const todoList = document.querySelector('.todoList')
const clearAll = document.querySelector('.footer button')
const NumberOfPendingTasks = document.querySelector('.footer span')


//helps when page refreshes
setTodo();

//input tag when empty then unactive the add button
inputBox.addEventListener("keyup",()=>{
    let userData = inputBox.value;
    if(userData != ''){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");
    }
});

//add button click functionality
addBtn.addEventListener("click",()=>{
    setTodo();
    inputBox.value = '';
    addBtn.classList.remove("active");
});

//updates the  todo list items
function setTodo(){
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        Arr = [];
    }
    else{
        Arr = JSON.parse(getLocalStorage);
    }

    if(userData!= ""){
        Arr.push(userData);
    }
    localStorage.setItem("New Todo",JSON.stringify(Arr));

    if(Arr.length > 0){
        clearAll.classList.add("active");
    }
    else{
        clearAll.classList.remove("active");
    }

    li_Ele = '';
    Arr.forEach((element,index) => {
        li_Ele = li_Ele + `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = li_Ele;

    pendingTasksNumber(Arr);
}

//clear all button 
clearAll.addEventListener("click",()=>{
    localStorage.clear();
    setTodo();
});

//you have 4 pending taks functionallity
function pendingTasksNumber(Arr){
    let ArrLen = Arr.length;
    num = `<span>You have <strong>${ArrLen}</strong> pending tasks</span>`;
    NumberOfPendingTasks.innerHTML = num;
}

//individual delete tasks functionallity
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    Arr = JSON.parse(getLocalStorage);
    Arr.splice(index, 1);
    localStorage.setItem("New Todo",JSON.stringify(Arr));
    setTodo();
}


//setting date
const dataCurrent = document.querySelector('.date');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
dataCurrent.innerText = today;