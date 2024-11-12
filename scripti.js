const aaddTask = document.querySelector('#aadd-task')
const taskInput = document.querySelector('#task-input')

const listContainer = document.querySelector('#list-container')
const error = document.querySelector('#error')

const modal = document.querySelector('#modal-wrapper')
const closeModal = document.querySelector('#close-modal')
const modalWrapper = document.querySelector('#modal-wrapper')


async function getTasks(){
    try{
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852')

        const data = await res.json()

        

        console.log(data)
        data.forEach(task => createListItem(task))
        

    }
    catch (error){
        console.log('fel', error)
    }
}

getTasks()

async function addTask(task){
    try{
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: task})
        })

        const newTask = await res.json()

        createListItem(newTask)

        console.log(newTask)
    }
    catch (error) {
        console.log('fel', error)
    }

    
}

async function deleteTask(id){
    try{
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852`, {
            method: 'DELETE'
        })
        console.log(`task id ${id}`)

    }
    catch (error){
        console.log('fel', error)
    }
}


async function updateTask(id, completed){
    try{
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: completed})
        })

        const data = await res.json();

        console.log(data)
    }
    catch (error){
        console.log('Fel', error)
    }
}











// Funktion som lyssnar efter en submit och skickar iväg min uppgift till formuläret
aaddTask.addEventListener('submit', async e => {
    e.preventDefault()

    const taskTitle = document.querySelector('#task-input').value

    if(taskTitle === ''){
        if(!document.querySelector('.error')){
            let errorMsg = document.createElement('span')
            errorMsg.textContent = 'You need to enter a task'
            errorMsg.classList.add('error')
            error.appendChild(errorMsg)
            console.log(errorMsg)
        }
            
        
        
    } else{
        
        error.remove()
        
        
        await addTask(taskTitle)
    }

    
    taskInput.value = ''
    
})

// Funktion som skapar mina uppgifter i html filen
function createListItem(task) {

    
        const existingError = document.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }

        const id = task._id

        
        
        let li = document.createElement('li');
        li.classList.add('task-card');
        li.dataset._id = id

    let taskText = document.createElement('span')
    taskText.textContent = task.title;
    li.appendChild(taskText);
    if(task.completed){
        taskText.classList.add('complete')
    }
    
    

    let button = document.createElement('button');
    button.textContent = ' X ';
    button.classList.add('delete-btn');

    li.appendChild(button);

    button.addEventListener('click', async e => {
        e.stopPropagation()
        if(!task.completed){
            modal.style.display = 'block'
        }
        else{
            await deleteTask(id)
            li.remove();
        }



       
    })

    li.addEventListener('click', async e => {
        e.stopPropagation()
        const taskStatus = !task.completed
        await updateTask(id, !task.completed)
        taskText.classList.toggle('complete')
        task.completed = taskStatus
    })

    listContainer.appendChild(li);

    modalWrapper.addEventListener('click', e => {
        e.stopPropagation()
        if(e.target === modalWrapper){
            modal.style.display = 'none'
        }
    })

    modal.addEventListener('click', e => {
        e.stopPropagation()
        modal.style.display = 'none'
    })
        
}

