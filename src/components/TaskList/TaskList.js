import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  addButton: {
    marginTop: theme.spacing(3),
  },
}));

const TaskList = ({ tasks, deleteTask }) => {
  const classes = useStyles();

  return (
    <div>
     
      {tasks.length > 0 ? (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                  <Box display="flex"  alignItems="center">
                    <Button
                      component={Link}
                      to={`/edit/${task.id}`}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Box m={1} />
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No tasks found.</p>
      )}
      <Button
        component={Link}
        to="/add"
        variant="contained"
        color="primary"
        className={classes.addButton}
      >
        Add Task
      </Button>
    </div>
  );
};

export default TaskList;
