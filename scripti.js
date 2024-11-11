const aaddTask = document.querySelector('#aadd-task')
const taskInput = document.querySelector('#task-input')

const listContainer = document.querySelector('#list-container')
const error = document.querySelector('#error')



async function getTasks(){
    try{
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852')

        const data = await res.json()

        

        console.log(data)
        data.forEach(task => createListItem(task.title))
        

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

        const data = await res.json()

        console.log(data)
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


    }
    catch (error){
        console.log('fel', error)
    }
}




// Funktion som lyssnar efter en submit och skickar iväg min uppgift till formuläret
aaddTask.addEventListener('submit', e => {
    e.preventDefault()

    const task = document.querySelector('#task-input').value

    addTask(task)
    createListItem(task)

    console.log(task)
    taskInput.value = ''
    return task
})

// Funktion som skapar mina uppgifter i html filen
function createListItem(task) {

    if(task === ''){
        if(!document.querySelector('.error')){

            let errorMsg = document.createElement('span')
            errorMsg.textContent = 'You need to enter a task'
            errorMsg.classList.add('error')
            error.appendChild(errorMsg)
            console.log(errorMsg)
        }
       
        
        return
    } else{

        const existingError = document.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }

        
        
        let li = document.createElement('li');
        li.classList.add('task-card');

    let taskText = document.createElement('span')
    taskText.textContent = task || task.title;
    
    li.appendChild(taskText);

    let button = document.createElement('button');
    button.textContent = ' X ';
    button.classList.add('delete-btn');

    li.appendChild(button);

    button.addEventListener('click', e => {
        e.stopPropagation()
        li.remove();
    })

    li.addEventListener('click', e => {
        taskText.classList.toggle('complete')
    })

    listContainer.appendChild(li);
    }    
}

