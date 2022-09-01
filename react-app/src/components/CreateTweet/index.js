import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTweet } from "../../store/tweets";
import './CreateTweet.css'
const CreateTweet = () => {
    const [tweet, setTweet] = useState('')
    const dispatch = useDispatch()
    const profile_pic = useSelector(state => state.session.user.profile_pic)
    const handleTweet = (e) => {
        e.preventDefault()

        const newTweet = {
            tweet: tweet
        }


        const res = dispatch(createTweet(newTweet))

        if (res) {
            document.querySelector('.create-tweet-text-area').innerHTML = ''

        }
    }

    const handleChange = (e) => {
        // e.preventDefault()

        console.log(e.target.value)
    }
    // const resizeField = () => {
    //     const field = document.querySelector('.create-tweet-text-area')

    //     if (field.value.length === field.scrollWidth / 10)
    //     {
    //         field.style.height = `${field.scrollHeight * 2}px`
    //         // field.style.height =('height', `${field.value.length}px`)
    //     }
    //     console.log(field.value.length, field.scrollWidth / 10)
    // }

    return (
        profile_pic ?
        <div className="create-tweet-master-div">

            <div className="create-tweat-image-div">
                <img src={profile_pic} className='create-tweet-image' />
            </div>
            <div className="create-tweet-inner-div">


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
        : 'Loading'

    )
}

export default CreateTweet;
