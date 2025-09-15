import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container } from '@mui/material';
import Todo from './Todo';

import { useState, useContext, useEffect, useMemo } from 'react';
import { TodoContext } from '../context/TodoContext';
import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
  const [tittleInput, setTittleInput] = useState('');
  const [detInput, setDetInput] = useState('');
  const { todos, setTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState('all');

  
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  let todosToRendered = todos;

  if (filter === 'completed') {
    todosToRendered = completedTodos;
  }else if (filter === 'not-completed') {
    todosToRendered = notCompletedTodos;
  }else {
    todosToRendered = todos;
  }

  const todosJsx = todosToRendered.map((todo) => {
    return (
      <Todo 
      key={todo.id}
      todo = {todo}
      />
    )
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('todos'))?? [];
    setTodos(storageTodos);
  }, []);

  function handelAddClick() {
    if (tittleInput === '') {
      alert('يرجى ادخال عنوان المهمه');
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title: tittleInput,
      description: detInput,
      isCompleted: false
    }
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTittleInput('');
    setDetInput('');
  }

  function displayTodosFilter(e) {
    setFilter(e.target.value)
  }

  return (
    <Container 
      maxWidth='lg' 
      style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '95vh',
      }}
    >

      <Card 
        sx={{
          width: '90vw', 
          height: '90vh', 
          backgroundColor: '#fff', 
          overflow: 'scroll', 
          scrollbarWidth: 'none' 
        }}
      >
        <CardContent style={{ height: '95%'}}>

          <Typography variant="h2" style={{color: '#000'}}>
            مهامي
          </Typography>

          <Divider />

          {/* Filter Buttons */}
          <ToggleButtonGroup
            value={filter}
            style={{marginTop: '30px', marginBottom: '20px'}}
            exclusive
            onChange={displayTodosFilter}
            aria-label="text alignment"
            color='secondary'
          >
            <ToggleButton value="not-completed">
              غير منجز
            </ToggleButton>
            
            <ToggleButton value="completed">
              منجز
            </ToggleButton>

            <ToggleButton value="all">
              الكل
            </ToggleButton>
  
          </ToggleButtonGroup>
          {/*======= End Filter Buttons ====== */}


           {/* Adding Todo Item */}
           <Grid container spacing={1} 
            sx={{direction: 'rtl', marginBottom: '20px'}}
           >
              <Grid size={9} display='flex' 
               justifyContent='space-around' alignItems='center'
               sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '10px', sm: '0' }
               }}
              >

                <TextField id="outlined-basic" 
                  label="عنوان المهمه" variant="outlined" 
                  style={{width: '100%'}} 
                  value={tittleInput} 
                  onChange={(e) => {
                    setTittleInput(e.target.value);
                  }}
                />
                <TextField id="outlined-basic" 
                  label="تفاصيل المهمه" variant="outlined" 
                  style={{width: '100%'}} 
                  value={detInput} 
                  onChange={(e) => {
                    setDetInput(e.target.value);
                  }}
                />

              </Grid>

              <Grid size={3} display='flex'
                justifyContent='space-around' alignItems='center'
              >

                <Button variant="contained" style={{width: '100%', height: '100%'}} onClick={() => {
                  handelAddClick();
                }}
                  disabled={tittleInput.length == 0}
                >الاضافه</Button>

              </Grid>
            </Grid>
          {/*===== Adding Todo Item =====*/}

          {/* Todo Items */}
          <Grid>
            {todosJsx}
          </Grid>
          {/*======= End Todo Items =====*/}

        </CardContent>
      </Card>
    </Container>
    
  );
}