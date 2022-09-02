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
            tweet: tweet.trimStart()
        }

        const res = await dispatch(createTweet(newTweet))

        if (res.errors) {
            setErrors(res.errors)
        } else if (res) {
            setErrors([])
            setTweet('')
        }
    }

    useEffect(() => {
        return
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

                    <textarea
                    className="create-tweet-text-area"
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                    placeholder="What's happening?"
                    minLength={1}
                    maxLength={150}
                    onInput={(e) => {
                        const area = document.querySelector('.create-tweet-text-area')
                        area.setAttribute("style", "height:" + (0) + "px;overflow-y:hidden;");
                        area.setAttribute("style", "height:" + (area.scrollHeight) + "px;overflow-y:hidden;");
                    }}
                    >

                    </textarea>

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
