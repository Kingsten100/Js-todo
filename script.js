const addTask = document.querySelector('#add-task')
const task = document.querySelector('#task-input').value
const taskInput = document.querySelector('#task-input')
const listContainer = document.querySelector('#list-container')
const error = document.querySelector('#error')

addTask.addEventListener('submit', e => {
    e.preventDefault()

    const task = document.querySelector('#task-input').value

    createListItem(task)

    console.log(task)
    taskInput.value = ''
    return task
})

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
    taskText.textContent = task;
    
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