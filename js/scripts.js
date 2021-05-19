const listData = {};


var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};



const container = document.querySelector(".contenedor");

let currentToDoIndex = 1;

const setEventListeners = (idx) => {



    const inputBox = document.querySelector(`#todo-${idx} .inputField input`);
    const addBtn = document.querySelector(`#todo-${idx} .inputField button`);
   
    const deleteAllBtn = document.querySelector(`#todo-${idx} .footer button`);

    inputBox.onkeyup = () => {
        let userData = inputBox.value;
        if (userData.trim() != 0) {
            addBtn.classList.add("active");
        } else {
            addBtn.classList.remove("active");
        }
    }
    showTask(idx);

    addBtn.onclick = () => {

        let userData = inputBox.value;
        let getLocalStorage = localStorage.getItem("New Todo");
    
        if (getLocalStorage == null) {
            listArr = [];
    
        } else {
            listArr = JSON.parse(getLocalStorage);
        }
    
        listArr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        showTask(idx);
        addBtn.classList.remove("active");
    }

    deleteAllBtn.onclick = () => {
        listArr = [];
        localStorage.setItem("New Todo", JSON.stringify(listArr));
        showTask(idx);
    }

}

const generateToDo = () => {
    const todoHtml = stringToHTML(`
    <div id="todo-${currentToDoIndex}" class="wrapper">
        <header>To do</header>
        <div class="inputField">
            <input type="text" placeholder="Add new item">
            <button><i class="fas fa-plus"></i></button>
        </div>
        <ul class="todoList">
                        
        </ul>
        <div class="footer">
            <span>You have <span class="pendingNumb"></span> items pending</span>
            <button>Clear All</button>
        </div>
    </div>`);

    container.appendChild(todoHtml);

    setEventListeners(currentToDoIndex);

    currentToDoIndex++;

}

/*







//evento del click
//primero agregas el id="newList" al boton
let btn = document.getElementById("newList")

btn.addEventListener("click", () => {
        
    //seleccionas donde lo vas a insertar
    let contenedor = document.getElementById("contenedor")
    contenedor.innerHTML += temp

        

        
})

*/
















//showTask permite agregar una tarea nueva a la lista dentro de el ul

function showTask(idx) {

    const deleteAllBtn = document.querySelector(`#todo-${idx} .footer button`);  
    const todoList = document.querySelector(`#todo-${idx} .todoList`);
    const inputBox = document.querySelector(`#todo-${idx} .inputField input`);

    

    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask((${index}, ${idx}))";><i class="fas fa-trash"></i></span></li>`; //Concateno un li a la lista
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = ''; 
}


//Elminar tarea

function deleteTask(index, idx) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //Elimina desde el indice en particular li

    //Despues sacar el li denuevo hay que actualizar el local storage

    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTask(idx);
}

//Limpiar tareas




const generateToDoBtn = document.querySelector("#newList");

generateToDoBtn.onclick = generateToDo;


/*let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];

    } else {
        listArr = JSON.parse(getLocalStorage); //Transformar un json string en un objeto de js
    }
    const pendingNumb = document.querySelector(".pendingNumb");

    pendingNumb.textContent = listArr.length;*/