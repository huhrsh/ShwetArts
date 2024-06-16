import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context';
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { toast } from 'react-toastify';

export default function Courses() {
    const { user, setLoading } = useUser();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        available: true,
        imageFile: null
    });

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const coursesCollection = collection(db, "courses");
                const querySnapshot = await getDocs(coursesCollection);
                const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCourses(fetchedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        };

        fetchCourses();
    }, [setLoading]);

    const handleAddCourse = async () => {
        if (!newCourse.title || !newCourse.description || !newCourse.imageFile) {
            toast.warn("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const storageRef = ref(storage, `courses/${newCourse.imageFile.name}`);
            await uploadBytes(storageRef, newCourse.imageFile);
            const downloadURL = await getDownloadURL(storageRef);

            await addDoc(collection(db, "courses"), {
                title: newCourse.title,
                description: newCourse.description,
                available: newCourse.available,
                imageUrl: downloadURL
            });
            setNewCourse({ title: '', description: '', available: true, imageFile: null });
            toast.success("Course added successfully!");
        } catch (error) {
            console.error("Error adding course:", error);
            toast.error("Error adding course.");
        }

        setLoading(false);
    };

    const handleEditCourse = async () => {
        if (!selectedCourse.title || !selectedCourse.description) {
            toast.warn("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            let downloadURL = selectedCourse.imageUrl;

            if (newCourse.imageFile) {
                const storageRef = ref(storage, `courses/${newCourse.imageFile.name}`);
                await uploadBytes(storageRef, newCourse.imageFile);
                downloadURL = await getDownloadURL(storageRef);
            }

            await updateDoc(doc(db, "courses", selectedCourse.id), {
                title: selectedCourse.title,
                description: selectedCourse.description,
                available: selectedCourse.available,
                imageUrl: downloadURL
            });
            setSelectedCourse(null);
            setShowPopup(false);
            toast.success("Course updated successfully!");
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Error updating course.");
        }

        setLoading(false);
    };

    const handleDeleteCourse = async (course) => {
        setLoading(true);
        try {
            // Delete the course from Firestore
            const courseDocRef = doc(db, "courses", course.id);
            await deleteDoc(courseDocRef);

            // Delete the course image from Firebase Storage
            const courseStorageRef = ref(storage, course.imageUrl);
            await deleteObject(courseStorageRef);

            // Remove the course from the state
            setCourses(courses.filter(c => c.id !== course.id));

            toast.success("Course deleted successfully!");
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Error deleting course.");
        }
        setLoading(false);
    };

    return (
        <section className="py-6 px-12 flex flex-col ">
            {user?.admin && (
                <div className='py-3 mb-5 flex flex-col gap-2'>
                    <h2 className="py-1 font-extrabold text-4xl text-white"
                        style={{ textShadow: '-1.11px -1.11px 0 #000, 1.11px -1.11px 0 #000, -1.11px 1.11px 0 #000, 1.11px 1.11px 0 #000' }}
                    >Add New Course:</h2>
                    <div className='flex gap-2 items-center'>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border-gray-300 text-lg border rounded-md px-2 py-2"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border-gray-300 text-lg border rounded-md px-2 py-2"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={newCourse.available}
                                onChange={(e) => setNewCourse({ ...newCourse, available: e.target.checked })}
                            />
                            Available
                        </label>
                        <input
                            type="file"
                            className="border-gray-300 border rounded-md px-2 py-1.5"
                            onChange={(e) => setNewCourse({ ...newCourse, imageFile: e.target.files[0] })}
                        />
                        <button
                            className={`px-4 py-2 relative capitalize rounded-md overflow-hidden cursor-pointer bg-gray-200 hover:bg-transparent hover:text-white transition-all ease-in-out duration-200 before:absolute before:w-0 before:h-full before:bg-black before:top-0 before:hover:left-0 before:-z-10 before:left-[50%] before:hover:w-full before:transition-all before:duration-200 before:ease-in-out before:hover:bg-opacity-90
                `}
                            onClick={handleAddCourse}
                            disabled={!newCourse.title || !newCourse.description || !newCourse.imageFile}
                        >
                            Add Course
                        </button>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course.id} className={`border rounded-md overflow-hidden relative ${!course.available ? 'opacity-50' : ''}`}>
                        {user?.admin && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    className="bg-blue-600 text-white px-2 py-1 rounded-md"
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setShowPopup(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded-md"
                                    onClick={() => handleDeleteCourse(course)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full object-cover cursor-pointer hover:scale-110 transition-all duration-200 ease-in"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                            <p>{course.description}</p>
                            <p className="mt-2 font-semibold">Status: {course.available ? 'Available' : 'Unavailable'}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && selectedCourse && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center z-50 transition-opacity duration-300 opacity-0 animate-fade-in">
                    <div className="max-w-3xl w-full bg-white p-4 rounded-md relative">
                        <button
                            className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                            onClick={() => {
                                setShowPopup(false);
                                setSelectedCourse(null);
                            }}
                        >
                            Close
                        </button>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Title"
                                className="border-gray-300 text-lg border rounded-md px-2 py-2"
                                value={selectedCourse.title}
                                onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description"                                className="border-gray-300 text-lg border rounded-md px-2 py-2"
                                value={selectedCourse.description}
                                onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                            />
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCourse.available}
                                    onChange={(e) => setSelectedCourse({ ...selectedCourse, available: e.target.checked })}
                                />
                                Available
                            </label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="file"
                                    className="border-gray-300 border rounded-md px-2 py-1.5"
                                    onChange={(e) => setNewCourse({ ...newCourse, imageFile: e.target.files[0] })}
                                />
                                <button
                                    className={`px-4 py-2 relative capitalize rounded-md overflow-hidden cursor-pointer bg-gray-200 hover:bg-transparent hover:text-white transition-all ease-in-out duration-200 before:absolute before:w-0 before:h-full before:bg-black before:top-0 before:hover:left-0 before:-z-10 before:left-[50%] before:hover:w-full before:transition-all before:duration-200 before:ease-in-out before:hover:bg-opacity-90
                                    `}
                                    onClick={handleEditCourse}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

