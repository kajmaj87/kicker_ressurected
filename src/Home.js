import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const history = useHistory();

  return (
    <>
      <h1>Kicker</h1>

      <hr />

      {/* Button */}
      <p>
        <button  name="cap" onClick={() => history.push('/cap', {param: "ASPEP"})}>Cappgemini</button>
      </p>

      <p>
        <button  onClick={() => history.push('/del', {param: "del"})}>Deloitte</button>
      </p>

    </>
  );
};

export default Home;