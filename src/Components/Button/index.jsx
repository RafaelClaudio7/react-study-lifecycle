
import './styles.css'

export const Button = (props) => {

        const {text, onClick, disabled} = props;
        return (
            <div className="button-container">
                <button disabled={disabled} onClick={onClick} className="button">{text}</button>
            </div>
        );
}