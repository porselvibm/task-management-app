import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography, Paper, makeStyles } from "@material-ui/core";
import TaskList from "./components/TaskList/TaskList"
import TaskForm from "./components/TaskForm";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./utils/data";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(3),
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  input: {
    marginRight: theme.spacing(2),
    flex: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <Router>
      <Container maxWidth="sm" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" align="center" gutterBottom>
            Task Manager App
          </Typography>
          <Routes>
            <Route
              path="/"
              element={<TaskList tasks={tasks} deleteTask={deleteTask} />}
            />
            <Route path="/add" element={<TaskForm addTask={addTask} />} />
            <Route
              path="/edit/:id"
              element={<TaskForm tasks={tasks} editTask={editTask} />}
            />
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
