import { createContext , useReducer, useContext} from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoContext = createContext([]);
export const TodoDispatchContext = createContext(null);

const TodosProvider = ({children}) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return(
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  return useContext(TodoContext);
}

export const useTodosDispatch = () => {
  return useContext(TodoDispatchContext);
}

export default TodosProvider;
//export const TodoContext = createContext([]);