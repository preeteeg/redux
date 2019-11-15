//dispatching Todos & Goals with React
class Todo extends React.Component
{
    addTodo = (e) =>
    {
        e.preventDefault()
        const name = this.input.value
        this.input.value = ''
        this.props.store.dispatch(addToDOAction({
            id: generateId(),
            name,
            complete:false
        }))
        
    }
    render()
    {
        return (
            <div>
                <h2>Todo List</h2>
                 <input type='text'
                    name='todo'
                    placeholder='Add ToDo'
                    ref={(input) => this.input = input}
                />
                <button onClick={this.addTodo}>Add todo</button>
                    
            </div>
        )
    }
    
}
   



class Goal extends React.Component
{
    addGoal = (e) =>
    {
        e.preventDefault()
        
        const name = this.input.value
        this.input.value = ''
        this.props.store.dispatch
            (
                addGoalAction({
                    id: generateId(),
                    name,
                    complete:false
                })
            )
        
    }

    render()
    {
        return (
            <div>
                <h2>Goal List</h2>
               <input type='text'
                    name='goal'
                    placeholder='Add Goal'
                    ref={(input) => this.input = input}
                />
                <button onClick={this.addGoal}>Add Goal</button>
            </div>
        )
    }

}

class App extends React.Component
{
    render()
    {
        return (
            <div>
            <h1>React app</h1>
            <Todo store={this.props.store} />
            <Goal store={this.props.store} />
            </div>
            
        )
    }

}


ReactDOM.render(<App store={store} />, document.getElementById('app'))