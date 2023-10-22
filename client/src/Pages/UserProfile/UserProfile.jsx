import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/Leftsidebar/Leftsidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import { addFriend ,delFriend} from "../../actions/users";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const updateFriend = ()=>{
    if(currentUser ===  null)
    {
      alert("Login to add friends");
      Navigate("/Auth");
    }
    else
    {dispatch(addFriend(id,currentUser?.result?._id));
      }
  }

  const deleteFriend = ()=>{
    console.log(currentUser);
    if(currentUser === null)
    {
      alert("Login to add friends");
      Navigate("/Auth");
    }
    else
    {dispatch(delFriend(id,currentUser?.result?._id));
      }
  }

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result?._id !== id && (currentUser?.result?.friends.findIndex((element) => element === id) === -1?
          <button  className='add-btn' onClick={()=>updateFriend()}>+ Add Friend</button>:
          <button  className='add-btn' onClick={()=>deleteFriend()}>- Delete Friend</button>)}


            {currentUser?.result?._id === id && 
            (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
