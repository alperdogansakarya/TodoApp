// Tüm elementleri seçme işlemimiz! ! !
const form = document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
 const secondCardBody = document.querySelectorAll(".card-body")[1];
 const filter = document.querySelector("#filter");
 const clearButton = document.querySelector("#clear-todos");

 eventListeners();

function eventListeners(){  // tüm event listenerler burada olacak.
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
// todoları arayüzden kaldırma temizleme işlemi.

    if(confirm("Tümünü Silmek istediğinize emin misiniz")){
   // todoList.innerHTML="";        // bu yavaş bir yöntem     

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
localStorage.removeItem("todos");

    }
}

function filterTodos(e){
    const filterValue  = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");
    listItem.forEach(function(listItem){
const text = listItem.textContent.toLowerCase();
if(text.indexOf(filterValue) === -1){
    //BULAMADI 
    listItem.setAttribute("style", "display:none !important");
}
else{
    listItem.setAttribute("style", "display:block ");
}
    })
}

function deleteTodo(e){

    if (e.target.className=== "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorages(e.target.parentElement.parentElement.textContent);
        showAlert("danger","Todonuz kaldırıldı :)");
        
    }

}
 
function deleteTodoFromStorages(deletetodo){

let todos= getTodosFromStorage();
todos.forEach(function(todo,index){
if(todo === deletetodo){
    todos.splice(index,1);  // arreyden değeri silebiliriz.

}

});
localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){ // tüm event listener
    const newTodo= todoInput.value.trim();

    if (newTodo === ""){
            
        
       showAlert("danger","lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todonuz Başarıyla Eklenmiştir :)");
    }
    


    e.preventDefault();
}

function getTodosFromStorage(newTodo) { // bu fonksiyon bütün todoları alıcak
    let todos; 
    if (localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos; 

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    // set time out metodu ile belli bir saniye sonra işlem gerçekleştirme yapılır
    setTimeout(function() {
        alert.remove();
    },1000);
}

function addTodoToUI(newTodo){ 
      //  burda aldığı string değerini list item olarak arayüze ekleyecek
/*<li class="list-group-item d-flex justify-content-between">
Todo 1
<a href = "#" class ="delete-item">
<i class = "fa fa-remove"></i>
</a>
</li> 
*/
// list item oluşturma işlemi



const listItem= document.createElement("li");
const link=document.createElement("a");

// link oluşturma işlemimiz
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";

listItem.className="list-group-item d-flex justify-content-between"

// text note oluşturma işlemi
listItem.appendChild(document.createTextNode(newTodo));

listItem.appendChild(link);

todoList.appendChild(listItem);
todoInput.value= "";




} 