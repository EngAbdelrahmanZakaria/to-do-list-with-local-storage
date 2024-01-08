let input       = document.querySelector('input.input');
let btn         = document.querySelector('input.add');
let tasks       = document.querySelector('.tasks');
let formdiv     = document.querySelector('.form');
let tasksArray  = [];

if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
}

getfromlocal()

btn.onclick = function() {
    if (input.value === '') {
        let errorMSG = document.createElement('h3');
        errorMSG.className = 'error';
        errorMSG.innerHTML = 'Don\'t let input empty'
        formdiv.appendChild(errorMSG)
        setInterval(function(){
            errorMSG.remove()
        },4000)
    } else {
        addTaskTOArray(input.value);
        input.value = ''
    }
}

tasks.addEventListener('click', (e)=>{
    if (e.target.classList.contains('del')) {
        removeFromLocal(e.target.parentElement.getAttribute('id'))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains('task')) {
        toggleCompleted(e.target.getAttribute('id'))
        e.target.classList.toggle('done')
    }
})

function addTaskTOArray(inputText) {
    const taskaya = {
        id: Date.now(),
        title: inputText,
        completed: false,
    }
    tasksArray.push(taskaya);
    addtotasks(tasksArray)
    addtolocal(tasksArray)
}

function addtotasks() {
    tasks.innerHTML = '';
    tasksArray.forEach( (taskaya)=>{
        let taskayadiv = document.createElement('div');
        if (taskaya.completed === false) {
            taskayadiv.className = 'task';
        } else {
            taskayadiv.className = 'task done';
        }
        taskayadiv.appendChild(document.createTextNode(taskaya.title));
        taskayadiv.setAttribute('id', taskaya.id)
        tasks.appendChild(taskayadiv)
        let deleteBtn = document.createElement('span');
        deleteBtn.className = 'del';
        deleteBtn.innerHTML = 'delete';
        taskayadiv.appendChild(deleteBtn);
    } );
}

function addtolocal(array) {
    window.localStorage.setItem('tasks', JSON.stringify(array))
}
function getfromlocal() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data)
        addtotasks(tasks)
    }
}
function removeFromLocal(remove) {
    tasksArray = tasksArray.filter((taskaya)=>taskaya.id != remove)
    addtolocal(tasksArray)
}
function toggleCompleted(edit) {
    console.log(edit)
    for (let i = 0; i<tasksArray.length; i++) {
        if (tasksArray[i].id == edit) {
            tasksArray[i].completed == false ? tasksArray[i].completed = true : tasksArray[i].completed = false 
        }
    }
    addtolocal(tasksArray)
}