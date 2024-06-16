import { createUserWithEmailAndPassword, deleteUser, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import signUpImage from "../Assets/Images/Making art-pana (1).png"
import { Link, useNavigate } from "react-router-dom";
import eye from "../Assets/Images/eye.png"
import eyebrow from "../Assets/Images/eyebrow.png"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUser } from "../context";
import google from "../Assets/Images/google.png"

export default function SignUp() {
    const { user, setUser, loading, setLoading } = useUser()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()
    const [visiblePassword1, setVisiblePassword1] = useState(false);
    const [visiblePassword2, setVisiblePassword2] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);
    const nameInputRef = useRef(null);

    async function delaySetLoading(){
        setTimeout(()=>{
            setLoading(false)
        },1000)
    }

    async function handleClick(e){
        e.preventDefault()
        setLoading(true)
        setTimeout(()=>{
            navigate('/sign-in')
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

    async function handleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        if (!name) {
            toast.warn("Please fill all the fields");
            delaySetLoading()
            return;
        }
        emailInputRef.current.blur();
        passwordInputRef.current.blur();
        nameInputRef.current.blur();
        confirmPasswordInputRef.current.blur();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            delaySetLoading()
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            if (user) {
                try {
                    const userDoc = await setDoc(doc(db, 'users', user.uid), {
                        name: name,
                        email: email,
                    })
                    toast.success("Account created.")
                    await signOut(auth)
                    navigate('/sign-in')
                }
                catch (error) {
                    try {
                        await deleteUser(user)
                        toast.error("Error in creating user.");
                        console.log("Error in creating user, auth deleted.");
                        delaySetLoading()
                        return;
                    } catch (error) {
                        console.log("Error in deleting auth user", error);
                        delaySetLoading()
                        return;
                    }
                }
            }
        } catch (error) {
            delaySetLoading()
            const errorMessage = error.message;
            toast.warn(errorMessage?.split("auth/")[1].split(')')[0].split('-').join(" "));
        }
        delaySetLoading()
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    async function signInUsingGoogle(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            console.log(user);
            if (user) {
                try {
                    const userSnap = await getDoc(doc(db, 'users', user.uid))
                    const adminSnap = await getDoc(doc(db, 'admin', user.uid))
                    if (userSnap.exists()) {
                        setUser({ uid: user.uid, ...userSnap.data() })
                        delaySetLoading()
                        navigate('/')
                    }
                    else if(adminSnap.exists()){
                        setUser({uid:user.uid, ...adminSnap.data()})
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
            console.log(errorMessage)
        }
    }

    return (
        <>
            <main className={`w-screen px-24 h-[88vh] max-sm:h-[86h] font-[raleway] gap-12 flex items-center justify-between  bg-cover max-sm:flex-col-reverse max-sm:justify-center
            max-sm:px-6`}>
                <form className='flex flex-col gap-4 w-6/12 justify-center pb-24 rounded-lg h-full p-6 px-12 max-sm:px-0 max-sm:w-full'>
                    <h1 className='text-center w-fit text-5xl max-sm:text-3xl leading-relaxed antialiased font-bold text-transparent bg-gradient-to-tl from-blue-500 to-sky-500 bg-clip-text'>Lets get started</h1>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal'>Name:</h2>
                        <input ref={nameInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-600' type='text' placeholder='John Doe' onChange={((e) => setName(e.target.value))} value={name} />
                    </div>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal'>Email:</h2>
                        <input ref={emailInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-600' type='email' placeholder='johndoe@gmail.com' onChange={((e) => setEmail(e.target.value))} value={email} />
                    </div>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal'>Password:</h2>
                        <input ref={passwordInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-600' type={visiblePassword1 ? "text" : "password"} placeholder='John@Do3' onChange={((e) => setPassword(e.target.value))} value={password} />
                        {!visiblePassword1 ?
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eye} onClick={() => { setVisiblePassword1(!visiblePassword1) }} alt='eye' />
                            :
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eyebrow} onClick={() => { setVisiblePassword1(!visiblePassword1) }} alt='eye' />
                        }
                    </div>
                    <div className='border hover:shadow-lg focus-within:shadow-lg focus-within:scale-105  group p-3 py-0 rounded-xl transition-all duration-200 flex w-full gap-3 items-center'>
                        <h2 className=' text-sky-500 text-lg font-normal flex-shrink-0'>Confirm Password:</h2>
                        <input ref={confirmPasswordInputRef} className='outline-none w-full h-full px-2 py-4 font-normal text-gray-600' type={visiblePassword2 ? "text" : "password"} placeholder='John@Do3' onChange={((e) => setConfirmPassword(e.target.value))} value={confirmPassword} />
                        {!visiblePassword2 ?
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eye} onClick={() => { setVisiblePassword2(!visiblePassword2) }} alt='eye' />
                            :
                            <img className='h-6 pr-2 cursor-pointer transition-all' src={eyebrow} onClick={() => { setVisiblePassword2(!visiblePassword2) }} alt='eye' />
                        }
                    </div>
                    <div className="flex justify-between">
                        <button className='bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-blue-500 to-sky-500 transition-all w-fit  px-6 text-lg font-normal rounded-md py-2 text-white' onClick={(e) => { handleSignUp(e) }}>Sign up</button>
                        <button className='flex gap-2 items-center bg-gradient-to-bl hover:shadow-lg hover:shadow-gray-300 duration-200 from-blue-500 to-sky-500 transition-all w-fit  px-3 py-1 text-lg font-normal rounded-full text-white' onClick={(e) => { signInUsingGoogle(e) }} >
                            <img className="h-7 bg-white p-1 rounded-full" src={google} alt="google" />
                            Sign in using google
                        </button>
                    </div>
                    <Link onClick={(e)=>{handleClick(e)}} className="text-lg font-normal text-gray-600">Already have an account? Sign in here! </Link>
                </form>
                <img className='h-full aspect-square object-contain max-sm:hidden p-10' alt='hi' src={signUpImage} />
            </main>
        </>
    )
}