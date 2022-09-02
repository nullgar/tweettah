const LOAD_TWEETS_COMMENTS = 'session/LOAD_TWEETS_COMMENTS';
const CREATE_TWEET_COMMENT = 'session/CREATE_TWEET_COMMENT';
const EDIT_TWEET_COMMENT = 'session/EDIT_TWEET_COMMENT';
const DELETE_TWEET_COMMENT = 'session/DELETE_TWEET_COMMENT';

const loadComments = (comments) => ({
    type: LOAD_TWEETS_COMMENTS,
    comments
})

const buildComment = (comment) => ({
    type: CREATE_TWEET_COMMENT,
    comment
})

export const getAllTweetsComments = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweet/${tweetId}/comments`)

    if (res.ok) {

        const data = await res.json()
        dispatch(loadComments(data))
    } else dispatch(loadComments({}))
    // Verify if this is good
}

export const createTweetComment = (payload) => async (dispatch) => {
    console.log('In action creator',payload)
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
            dispatch(buildComment(data))

    }

}


const commentReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_TWEETS_COMMENTS:
            const allComments = {};

            Object.values(action.comments).forEach(comment => (
                allComments[comment.id] = comment
            ))
            return allComments;
        case CREATE_TWEET_COMMENT:
            const allTweetComments = {...state};
            allTweetComments[action.comment.id] = action.comment;
            return allTweetComments;
        default:
            return state;
    }
}

export default commentReducer;
