import React from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, uploadString, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import { useRef , useState } from 'react';
import firebase from "../firebase";
import { db, storage } from "../firebase";

function InputBox() {
const { data: session } = useSession();
const inputRef = useRef(null);
const filepickerRef = useRef(null)
const [imageToPost , setImageToPost] = useState(null)
const [imgURL , setImgURL] = useState("")
const [progress , setProgress] = useState(0)
const sendPost = async e => {
  e.preventDefault();
  if (!inputRef.current.value) return;

  addDoc(collection(db, 'posts'), {
    message: inputRef.current.value,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    timestamp: serverTimestamp(),
  }).then(document => {
    if (imageToPost) {
      const storage = getStorage();
      const storageRef = ref(storage, `posts/${document.id}`);
      uploadString(storageRef, imageToPost, 'data_url').then(snapshot => {
        getDownloadURL(snapshot.ref).then(URL => {
          setDoc(
            doc(db, 'posts', document.id),
            { postImage: URL },
            { merge: true }
          );
          console.log('File available at ', URL);
        });
        removeImage();
      });
    }
  });

  inputRef.current.value = '';
};

const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    };

    reader.onload = (readerEvent)=>{
        setImageToPost(readerEvent.target.result)
    };
};
const removeImage = ()=>{
    setImageToPost(null);
}
  return (
    <div className='bg-white p-2 
    rounded-2xl shadow-md
     text-gray-500
      font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
          <Image className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"/>

        <form className='flex flex-1'>
          <input ref={inputRef} className='rounded-full h-12
           bg-gray-100 flex-grow
            px-5 focus:outline-none' type="text"
           placeholder={`O que estas a pensar, 
           ${session.user.name}? `} />

           <button hidden onClick={sendPost} type="submit">Enviar</button>
           {imageToPost && (
               <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                   <img className='h-10 object-contain' src={imageToPost} alt="" />
                   <p className='text-xs text-red-500 text-center'>Remover</p>
               </div>
           )}

        </form>
      </div>
      <div className='flex justify-evenly p-3 border-t'>
          <div className='inputIcon'>
            <VideoCameraIcon className='h-7 text-red-500 '/>
            <p className='text-xs sm:text-sm xl:text-base'> Vídeo em directo</p>
          </div>

          <div onClick={()=>filepickerRef.current.click()} className='inputIcon'>
            <CameraIcon className='h-7 text-green-400'/>
            <p className='text-xs sm:text-sm xl:text-base'>Photo/Vídeo</p>
            <input ref={filepickerRef} onChange={addImageToPost} type="file" hidden  />
          </div  >
           
          <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300'/>
            <p className='text-xs sm:text-sm xl:text-base'>Feeling/Actividade</p>
          </div>
      </div>
 
    </div>
  );
}

export default InputBox;
