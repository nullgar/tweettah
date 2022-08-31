const LOAD_USER_TWEETS = 'session/LOAD_USER_TWEETS';

const loadTweets = (tweets) => ({
    type: LOAD_USER_TWEETS,
    tweets
})


export const getAllUsersFeedTweets = () => async (dispatch) => {
    const res = await fetch('/api/tweet/')

    if (res.ok) {
        const tweets = await res.json();
        if (tweets.errors) {
            return;
        }

        dispatch(loadTweets(tweets))
    }
}


const tweetReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER_TWEETS:
            const allTweets = {...state};
            Object.values(action.tweets).forEach(tweet => (

                allTweets[tweet.id] = tweet
            ))
            return allTweets;
        // case CREATE_IMAGE:
        //     const newImages = {...state};


        //     newImages[action.image.id] = action.image;

        //     return newImages;
        default:
            return state;
    }
}

export default tweetReducer;
