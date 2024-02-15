import { render, screen , act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from './Task';

describe("It should render the Add Task Component", () => {
    it('should render the title and description', () => {
        render(<Task key="1" title="Testing Title" description="Testing Description"></Task>)
        const title = screen.getByText(/testing title/i);
        const desc = screen.getByText(/testing Description/i);
        expect(title).toBeInTheDocument();
        expect(desc).toBeInTheDocument();
    })
    it('should render the Edit and Delete Buttons', () => {
        render(<Task key="1" title="Testing Title" description="Testing Description"></Task>)
        const editbtn = screen.getByTestId(/editbtn/i);
        const deletebtn = screen.getByTestId(/deletebtn/i);
        expect(deletebtn).toBeInTheDocument();
        expect(editbtn).toBeInTheDocument();
    })
    it('should call the handle edit', () => {
        const handleEditTask = jest.fn();
        render(<Task id="12" handleEdit={handleEditTask} ></Task>)
        const editbtn = screen.getByTestId(/editbtn/i);
        act(() => {
            userEvent.click(editbtn);
        })
        expect(handleEditTask).toHaveBeenCalledWith("12")
    })
    it('should call the handle delete', () => {
        const handleDeleteTask = jest.fn();
        render(<Task id="22" handleDelete={handleDeleteTask}></Task>)
        const deletebtn = screen.getByTestId(/deletebtn/i);
        act(() => {
            userEvent.click(deletebtn);
        })
        expect(handleDeleteTask).toHaveBeenCalledWith("22")
    })
})