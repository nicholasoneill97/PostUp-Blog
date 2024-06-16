//import React
import React from "react";

//import useAuthState to see if user is a signed in user
import { useAuthState } from "react-firebase-hooks/auth";

//import auth for finding out if they're a signed in user
//import db for accessing userposts section from firebase 
import { auth, db } from "../../firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

//import heart icon for users to click on to like posts
import { FaRegHeart } from "react-icons/fa";

//import like stylings
import '../LikePost/LikePost.css'


//uses ID and likes passed in from Post.jsx and Posts.jsx
export default function LikePost({ id, likes }) {

  {/*checks if they're authorized as a user, sets them as a user*/}
  const [user] = useAuthState(auth);

  {/*used for accessing the userposts section from firebase*/}
  const likesRef = doc(db, "userposts", id);

  {/*function that handles liking and unliking a post, adds an array of the like to the ref*/}
  const likeUserPost = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      }).then(() => {
          console.log("like removed");
      }).catch((e) => {
            console.log(e);
      });
    }
    else{
        updateDoc(likesRef,{
            likes:arrayUnion(user.uid)
        }).then(() => {
            console.log("liked post");
        }).catch((e) => {
              console.log(e);
        });
    }
  };

  
  return (
    <div>
      {/*heart icon has different styling depending on if it is liked or not*/}
      <FaRegHeart
        className={`${!likes?.includes(user.uid) ? "not-liked" : "liked"} like-icon`}
        onClick={likeUserPost}
      />
    </div>
  );
}