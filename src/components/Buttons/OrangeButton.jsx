const OrangeButton = (props) => {
  return (
    <button onClick={props.onClick} className="orange-button">
      {props.children}
    </button>
  );
};

export default OrangeButton;
