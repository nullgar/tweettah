import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollow } from "../../store/session";
import './FollowBox.css';

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
    return (
        Object.values(users).length - 1 !== Object.values(currentUser['following']).length ?
        <div className="follow-box-master-div">
            <h3 className="follow-box-master-h3">Users to Follow!</h3>
            {Object.values(users).map(user => (


                    !currentUser['following'][user.id] && user.id !== currentUser.id ? <div key={user.id}>
                    <div className="user-to-follow-div">
                        <div className="follow-box-p-div">
                            <p>{user.username}</p>
                        </div>
                        <div className="follow-box-button-div">
                            <button
                            className="follow-box-follow-button"
                            onClick={(e) => handleFollow(e, user.id)}>Follow</button>
                        </div>
                    </div>
                    </div> : null

            ))}

        </div> : <div className="follow-box-master-div-no-user">
            <p>No Users to follow!</p>
        </div>
    )
}

export default FollowBox;
