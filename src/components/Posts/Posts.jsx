//import collection for all data retrieval
//import snapshot for grabbing all current data
//import orderBy and query to sort data by date
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

//import useState hook for posts
//import useEffect for snapshotting current data 
import React, { useState, useEffect } from "react";

//import auth and useAuthState to determine if user is a signed in user
//import db to access database
import { auth, db } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
 
//import DeletePost for users to delete their posts
import DeletePost from "../DeletePost/DeletePost";

//import LikePost for users to like posts
import LikePost from "../LikePost/LikePost";

//import Link for users to navigate to specific posts' pages
import { Link } from "react-router-dom";

//import comments icon
import { LiaCommentsSolid } from "react-icons/lia";

//impost toast for notifying users when a post is deleted or added successfully or unsuccessfully
import { ToastContainer } from "react-toastify";

//import Posts stylings
import '../Posts/Posts.css'

//import Loader for page load animation 
import Loader from "../Loader/Loader";

export default function Posts() {
  
  {/*useState hook for posts on page set to empty array on initialization*/}
  const [posts, setPosts] = useState([]);

  {/*sets user to a user if they are found to be a logged in user*/}
  const [user] = useAuthState(auth);

  {/*function that shortens a string, it takes in a string, and a number. The number will be the limit of characters that the string will display*/}
  const shortenString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...'
        } else {
          return str
        }
  };

  {/*useEffect orders posts by date, and takes a snapshot of current data available and sets posts to hold that data*/}
  useEffect(() => {
    const postsRef = collection(db, "userposts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    });
  }, []);

  return (
    
    <div className="posts-container">
      {/*Load animation and toast container*/}
      <Loader />
      <ToastContainer className='toast' />
      
      {/*conditional statement where the string will be displayed if there are no posts*/}
      {/*posts are mapped for data corresponding to each post*/}
      {posts.length === 0 ? (
        <p className="no-posts">No posts are here yet!</p>
      ) : (
        posts.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            postCreator,
            userId,
            likes,
            comments,
          }) => (
            <div className="user-post-container" key={id}>
              
                {/*link attached to each post's image that will take them to a page dedicated to that specific post and pass in ID*/}
                
                  <Link to={`/post/${id}`} className="image-link">
                    <img
                      src={imageUrl}
                      alt="title"
                      
                    />
                  </Link>
                
                <div className="right-side-post">
                    {/*displays post creator, then only displays delete post button if the user viewing is the post creator*/}
                    <div className="post-top">
                      {postCreator && (
                        <span className="post-creator">User : <span className="name">{postCreator}</span></span>
                      )}
                      <div className="delete-post-button">
                      {user && user.uid === userId && (
                        <DeletePost id={id} imageUrl={imageUrl} />
                      )}
                      </div>
                    </div>
                    {/*display of post data, using shortenString function where applicable to avoid overflow*/}
                    <div className="post">
                      <p className="title">
                        {shortenString(title, 45)}
                      </p>
                      <p className="timestamp">
                        {createdAt.toDate().toDateString()}
                      </p>
                      <p className="body">
                        {shortenString(description, 100)}
                      </p>
                    </div>
                  
                  
                  <div className="bottom-container">
                    <div className="analytics">
                      <div className="likes-container">
                        {/*ability to like a post (like icon) only displays if a logged in user is present*/}
                        {user && <LikePost id={id} likes={likes}/>}
                        {/*if statement that displays the letter "s" at the end of the word comment depending on how many comments are present*/}
                        {likes?.length === 1 ? (
                        <div className="likes">
                          <p>
                            {likes?.length}              
                          </p>
                          <p>
                            Like
                          </p>
                        </div>
                        
                        ) : (
                          <div className="likes">
                          <p>
                            {likes?.length}              
                          </p>
                          <p>
                            Likes
                          </p>
                          </div>
                        )}
                      </div>
                      <div className="comments-container">
                        <LiaCommentsSolid className="comments-icon" />
                        {/*if statement that displays the letter "s" at the end of the word comment depending on how many comments are present*/}
                        {comments.length >= 0 && comments && comments.length != 1 ? (
                      
                        <div className="comments">
                          <p>
                            {comments?.length}
                          </p>
                          <p>
                            Comments
                          </p>
                        </div>
                        ) : (
                          <div className="comments">
                            <p> 
                              {comments?.length}
                            </p>
                            <p>
                              Comment
                            </p>
                          </div>
                        ) }
                      </div>
                      {/*link attached to each post that will take them to a page dedicated to that specific post and pass in ID*/}
                      <Link to={`/post/${id}`}>
                        <button className="post-link-button">
                        Go To Post
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          )
        )
      )}
    </div>
  );
}