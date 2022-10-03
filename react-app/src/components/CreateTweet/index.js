import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createImage } from "../../store/image";
import { createTweet } from "../../store/tweets";
import Spinner from "../Spinner";
import UploadPicture from "../UploadPicture";
import './CreateTweet.css'
const CreateTweet = () => {
    const [tweet, setTweet] = useState('')
    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const profile_pic = useSelector(state => state.session.user.profile_pic)

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleTweet = async (e) => {
        e.preventDefault()
        /*Image upload happens here */
        const payload = {
            tweet_id: 4,
            user_id: 1,
            image: image
        }

        if (tweet) {
            const resImage = await dispatch(createImage(payload));
            console.log(resImage.ok)
            if (!resImage?.error) {
                const newTweet = {
                    tweet: tweet.trimStart()
                }

                const res = await dispatch(createTweet(newTweet))

                if (res.errors) {
                    setErrors(res.errors)
                } else if (res) {
                    setErrors([])
                    setTweet('')
                    const area = document.querySelector('.create-tweet-text-area');
                    area.style.height = '39px';
                }
            }
        } else {
            const newTweet = {
                tweet: tweet.trimStart()
            }

            const res = await dispatch(createTweet(newTweet))

            if (res.errors) {
                setErrors(res.errors)
            } else if (res) {
                setErrors([])
                setTweet('')
                const area = document.querySelector('.create-tweet-text-area');
                area.style.height = '39px';
            }
        }

        /* If image is succesuful it will hit this if if not it will hit the else */


    }

    useEffect(() => {
        return
    }, [tweet])


    return (
        profile_pic ?
        <div className="create-tweet-master-div">

            <div className="create-tweat-image-div">
                <img src={profile_pic} className='create-tweet-image' alt="" />
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
                        const area = document.querySelector('.create-tweet-text-area');
                        area.style.height = '0px';
                        area.style.height = area.scrollHeight + 'px';
                        console.log(area.scrollHeight , area.style.height)
                    }}
                    >

                    </textarea>

                </form>
                <div className="upload-image-div"/*onSubmit={handleSubmit}*/ >
                <label htmlFor='file-upload'>
                    <i
                    className="fa-regular fa-image image-upload-icon"
                    />
                </label>
                    <input
                    id='file-upload'
                    type="file"
                    accept="image/*"
                    onChange={updateImage}

                />

                </div>
                <div className="create-tweet-submit-div">
                    <button
                        onClick={(e) => handleTweet(e)}
                        disabled={submitted}
                        className="create-tweet-submit-button">
                            Tweet
                        </button>

                </div>
            </div>
        </div>
        : <Spinner />

    )
}

export default CreateTweet;
