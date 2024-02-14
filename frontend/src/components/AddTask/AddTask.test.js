import { render, screen } from '@testing-library/react';
import AddTask from './AddTask';

describe("It should render the Add Task Component", () => {
    it('should render the heading', () => {
        render(<AddTask />);
        const heading = screen.getByRole('heading', {level: 2})
        expect(heading).toHaveTextContent('Add Task');
    })
})