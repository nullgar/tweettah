import React from "react";
import './AboutLinks.css'
const AboutLinks = () => {
    return (
        <div className="about-links-master-div">
            <div className="dev-name">
                <p>Developed by Jonatan Aguilar</p>
                <img className="dev-image" src="https://avatars.githubusercontent.com/u/61948122?v=4" alt="developer" />
            </div>
            <div className="dev-link-con">
                <a className="dev-link" href="https://github.com/nullgar" target="_blank" rel="noreferrer" ><i className="devicon-github-original"> Github</i></a>
            </div>
            <div className="dev-link-con">
            <a className="dev-link" href="https://www.linkedin.com/in/jon-aguilar/" target="_blank" rel="noreferrer" ><i className="devicon-linkedin-plain"> linkedin</i></a>
            </div>
        </div>
    )
}

export default AboutLinks;
