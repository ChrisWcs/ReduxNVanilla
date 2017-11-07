// DOM
const inputField = document.getElementById('in');
const addBtn = document.getElementById('btn');
const listCon = document.getElementById('listCon');
listCon.appendChild(document.createElement('ul'));

const updateList = (listCon, arr) => {
    listCon.removeChild(listCon.firstChild);
    let ul = document.createElement('ul');
    let lis = arr.map( x => { 
        let li = document.createElement('li');
        li.innerText = x;
        return li;
    });
    lis.forEach( x => {
        ul.appendChild(x);
    });
    listCon.appendChild(ul);
};


// ACTIONS

const ADD_TODO = "ADD_TODO";

// Action creators

const createAddTodo = (text) => ({
    type: ADD_TODO,
    todo: text
})

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

        default:
            return state;
    }
}

// create store and add listener

const store = Redux.createStore(reducer);

store.subscribe( () => {
    updateList(listCon, store.getState().todos);
});

addBtn.onclick = () => {
    store.dispatch(createAddTodo(inputField.value));
}



