//import firebase assets for documentation uploads, updating, and gathering
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

//import useState for comment entry 
//import useEffect for snapshot of comments in document
import React, { useEffect, useState } from "react";

//import database from firebase-config for retrieving data
//import authorization for confirming if the user is a signed in user, or if the user signed in matches any comments in the doc
import { db, auth } from "../../firebase-config";

//import useAuthState to identify who is signed in
import { useAuthState } from "react-firebase-hooks/auth";


//import comment styles
import '../Comment/Comment.css'


//takes in the id passed in from Post.jsx
export default function Comment({ id }) {

  //initializes useState hook for individual comment and setting a comment
  const [comment, setComment] = useState("");

  //initializes useState hook for comments and updating comments array
  const [comments, setComments] = useState([]);

  //useAuthState finds who the currently signed in user is
  //sets who is found to signedInUser
  const [signedInUser] = useAuthState(auth);

  //sets commentRef to the userposts section inside firebase database
  const commentRef = doc(db, "userposts", id);
  
  //useEffect retrieves comments available from userposts section
  useEffect(() => {
    const docRef = doc(db, "userposts", id);
    onSnapshot(docRef, (snapshot) => {
      try {
        setComments(snapshot.data().comments);
      } catch (error) {
      }
    });
    
  }, []);


  //function that handles uploading comment into the doc
  //it it set to be trigged when the user hits enter
  //doc is updated to document comments array, and gets attached with user details and random ID
  const uploadComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: signedInUser.uid,
          userName: signedInUser.displayName,
          comment: comment,
          commentTimeStamp: new Date(),
          commentId: crypto.randomUUID()
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function removes array of comment from doc
  const deleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
        comments:arrayRemove(comment),
    })
    .then((e) => {
        console.log(e);
    })
    .catch((error) => {
        console.log(error);
    })
  };
  return (
    <>
      {/*the comments container has a different class assigned depending if they're a signed in user or not*/}
      <div className={signedInUser ? "post-comments-container" : "guest-post-comments-container" }>
      {/*comment input element only displays if they're signed in*/}
      {signedInUser && (
          <input
            type="text"
            className="comment-input"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment"
            onKeyUp={(e) => {
              uploadComment(e);
            }}
          />
        )}
        {/*returns comments if there are any, and displays them all uniformly*/}
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName , commentTimeStamp}) => (
           <div className="comment-container" key={commentId}>
              <div className="comment-top" >
                {userName} commented:
                <div className="">
                {/*displays delete comment element only if the username that made the comment matches who is signed in currently*/}
                  
                {signedInUser && user === signedInUser.uid && (
                  <div
                    className="delete-comment-button"
                    onClick={() => deleteComment({ commentId, user, comment, userName , commentTimeStamp})}
                  >
                    Delete
                  </div>
                  )}
                </div>
              </div>
              <div className="comment-text">
                {comment}
              </div>
            </div>
          ))}
      </div>
    </> 
  );
}