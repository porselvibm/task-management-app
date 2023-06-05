import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

jest.mock('./utils/data', () => ({
  getTasksFromLocalStorage: jest.fn(),
  saveTasksToLocalStorage: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.getItem = jest.fn();
    localStorage.setItem = jest.fn();
  });

  test('renders the app with initial tasks', () => {
    const mockStoredTasks = [
      { id: 1, name: 'Task 1', description: 'Description 1', deadline: '2023-06-05' },
      { id: 2, name: 'Task 2', description: 'Description 2', deadline: '2023-06-06' },
    ];
    localStorage.getItem.mockImplementation(() => JSON.stringify(mockStoredTasks));

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText('Task Manager App')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('tasks');
  });

  test('adds a new task and displays it on the list', () => {
    localStorage.getItem.mockReturnValue(null);
    localStorage.setItem.mockImplementation(() => {});

    render(
      <Router>
        <App />
      </Router>
    );

    const addButton = screen.getByRole('link', { name: 'Add Task' });
    expect(addButton).toBeInTheDocument();

    addButton.click();

    const nameInput = screen.getByLabelText('Name');
    const descriptionInput = screen.getByLabelText('Description');
    const deadlineInput = screen.getByLabelText('Deadline');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(deadlineInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    nameInput.value = 'New Task';
    descriptionInput.value = 'New Task Description';
    deadlineInput.value = '2023-06-07';

    saveButton.click();

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('New Task Description')).toBeInTheDocument();
    expect(screen.getByText('2023-06-07')).toBeInTheDocument();
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([{ id: 1, name: 'New Task', description: 'New Task Description', deadline: '2023-06-07' }])
    );
  });
});
