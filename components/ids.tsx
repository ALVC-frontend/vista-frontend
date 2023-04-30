import { useSearchParams } from 'next/navigation';

export default function ids() {
    const searchParams = useSearchParams();
    const id = searchParams ? searchParams.get('id') : null;
    console.log(id);

    return id;
}
