const LOAD_USER_TWEETS = 'session/LOAD_USER_TWEETS';
const LOAD_SINGLE_USER_TWEETS = 'session/LOAD_SINGLE_USER_TWEETS';
const CREATE_TWEET = 'session/CREATE_TWEET';

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

    if (res.ok) {
        const tweets = await res.json();
        if (tweets.errors) {
            return;
        }

        dispatch(userTweets(tweets))
    }
}

export const createTweet = (tweet) => async (dispatch) => {
    // console.log(tweet)
    const res = await fetch('/api/tweet/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            tweet
        )
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(buildTweet(data))
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
            console.log('I am in the tweet reducer',action.tweet)
            const newTweets = {...state};
            newTweets[action.tweet.id] = action.tweet

            return newTweets;


        default:
            return state;
    }
}

export default tweetReducer;
