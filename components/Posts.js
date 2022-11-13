import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db, storage } from "../firebase";
import Post from './Post';

function Posts() {
    
    const [realtimePosts] = useCollection(
        collection(db,'posts')
    );
  return (
    <div>

        {realtimePosts?.docs.map((post) => (
            <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            image={post.data().image}
            postImage={post.data().postImage}
            
            />
        ))}
      
    </div>
  );
}

export default Posts;
