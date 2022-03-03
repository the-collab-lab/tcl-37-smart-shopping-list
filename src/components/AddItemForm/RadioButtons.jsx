const RadioButtons = ({ handleChange }) => {
  return (
    <>
      <input
        type="radio"
        value={7}
        id="soon"
        name="days"
        onChange={handleChange}
        defaultChecked
      />
      <label id="soon" htmlFor="soon">
        Soon
      </label>

      <input
        type="radio"
        value={14}
        id="kind-soon"
        name="days"
        onChange={handleChange}
      />
      <label id="kind-soon" htmlFor="kind-soon">
        Kind of Soon
      </label>

      <input
        type="radio"
        value={30}
        id="not-soon"
        name="days"
        onChange={handleChange}
      />
      <label id="not-soon" htmlFor="not-soon">
        Not Soon
      </label>
    </>
  );
};

export default RadioButtons;
