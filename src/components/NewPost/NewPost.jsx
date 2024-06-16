//import React
//import useState for setting form data
import React, { useState } from "react";

//import timestamp for documenting when post was made
//import collection for grouping together all the data about the post
//import addDoc function to add all data to the database
import { Timestamp, collection, addDoc } from "firebase/firestore";

//import ref for accessing userposts from firebase
//import uploadBytesResumable to be able to track progress of image upload
//import getDownloadURL function to retrieve and add photo from url
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//import storage to upload image to storage
import { storage, db, auth} from '../../firebase-config'

//import useAuthState to determine if the user is a logged in user
import { useAuthState } from "react-firebase-hooks/auth";

//import toast for informing user if posting was successful or not
import { toast } from "react-toastify";

//import Link for Log in link displayed to users not logged in
import { Link } from "react-router-dom";

//import new post stylings
import '../NewPost/NewPost.css'

//import X icon for closing new post container
import { HiOutlineX } from "react-icons/hi";

export default function NewPost() {

  //sets user as user if they are found to be logged in
  const [user] = useAuthState(auth);

  //useState hook for form data, initialized with all empty strings, except for timestamp which is set to now
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  //useState hook sets progress initially to 0 
  const [progress, setProgress] = useState(0);


  //useState hook isOpen initially set to false for new post container
  const [isOpen, setIsOpen] = useState(false)

  //function that handles when new data is typed into any of the input elements
  const changeData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function that handles if the image uploaded changes
  const changeImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  //function that handles user pressing publish, it checks if all form data section have a value, and returns a popup if not
  const publishPost = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("All fields are required.");
      return;
    }
    //function stores new image in storage with the timestamp and image name attached
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    //function uploads image bytes amount into storageRef
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    //while bytes are being uploaded, this keep tracks of the progress and convert the progress into a percentage
    //after this is complete, all form data sections are returned to their initial state of empty strings
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: ""
        });
        //getDownloadURL finds the url and stores it as the value of imageURL inside the postsRef Doc added
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const postsRef = collection(db, "userposts");
          addDoc(postsRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            postCreator:user.displayName,
            userId:user.uid,
            likes:[],
            comments:[]
          })
            //notifies the user if it was posted successfully, then sets new post container to closed
            .then(() => {
              toast("Posted Successfully!", { type: "success" });
              setProgress(0);
              setIsOpen(!isOpen)
            })
            //notifies the user if there was an error
            .catch((err) => {
              toast("Error Adding Your Post..", { type: "error" });
            });
        });
      }
    );
    
  };

  return (
  <>
    {/*if statement that assigns a class on the backdrop of the container depending on if new post container is open or not*/}
    <div className={isOpen ? "container-open" : "container"}>
      {/*displays log in link is there is not a logged in user found*/}
      {!user ? (
        <>
          <h1>
            <Link className="Log-in-link" to="/login">Log In To Create A Post!</Link>
          </h1> 
        </>
      ) : (
      <>
        {/*If statements declaring what is displayed when new post container is not open and when it is*/}
        {!isOpen ? (
        <div className='new-post-toggler-open' onClick={() => {setIsOpen(!isOpen); }}>Create Post</div>
      ) : (<HiOutlineX className="new-post-toggler-close" 
                       onClick={() => {setIsOpen(!isOpen); setFormData({
                                                                    title: "",
                                                                    description: "",
                                                                    image: "",})}} />)
          
          }
        {isOpen &&
        <div className="new-post-container">
          <label className="form-title">
            New Post
          </label>
          <div className="form-row">
            <label className="newpost-title">
              Title
            </label>
            {/*title input that sets title value in form data*/}
            <input
              type="text"
              name="title"
              className="newpost-title-input"
              maxLength={45}
              value={formData.title}
              onChange={(e) => changeData(e)}
            />
          </div>
          <div className="form-row">  
            <label className="description-title">
              Description
            </label>
            {/*description input that sets title value in form data*/}
            <textarea
              name="description"
              className="description-input"
              value={formData.description}
              onChange={(e) => changeData(e)}
            />
          </div>
        
          <div className="form-row">
            <label className="form-image-title">
              Image 
              {/*displays progress of upload after publish button is clicked*/}
              {progress === 0 ? null : (
              <div className="progress">
                {`${progress}%`}  
              </div>
        
              )}
            </label>
            {/*image file input that sets title value in form data*/}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="image-input"
              onChange={(e) => changeImage(e)}
            />
          </div>
          {/*button to run publish post function*/}
          <button
            className="new-post-container-button"
            onClick={publishPost}
          >
            Publish
          </button>
        </div>}

        {/*when new post container closes, assigns a new class on container for animation to run while form is leaving page*/}
        {!isOpen &&
        <div className="new-post-container hide-container">
        </div>
        }   
      </>
      )}
    </div>
  </>
  );
}