const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

const addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    todo
  }
}

const removeTodoAction = (id) => {
  return {
    type: REMOVE_TODO,
    id
  }
}

const toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

const addGoalAction = (goal) => {
  return {
    type: ADD_GOAL,
    goal
  }
}

const removeGoalAction = (id) => {
  return {
    type: REMOVE_GOAL,
    id
  }
}

function createStore(reducer) {
  //The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener())
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO :
      return state.concat([action.todo]);
    case REMOVE_TODO :
      return state.filter((element) => element.id !== action.id)
    case TOGGLE_TODO :
      return state.map((element) => element.id !== action.id ? element :
        Object.assign({}, element, { complete: !element.complete }))
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL :
      return state.concat([action.goal]);
    case REMOVE_GOAL :
      return state.filter((element) => element.id !== action.id)
    default:
      return state;
  }
}

function app(state = {}, action){
  return {
    todos : todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is', store.getState())
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
})

store.dispatch({
  type: REMOVE_TODO,
  id: 0,
})
