import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import './fire.css'
import img1 from "../../assets/image/1.jpg"
const auth = getAuth();
const provider = new GoogleAuthProvider();

const Firebase_Store = () => {

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
    }, []);

    const [input, setInput] = useState({})
    const [blogs, setBlogs] = useState()
    const [edit, isEdit] = useState(false)
    const [id, setId] = useState()
    useEffect(() => {
        fetchBlogs()
    }, [blogs])

    async function fetchBlogs() {
        var blogs = await getDocs(collection(database, 'blogs'))
        var list = []
        blogs.forEach((blog) => {
            var id = blog.id
            list.push({ id, ...blog.data() })
        });
        setBlogs(list)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (edit) {
            const blogRef = doc(database, `blogs/${id}`)
            await updateDoc(blogRef, input)
            isEdit(false)
            setInput(null)

        } else {
            var blog = await addDoc(collection(database, 'blogs'), input)
            setInput(null)
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleDelete = async (id) => {
        var deleData = await deleteDoc(doc(database, `blogs/${id}`))
    }

    const handleEdit = async (id) => {
        const blogRef = doc(database, `blogs/${id}`);
        const docSnap = await getDoc(blogRef);
        setInput(docSnap.data());
        isEdit(true)
        setId(id)
    }
    return (
        <>

            {user ?
                <>
                    <section>
                        <div className="container">
                            <div className="px-5 border-black border-b rounded-4 pb-5 text-center">
                                <h1 className='text-center mb-5'>Uplode Yobgur Blog</h1>
                                <form className="signup-form w-1/2 m-auto" onSubmit={handleSubmit}>
                                    <input type="text" name="name" id="" placeholder='Enter Your Name' onChange={handleChange}
                                        value={input ? input.name : ''} required className="block w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500" />
                                    <br />
                                    <input type="text" name="topic_title" id="" placeholder='Enter Topic Title' onChange={handleChange}
                                        value={input ? input.topic_title : ''} required className="block w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500" /><br />
                                    <input type="text" name="discription" id="" placeholder='Add Description' onChange={handleChange}
                                        value={input ? input.discription : ''} required className="block w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500" /><br />
                                    <button className='btn btn-secondary w-full rounded-5 mt-5'>{edit ? 'CHANGE' : ('Submit')}</button>
                                </form>
                                <button className='btn btn-secondary w-25 rounded-5 mt-5' onClick={() => signOut(auth)}>{'Sign Out'}</button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <h1 className='text-center mb-5'>BLOG</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {blogs && blogs.map((blog, id) =>
                                    <div key={id} className="card-container mb-4 p-3 border border-gray-300 rounded">
                                        <div className="card-body">
                                            <h1>{blog.topic_title}</h1>
                                            <p className="card-subtitle">{blog.discription}</p>
                                            <div className="card-author flex items-center mt-2">
                                                <img src={img1} alt="author avatar" className="w-10 h-10 rounded-full mr-2" />
                                                <div className="author-info">
                                                    <p className="author-name">{blog.name}</p>
                                                    <p className="post-timestamp">3sec ago</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex mt-2'>
                                            <button className='btn btn-warning w-full rounded-5 me-2' onClick={() => handleEdit(blog.id)}>EDIT</button>
                                            <button className='btn btn-warning w-full rounded-5' onClick={() => handleDelete(blog.id)}>DELETE</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </> :

                <div className="container">
                    <div className="d-flex justify-center">
                        <div className='m-5'>

                            <button onClick={googleSignIn} className='btn btn-warning border shadow'>Sign in with Google</button>

                        </div>
                    </div>

                </div>


            }
        </>
    );
}

export default Firebase_Store;




