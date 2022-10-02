const LOAD_IMAGES = 'session/LOAD_IMAGES';
const LOAD_SINGLE_USER_IMAGES = 'session/LOAD_SINGLE_USER_IMAGES';
const CREATE_IMAGE = 'session/CREATE_TWEET';
const EDIT_IMAGE = 'session/EDIT_IMAGES';
const DELETE_IMAGE = 'session/DELETE_IMAGES';


const buildImage = (image) => ({
    type: CREATE_IMAGE,
    image
})


export const createImage = (buildImage) => async (dispatch) => {
    const {
		tweet_id,
        user_id,
        image
	} = buildImage;

	const formData = new FormData();
	formData.append("tweet_id", tweet_id);
	formData.append("user_id", user_id);
	formData.append("image", image);



	const response = await fetch('/api/image', {
		method: "POST",
		body: formData,
	});

	if (response.ok) {
	 	const image = await response.json();
        console.log('in action creator',image)
		dispatch(buildImage(image));
		return image;
	} else {
    // a real app would probably use more advanced
    // error handling
    const res = {
        "message": "Image could not be uploaded",
        "statusCode": 401
    }
    return res
    }
}
