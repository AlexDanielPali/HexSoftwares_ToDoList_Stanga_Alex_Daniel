const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo=null;
//Add task function
const addTodo= () => {
    const inputText=inputBox.value.trim();
    if(inputText.length <=0){
        alert('You must write something your to do list!');
        return false;  
    }
    if(addBtn.value==="Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML=inputText;
        addBtn.value="Add";
        inputBox.value="";
    return false;
}
    else{
    //Creating p tag and li tag.
    const li=document.createElement('li');
    const p=document.createElement('p');
    p.innerHTML=inputText;
    li.appendChild(p);

    

    //Creating the edit button.
    const editBtn=document.createElement('button');
    editBtn.innerText='Edit';
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);


    //Creating the delete button.
    const deleteBtn=document.createElement('button');
    deleteBtn.innerText='Delete';
    deleteBtn.classList.add("btn","deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value="";

    saveLocalTodos(inputText);
    }
    
    
}
//Update task function. Used to edit or delete a task.
const updateTodo=(e)=>{
    
    if(e.target.innerHTML==="Delete"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML==="Edit"){
        inputBox.value=e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value="Edit";
        editTodo=e;

    }
}
//Saving task to local storage.
const saveLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
   
    
}
//Getting tasks from the local storage. In case if it gets deleted.
const getLocalTodos=()=>{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
        todos.forEach(todo=>{
            //Creating p tag and li tag.
            const li=document.createElement('li');
            const p=document.createElement('p');
            p.innerHTML=todo;
            li.appendChild(p);

    

            //Creating the edit button.
            const editBtn=document.createElement('button');
            editBtn.innerText='Edit';
            editBtn.classList.add("btn","editBtn");
            li.appendChild(editBtn);


            //Creating the delete button.
            const deleteBtn=document.createElement('button');
            deleteBtn.innerText='Delete';
            deleteBtn.classList.add("btn","deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);


            })
        }
}
//Delete tasks from local storage.
const deleteLocalTodos=(todo)=>{
 let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    let todoText=todo.children[0].innerHTML;;
    //console.log(todoText.children[0].innerHTML +" has been deleted");
    let todoIndex= todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    //Array fuctions: slice/splice.
    //console.log(todoIndex);
    
}
//Edit tasks from local storage.
const editLocalTodos=(todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}
//Event listeners
document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click', addTodo );
todoList.addEventListener('click',updateTodo);

 //console.log(localStorage.getItem('todos'));
    //console.log(JSON.parse(localStorage.getItem('todos')));
    //console.log(todos);
    //
    //Above code is used only if you want to display on the console on the actions performed.