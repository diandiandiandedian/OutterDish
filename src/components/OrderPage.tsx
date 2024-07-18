import React, {useRef, useState} from 'react';
import {restaurants} from "../config/constant";

const OrderPage: React.FC = () => {
    const handleRestaurantClick = (url: string) => {
        // window.location.href = url;
        setShowConfirmRedeem(true);
        // if (modalRef.current) {
        //     modalRef.current.showModal();
        // }
    };

    const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center bg-[url('/bg.svg')] bg-cover">
            <div className="overflow-y-auto">
                <h1 className="text-2xl mb-8 leading-relaxed mt-10">Order with OutterDish & Earn</h1>
                {/*<div className="w-full px-4 mb-8 text-xs relative">*/}
                {/*    <img src="/searchicon.svg" alt="Search" className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5"/>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder=""*/}
                {/*        className="w-full py-2 pl-9 pr-4 rounded-full bg-white shadow-md focus:outline-none"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="space-y-4 w-full px-4">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="flex flex-col bg-[#FFBF59] p-4 rounded-lg shadow-md mb-4 cursor-pointer"
                            onClick={() => handleRestaurantClick(restaurant.url)}
                        >
                            <div className="flex items-center">
                                <img src={restaurant.image} alt={restaurant.name} className="w-16 h-16 mr-4 rounded-lg"/>
                                <div className="text-left">
                                    <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
                                    <div className="text-sm">{restaurant.address}</div>
                                    <div className="text-sm">{restaurant.priceRange}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {restaurant.tags.map((tag, index) => (
                                    <span key={index} className="bg-[#FFDBA0] text-black px-2 py-1 rounded-full text-xs mr-2 mb-2">
                                    {tag}
                                </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <dialog id="my_modal_2" className="modal"  ref={modalRef}>
                    <div className="modal-box z-50">
                        <div className="mb-4">This store is currently closed</div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                {showConfirmRedeem && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center z-50 w-[80%] rounded-lg">
                        <div className="bg-white p-6 rounded-lg text-center mx-auto w-[100%] ">
                            <div className="mb-4">This store is currently closed</div>
                            <div className="flex justify-around">
                                <button
                                    className="bg-red-500 text-white p-2 rounded-full w-2/5"
                                    onClick={() => setShowConfirmRedeem(false)}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className='h-[100px]'></div>
            </div>
        </div>
    );
};

export default OrderPage;
