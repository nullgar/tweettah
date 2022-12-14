// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const TOGGLE_FOLLOW = 'session/TOGGLE_FOLLOW'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const follow = (following) => ({
  type: TOGGLE_FOLLOW,
	following,
})
const initialState = { user: null };

export const toggleFollow = (userToFollow) => async (dispatch) => {
	const res = await fetch(`/api/users/${userToFollow}/follow`,
		{
			method: "POST",
		}
	);
	if (res.ok) {
		const data = await res.json();
    // console.log(data,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		dispatch(follow(data));
	}
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, repeatPassword) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      repeatPassword
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  let followingList = {};
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case TOGGLE_FOLLOW:
      const newState = { ...state , user: {...state.user, following: action.following} };
      // newState.user.following = {...action.following}
      // console.log('******************',newState.user)

      // const updates = {...newState}
			// if (Object.values(action.following).length > 0) {
			// 	Object.values(action.following).forEach((following) => {
			// 		followingList[following.user_id] = following;
			// 	});
			// 	newState.user.following = followingList;

			// } else {
			// 	newState.user.following = {};
			// }
      // console.log(newState)
			return newState;
    default:
      return state;
  }
}
