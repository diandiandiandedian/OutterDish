import React from 'react';
import Link from 'next/link';

const RewardPage: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-100 text-center bg-[url('/bg.svg')] bg-cover">
        <div className="text-2xl mb-8 leading-relaxed">Congrats!  Chef Otter has given you 1500 $SOON as rewards! </div>
        <div className="flex items-center mb-8">
            <img src="/ottercoin.svg" alt="Logo" className="w-24 h-24 mb-2" />
            <h2 className="text-4xl ml-8">1500</h2>
        </div>
        <Link href="/couponone">
            <button className="bg-[#FFE541B2] text-black p-4 rounded-full text-xl">Claim 1500 $SOON</button>
        </Link>
    </div>
);

export default RewardPage;
