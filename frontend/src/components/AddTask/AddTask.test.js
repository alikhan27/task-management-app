import { render, screen } from '@testing-library/react';
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
})