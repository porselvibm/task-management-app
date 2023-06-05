import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { saveTasksToLocalStorage } from '../utils/data';

const useStyles = makeStyles((theme) => ({
  textFieldContainer: {
    marginBottom: theme.spacing(3),
  },
  addButton: {
    marginTop: theme.spacing(3),
  },
}));

const TaskForm = ({ tasks, addTask, editTask }) => {
  const classes = useStyles();
  const [task, setTask] = useState({
    name: '',
    description: '',
    deadline: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((task) => task.id === id);
      setTask(foundTask);
    }
  }, [id, tasks]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      id: id || Date.now().toString(),
      ...task,
    };

    if (id) {
      editTask(id, newTask);
    } else {
      addTask(newTask);
    }

    saveTasksToLocalStorage(tasks);
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ margin: '3rem 0' }}>{id ? 'Edit Task' : 'Add Task'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={task.name}
          onChange={handleChange}
          fullWidth
          className={classes.textFieldContainer}
        />
        <TextField
          name="description"
          label="Description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          className={classes.textFieldContainer}
        />
        <TextField
          name="deadline"
         
          type="date"
          value={task.deadline}
          onChange={handleChange}
          fullWidth
          className={classes.textFieldContainer}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Save' : 'Add'}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
