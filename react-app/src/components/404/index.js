import React from "react";
import { Link } from "react-router-dom";
import './404.css'
const Page404 = () => {
    return (
        <div className="page-404-div">
            <h2 className="h2-404">404 Page not found</h2>

            <p className="p-404">Please go back to <Link className="link-404" to={'/'}>Home</Link></p>
        </div>
    )

}

export default Page404;
