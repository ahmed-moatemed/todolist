import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTodos, action){
  switch(action.type){
    case 'added': {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.tittle,
        description: action.payload.description,
        isCompleted: false
      }
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    case 'deleted': {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    case 'edited': {
      const updatedTodosList = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, title: action.payload.title, description: action.payload.description };
        }
        return t;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodosList));

      return updatedTodosList;
    }
    case 'get': {
      const storageTodos = JSON.parse(localStorage.getItem('todos'))?? [];
      return storageTodos;
    }
    case 'cheched' : {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const upTodo = {
            ...t,
            isCompleted: !t.isCompleted
          }
          return upTodo;
        }
        return t;
      })
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error('Unknown action: ' + action);
    }
  }
}