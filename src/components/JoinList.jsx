export const JoinList = ({ token }) => {
  const joinList = (token) => {
    console.log(token);
    //grab the token and then use it to view the appropriate list
  };
  return (
    <>
      <p> -or- </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <p> Share token </p>
      <input type="text" value={token} />
      <br />
      <br />
      <button type="submit" onClick={joinList} token={token}>
        Join an existing list
      </button>
    </>
  );
};
