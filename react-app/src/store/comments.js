const LOAD_TWEETS_COMMENTS = 'session/LOAD_TWEETS_COMMENTS';
// const CREATE_TWEET_COMMENT = 'session/CREATE_TWEET_COMMENT';
const EDIT_TWEET_COMMENT = 'session/EDIT_TWEET_COMMENT';
const DELETE_TWEET_COMMENT = 'session/DELETE_TWEET_COMMENT';

const loadComments = (comments) => ({
    type: LOAD_TWEETS_COMMENTS,
    comments
})

// const buildComment = (comment) => ({
//     type: CREATE_TWEET_COMMENT,
//     comment
// })

const buildEditComment = (edited) => ({
    type: EDIT_TWEET_COMMENT,
    edited
})

const builddeleteComment = (comment_id) => ({
    type: DELETE_TWEET_COMMENT,
    comment_id
})

export const getAllTweetsComments = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweet/${tweetId}/comments`)

    if (res.ok) {

        const data = await res.json()
        dispatch(loadComments(data))
    } else dispatch(loadComments({}))
    // Verify if this is good
}

// export const createTweetComment = (payload) => async (dispatch) => {

//     const res = await fetch(`/api/tweet/${payload.tweetId}/new-comment`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             comment: payload.comment,
//             tweet_id: payload.tweetId,
//         })

//     })
//     if (res.ok) {
//             const data = await res.json()
//             dispatch(buildComment(data))

//     } else if (res.status < 500) {
//         const data = await res.json();
//         if (data) {
//             return data;
//         }
//     }

// }

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
        dispatch(buildEditComment(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data) {
            return data;
        }
    }
}

export const deleteComment = (comment_id) => async (dispatch) => {

    const res = await fetch(`/api/comment/${comment_id}`, {
        method: "DELETE",
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(builddeleteComment(data))
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
        // case CREATE_TWEET_COMMENT:
        //     const allTweetComments = {...state};
        //     allTweetComments[action.comment.id] = action.comment;
        //     return allTweetComments;
        case EDIT_TWEET_COMMENT:
            const editedComments = {...state};
            editedComments[action.edited.id] = {...action.edited};
            return editedComments;
        case DELETE_TWEET_COMMENT:
            const updatedComments = {...state};
            delete updatedComments[action.comment_id];
            return updatedComments;
        default:
            return state;
    }
}

export default commentReducer;
