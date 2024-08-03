import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import signInImage from "../Assets/Images/Making art-bro.png"
import { Link, useNavigate } from "react-router-dom";
import eye from "../Assets/Images/eye.png"
import eyebrow from "../Assets/Images/eyebrow.png"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "../context";
import google from "../Assets/Images/google.png"

export default function SignIn() {
    const { user, setUser, setLoading } = useUser()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [visiblePassword1, setVisiblePassword1] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    async function delaySetLoading(){
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }

    async function handleClick(e){
        e.preventDefault()
        setLoading(true)
        setTimeout(()=>{
            navigate('/sign-up')
            setLoading(false)
        },1000)
    }

    useEffect(() => {
        setLoading(true);
        if (user) {
            navigate('/');
        }
        delaySetLoading()
    }, [])

    async function handleSignIn(e) {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Please fill all the fields.")
            return;
        }
        setLoading(true);
        emailInputRef.current.blur();
        passwordInputRef.current.blur();
        try {
            const userSignIn = await signInWithEmailAndPassword(auth, email, password)
            if (userSignIn) {
                const user = await getDoc(doc(db, 'users', userSignIn.user.uid))
                if (user.exists()) {
                    setUser({ uid: userSignIn.user.uid, ...user.data() })
                    navigate('/')
                }
                else {
                    const admin = await getDoc(doc(db, 'admin', userSignIn.user.uid))
                    if (admin.exists()) {
                        setUser({ uid: userSignIn.user.uid, ...admin.data()})
                        navigate('/')
                    }
                }
            }
            setEmail("")
            setPassword("")
            delaySetLoading()
        } catch (error) {
            const errorMessage = error.message;
            toast.warn(errorMessage?.split("auth/")[1].split(')')[0].split('-').join(" "));
        }
        delaySetLoading()
    }

    async function signInUsingGoogle(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            if (user) {
                try {
                    const userSnap = await getDoc(doc(db, 'users', user.uid))
                    const adminSnap = await getDoc(doc(db, 'admin', user.uid))
                    if (userSnap.exists()) {
                        setUser({ uid: user.uid, ...userSnap.data() })
                        delaySetLoading()
                        navigate('/')
                    }
                    else if (adminSnap.exists()) {
                        setUser({ uid: user.uid, ...adminSnap.data()})
                        delaySetLoading()
                        navigate('/')
                    }
                    else {
                        const userDoc = await setDoc(doc(db, 'users', user.uid), {
                            name: user.displayName,
                            email: user.email,
                        })
                        setUser({ uid: user.uid, name: user.displayName, email: user.email })
                    }
                }
                catch (error) {
                    console.log("error in creating user");
                }
            }
            delaySetLoading()
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
        }
    }

    return (
        <>
            <main className='w-screen px-24 max-sm:px-6 h-[88vh] max-sm:h-[86vh] font-[raleway] gap-12 flex items-center justify-between max-sm:flex-col'>
                <img className='h-full max-sm:hidden aspect-square p-10 object-contain' alt='hi' src={signInImage} />
                <form className='flex flex-col gap-4 w-6/12 justify-center pb-24 rounded-lg h-full p-6 px-12 max-sm:px-0 max-sm:w-full'>
                    <h1 className='text-center w-fit text-5xl max-sm:text-3xl leading-relaxed antialiased font-bold text-transparent bg-gradient-to-tl from-blue-500 to-sky-500 bg-clip-text'>Welcome back</h1>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal'>Email:</h2>
                        <input ref={emailInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-300' type='email' placeholder='johndoe@gmail.com' onChange={((e) => setEmail(e.target.value))} value={email} />
                    </div>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal'>Password:</h2>
                        <input ref={passwordInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-300' type={visiblePassword1 ? "text" : "password"} placeholder='John@Do3' onChange={((e) => setPassword(e.target.value))} value={password} />
                        {!visiblePassword1 ?
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eye} onClick={() => { setVisiblePassword1(!visiblePassword1) }} alt='eye' />
                            :
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eyebrow} onClick={() => { setVisiblePassword1(!visiblePassword1) }} alt='eye' />
                        }
                    </div>
                    <div className="flex justify-between">
                        <button className='bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-blue-500 to-sky-500 transition-all w-fit  px-6 text-lg font-normal rounded-md py-2 text-white' onClick={(e) => { handleSignIn(e) }}>Sign in</button>
                        <button className='flex gap-2 items-center bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-blue-500 to-sky-500 transition-all w-fit  px-3 py-1 text-lg font-normal rounded-full text-white' onClick={(e) => { signInUsingGoogle(e) }} >
                            <img className="h-7 bg-white p-1 rounded-full" src={google} alt="google" />
                            Sign in using google
                        </button>
                    </div>
                    <Link to='sign-up' onClick={(e)=>{handleClick(e)}} className="text-lg font-normal text-gray-600" >Don't have an account? Sign up here!</Link>
                </form>
            </main>
        </>
    )
}