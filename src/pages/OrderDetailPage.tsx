import React from 'react';

const menuItems = [
    {
        id: 1,
        name: 'Triple Chocolate Mousse',
        price: '$9.50',
        description: 'Layers of flourless dark chocolate ...',
        image: '/menu1.png',
    },
    {
        id: 2,
        name: 'Strawberry Fresh Cream Cake',
        price: '$9.25',
        description: 'Layers of fresh vanilla cream and ...',
        image: '/menu2.png',
    },
    {
        id: 3,
        name: 'Mango Mille Crepe Cake',
        price: '$13.00',
        description: 'Over 20 layers of crepe cake with ...',
        image: '/menu3.png',
    },
    {
        id: 4,
        name: 'Tiramisu Pot',
        price: '$6.50',
        description: 'Espresso and Mascarpone cream ...',
        image: '/menu4.png',
    },
];

const OrderDetailPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <div className="w-full p-4 bg-white shadow-md flex items-center">
                <button className="mr-4">
                    <img src="/back.svg" alt="Back" className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold flex-grow">A La Mousse</h1>
                <div className="text-green-600 flex items-center">
                    <span className="mr-2">Open</span>
                    <span className="text-gray-400">★ 5.0</span>
                </div>
            </div>
            <div className="w-full p-4 bg-white shadow-md flex items-center justify-between">
                <div className="flex items-center">
                    <button className="mr-2">
                        <img src="/table.svg" alt="Table" className="w-6 h-6" />
                    </button>
                    <span>Table 12</span>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-gray-200 text-black py-1 px-2 rounded-full">Most Popular</button>
                    <button className="bg-gray-200 text-black py-1 px-2 rounded-full">Picked for You</button>
                    <button className="bg-gray-200 text-black py-1 px-2 rounded-full">House Coffee</button>
                </div>
            </div>
            <div className="w-full p-4 bg-yellow-100 text-center">
                <span>Get your first OutterDish wallet with $5 Rewards!</span>
            </div>
            <div className="w-full p-4">
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <h3 className="text-md font-semibold mb-4">Most Popular</h3>
                <div className="space-y-4">
                    {menuItems.map((item) => (
                        <div key={item.id} className="flex items-center bg-white p-4 shadow-md rounded-lg">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4" />
                            <div className="text-left">
                                <h4 className="text-lg font-semibold">{item.name}</h4>
                                <div className="text-gray-500">{item.price}</div>
                                <div className="text-sm text-gray-400">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
