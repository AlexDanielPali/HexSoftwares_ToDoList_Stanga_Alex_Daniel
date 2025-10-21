const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');
const addTodo= () => {
    const inputText=inputBox.ariaValueMax.trim();
    if(inputText.lengt <=0){
        alert('You must write something your to do list!');
    }
    const li=document.createElement('li');
    const p=document.createElement('p');
    p.innerHTML=inputText;
    li.appendChild(p);

    toDoList.appendChild(li);
}
addBtn.addEventListener('click', addTodo );