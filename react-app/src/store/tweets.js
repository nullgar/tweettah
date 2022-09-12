const LOAD_USER_TWEETS = 'session/LOAD_USER_TWEETS';
const LOAD_SINGLE_USER_TWEETS = 'session/LOAD_SINGLE_USER_TWEETS';
const CREATE_TWEET = 'session/CREATE_TWEET';
const EDIT_TWEET = 'session/EDIT_TWEET';
const DELETE_TWEET = 'session/DELETE_TWEET';


const loadTweets = (tweets) => ({
    type: LOAD_USER_TWEETS,
    tweets
})

const userTweets = (userTweets) => ({
    type: LOAD_SINGLE_USER_TWEETS,
    userTweets
})
const buildTweet = (tweet) => ({
    type: CREATE_TWEET,
    tweet
})

const buildEditTweet = (editedTweet) => ({
    type: EDIT_TWEET,
    editedTweet
})

const buildDeleteTweet = (tweetId) => ({
    type: DELETE_TWEET,
    tweetId
})

export const getAllUsersFeedTweets = () => async (dispatch) => {
    const res = await fetch('/api/tweet/');

    if (res.ok) {
        const tweets = await res.json();
        if (tweets.errors) {
            return;
        }

        dispatch(loadTweets(tweets))
    }
}

export const getSingleUserTweets = (userId) => async (dispatch) => {
    const res = await fetch(`/api/tweet/${userId}`);
    console.log(res)
    if (res.ok) {
        const tweets = await res.json();
        if (tweets.errors) {
            return;
        }

        dispatch(userTweets(tweets))
    } else {
        return {}
    }
}

export const createTweet = (tweet) => async (dispatch) => {
    const res = await fetch('/api/tweet/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            tweet
        )
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(buildTweet(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data) {
            return data;
        }
    }
}

export const editTweet = (payload) => async (dispatch) => {

    const res = await fetch(`/api/tweet/edit/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
        ,
        body: JSON.stringify({
            tweet: payload.tweet,
            user_id: payload.user_id
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(buildEditTweet(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data) {
            return data;
        }
    }
}

export const deleteTweet = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweet/delete/${tweetId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(buildDeleteTweet(tweetId))
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
        case LOAD_SINGLE_USER_TWEETS:
            const allUserTweets = {};
            Object.values(action.userTweets).forEach(tweet => (

                allUserTweets[tweet.id] = tweet
            ))
            return allUserTweets;
        case CREATE_TWEET:
            const newTweets = {...state};
            newTweets[action.tweet.id] = action.tweet
            return newTweets;
        case EDIT_TWEET:
            const editedTweets = {...state}
            editedTweets[action.editedTweet.id] = {...action.editedTweet}
            return editedTweets
        case DELETE_TWEET:
            const updatedTweets = {...state}
            delete updatedTweets[action.tweetId]
            return updatedTweets
        default:
            return state;
    }
}

export default tweetReducer;
