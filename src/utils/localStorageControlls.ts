const storage = window.localStorage;

export default class Todo{
    key: string
    todoObject: string

    constructor(key: string, todoObject: string){
        this.key = key
        this.todoObject = todoObject
    }
}

export const saveTodoToLocalStorage = (todoItem: object) =>{
    const uniqueId = generateUniqueKey();
    storage.setItem(uniqueId, JSON.stringify(todoItem));
}

export const getTodosFromLocalStorage = () => {
    let todosArr: Array<Todo> = [];
    // console.log(Object.keys(storage));
    Object.keys(storage).forEach(key=>{
        // const tempObj = {
        //     key: key,
        //     todo: JSON.parse(storage.getItem(key) || "{}"),
        // }
        const other = new Todo(key, storage.getItem(key) || "{}");
        todosArr.push(other)
    })

    return todosArr
}

export const removeTodoFromLocalStorageByKey = (key:string) =>{
    storage.removeItem(key);
}

export const cleareStorage = () =>{
    return storage.clear();
}

const generateUniqueKey = () =>{
    return '_' + Math.random().toString(36).substring(2, 9);
}
