import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodoContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updatedTodos, setUpdatedTodos] = useState({ title: todo.title, description: todo.description });

  // open and close dialogs
  const handleDeleteOpen = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteDialog(false);
  };

  const handleEditOpen = () => {
    setShowEditDialog(true);
  };

  const handelEditClose = () => {
    setShowEditDialog(false);
  };

  //==============================

  // Function to handle check, delete and edit
  function handelCheckClick(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    })
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function handleDeleteClick(todoId) {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    handleDeleteClose();
  }

  function handleEditClick() {
    const updatedTodosList = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodos.title, description: updatedTodos.description };
      }
      return t;
    });
    setTodos(updatedTodosList);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    handelEditClose();
  }
  //==============================

  return (
    <>
      {/* delete model */}
      <Dialog
        style={{ direction: 'rtl' }}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف هذه المهمة ؟"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>الغاء</Button>
          <Button onClick={() => {
            handleDeleteClick(todo.id);
          }} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/*==== delete model ====*/}

      {/* Edit model */}
      <Dialog
        style={{ direction: 'rtl' }}
        open={showEditDialog}
        onClose={handelEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="اسم المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodos.title}
            onChange={(e) => {
              setUpdatedTodos({ ...updatedTodos, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodos.description}
            onChange={(e) => {
              setUpdatedTodos({ ...updatedTodos, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelEditClose}>الغاء</Button>
          <Button onClick={() => {
            handleEditClick();
          }} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit model */}

      <Card className='cardTodo'
        sx={{
          backgroundColor: '#283593',
          color: '#fff',
          marginBottom: '20px'
        }}
      >
        <CardContent>

          <Grid container spacing={2} 
            sx={{ 
              direction: 'rtl',
              flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '10px', sm: '0' } 
            }}
          >
            <Grid size={8}>

              <Typography variant="h5" sx={{ textAlign: 'right', fontWeight: '300', textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: '100' }}>
                {todo.description}
              </Typography>

            </Grid>

            {/* Action Buttons */}
            <Grid size={4} display='flex' 
              justifyContent='space-evenly' 
              alignItems='center'
              sx={{
                flexDirection: { xs: 'row', sm: 'row' },
                gap: { xs: '10px', sm: '0' },
              }}
            >

              <IconButton className='iconButton' 
                style={{ 
                  color: todo.isCompleted ? '#fff' : '#8bc34a', 
                  backgroundColor: todo.isCompleted ? '#8bc34a':'#fff', 
                  border: 'solid 3px #8bc34a' 
                }} onClick={() => {
                  handelCheckClick(todo.id);
                }}
              >
                <CheckOutlinedIcon />
              </IconButton>

              <IconButton className='iconButton' 
                style={{ 
                  color: '#1769aa', 
                  backgroundColor: '#fff', 
                  border: 'solid 3px #1769aa ' 
                }} onClick={() => {
                  handleEditOpen();
                }}
              >
                <EditOutlinedIcon />
              </IconButton>

              <IconButton className='iconButton' 
                style={{ 
                  color: '#b23c17', 
                  backgroundColor: '#fff', 
                  border: 'solid 3px #b23c17 ' 
                }} onClick={() => {
                  handleDeleteOpen();
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>

            </Grid>
            {/*====== End Action Buttons ======*/}
          </Grid>

        </CardContent>
      </Card>
    </>
  )
}

export default Todo
