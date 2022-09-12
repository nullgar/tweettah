import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <h2>404 Page not found</h2>

            <p>Please go back to <Link to={'/'}>Home</Link></p>
        </div>
    )

}

export default Page404;
