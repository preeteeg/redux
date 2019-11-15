
// {
//     type: 'ADD_TODO',
//     todo: {
//     id: 0,
//      name: 'Learn Redux',
//     complete: false,
//     }
// }

// {
//     type: 'REMOVE_TODO',
//     id: 0,
// }

// {
//     type: 'TOGGLE_TODO',
//     id: 0,
// }

// {
//     type: 'ADD_GOAL',
//         goal: {
//         id: 0,
//         name: 'Run a Marathon'
//       }
// }

// {
//     type: 'REMOVE_GOAL',
//     id: 0
// }
//LIBRARY CODE
function createStore(reducer)
{
    // The store should have 4 parts
    //1. The State
    //2. Get the State
    //3. Listen to changes on the state
    //4. Update the state // strict set of rules to set predictablity
    //collection of events that occurs that change the state



    /*Charateristics of a pure function

1) They always return the same result if the same arguments are passed in
2) The depend only the arguments passed into them
3) Never produce any side effect // does not mutate the state
*/



    let state

    let listeners = [] //keep tracks anytime any subscribe action
    const getState = () => state


    const subscribe = (listener) =>
    {
        listeners.push(listener)
        return () =>
        {
            listeners = listeners.filter((l) => l !== listener)
        }
    }


    const dispatch = (action) =>
    {
        // call the function that will update the state
        state = reducer(state, action)
        // loop over listeners and invoke them why? to inform that the state has changed we need to go through all the listeners
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch //update the state
    }
}




//APP CODE

//LEVERAGING CONSTANS

const ADD_TODO = ' ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const TOGGLE_GOAL='TOGGLE_GOAL'


//ACTION CREATORS : 
//action creators are they create actions and return different actions,
//and  actions are are just object representation of different events that occurs in the application
//that  change the state 
//By making each one of thos representative as an object, what we can do is we can dd any
//different properties to that object

function addToDOAction(todo)
{
    return {
        type: ADD_TODO,
        todo
    }
}

function removeToDoAction(id)
{
    return {
        type: REMOVE_TODO,
        id
    }

}

function toggleToDoAction(id)
{
    return {
        type: TOGGLE_TODO,
        id
    }

}

function toggleGoalAction(id)
{
    return {
        type: TOGGLE_GOAL,
        id
    }

}

function addGoalAction(goal)
{
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id)
{
    return {
        type: REMOVE_GOAL,
        id,
    }
}

//2. Reducers are responsible for they take in the current state of that specific section of our store
// so todos reducers is going to take in the todos portion of our state and take the specific  action which was dispatched
//depending on whatever action that return the updated state
//reducer function : return updated state
//REDUCERS ARE PURE FUNCTIONS i.e cant modify the state
//they need to return a new copy of the state
function toDos(state = [], action)
{
    // if (action.type === 'ADD_TODO')
    // {
    //     return state.concat([action.todo])
    // }
    // else if (action.type === 'REMOVE_TODO')
    // {
    //     return state.filter((todo)=>todo.id!==action.id)
    // }
    // else if (action.type === 'TOGGLE_TODO')
    // {
    //     return state.map((todo) =>
    //         todo.id != action.id ? todo : 
    //         Object.assign({},todo,{complete:!todo.complete})
    //     )
    // }
    // return state

    switch (action.type)
    {
        case ADD_TODO:
            return state.concat([action.todo])

        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)

        case TOGGLE_TODO:
            return state.map((todo) =>
                todo.id != action.id ? todo :
                    Object.assign({}, todo, { complete: !todo.complete }))

        default:
            return state
    }
}



function goals(state = [], action)
{
    switch (action.type)
    {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        
        case TOGGLE_GOAL:
            return state.map((goal) =>
                goal.id != action.id ? goal :
                    Object.assign({}, goal, { complete: !goal.complete }))

        
        default:
            return state
    }
}

//our final shape of actual state
// {
// todos: [],
// goals:[]
// }

//Thus we need to use combine reducers


//ROOT REDUCER : responsible for dividing the state of the store into separate reducers
// function app(state = {}, action)
// {
//     return {
//         toDos: toDos(state.toDos, action),
//         goals: goals(state.goals, action)
//     }
// }


