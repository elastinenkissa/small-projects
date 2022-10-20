import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  title: 'React Test',
  author: 'React Tester',
  url: 'http://www.reacttest.com/',
  likes: 0,
  user: {
    token: 'blablabla',
    username: 'reacttester',
    name: 'React Tester',
  },
};

test('by default, only the blog title and author are display', () => {
  const { container } = render(<Blog blog={blog} />);

  const displayed = container.querySelector('.initial');
  const notDisplayed = container.querySelector('.hidden');

  expect(displayed).not.toBeNull();
  expect(notDisplayed).toBeNull();
});

test('blog url and likes are shown when show button is clicked', async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const viewButton = container.querySelector('.viewButton');
  await user.click(viewButton);

  const newDisplayed = container.querySelector('.hidden');

  expect(newDisplayed).not.toBeNull();
});

test('when like button is pressed twice, the event handler is called twice', async () => {
  const mockLikeHandler = jest.fn();

  const { container } = render(<Blog blog={blog} onLike={mockLikeHandler} />);

  const user = userEvent.setup();
  const viewButton = container.querySelector('.viewButton');
  await user.click(viewButton);
  const likeButton = container.querySelector('.likeButton');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
