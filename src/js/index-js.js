let username

let todo = document.querySelector('.todo-container')

if (!username){
    todo.style.display = 'none' 
}

let login_container = document.querySelector('.login-container') // login container
let login_input = document.querySelector('#login-input')

const upperCaseFirst = str => {
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

login.addEventListener('submit', e => {
    e.preventDefault()

    username = login_input.value

    if (username){
        login_container.style.display = 'none'
        todo.style.display = '' 
        
        let nameSpan = document.querySelector('span.name')

        nameSpan.textContent = upperCaseFirst(username)
    }
})

