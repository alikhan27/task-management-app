import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('should render the app title text in h1', () => {
  render(<App />);
  const text = screen.getByText(/Task Management App/i);
  const h1 = screen.getByRole('heading', {level: 1});
  expect(h1).toBeInTheDocument();
  expect(text).toBeInTheDocument();
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
  const editbtn = screen.getByTestId('editbtn');
  expect(titleEl).toBeInTheDocument();
  expect(descEl).toBeInTheDocument();
  expect(editbtn).toBeInTheDocument();
})

test('should update the first task list', () => {
  render(<App />);
  const input = screen.getByLabelText('Title', { selector: 'input' });;
  const textarea = screen.getByLabelText('Description', { selector: 'textarea' });
  const AddTaskBtn = screen.getByTestId('add-task');
  act(() => {
    userEvent.type(input, 'Testing 1');
    userEvent.type(textarea, 'Testing the description content');
    userEvent.click(AddTaskBtn)
  });
  const editbtn = screen.getAllByTestId('editbtn')[0];
  expect(editbtn).toBeInTheDocument();
  expect(screen.getByLabelText(/title/i)).toHaveValue('');
  expect(screen.getByLabelText(/description/i)).toHaveValue('');

  expect(screen.getByText('Testing 1')).toBeInTheDocument();
  expect(screen.getByText('Testing the description content')).toBeInTheDocument();
  
  act(() => {
    userEvent.click(editbtn);
    const input = screen.getByLabelText('Title', {selector: 'input'});;
    const textarea = screen.getByLabelText('Description', {selector: 'textarea'});
  
  });
  expect(screen.getByLabelText(/title/i)).toHaveValue('Testing 1');
  expect(screen.getByLabelText(/description/i)).toHaveValue('Testing the description content');

  act(() => {
    const edittask = screen.getByTestId('edit-task');
    userEvent.type(input, ' modified');
    userEvent.type(textarea, ' modified');
    userEvent.click(edittask);
  });
  expect(screen.getByText('Testing 1 modified')).toBeInTheDocument();
  expect(screen.getByText('Testing the description content modified')).toBeInTheDocument();
})
