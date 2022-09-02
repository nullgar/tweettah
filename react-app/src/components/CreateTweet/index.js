import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTweet } from "../../store/tweets";
import Spinner from "../Spinner";
import './CreateTweet.css'
const CreateTweet = () => {
    const [tweet, setTweet] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const profile_pic = useSelector(state => state.session.user.profile_pic)
    const handleTweet = async (e) => {
        e.preventDefault()

        const newTweet = {
            tweet: tweet
        }


        const res = await dispatch(createTweet(newTweet))



        if (res.errors) {
            setErrors(res.errors)
        } else if (res) {
            setErrors([])
            document.querySelector('.create-tweet-text-area').innerHTML = ''
            setTweet('')
        }
    }

    useEffect(() => {
        return
        // (async () => {setErrors([])})();
    }, [tweet])


    return (
        profile_pic ?
        <div className="create-tweet-master-div">

            <div className="create-tweat-image-div">
                <img src={profile_pic} className='create-tweet-image' />
            </div>
            <div className="create-tweet-inner-div">
                <div className="create-tweet-errors-div">
                    { errors ? errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    )) : null}
                </div>

                <form className="create-tweet-form" action="POST" >

                    <div
                    contentEditable={true}
                    className="create-tweet-text-area"
                    type="textbox"
                    onInput={(e) => setTweet(e.target.innerHTML)}
                    placeholder="What's happening?"
                    >

                    </div>

                </form>
                <div className="create-tweet-submit-div">
                    <button onClick={(e) => handleTweet(e)} className="create-tweet-submit-button">Tweet</button>

                </div>
            </div>
        </div>
        : <Spinner />

    )
}

export default CreateTweet;
