import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context';
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'animate.css';

export default function Gallery() {
    const { style: currentStyle } = useParams();
    const styles = ["all", "sculpture", "tanjore", "resin", "relief", "marble", "decoupage", "clay", "canvas"];
    const { user, setLoading } = useUser();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [activeStyle, setActiveStyle] = useState(currentStyle || 'all');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newImageStyle, setNewImageStyle] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const imagesCollection = collection(db, "images");
                const imagesQuery = currentStyle === "all" ? imagesCollection : query(imagesCollection, where("style", "==", currentStyle));
                const querySnapshot = await getDocs(imagesQuery);
                const fetchedImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        };

        fetchImages();
    }, [currentStyle, setLoading]);

    function handleClick(e, name) {
        e.preventDefault()
        setLoading(true);
        setTimeout(() => {
            navigate('/gallery/' + name)
            setActiveStyle(name)
            setLoading(false);
        }, 1000)
    }

    async function handleImageClick(image) {
        setSelectedImage(image);
        setShowPopup(true);
    }

    const handleAddImage = async () => {
        if (!newImageStyle || !newImageFile) {
            toast.warn("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const storageRef = ref(storage, `images/${newImageStyle}/${newImageFile.name}`);
            await uploadBytes(storageRef, newImageFile);
            const downloadURL = await getDownloadURL(storageRef);

            await addDoc(collection(db, "images"), {
                style: newImageStyle,
                url: downloadURL
            });
            setNewImageStyle("");
            setNewImageFile(null);
            toast.success("Image added successfully!");
        } catch (error) {
            console.error("Error adding image:", error);
            toast.error("Error adding image.");
        }

        setLoading(false);
    };

    const handleDeleteImage = async (image) => {
        setLoading(true);
        try {
            const imageDocRef = doc(db, "images", image.id);
            await deleteDoc(imageDocRef);

            const imageStorageRef = ref(storage, image.url);
            await deleteObject(imageStorageRef);
            setImages(images.filter(img => img.id !== image.id));
            toast.success("Image deleted successfully!");
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Error deleting image.");
        }
        setTimeout(()=>{
            setLoading(false);
        },700)
    };

    const [currentAnimation, setCurrentAnimation]=useState('animate__slideInUp')

    function handleCloseButton(){
        setCurrentAnimation('animate__slideOutDown')
        setTimeout(()=>{
            setShowPopup(false);
            setCurrentAnimation("animate__slideInUp")
        },800)
    }

    return (
        <section className="py-6 px-12 flex flex-col pb-32 max-sm:px-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 max-sm:grid max-sm:grid-cols-3 max-sm:grid-flow-row max-sm:gap-2">
                    {styles.map((name, index) => (
                        <Link
                            key={index}
                            to={`/gallery/${name}`}
                            onClick={(e) => handleClick(e, name)}
                            className={`px-4 py-2 relative capitalize rounded-md overflow-hidden ${activeStyle === name ? 'bg-gray-800 text-white' : 'hover:text-gray-800'}
                            before:absolute before:w-0 before:h-full before:bg-gray-200 before:top-0 before:hover:left-0 before:-z-10 before:left-[50%] before:hover:w-full before:transition-all before:duration-200 before:ease-in-out
                            max-sm:border
                            `}
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            </div>
            {user?.admin && (
                <div className='py-3 mb-5 flex flex-col gap-2'>
                    <h2 className="py-1 font-extrabold text-4xl text-white"
                        style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                    >Add New Image:</h2>
                    <div className='flex gap-2 items-center max-sm:flex-col max-sm:items-start'>
                        <select
                            className="border-gray-300 text-lg border rounded-md px-2 py-2"
                            value={newImageStyle}
                            onChange={(e) => setNewImageStyle(e.target.value)}
                        >
                            <option value="" disabled>Select style</option>
                            {styles.filter(style => style !== "all").map((style) => (
                                <option className='text-lg' key={style} value={style}>{style}</option>
                            ))}
                        </select>
                        <input
                            type="file"
                            className="border-gray-300 border rounded-md px-2 py-1.5"
                            onChange={(e) => setNewImageFile(e.target.files[0])}
                        />
                        <button
                            className={`px-4 py-2 relative capitalize rounded-md overflow-hidden cursor-pointer bg-gray-200 hover:bg-transparent hover:text-white transition-all ease-in-out duration-200 before:absolute before:w-0 before:h-full before:bg-black before:top-0 before:hover:left-0 before:-z-10 before:left-[50%] before:hover:w-full before:transition-all before:duration-200 before:ease-in-out before:hover:bg-opacity-90
                `}
                            onClick={handleAddImage}
                            disabled={!newImageStyle || !newImageFile}
                        >
                            Add Image
                        </button>
                    </div>
                </div>
            )}
            <div className="masonry max-sm:grid">
                {images.map((image) => (
                    <div key={image.id} className="masonry-item border rounded-md overflow-hidden relative group">
                        {user?.admin && (
                            <button
                                className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-md opacity-0 z-30 group-hover:opacity-100 transition-opacity text-lg duration-200"
                                onClick={() => handleDeleteImage(image)}
                            >
                                Delete
                            </button>
                        )}
                        <img
                            loading='lazy'
                            src={image.url}
                            alt={image.id}
                            className="w-full object-cover cursor-pointer hover:scale-110 transition-all duration-200 ease-in"
                            onClick={() => handleImageClick(image)}
                        />
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className={`fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-90 flex justify-center items-center z-50 duration-300 animate__animated ${currentAnimation} `} onAnimationEnd={()=>setCurrentAnimation("")}>
                    <div className="max-w-5xl w-full flex items-center justify-center">
                        <img src={selectedImage.url} alt={selectedImage.id} className="max-w-[90vw] max-h-[90vh] object-contain" />
                        <button
                            className="absolute text-lg top-2 right-4 bg-black text-white px-3 py-1 rounded-md hover:shadow-lg"
                            onClick={() => handleCloseButton()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
