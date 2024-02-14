import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTask from './AddTask';

describe("It should render the Add Task Component", () => {
    it('should render the heading', () => {
        render(<AddTask />);
        const heading = screen.getByRole('heading', {level: 2})
        expect(heading).toHaveTextContent('Add Task');
    })
    it('should render the label as Title', () => {
        render(<AddTask />);
        const label = screen.getByLabelText('Title');
        expect(label).toBeInTheDocument();
    })
    it('should render the input field for Title', () => {
        render(<AddTask />);
        const input = screen.getByLabelText('Title', {selector: 'input'});
        expect(input).toBeInTheDocument();
    })
    it('should render the label as Description', () => {
        render(<AddTask />);
        const label = screen.getByLabelText('Description');
        expect(label).toBeInTheDocument();
    })
    it('should render the textarea field for Description', () => {
        render(<AddTask />);
        const input = screen.getByLabelText('Description', {selector: 'textarea'});
        expect(input).toBeInTheDocument();
    })
    it('should render the button with text Add Task', () => {
        render(<AddTask />);
        const input = screen.getByTestId('add-task');
        expect(input).toBeInTheDocument();
    })
    it('should show the user entered value in the form fields', () => {
        const handleAddTask = jest.fn();
        render(<AddTask onAddTask={handleAddTask} />);
        const input = screen.getByLabelText('Title', {selector: 'input'});;
        const textarea = screen.getByLabelText('Description', {selector: 'textarea'});
        act(() => {
            userEvent.type(input, 'Testing 1');
            userEvent.type(textarea, 'Testing the description content');
        })
        expect(screen.getByLabelText(/title/i)).toHaveValue('Testing 1');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Testing the description content');
    })
    it('should clear the form field on Add Task', () => {
        const handleAddTask = jest.fn();
        render(<AddTask onAddTask={handleAddTask} />);
        const input = screen.getByLabelText('Title', {selector: 'input'});;
        const textarea = screen.getByLabelText('Description', {selector: 'textarea'});
        const AddTaskBtn = screen.getByTestId('add-task');
        act(() => {
            userEvent.type(input, 'Testing 1');
            userEvent.type(textarea, 'Testing the description content');
            userEvent.click(AddTaskBtn)
        })
        expect(screen.getByLabelText(/title/i)).toHaveValue('');
        expect(screen.getByLabelText(/description/i)).toHaveValue('');
    })
    
})