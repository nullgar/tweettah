import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createImage } from "../../store/image";


const UploadPicture = () => {

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         tweet_id: 4,
    //         user_id: 1,
    //         image: image
    //     }

    //     dispatch(createImage(payload))


    // }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form /*onSubmit={handleSubmit}*/ >
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            {/* <button type="submit">Submit</button> */}
            {/* {(imageLoading)&& <p>Loading...</p>} */}
        </form>
    )
}

export default UploadPicture;
