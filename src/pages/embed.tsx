import React from 'react';
import { useRouter } from 'next/router';

const EmbedPage: React.FC = () => {
    const router = useRouter();
    const { url } = router.query;

    if (!url) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <iframe src={decodeURIComponent(url as string)} className="w-full h-full border-none" />
        </div>
    );
};

export default EmbedPage;
