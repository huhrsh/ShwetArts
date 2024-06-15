import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Pages/Loading";

const Header = () => {
    const {setLoading, user}=useUser()
    const navigate=useNavigate()
    const links=[
        {user:true,to:"/gallery", text:"Gallery"},
        {user:true,to:"/store", text:"Store"},
        {user:true,to:"/contacts", text:"Contacts"},
        {user:false,to:"/sign-up", text:"Sign Up"},
    ]

    async function handleClick(e,link){
        e.preventDefault();
        setLoading(true)
        setTimeout(()=>{
            navigate(link)
            setLoading(false)
        },1000)
    }

    return (
        <>
            <Loading/>
            <header className="px-5 py-2.5 sticky top-0 left-0 w-screen z-30 flex justify-between items-center">
                <Link onClick={(e)=>{handleClick(e,'/')}}  to='/' className="text-4xl font-medium text-white" 
                // style={{ textShadow: '-1px -1px 0 #ddd, 1px -1px 0 #ddd, -1px 1px 0 #ddd, 1px 1px 0 #ddd' }}
                style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                >
                    ShwetArts
                </Link>
                <div className="flex bg-black bg-opacity-0 rounded-full gap-4 py-0.5 px-1 text-white text-lg font-medium">
                    {links.map((link,index)=>{
                        if(user && link.user){
                            return <Link onClick={(e)=>{handleClick(e,link.to)}} className="bg-black bg-opacity-60 hover:bg-white hover:bg-opacity-90 hover:text-black transition-all duration-200 px-4 py-1 rounded-full" to={link.to} key={index}>{link.text}</Link>
                        }
                        if(!user){
                            return <Link onClick={(e)=>{handleClick(e,link.to)}} className="bg-black bg-opacity-60 hover:bg-white hover:bg-opacity-90 hover:text-black transition-all duration-200 px-4 py-1 rounded-full" to={link.to} key={index}>{link.text}</Link>
                        }

                    }
                        // <Link className="bg-black bg-opacity-60 hover:bg-white hover:bg-opacity-90 hover:text-black transition-all duration-200 px-4 py-1 rounded-full" to={link.to} key={index}>{link.text}</Link>
                    )}
                </div>
            </header>
            <Outlet />
            <ToastContainer autoClose={2000}/>
        </>
    )
}

export default Header;
