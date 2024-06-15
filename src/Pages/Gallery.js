import { useParams } from "react-router-dom";

export default function Gallery(){
    const { style } = useParams();
    return (
        <section className="px-6">
            <h1 className="text-2xl font-semibold capitalize">{style}</h1>

        </section>
    )
}