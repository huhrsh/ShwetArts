import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const { useContext, createContext, useState, useEffect } = require("react");

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [check, setCheck]=useState(true);
    const [loadingDone, setLoadingDone]=useState(false)

    useEffect(()=>{
        if(!check && loadingDone){
            setLoading(false)
        }
    },[check,loadingDone])

    useEffect(() => {
        setLoading(true)
        setCheck(true);
        setLoadingDone(false)
        setTimeout(()=>{
            setCheck(false);
        },3000)
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid))
                if (docSnap.exists()) {
                    setUser({ uid: user.uid, ...docSnap.data() });
                    setLoadingDone(true)
                }
                else {
                    const adminDocSnap = await getDoc(doc(db, "admin", user.uid))
                    if (adminDocSnap.exists()) {
                        setUser({ uid: user.uid, ...adminDocSnap.data() });
                        setLoadingDone(true)
                    }
                }
            } else {
                setUser(null);
                setLoadingDone(true)
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);