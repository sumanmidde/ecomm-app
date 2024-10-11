import React, { useEffect } from 'react';

let NoMatchPage = () => {
    useEffect(() => {
        // Ex : loadfor db connection 
        document.title = "NoMatchPage-eCommerce";
    }, []);
    return (
        <div>
            <h2>NO PAGE FOUND..</h2>
        </div>
    );
}

export default NoMatchPage;