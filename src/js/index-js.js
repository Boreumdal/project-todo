// Name:    Melvin Arellano
// From:    Rizal
// Title:   TodoList - Bayan Academy Final Project

// VARIABLES

// Global variables
let username, toggle = 0

// FUNCTIONS DECLARATION

// Utility Functions
const upperCaseFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`

// Action Functions
const getTodos = () => JSON.parse(localStorage.getItem('ArellanoMelvinTodoList'))

const addTodo = todo => {
    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify([...getTodos(), todo]))
}

const displayTodos = arr => {

    // Check if container with class of "item-container-body" exists.
    // If yes, then remove it to avoid duplication of result
    let existing = document.querySelector('div.item-container-body')
    if (existing){
        existing.remove()
    }
    
    // Creates div element with class of "item-container-body"
    let item_container_body = document.createElement('div')
    item_container_body.className = 'item-container-body'
    
    // Maps through todo array and appends the todos to the container above
    arr.forEach(todo => {
        let task_item = document.createElement('div')

        let p = document.createElement('p')
        let button = document.createElement('button')

        // Set text to the p tag
        p.textContent = todo.task
        p.addEventListener('dblclick', () => doneTodo(todo.id))

        // Set properties to button
        button.textContent = '✖'
        button.addEventListener('click', () => deleteTodo(todo.id))

        // Set class to task_item and append to task_item container
        task_item.className = `task-item ${todo.done ? 'disabled-item' : ''}`
        task_item.append(p, button)

        // Append to item_container_body
        item_container_body.appendChild(task_item)
    })

    // Append the container with class of "item-container-body" to previously deleted container with same class, then display the data
    document.querySelector('.item-container').append(item_container_body)
}

const checkNoTodo = arr => {
    // If todo arr length is 0, display the text
    if (arr.length === 0){
        let container = document.querySelector('div.item-container-body')

        let no_todo = document.createElement('p')
        no_todo.className = 'no-todo'
        no_todo.textContent = 'Nice! No task todo'

        container.append(no_todo)
    }
}

// Redisplays todo data
const resetDisplay = arr => {
    displayTodos(arr)
    checkNoTodo(arr)
}

// Deletes todo
const deleteTodo = id => {
    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify(getTodos().filter(todo => todo.id !== id)))
    resetDisplay(getTodos())
}

// Modify todo's status to done
const doneTodo = id => {
    let todos = JSON.parse(localStorage.getItem('ArellanoMelvinTodoList'))

    // Looks for the index of todo with ID of ID in parameters
    let todoIndex = todos.findIndex(todo => todo.id === id)

    // Directly mutate the todos array then set to storage again
    todos[todoIndex].done = true

    localStorage.setItem('ArellanoMelvinTodoList', JSON.stringify(todos))
    resetDisplay(getTodos())
}

// INITIALIZATION

// Checks if localstorage is present, sets new storage if not
if (!getTodos()){
    localStorage.setItem('ArellanoMelvinTodoList', '[]')
}

// Checks username variable, if equals to none, hide to Main Page
let todo_container = document.querySelector('.todo-container')
if (!username){
    todo_container.style.display = 'none'
}

resetDisplay(getTodos())

// LOGICS

// Login Page Login
let login_container = document.querySelector('.login-container')
let login_input = document.querySelector('#login-input')

login.addEventListener('submit', e => {
    e.preventDefault()

    // If login input is equalss to none, alert the user
    if (login_input.value === ''){
        return alert('Enter your name before proceeding.')
    }

    // If login input is filled, continue. Sets the login input value to the variable username
    username = login_input.value

    // If username exists, display the Main Page and hide the Login Page
    if (username){
        login_container.style.display = 'none'
        todo_container.style.display = '' 
        
        let nameSpan = document.querySelector('span.name')

        nameSpan.textContent = upperCaseFirst(username)
    }
})

// Todo Page Logic

// Hamburger toggle for Clear Todos and Logout buttons
let menu = document.querySelector('.action-button')

// Hamburger functionailty for toggling
menu.addEventListener('click', () => {
    let toggle_button_img = document.querySelector('.action-button-img')
    let toggle_body = document.querySelector('.action-body')

    if (toggle === 0){
        toggle_body.style.display = 'flex'
        toggle_button_img.src = 'src/img/close-icon.svg'
        toggle++
    } else {
        toggle_body.style.display = 'none'
        toggle_button_img.src = 'src/img/menu-icon.svg'
        toggle--
    }
})

// Menu Button Functionalities
let logout = document.querySelector('.todo-logout')
let clearer = document.querySelector('.todo-clear')

logout.addEventListener('dblclick', () => {
    username = ''
    toggle = 0
    login_container.style.display = ''
    todo_container.style.display = 'none'
})

clearer.addEventListener('dblclick', () => {
    localStorage.setItem('ArellanoMelvinTodoList', '[]')

    alert('Todos has been cleared')

    resetDisplay(getTodos())
})

// Add Todo Form Functionality
let todo_form = document.querySelector('form#todo')
let todo_input = document.querySelector('input#todo-input')

todo_form.addEventListener('submit', e => {
    e.preventDefault()

    if (!todo_input.value){
        return alert('Fill the task input field before submitting.')
    }

    // Creates an object with values of id: Date.now(), task: From todo_input value and done: Status of the task.
    let todo_object = {
        id: Date.now(),
        task: upperCaseFirst(todo_input.value),
        done: false
    }

    // Calls addTodo function passing the object created
    addTodo(todo_object)

    if (getTodos().length > 0){
        displayTodos(getTodos())
    }

    // Reset the todo input
    todo_input.value = ''
})
