import React, { Fragment , useState } from 'react';

const NewLoader = () => {


    const [show, setShow] = useState(true);

    return (
        //replace with a skeleton loader or any other animation
        
        <Fragment>
            
            <h1>LOADING</h1>
        </Fragment>
    );
};

export default NewLoader;