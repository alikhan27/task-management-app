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
        expect(handleAddTask).toHaveBeenCalledWith(
            {
                title: 'Testing 1',
                description: 'Testing the description content'
            }
        )
    })
    it('should render the button as Add Task', () => {
        render(<AddTask toEditTask={null}/>);
        const editbtn = screen.getByTestId('add-task');
        expect(editbtn).toHaveTextContent('Add Task');
    })
    it('should render the button as Update Task', () => {
        render(<AddTask toEditTask={{title: "John Doe", description:"Author of the app", id: 1}}/>);
        const editbtn = screen.getByTestId('edit-task');
        expect(editbtn).toHaveTextContent('Update Task');
    })
    it('should render the textbox with value', () => {
        render(<AddTask toEditTask={{title: "John Doe", description:"Author of the app", id: 1}}/>);
        expect(screen.getByLabelText(/title/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Author of the app');
    })
    it('should update the forms and clear the fields ', () => {
        const handleUpdateTask = jest.fn();
        render(<AddTask onUpdateTask={handleUpdateTask}  toEditTask={{title: "John Doe", description:"Author of the app", id: 1}}/>);
        expect(screen.getByLabelText(/title/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Author of the app');

        const input = screen.getByLabelText('Title', {selector: 'input'});;
        const textarea = screen.getByLabelText('Description', {selector: 'textarea'});
        const editbtn = screen.getByTestId('edit-task');
        act(() => {
            userEvent.type(input, 'Testing edit title');
            userEvent.type(textarea, 'Testing edit description content');
        })
        expect(screen.getByLabelText(/title/i)).toHaveValue('John DoeTesting edit title');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Author of the appTesting edit description content');
        act(() => {
            userEvent.click(editbtn);
        })
        const addbtn = screen.getByTestId('add-task');
        expect(screen.getByLabelText(/title/i)).toHaveValue('');
        expect(screen.getByLabelText(/description/i)).toHaveValue('');
        expect(addbtn).toBeInTheDocument()
    })
})