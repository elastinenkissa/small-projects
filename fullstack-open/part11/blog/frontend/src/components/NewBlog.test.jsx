import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockCreateHandler = jest.fn();

  render(<NewBlog onCreate={mockCreateHandler} />);

  const user = userEvent.setup();

  const titleInput = screen.getByPlaceholderText('Title here...');
  const authorInput = screen.getByPlaceholderText('Author here...');
  const urlInput = screen.getByPlaceholderText('URL here...');
  const submitButton = screen.getByText('Create');

  await user.type(titleInput, 'Title');
  await user.type(authorInput, 'Author');
  await user.type(urlInput, 'http://www.url.com/');
  await user.click(submitButton);

  expect(mockCreateHandler.mock.calls).toHaveLength(1);
  expect(mockCreateHandler.mock.calls[0][0].title).toBe('Title');
  expect(mockCreateHandler.mock.calls[0][0].author).toBe('Author');
  expect(mockCreateHandler.mock.calls[0][0].url).toBe('http://www.url.com/');
});
