import React from 'react';
import coverImage from '../static/error.png'

const Error = () => {
    return (
        <div className="container" style={ {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <h1>Page not found :(</h1>
            <img style={{width: "100%"}} src={coverImage} alt="view_img"/>
        </div>
    );
}

export default Error;
