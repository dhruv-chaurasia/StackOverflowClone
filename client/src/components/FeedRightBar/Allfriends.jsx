import React from 'react'
import { useSelector} from "react-redux";
import Displayfriend from './Displayfriend';
const Allfriends = ({look}) => {
    let User = useSelector((state) => state.currentUserReducer);
    const users = useSelector((state) => state.usersReducer);
    
  return (
    <div className="all-friends-container">
      <h2>All friends:</h2>
        {User === null ? (
      <h2>Login to make friends</h2>
    ) : (User.result.friends === null?<p>Make some friends dude!</p>:
      User.result.friends.map((id) => {
        const filteredUser = users.find((user) => user._id === id);

        return filteredUser && look===""? (
          <div key={filteredUser._id}>
            <Displayfriend user={filteredUser}/>
          </div>
        ) : null;
      })
    )}
    {
      look!=="" && User!==null && User.result.friends.map((id) => {
        const filteredUser = users.find((user) => user._id === id && user.name===look);
        return filteredUser ? (
          <div key={filteredUser._id}>
            <Displayfriend user={filteredUser}/>
          </div>
        ) : null;
      })
    }
    </div>
  )
}

export default Allfriends