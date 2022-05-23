const { render, screen} = require("@testing-library/react");
//import { toBeDisabled } from '@testing-library/jest-dom/dist/matchers';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with text: "Load more"', () => {
        render(<Button text="Load more" />);

        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeInTheDocument();

        expect(button).toHaveAttribute('class', 'button');
    });

    it('should call a funcion on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more posts" onClick={fn}/>);
        const button = screen.getByRole('button', { name: /load more/i });

        userEvent.click(button);

        //fireEvent.click(button);
        //fireEvent.click(button);
        //fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        render(<Button text="Load more posts" disabled={true}/>);
        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load more posts" disabled={false}/>);
        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeEnabled();
    });
});