import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

const tasks = [
  { name: 'Task 1', description: 'Description 1', deadline: '2023-06-05' },
  { name: 'Task 2', description: 'Description 2', deadline: '2023-06-06' },
];

test('renders task list with correct task information', () => {
  render(<TaskList tasks={tasks} onDelete={() => {}} />);
  
  tasks.forEach((task) => {
    expect(screen.getByText(task.name)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(task.deadline)).toBeInTheDocument();
  });
});

test('calls onDelete function when delete button is clicked', () => {
  const mockDeleteHandler = jest.fn();
  render(<TaskList tasks={tasks} onDelete={mockDeleteHandler} />);

  tasks.forEach((_, index) => {
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[index]);
    expect(mockDeleteHandler).toHaveBeenCalledWith(index);
  });
});
