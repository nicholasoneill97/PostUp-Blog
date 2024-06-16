//import deleteDoc function to be able to delete data from doc
//import doc to be able to access the data available
import { deleteDoc, doc } from "firebase/firestore";

//import database for access to data
//import storage to access where the uploaded images are for each post
import { db, storage } from "../../firebase-config";

//import deleteObject function to delete image urls
//import ref for accessing the storage where the urls are
import { deleteObject, ref } from "firebase/storage";

//import useNavigate for user to get redirected when post gets deleted from post.jsx
import { useNavigate } from "react-router-dom";

//import React
import React from "react";

//import toast for notifying user with popup when deleting is successful or not
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

//import delete post stylings
import '../DeletePost/DeletePost.css'


//uses ID and imageURL passed in from Posts.jsx and Post.jsx
export default function DeletePost({ id, imageUrl }) {

  {/*sets useNavigate function to a variable for navigation in delete function*/}
  const navigate = useNavigate()

  {/*function that deletes specific post and navigates them to home page with a success message, or returns them an error message*/}
  const deleteUserPost = async () => {
    navigate('/')
      try {
        await deleteDoc(doc(db, "userposts", id));
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
        toast("Post Was Deleted.", { type: "success" });
      } catch (error) {
        toast("Sorry, There Was An Error In Deleting This Post.", { type: "error" });
      }
      
    }

  return (
    <div>
      <div
        className="delete-post-button"
        onClick={deleteUserPost}
      >
        Delete Post
      </div>
    </div>
  );
}