import React, {useState} from 'react';
import {useRouter} from 'next/router';
import CouponItem from '../components/CouponItem';
import {BASE_URL, defaultCoupons} from "../config/constant";
import {useNotification} from "../context/NotificationContext";
import CouponList from "../components/CouponList";
import {any} from "prop-types";
import LuckyWheel from "../components/LuckyWheel";


const CouponsPage: React.FC = () => {


    return (
        <div className=" h-screen bg-[url('/bg.svg')] object-cover bg-cover">
            <LuckyWheel></LuckyWheel>
        </div>
    );
};

export default CouponsPage;
