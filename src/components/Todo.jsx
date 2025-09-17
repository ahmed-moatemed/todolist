import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext } from 'react';
import { useTodosDispatch } from '../context/TodoContext';
import { ToastContext } from '../context/ToastContext';


function Todo({ todo, ShowDelete, ShowEdit }) {
  const dispatch = useTodosDispatch();
  const {showToast} = useContext(ToastContext);

  // Function to handle check, delete and edit
  function handelCheckClick() {
    dispatch({type: 'cheched', payload: todo});
    showToast('تم تحديث حالة المهمه', 'success');
  }
  //==============================

  return (
    <>

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
                  handelCheckClick();
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
                  ShowEdit(todo);
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
                  ShowDelete(todo);
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
