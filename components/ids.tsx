import { useParams } from 'next/navigation';

export default function ids() {
    const  id  = useParams();

    return id ? id.id : null;
}
