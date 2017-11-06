console.log(Redux);

// Grab necessary ui from the DOM
const inputField = document.getElementById('in');
const addBtn = document.getElementById('btn');
const listCon = document.getElementById('listCon');

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

const reducer = (state = initialState, action) => {
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

addBtn.onclick = () => {
    store.dispatch(createAddTodo(inputField.value));
}

