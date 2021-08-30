// Variables
let resetWrapper = document.getElementById('reset-page');
let resetPage = document.getElementById('reset');
let getNameForm = document.getElementById('get-name');
let getNameWrapper = document.getElementById('get-name-wrapper');
let inputName = document.getElementById('name-input');
let getUserName = inputName.value;

let timeWrapper = document.getElementById('time-wrapper');

let greetingWrapper = document.getElementById('greeting-wrapper');
let greeting = document.getElementById('greeting');

let focusWrapper = document.getElementById('focus-wrapper');
let getFocusForm = document.getElementById('focus-form');
let inputFocus = document.getElementById('main-focus');
let getFocus = inputFocus.value;
let todayFocus = document.getElementById('today-focus-wrapper');
let createFocus = document.getElementById('today-focus');
let modifyMainFocus = document.getElementById('modify-focus');

let quoteWrapper = document.getElementById('quote-wrapper');
let quoteContent = document.getElementById('quote-content');
let quote = document.getElementById('quote');
let quoteOption = document.getElementById('quote-options');
let generateQuote = document.getElementById('generate-quote');
let addQuote = document.getElementById('add-quote');

let todoToggle = document.getElementById('todo-toggle');
let todoWrapper = document.getElementById('todo-wrapper');

// Reset ✅
resetWrapper.addEventListener("click", () => {
    localStorage.removeItem('data')
    localStorage.removeItem('todoItems')

    location.reload();
})
// Time ✅
let time = () => {
    let date = new Date();
    let currentTime = document.getElementById('current-time'),
        hour = date.getHours(),
        minute = date.getMinutes(),
        meridiem = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? '0' + minute : minute;
    currentTime.innerHTML = hour + ':' + minute;
    setTimeout(time, 1000);
}
time();

// Show get name wrapper ✅
getNameWrapper.style.display = 'block';

// Quote 
// Load Quote ✅
const loadQuotes = () => {
    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => showQuotes(data))
}
// Show Quotes ✅
const showQuotes = (quotes) => {
    quote.innerHTML = `${quotes.quote}`;
}
loadQuotes();
// Generate Quote ✅
generateQuote.addEventListener('click', loadQuotes);
// Add Quote ✅
let setQuotes = () => {
    quote.contentEditable = true;
    let range = document.createRange();
    let select = window.getSelection();
    quote.focus();
    range.selectNodeContents(quote);
    select.removeAllRanges();
    select.addRange(range);
    
    quote.addEventListener('keydown', e => {
        if (e.which === 13) {
            quote.contentEditable = false;
            quote.blur();
            return false;
        }
    })
}
addQuote.addEventListener('click', setQuotes);

// Quote Hover ✅
let showOptions = () => {
    quoteOption.style.display = 'flex';
    quoteContent.style.bottom = '5vh';
}
let hideOptions = () => {
    quoteOption.style.display = 'none';
    quoteContent.style.bottom = '2vh';
}
quoteWrapper.addEventListener('mouseover', showOptions);
quoteWrapper.addEventListener('mouseout', hideOptions);

let setUserName = (e) => {
    // Transfer value to variable
    let storagedata = JSON.parse(localStorage.getItem('data'))
    getUserName = inputName.value;
    let data = {
        name: getUserName,
        focus: getFocus
    }
    localStorage.setItem("data", JSON.stringify(data))
    // Hide get name wrapper
    getNameWrapper.style.display = 'none';
    e.preventDefault();
    // Show hidden divs
    resetWrapper.style.display = 'block';
    timeWrapper.style.display = 'block';
    greetingWrapper.style.display = 'block';
    focusWrapper.style.display = 'block';
    quoteWrapper.style.display = 'flex';
    todoToggle.style.display = 'flex';
    // Show Greeting
    
    greeting.innerHTML = 'Hi ' + getUserName + ', have a great day!';
    console.log(storagedata)
}
getNameForm.addEventListener('submit', setUserName);

// Set Main Focus ✅
let setMainFocus = (e) => {
    // Transfer value to variable
    let storagedata = JSON.parse(localStorage.getItem('data'))
    getFocus = inputFocus.value;
    let data = {
        name: storagedata.name,
        focus: getFocus
    }
    localStorage.setItem("data", JSON.stringify(data))
    // Hide inputFocus element
    getFocusForm.style.display = 'none';
    // e.preventDefault();
    // Add Main focus
    createFocus.innerHTML = getFocus;
    // Show Main Focus Div
    todayFocus.style.display = 'block';
}
getFocusForm.addEventListener('submit', setMainFocus);

// Modify focus
modifyFocusHover = () => {
    modifyMainFocus.style.opacity = '1';
    modifyMainFocus.style.right = '-50px';
}
focusWrapper.addEventListener('mouseover', modifyFocusHover)
modifyFocusOut = () => {
    modifyMainFocus.style.opacity = '0';
    modifyMainFocus.style.right = '-30px';
}
focusWrapper.addEventListener('mouseout', modifyFocusOut)

resetFocus = () => {
    createFocus.contentEditable = true;
    let range = document.createRange();
    let select = window.getSelection();
    createFocus.focus();
    range.selectNodeContents(createFocus);
    select.removeAllRanges();
    select.addRange(range);
    
    createFocus.addEventListener('keydown', e => {
        if (e.which === 13) {
            let storagedata = JSON.parse(localStorage.getItem('data'))
            getFocus = createFocus.textContent;
            let data = {
                name: storagedata.name,
                focus: getFocus
            }
            localStorage.setItem("data", JSON.stringify(data))
            createFocus.contentEditable = false;
            createFocus.blur();
            return false;
        }
    })
}
modifyMainFocus.addEventListener('click',resetFocus)

// Set Name If LocalStorage has value ✅
let setDefault = () => {
    let storagedata = JSON.parse(localStorage.getItem('data'))
    if (storagedata.name) {
        // Hide get name wrapper
        getNameWrapper.style.display = 'none';
        // Show hidden divs
        resetWrapper.style.display = 'block';
        timeWrapper.style.display = 'block';
        greetingWrapper.style.display = 'block';
        focusWrapper.style.display = 'block';
        quoteWrapper.style.display = 'flex';
        todoToggle.style.display = 'flex';
        greeting.innerHTML = 'Hi ' + storagedata.name + ', have a great day!';
        getFocusForm.style.display = 'none';
        createFocus.innerHTML = storagedata.focus;
        todayFocus.style.display = 'block';
    }
}
setDefault()


// Todo Toggle ✅
const openTodo = () => {
    todoWrapper.style.display == 'flex' ? todoWrapper.style.display = 'none' : todoWrapper.style.display = 'flex';
}
todoToggle.addEventListener('click', openTodo);

// Todo List
let todoItems = [];

function renderTodo(todo) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
  
    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = '';
        return
    }

    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <span>${todo.text}</span>
        <label for="${todo.id}" class="tick-todo js-tick fas fa-check"></label>
        <label class="delete-todo js-delete-todo fas fa-trash-alt"></label>
    `;

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const form = document.getElementById('todo-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('.todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItems');
    if (ref) {
        todoItems = JSON.parse(ref);
        todoItems.forEach(t => {
        renderTodo(t);
        });
    }
});

  