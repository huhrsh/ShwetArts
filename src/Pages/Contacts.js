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
        value: "tel:+1234567890",
        label: "+123 456 7890",
        color: "text-sky-500",
        hexColor: "#0ea5e9",
        image: phone
    },
    {
        type: "Email",
        value: "mailto:info@example.com",
        label: "info@example.com",
        color: "text-sky-500",
        hexColor: "#0ea5e9",
        image: mail
    },
    {
        type: "WhatsApp",
        value: "https://wa.me/1234567890",
        label: "WhatsApp",
        color: "text-green-500",
        hexColor: "#22c55e",
        image: whatsapp
    },
    {
        type: "Instagram",
        value: "https://www.instagram.com/example",
        label: "Instagram",
        color: "text-pink-500",
        hexColor: "#ec4899",
        image: instagram
    },
    {
        type: "Facebook",
        value: "https://www.facebook.com/example",
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
        <section className="p-20 flex flex-col items-start">
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
                            {contact.label}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
