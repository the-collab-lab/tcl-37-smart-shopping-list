const OrangeButton = (props) => {
  return (
    <button onClick={props.onClick} className="orange-button">
      {props.text}
    </button>
  );
};

export default OrangeButton;
