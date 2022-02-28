import './Buttons.css';

const OrangeButton = ({ children, ...props }) => {
  return (
    <button onClick={props.onClick} className="orange-button">
      {children}
    </button>
  );
};

export default OrangeButton;
