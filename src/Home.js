import React from 'react';
import {useHistory} from 'react-router-dom';

const Home = (props) => {
    const history = useHistory();

    return (
        <>
            <h1>Kicker</h1>

            <hr/>

            {/* Button */}


            {
                groupList.map(result =>
                    <p>
                        <button name="{result}" onClick={() => history.push('/{result}', {param: "{result}"})}>{result}</button>
                    </p>
                )
            }


        </>
    );
}
;

export default Home;