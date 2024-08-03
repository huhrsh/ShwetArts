import { useEffect } from 'react';
import { useUser } from '../context';
import whatsapp from "../Assets/Images/whatsapp.png";
import phone from "../Assets/Images/phone-call.png";
import mail from "../Assets/Images/mail.png";
import instagram from "../Assets/Images/instagram.png";
import facebook from "../Assets/Images/social-media.png";

const contactInfo = [
    {
        type: "Phone",
        value: "tel:9167085167",
        label: "9167085167",
        color: "text-sky-500",
        hexColor: "#0ea5e9",
        image: phone
    },
    {
        type: "Email",
        value: "mailto:shwetasingh240577@gmail.com",
        label: "shwetasingh240577@gmail.com",
        color: "text-sky-500",
        hexColor: "#0ea5e9",
        image: mail
    },
    {
        type: "WhatsApp",
        value: "https://wa.me/9167085167",
        label: "WhatsApp",
        color: "text-green-500",
        hexColor: "#22c55e",
        image: whatsapp
    },
    {
        type: "Instagram",
        value: "https://www.instagram.com/shwetarts2?igsh=MWZyMGp3eGxwb2R3Nw==",
        label: "Instagram",
        color: "text-pink-500",
        hexColor: "#ec4899",
        image: instagram
    },
    {
        type: "Facebook",
        value: "https://www.facebook.com/shwetasingh2405?mibextid=ZbWKwL",
        label: "Facebook",
        color: "text-blue-500",
        hexColor: "#3b82f6",
        image: facebook
    },
];

export default function Contact() {
    const { setLoading } = useUser();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [setLoading]);

    return (
        <section className="p-20 flex flex-col items-start max-sm:px-6 max-sm:pb-0 max-sm:h-[67vh] max-sm:justify-center">
            <div className="flex flex-col gap-10 w-full max-w-xl">
                {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-center">
                        <a
                            href={contact.value}
                            className={`flex items-center gap-6 text-4xl font-extrabold text-white hover:gap-10 hover:tracking-widest transition-all duration-200 ease-in-out`}
                            style={{
                                textShadow: `-1.11px -1.11px 0 ${"#333" || contact.hexColor}, 1.11px -1.11px 0 ${"#333" || contact.hexColor}, -1.11px 1.11px 0 ${"#333" || contact.hexColor}, 1.11px 1.11px 0 ${"#333" || contact.hexColor}`,
                            }}
                            onMouseEnter={(e) => {
                                // e.currentTarget.style.textShadow = 'none';
                                e.currentTarget.style.color=contact.hexColor
                            }}
                            onMouseLeave={(e) => {
                                // e.currentTarget.style.textShadow = `-1.11px -1.11px 0 ${"#333" || contact.hexColor}, 1.11px -1.11px 0 ${"#333" || contact.hexColor}, -1.11px 1.11px 0 ${"#333" || contact.hexColor}, 1.11px 1.11px 0 ${"#333" || contact.hexColor}`
                                e.currentTarget.style.color="white"
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img className='h-8' alt={contact.label} src={contact.image} />
                            <p className='max-sm:w-[80vw] max-sm:text-ellipsis max-sm:overflow-hidden max-sm:pb-2'>
                                {contact.label}
                            </p>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
