// DOM
const inputField = document.getElementById('in');
const addBtn = document.getElementById('btn');
const listCon = document.getElementById('listCon');
listCon.appendChild(document.createElement('ul'));

// Function that abstracts away the DOM

const updateList = (listCon, arr, store, func) => {
    listCon.removeChild(listCon.firstChild);
    let ul = document.createElement('ul');
    let lis = arr.map( (x, i) => { 
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.innerText = "X";
        btn.onclick = () => {
            store.dispatch(func(i));
        };
        li.innerText = x;
        li.appendChild(btn);
        return li;
    });
    lis.forEach( x => {
        ul.appendChild(x);
    });
    listCon.appendChild(ul);
};

// ACTIONS

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// Action creators

const createAddTodo = (text) => ({
    type: ADD_TODO,
    todo: text
});

const createRemoveTodo = (index) => ({
    type: REMOVE_TODO,
    index: index,
});

// Initial State

const initialState = () => ({
    todos: []
});

// Reducer

const reducer = (state = initialState(), action) => {
    switch(action.type){
        case ADD_TODO:
            return {
                todos: [ ...state.todos, action.todo]
            };

        case REMOVE_TODO:
            return {
                todos: [ ...state.todos.slice(0, action.index), ...state.todos.slice(action.index + 1, state.todos.length)]
            };
        default:
            return state;
    }
}

// create store and add listener

const store = Redux.createStore(reducer);

store.subscribe( () => {
    updateList(listCon, store.getState().todos, store, createRemoveTodo);
});

addBtn.onclick = () => {
    store.dispatch(createAddTodo(inputField.value));
}



