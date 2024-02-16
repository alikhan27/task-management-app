import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('should render the app title text in h1', () => {
  render(<App />);
  const text = screen.getByText(/Task Management App/i);
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(h1).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

test('renders No Task Available', () => {
  render(<App />);
  const el = screen.getByText(/No task available/i);
  expect(el).toBeInTheDocument();
});

test('should rended the first task list', async () => {
  render(<App />);
  const input = screen.getByLabelText('Title', { selector: 'input' });;
  const textarea = screen.getByLabelText('Description', { selector: 'textarea' });
  const AddTaskBtn = screen.getByTestId('add-task');
  act(() => {
    userEvent.type(input, 'Testing 1');
    userEvent.type(textarea, 'Testing the description content');
    userEvent.click(AddTaskBtn)
  });
  const titleEl = await screen.findByText('Testing 1');
  const descEl = screen.getByText('Testing the description content');
  const editbtn = screen.getByTestId('editbtn');
  const deletebtn = screen.getByTestId('deletebtn');
  expect(titleEl).toBeInTheDocument();
  expect(descEl).toBeInTheDocument();
  expect(editbtn).toBeInTheDocument();
  expect(deletebtn).toBeInTheDocument();
})

test('should update the first task list', async () => {
  render(<App />);
  const input = screen.getByLabelText('Title', { selector: 'input' });;
  const textarea = screen.getByLabelText('Description', { selector: 'textarea' });
  const AddTaskBtn = screen.getByTestId('add-task');
  act(() => {
    userEvent.type(input, 'Testing 1');
    userEvent.type(textarea, 'Testing the description content');
    userEvent.click(AddTaskBtn)
  });

  expect(screen.getByLabelText(/title/i)).toHaveValue('');
  expect(screen.getByLabelText(/description/i)).toHaveValue('');

  expect(await screen.findByText('Testing 1')).toBeInTheDocument();
  expect(screen.getByText('Testing the description content')).toBeInTheDocument();

  const editbtn = screen.getAllByTestId('editbtn')[0];
  expect(editbtn).toBeInTheDocument();

  act(() => {
    userEvent.click(editbtn);
    const input = screen.getByLabelText('Title', { selector: 'input' });;
    const textarea = screen.getByLabelText('Description', { selector: 'textarea' });

  });
  expect(screen.getByLabelText(/title/i)).toHaveValue('Testing 1');
  expect(screen.getByLabelText(/description/i)).toHaveValue('Testing the description content');

  act(() => {
    const edittask = screen.getByTestId('edit-task');
    userEvent.type(input, ' modified');
    userEvent.type(textarea, ' modified');
    userEvent.click(edittask);
  });
  expect(await screen.findByText('Testing 1 modified')).toBeInTheDocument();
  expect(screen.getByText('Testing the description content modified')).toBeInTheDocument();
})
test('should delete the first task list and display No Task Available', async () => {

  render(<App />);
  const input = screen.getByLabelText('Title', { selector: 'input' });;
  const textarea = screen.getByLabelText('Description', { selector: 'textarea' });
  const AddTaskBtn = screen.getByTestId('add-task');
  act(() => {
    userEvent.type(input, 'John Doe');
    userEvent.type(textarea, 'Description for John Doe');
    userEvent.click(AddTaskBtn)
  });

  waitFor(() => {
    const deletebtn = screen.getAllByTestId('deletebtn')[0];
    expect(deletebtn).toBeInTheDocument();
  });
  expect(screen.getByLabelText(/title/i)).toHaveValue('');
  expect(screen.getByLabelText(/description/i)).toHaveValue('');

  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Description for John Doe')).toBeInTheDocument();

  const deletebtn = screen.getAllByTestId('deletebtn')[0];
  act(()=> {

    userEvent.click(deletebtn)
  })
  waitFor(() => {
    expect(screen.queryByText('John Doe')).toBeNull();
  })
  waitFor(() => {
    expect(screen.queryByText('Description for John Doe')).toBeNull();
  })
  waitFor(() => {
    expect(screen.getByText('No Task Available.!')).toBeInTheDocument();
  })
})