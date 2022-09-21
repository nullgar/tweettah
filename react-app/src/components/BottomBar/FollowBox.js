import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../../store/session";
import Spinner from "../Spinner";

const FollowBox = () => {
    const [users, setUsers] = useState([]);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/follow-box`);
            if (response.ok) {
              const users = await response?.json();
              setUsers(users)


            }

        })();
    }, [currentUser])

    const handleFollow = (e, userId) => {
        e.preventDefault();
        dispatch(toggleFollow(userId))


        // window.open('https://www.google.com', 'width=300,height=300', 'popup=true')
    }
    // console.log(currentUser['following'])
    return (
        users ?
        <div>

            { Object.values(users).map(user => (

                !currentUser['following'][user.id] && user.id !== currentUser.id ? <div key={user.id}>
                    <div>{user.username}</div>
                    <div><button onClick={(e) => handleFollow(e, user.id)}>Follow</button></div>
                </div> : null
            ))}

        </div> : <Spinner />
    )
}

export default FollowBox;