//const store = createStore(app)
//3. to create a store we call Redux.createStore to pass in the different reducers

const store = Redux.createStore(Redux.combineReducers({
    toDos,
    goals,
}))

//store.subscribe(()=>{
//pass a function
//})
//store.subscribe(()=>{

//})

// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//         id: 0,
//         name: 'Learn Redux',
//         complete: false,
//     }

store.dispatch(addToDOAction({
    id: 0,
    name: 'Learn Redux',
    complete: false,
})
)
// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//         id: 1,
//         name: 'Learn Vue',
//         complete: false,
//     }

// })

store.dispatch(addToDOAction({
    id: 1,
    name: 'Learn Vue',
    complete: false,
})
)

// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//         id: 2,
//         name: 'Learn snowboard',
//         complete: false,
//     }
// })

store.dispatch(addToDOAction({
    id: 2,
    name: 'Learn snowboard',
    complete: false,
}))

// store.dispatch({
//     type: REMOVE_TODO,
//     id:2
// })

store.dispatch(removeToDoAction(2))

// store.dispatch({
//     type: ADD_GOAL,
//     goal: {
//         id: 0,
//         name: 'Loss Weight',
//         complete: false, 
//     }
// })

store.dispatch(addGoalAction({
    id: 0,
    name: 'Loss Weight',
    complete: false,
}))
store.dispatch(addGoalAction({
    id: 1,
    name: 'Travel',
    complete: false,
}))

// store.dispatch(toggleToDoAction(0))

// store.dispatch({
//     type: ADD_GOAL,
//     goal: {
//         id: 1,
//         name: 'Travel',
//         complete: false,
//     }
// })

// store.dispatch({
//     type: ADD_GOAL,
//     goal: {
//         id: 2,
//         name: 'Prepare chocolate cake',
//         complete: false,
//     }
// })

store.dispatch(addGoalAction({
    id: 2,
    name: 'Prepare chocolate cake',
    complete: false,
}))

store.dispatch(removeGoalAction(0))


//DOM CODE
function generateId()
{
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// Dispatching New Items
function addToDo()
{
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''
    
    store.dispatch(addToDOAction({
        id: generateId(),
        name,
        complete:false
    }))

  

}   

function addGoal()
{
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalAction({
        id: generateId(),
        name
    }))
    

}
//hook the user action
    document.getElementById('goalBtn').addEventListener('click', addGoal)
    document.getElementById('todoBtn').addEventListener('click', addToDo)

store.subscribe(() =>
{
    console.log('The new state is', store.getState())
    //Subscribing for UI Updates
    const { toDos, goals } = store.getState()
    document.getElementById('goalList').innerHTML = ""
    document.getElementById('toDoList').innerHTML = ""
    toDos.forEach(addToDoToDOM)
    goals.forEach(addGoalToDOM)
})

//Subscribing for UI Updates



function addToDoToDOM(todo)
{
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)
    const parentEl = document.getElementById('toDoList')
    node.appendChild(text)
   // Dispatching to Remove Items
    const removeBtn = createRemoveBtn(() =>
    {
       store.dispatch(removeToDoAction(todo.id))   
    })
    node.appendChild(removeBtn)
   
    node.style.textDecoration = todo.complete ? 'line-through' : 'none'
    node.addEventListener('click', () =>
    {
        store.dispatch(toggleToDoAction(todo.id))
    })
    parentEl.appendChild(node)

    
}
function addGoalToDOM(goal)
{
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)
    const parentEl = document.getElementById('goalList')
    node.appendChild(text)

   // Dispatching to Remove Items
    const removeBtn = createRemoveBtn(() =>
    {
        store.dispatch(removeGoalAction(goal.id))
    })
    node.appendChild(removeBtn)
    node.style.textDecoration = goal.complete ? 'line-through' : 'none'
    node.addEventListener('click', () =>
    {
        store.dispatch(toggleGoalAction(goal.id))
    })

    parentEl.appendChild(node)

}

//2. Remove Items
function createRemoveBtn(onClick)
{
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'X'
    removeBtn.addEventListener('click', onClick)
    return removeBtn
}

