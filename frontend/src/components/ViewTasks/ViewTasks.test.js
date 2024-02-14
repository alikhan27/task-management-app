import { render, screen } from '@testing-library/react';
import ViewTasks from './ViewTasks';

describe("It should render the Add Task Component", () => {
    it('should render the heading', () => {
        render(<ViewTasks />);
        const heading = screen.getByRole('heading', {level: 2})
        expect(heading).toHaveTextContent('All Tasks');
    })
})