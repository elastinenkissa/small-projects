import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('Todo', () => {
  beforeEach(() => {
    const todo = {
      id: 'id',
      text: 'Write a test',
      done: true,
    };

    const deleteMock = jest.fn();
    const completeMock = jest.fn();

    render(
      <Todo
        todo={todo}
        onClickDelete={deleteMock}
        onClickComplete={completeMock}
      />
    );
  });

  test('renders correct todos', async () => {
    const todo = await screen.findByText('Write a test');
    expect(todo).toBeDefined();
  });
});
