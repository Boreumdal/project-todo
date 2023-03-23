let username

// Utility Functions
const upperCaseFirst = str => {
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

const getTodos = () => {
    return JSON.parse(localStorage.getItem('ArellanoMelvinTodoList'))
}

const addTodo = todo => {
    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify([...getTodos(), todo]))
}

const displayTodos = arr => {

    let existing = document.querySelector('div.item-container-body')

    if (existing){
        existing.remove()
    }
    
    let item_container_body = document.createElement('div')
    item_container_body.className = 'item-container-body'
    
    arr.forEach(todo => {
        let task_item = document.createElement('div')

        let p = document.createElement('p')
        let button = document.createElement('button')

        // Set text to the p tag
        p.textContent = todo.task

        // Set properties to button
        button.textContent = '✖'
        button.addEventListener('click', () => {
            deleteTodo(todo.id)
        })

        // Set class to task_item and append to task_item container
        task_item.addEventListener('dblclick', () => { doneTodo(todo.id) })
        task_item.className = `task-item ${todo.done ? 'disabled-item' : ''}`
        task_item.append(p, button)

        // Append to item_container_body
        item_container_body.appendChild(task_item)
    })

    document.querySelector('.todo-semi-container2').append(item_container_body)
}

const checkNoTodo = () => {
    if (getTodos().length === 0){
        let container = document.querySelector('div.item-container-body')

        let no_todo = document.createElement('p')
        no_todo.className = 'no-todo'
        no_todo.textContent = 'Nice! No task todo'

        container.append(no_todo)
    }
}

const deleteTodo = id => {
    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify(getTodos().filter(todo => todo.id !== id)))
    displayTodos(getTodos())
    checkNoTodo()
}

const doneTodo = id => {
    let todos = JSON.parse(localStorage.getItem('ArellanoMelvinTodoList'))

    let todoIndex = todos.findIndex(todo => todo.id === id)
    todos[todoIndex].done = true
    console.log(todos)

    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify(todos))
    displayTodos(getTodos())
    checkNoTodo()
}




// Checks if localstorage is present, sets new storage if not
if (!getTodos()){
    localStorage.setItem('ArellanoMelvinTodoList', '[]')
}


let todo_container = document.querySelector('.todo-container')

if (!username){
    todo_container.style.display = 'none' 
}

let login_container = document.querySelector('.login-container') // login container
let login_input = document.querySelector('#login-input')

login.addEventListener('submit', e => {
    e.preventDefault()

    username = login_input.value

    if (username){
        login_container.style.display = 'none'
        todo_container.style.display = '' 
        
        let nameSpan = document.querySelector('span.name')

        nameSpan.textContent = upperCaseFirst(username)
    }
})

let todo_form = document.querySelector('form#todo')

let todo_input = document.querySelector('input#todo-input')

displayTodos(getTodos())
checkNoTodo()

let logout = document.querySelector('.todo-logout')

logout.addEventListener('click', () => {
    username = ''
    login_container.style.display = ''
    todo_container.style.display = 'none'
})

todo_form.addEventListener('submit', e => {
    e.preventDefault()

    if (!todo_input.value){
        return alert('Fill the task input field before submitting.')
    }

    let todo_object = {
        id: Date.now(),
        task: upperCaseFirst(todo_input.value),
        done: false
    }

    addTodo(todo_object)

    if (getTodos().length > 0){
        displayTodos(getTodos())
    }

    todo_input.value = ''
})
