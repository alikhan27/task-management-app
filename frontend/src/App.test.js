import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Task Management App/i);
  const h1 = screen.getByRole('heading', {level: 1});
  expect(h1).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});

test('renders No Task Available', () => {
  render(<App />);
  const el = screen.getByText(/No task available/i);
  expect(el).toBeInTheDocument();
});

test('should rended the first task list', () => {
  render(<App />);
  const input = screen.getByLabelText('Title', { selector: 'input' });;
  const textarea = screen.getByLabelText('Description', { selector: 'textarea' });
  const AddTaskBtn = screen.getByTestId('add-task');
  act(() => {
    userEvent.type(input, 'Testing 1');
    userEvent.type(textarea, 'Testing the description content');
    userEvent.click(AddTaskBtn)
  });
  const titleEl = screen.getByText('Testing 1');
  const descEl = screen.getByText('Testing the description content');
  expect(titleEl).toBeInTheDocument();
  expect(descEl).toBeInTheDocument();
})