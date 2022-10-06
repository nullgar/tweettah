const LOAD_USER_TWEETS = 'session/LOAD_USER_TWEETS';
const LOAD_SINGLE_USER_TWEETS = 'session/LOAD_SINGLE_USER_TWEETS';
const CREATE_TWEET = 'session/CREATE_TWEET';
const EDIT_TWEET = 'session/EDIT_TWEET';
const DELETE_TWEET = 'session/DELETE_TWEET';
const CREATE_TWEET_COMMENT = 'session/CREATE_TWEET_COMMENT';
const EDIT_TWEET_COMMENT = 'session/EDIT_TWEET_COMMENT';
const DELETE_TWEET_COMMENT = 'session/DELETE_TWEET_COMMENT';

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

/* Comment reducer in tweets */

const buildComment = (comment, tweetId) => ({
    type: CREATE_TWEET_COMMENT,
    comment,
    tweetId
})

const buildEditComment = (edited, commentId, tweetId) => ({
    type: EDIT_TWEET_COMMENT,
    edited,
    commentId,
    tweetId
})
const builddeleteComment = (data, commentId, tweetId) => ({
    type: DELETE_TWEET_COMMENT,
    data,
    commentId,
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


/* Comment thunks */
export const createTweetComment = (payload) => async (dispatch) => {

    const res = await fetch(`/api/tweet/${payload.tweetId}/new-comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment: payload.comment,
            tweet_id: payload.tweetId,
        })

    })
    if (res.ok) {
            const data = await res.json()
            dispatch(buildComment(data, payload.tweetId))

    } else if (res.status < 500) {
        const data = await res.json();
        if (data) {
            return data;
        }
    }

}


export const createEditedComment = (payload) => async (dispatch) => {

    const res = await fetch(`/api/comment/${payload.commentId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment: payload.comment,
            comment_id: payload.commentId
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(buildEditComment(data, payload.commentId, payload.tweetId))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data) {
            return data;
        }
    }
}


// export const getAllTweetsComments = (tweetId) => async (dispatch) => {
//     const res = await fetch(`/api/tweet/${tweetId}/comments`)

//     if (res.ok) {

//         const data = await res.json()
//         dispatch(loadComments(data))
//     }
//     // else dispatch(loadComments({}))
//     // Verify if this is good
// }

export const deleteComment = (comment) => async (dispatch) => {

    const res = await fetch(`/api/comment/${comment.id}`, {
        method: "DELETE",
    })

    if (res.ok) {
        const data = await res.json();
        // console.log(comment.tweet_id, comment.id)
        dispatch(builddeleteComment(data, comment.id, comment.tweet_id))
    }
}

/* ------------------------------- Reducer --------------------------------------------------- */
const tweetReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER_TWEETS:
            const allTweets = {};
            Object.values(action.tweets).map(tweet => (
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
        case CREATE_TWEET_COMMENT:
            // const allTweetComments = {...state, tweetId: {comments: {...state[action.tweetId].comments, obj}}};
            // const allTweetComments = {...state, ...state[action.tweetId], ...action.comment}
            // const allTweetComments = {...state, [action.tweetId]: {...state[action.tweetId].comments, ...state[action.tweetId].comments[action.comment] = action.comment}}
            const allTweetComments = {...state, [action.tweetId]: {...state[action.tweetId]}};
            // const allTweetComments = {...state, state[action.tweetId].comments[action.comment.id] = action.comment}
            // console.log({...state[action.tweetId].comments[action.comment.id] = action.comment})
            // console.log(allTweetComments)
            // allTweetComments[action.tweetId]['comments'] = ...state.tweets.comments: {...action.comment};
            // return state;
            return allTweetComments;
        case EDIT_TWEET_COMMENT:
            const editedTweetComments = {
                ...state, [action.tweetId]:
                    {...state[action.tweetId], comments:
                        {...state[action.tweetId].comments, [action.commentId]:
                            {...action.edited}}}};
            return editedTweetComments;
        case DELETE_TWEET_COMMENT:
            const updatedComments = {...state,
                [action.tweetId]: {...state[action.tweetId],
                    comments: {...state[action.tweetId].comments}}};
            // const updatedComments = {...state};
            // delete updatedComments[action.tweetId].comments[action.commentId];
            delete updatedComments[action.tweetId].comments[action.commentId];
            // const updatedComments = {...temp}
            return updatedComments;
        default:
            return state;
    }
}

export default tweetReducer;
