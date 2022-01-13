import React from 'react';
import TodoList from './components/TodoList';
import { saveTodoToLocalStorage, getTodosFromLocalStorage, cleareStorage } from './utils/localStorageControlls';
// import Todos from './Todos';

const App = () => {
  return (
    <main>
      <TodoList />
    </main>
  );
}

export default App;
