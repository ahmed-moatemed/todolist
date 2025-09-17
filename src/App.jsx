import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import TodosProvider from './context/TodoContext';
import MySnakBar from './components/MySnakBar';
import { ToastContext } from './context/ToastContext';

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
    succeed: [
      '#4caf50'
    ]
  }
});

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('success');

  function showToast(message, color) {
    setOpen(true);
    setMessage(message);
    setColor(color || 'success');
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <TodosProvider>
      <ToastContext.Provider value={{showToast}}>
        <MySnakBar open={open} message={message} color={color}/>
        <TodoList />
      </ToastContext.Provider>
      </TodosProvider>
    </ThemeProvider>
    </>
  )
}

export default App
