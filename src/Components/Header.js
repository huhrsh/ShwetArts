import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Pages/Loading";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
    const { setLoading, user } = useUser()
    const navigate = useNavigate()
    const links = [
        { to: "/gallery/all", text: "Gallery" },
        { to: "/store", text: "Store" },
        { to: "/courses", text: "Courses" },
        { to: "/contacts", text: "Contacts" },
    ]

    const signedInLinks = [
        { to: "/sign-out", text: "Sign Out" },

    ]
    const signedOutLinks = [
        { to: "/sign-up", text: "Sign Up" },

    ]

    const handleSignOut = async (e) => {
        setLoading(true)
        try {
            setTimeout(async()=>{
                await signOut(auth);
                toast.success('Signed out successfully!');
            },800)
        } catch (error) {
            toast.error('Error signing out');
            console.error('Error during sign out:', error);
        }
        finally {
            setTimeout(() => {
                navigate('/');
                setLoading(false)
            }, 1000)
        }
    };

    async function handleClick(e, link) {
        e.preventDefault();
        setLoading(true)
        if (link === '/sign-out') {
            handleSignOut()
            return;
        }
        setTimeout(() => {
            navigate(link)
            setLoading(false)
        }, 1000)
    }

    return (
        <>
            <Loading />
            <header className="px-5 py-2.5 sticky top-0 left-0 w-screen z-30 flex justify-between items-center">
                <Link onClick={(e) => { handleClick(e, '/') }} to='/' className="text-4xl font-extrabold text-white"
                    // style={{ textShadow: '-1px -1px 0 #ddd, 1px -1px 0 #ddd, -1px 1px 0 #ddd, 1px 1px 0 #ddd' }}
                    style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                >
                    ShwetArts
                </Link>
                <div className="flex rounded-full gap-4 py-0.5 px-0.5 text-white text-2xl font-medium">
                    {links.map((link, index) => (
                        <Link onClick={(e) => { handleClick(e, link.to) }} className="border-2 border-transparent font-extrabold hover:border-white hover:bg-sky-400 hover:bg-opacity-60 transition-all duration-200 px-4 py-1 rounded-full"
                            style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                            to={link.to} key={index}>{link.text}</Link>
                    ))}
                    {user ?
                        signedInLinks.map((link, index) => (
                            <Link onClick={(e) => { handleClick(e, link.to) }} className="border-2 border-transparent font-extrabold hover:border-white hover:bg-sky-400 hover:bg-opacity-60 transition-all duration-200 px-4 py-1 rounded-full"
                                style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                                to={link.to} key={index}>{link.text}</Link>
                        )) : signedOutLinks.map((link, index) => (
                            <Link onClick={(e) => { handleClick(e, link.to) }} className="border-2 border-transparent font-extrabold hover:border-white hover:bg-sky-400 hover:bg-opacity-60 transition-all duration-200 px-4 py-1 rounded-full"
                                style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                                to={link.to} key={index}>{link.text}</Link>
                        ))}
                </div>
            </header>
            <Outlet />
            <ToastContainer autoClose={2000} />
        </>
    )
}

export default Header;
