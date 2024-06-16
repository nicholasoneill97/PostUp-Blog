//import doc for accessing userposts from firebase
//import onSnapshot to gather current data from firebase
import { doc, onSnapshot } from "firebase/firestore";

//import auth to find if user is logged in user
//import db to access database
import { auth, db } from "../../firebase-config";

//import useEffect for taking snapshot of post
//import useState for setting post to which post is being requested
import React, { useEffect, useState } from "react";

//import useAuthState for finding if the user is logged in
import { useAuthState } from "react-firebase-hooks/auth";

//import useParams for catching ID passed in from Posts.jsx
import { useParams } from "react-router-dom";

//import LikePost for post to be likable
import LikePost from "../../components/LikePost/LikePost";

//import DeletePost for user to be able to delete their post 
import DeletePost from '../../components/DeletePost/DeletePost'

//import comment to display comments
import Comment from '../../components/Comment/Comment';

//import commment icon
import { LiaCommentsSolid } from "react-icons/lia";


//import post stylings
import '../Post/Post.css'

//import loader animation for page load
import Loader from "../../components/Loader/Loader";

export default function Post() {

  {/*catching id passed in*/}
  const { id } = useParams();

  {/*useState hook for the post set initially to null*/}
  const [post, setPost] = useState(null);

  {/*authorized user set as*/}
  const [user] = useAuthState(auth);

  {/*useEffect hook grabs snapshot of data corresponding to the id*/}
  useEffect(() => {
    const docRef = doc(db, "userposts", id);
    onSnapshot(docRef, (snapshot) => {
      setPost({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <div className="u-container">
      <Loader />
      {post && (
        <div className="post-clicked-container">
          
            <div className="top-of-post">   
            {/*displays delete post button if they are the post creator*/}
            {user && user.uid === post.userId && (
                            <DeletePost id={id} imageUrl={post.imageUrl} />
                          )}  
            {/*displays different container depending on if they're logged in or not*/}         
              <div className={user && 
                              user.uid === post.userId ? 
                              "post-title-container" : "post-title-container-randUser"}>
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                  />
                <div className="post-info-container">
                  <p className="post-title">
                    {post.title}
                  </p>
                  <div className="post-authored">
                    Posted By
                    <span className="post-author">
                      {post.postCreator}
                    </span> 
                    on
                    <div className="post-timestamp">
                      {post.createdAt.toDate().toDateString()}
                    </div>
                  </div>
                  
                  <div className="post-likes-container">
                    {/*displays like post button only if user is logged in*/}
                    {user && <LikePost id={id} likes={post.likes} />}
                    {/*displays the letter "s" on the end of the word "like" depending on how many likes there are*/}
                    {post.likes?.length === 1 ? (
                      <div className="post-likes">
                        <p>
                          {post.likes?.length}              
                        </p>
                        <p>
                          Like
                        </p>
                      </div>) : (
                            <div className="post-likes">
                              <p>
                                {post.likes?.length}              
                              </p>
                              <p>
                                Likes
                              </p>
                            </div>
                  )}
              </div>
                </div>
                
              </div>
              
            </div>
            
            <h4 className="post-body">
              {post.description}
            </h4>

            
              
                        
                
            <div className="post-comments-section">
              <div className="post-comments-top">
                      {user && <LiaCommentsSolid className="post-comments-icon" />}
                      {/*displays the letter "s" on the end of the word "comment" depending on how many comments there are*/}
                      {post.comments.length >= 0 && post.comments && post.comments.length != 1 ? (
                          <div className="post-comments">
                            <p>
                              {post.comments?.length}
                            </p>
                            <p>
                              Comments
                            </p>
                          </div>
                        ) : (
                          <div className="post-comments">                        
                            <p>
                              {post.comments?.length}
                            </p>
                            <p>
                              Comment
                            </p>                   
                          </div>
                        ) }
              </div>
                    <Comment id={post.id} />
            </div>
              
           
            
            
          
        </div>
      )}
    </div>
  );
}