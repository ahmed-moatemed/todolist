import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodoContext } from './context/TodoContext';

const theme = createTheme({
  typography: {
    fontFamily: [
      "A"
    ]
  },
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#004d40',
    },
  }
});

const intialTodos = [
  {
    id: uuidv4(),
    title: 'تعلم الجافا سكريبت',
    description: 'تعلم الاساسيات',
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: 'تعلم الرياكت',
    description: 'تعلم الاساسيات',
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: 'تعلم الماتيريال يو اي',
    description: 'تعلم الاساسيات',
    isCompleted: false
  }
]

function App() {
  const [todos, setTodos] = useState(intialTodos);

  return (
    <>
    <ThemeProvider theme={theme}>
      <TodoContext.Provider value={{todos, setTodos}}>
        <TodoList />
      </TodoContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
