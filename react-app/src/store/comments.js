const LOAD_TWEETS_COMMENTS = 'session/LOAD_TWEETS_COMMENTS';
const CREATE_TWEET_COMMENT = 'session/CREATE_TWEET_COMMENT';
const EDIT_TWEET_COMMENT = 'session/EDIT_TWEET_COMMENT';
const DELETE_TWEET_COMMENT = 'session/DELETE_TWEET_COMMENT';

const loadComments = (comments) => ({
    type: LOAD_TWEETS_COMMENTS,
    comments
})


export const getAllTweetsComments = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweet/${tweetId}/comments`)

    if (res.ok) {
        console.log('hits okay')
        const data = await res.json()
        dispatch(loadComments(data))
    } else dispatch(loadComments({}))
    // Verify if this is good
}


const commentReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_TWEETS_COMMENTS:
            const allComments = {};

            Object.values(action.comments).forEach(comment => (
                allComments[comment.id] = comment
            ))
            return allComments;
        default:
            return state;
    }
}

export default commentReducer;
