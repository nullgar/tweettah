import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../../store/session";
import { getAllUsersFeedTweets } from "../../store/tweets";
import './FollowBox.css'
const FollowBox = () => {
    const curret_user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [users, setUsers] = useState({});
    const [user, setUser] = useState();
    // const []
    const userId = curret_user.id;


    useEffect(() => {
		const getData = async () => {
			const res = await fetch(`/api/users/get-users`);
			const fetchedusers = await res.json();
			// dispatch(getAllUsersFeedTweets(userId));
			setUsers(fetchedusers);
		};
		getData();
	}, [dispatch, user]);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		setLoaded(true);
	// 	}, 250);
	// 	return () => clearTimeout(timeout);
	// }, []);

	//Fetch user data
	const getUser = async () => {
		let newuser = await fetch(`/api/users/${userId}`);
		let data = await newuser.json();
		setUser(data);
	};
	// const toggleAUserFollow = async (currentUserId, userToFollowId) => {
	// 	await dispatch(toggleUserFollow(userToFollowId));
	// 	await getUser(userId);
	// };

    // useEffect(() => {
    //     const getData = async () => {
    //         const userList = []
	// 		const res = await fetch(`/api/users/`);
	// 		const fetchedusers = await res.json();
    //         fetchedusers.users.map(user => {
    //             curret_user.following.map(cUserFollowing => {
    //                 if (user.id !== cUserFollowing.user_id && user.id !== curret_user.id) {
    //                     userList.push(user)
    //                 }
    //         }
    //         )
    //         })
    //         setUsers(userList)
	// 	};
	// 	getData();
    // }, [dispatch, user])

    // const getUser = async () => {
	// 	let newuser = await fetch(`/api/users/${userId}`);
	// 	let data = await newuser.json();
	// 	setUser(data);
	// };
    const handleFollow = async (e, id) => {
        e.preventDefault()
        dispatch(toggleFollow(id))
        await getUser(userId);
    }

    return (
        <div className="follow-box-master-div">

            {users ? Object.values(users).map(user => (
                <div key={user.id}>
                    <div>{user.username}</div>
                    <div><button onClick={(e) => handleFollow(e, user.id)}>Follow</button></div>
                </div>
                // console.log(user)
            )): 'nothing'}
        </div>
    )
}

export default FollowBox;
