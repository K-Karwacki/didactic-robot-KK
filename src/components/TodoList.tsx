import React from 'react';
import { getTodosFromLocalStorage, removeTodoFromLocalStorageByKey, saveTodoToLocalStorage } from '../utils/localStorageControlls';
import Todo from '../utils/localStorageControlls'


const TodoList = () => {
    const [todos, setTodos] = React.useState<Todo[]>(getTodosFromLocalStorage());
    const [todoText, setTodoText] = React.useState("")
    const [todoDate, setTodoDate] = React.useState("")
    const [todoTime, setTodoTime] = React.useState("")
    const [todoStatus, setTodoStatus] = React.useState("todo")
    const [errorOccured, setError] = React.useState(false)
    const [showTodoCheckboxHandle, setShowTodoCheckboxHande] = React.useState(false)
    const [showDoingCheckboxHandle, setShowDoingCheckboxHande] = React.useState(false)
    const [showDoneCheckboxHandle, setShowDoneCheckboxHande] = React.useState(false)

    if(errorOccured){
        document.querySelector("#todo")?.classList.add("error")
        setTimeout(() => {
            document.querySelector("#todo")?.classList.remove("error")
        }, 4000);
    }else{
        document.querySelector("#todo")?.classList.remove("error")
    }

    const filterTodos = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setTodos(getTodosFromLocalStorage().filter(todo => JSON.parse(todo.todoObject).status === e.target.value))
        }else{
            setTodos(getTodosFromLocalStorage());
        }
    }

    return (
        <section id="todo">
            <span id="error">Please do not leave empty inputs</span>     
            <section id="todo-item-creator">
                <h2>Manage your time ...better</h2>
                <div>
                    <div>
                        <label htmlFor="text">Todo:</label>
                        <input type="text" id="text" onChange={(e)=> setTodoText(e.target.value)} value={todoText}/>
                    </div>
                    <div>
                        <label htmlFor="date">Deadline date:</label>
                        <input type="date" id="date" onChange={(e)=>setTodoDate(e.target.value)} value={todoDate}/>
                    </div>
                    <div>
                        <label htmlFor="time">Deadline time:</label>
                        <input type="time" id="time" onChange={(e)=> setTodoTime(e.target.value)} value={todoTime}/>
                    </div>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <select name="status" id="status" onChange={(e)=>setTodoStatus(e.target.value)} value={todoStatus}>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>
                <button onClick={() => {
                        setError(!validatedTodoInputs(todoText, todoDate, todoTime));
                        if(validatedTodoInputs(todoText, todoDate, todoTime)){
                            saveTodoToLocalStorage({"text": todoText, "date": todoDate, "time": todoTime, "status":todoStatus})
                            setTodoText("")
                            setTodoDate("")
                            setTodoTime("")
                            setTodoStatus("todo")
                            setTodos(getTodosFromLocalStorage())
                        }
                    }}>Save todo</button>
            </section>
            <section id="todo-list-container">
                <h1>Your Todo List</h1>
                <div id="todo-filter">
                    <span>Display by status: </span>
                    <div>
                        <label htmlFor="showTodo">"todo"</label>
                        <input type="checkbox" defaultChecked={showTodoCheckboxHandle} disabled={showDoingCheckboxHandle || showDoneCheckboxHandle} onChange={(e)=> {
                            filterTodos(e);
                            setShowTodoCheckboxHande(e.target.checked)

                        }} value="todo"/>
                    </div>
                    <div>
                        <label htmlFor="showDoing">"doing"</label>
                        <input type="checkbox" defaultChecked={showDoingCheckboxHandle} disabled={showTodoCheckboxHandle || showDoneCheckboxHandle} onChange={(e)=> {
                            filterTodos(e);
                            setShowDoingCheckboxHande(e.target.checked)
                        }}value="doing"/>
                    </div>
                    <div>
                        <label htmlFor="showDone">"done"</label>
                        <input type="checkbox" defaultChecked={showDoneCheckboxHandle} disabled={showTodoCheckboxHandle || showDoingCheckboxHandle} onChange={(e)=> {
                            filterTodos(e);
                            setShowDoneCheckboxHande(e.target.checked)
                        }}value="done"/>
                    </div>
                </div>
                <table id="todo-list">
                    <tr><th>Todo:</th> <th>Deadline:</th> <th>Status:</th> <th></th></tr>
                    {
                        todos.map(todo=>{
                            const obj = JSON.parse(todo.todoObject);
                            return (
                                <tr><td>{obj.text}</td> <td>{obj.date}, {obj.time}</td> <td>{obj.status}</td> <td onClick={() => {
                                    removeTodoFromLocalStorageByKey(todo.key)
                                    setTodos(getTodosFromLocalStorage())}}>remove</td></tr>
                            )
                        })
                    }
                </table>
            </section>
        </section>
    );
}

export default TodoList;


function validatedTodoInputs(text: string, date: string, time: string){
    return text.length > 0 && date.length > 0 && time.length > 0
}

