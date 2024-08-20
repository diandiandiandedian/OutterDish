import nextConfig from "../../next.config.mjs";

// 192.168.2.6
// 172.20.10.3
// https://testapi.ezswap.io/
export const BASE_URL = {
    dev: "https://testapi.ezswap.io/",
    test: "https://testapi.ezswap.io/",
    pro: "https://api.ezswap.io/",
}[nextConfig.publicRuntimeConfig.env.API];

export const defaultCoupons = [
    {id: 1, brand: 'Temu', discount: '30% OFF', cost: 1000, image: '/temu.svg', code: "fav19288"},
    {id: 2, brand: 'Shein', discount: '15% OFF', cost: 1000, image: '/couponimage1.svg', code: "Cozy03A41"},
    {id: 3, brand: 'Cider', discount: '15% OFF', cost: 1000, image: '/cider.png', code: "CIDERWEB15CAP"},
];

export const tgScoreGift = 1000
export const xScoreGift = 1000
export const inviteScoreLevel1 = 500
export const inviteScoreLevel2 = 5000
export const inviteScoreLevel3 = 20000
export const playgame = 5000

export const restaurants = [
    {
        id: 1,
        name: 'MS Dessert Cafe',
        address: '1038 Race St',
        priceRange: '$20-50',
        tags: ['Chinese'],
        image: '/restaurant1.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=164&name=%20MS%20Dessert%20Cafe',
    },
    {
        id: 2,
        name: 'PRETTY HONEY',
        address: '1028 Arch St',
        priceRange: '$10-20',
        tags: ['Japanese', 'Ramen', 'Chinese'],
        image: '/restaurant2.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=155&name=PRETTY%20HONEY',
    },
    {
        id: 3,
        name: 'Pophut',
        address: '1021 Arch St',
        priceRange: '$10-20',
        tags: ['Chinese', 'Vegetarian'],
        image: '/restaurant3.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=450&name=Pophut',
    },
    {
        id: 4,
        name: 'Chatime (Dominion Rd)',
        address: '600 Dominion Rd, Mount Eden, Auckland 1041',
        priceRange: '$30-50',
        tags: ['Noodles'],
        image: '/restaurant4.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=450&name=Pophut',
    },
    {
        id: 5,
        name: 'Vincent\'s Chinese Restaurant',
        address: 'unit.1,221 Dairy flat Highway Albany,Auckland',
        priceRange: '$100-200',
        tags: ['Healthy'],
        image: '/restaurant5.jpeg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=450&name=Pophut',
    },
    {
        id: 6,
        name: 'Harport',
        address: '590 Dominion Road, Mount Eden, Auckland',
        priceRange: '$50-80',
        tags: ['Family Meal'],
        image: '/restaurant6.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=450&name=Pophut',
    },
    {
        id: 7,
        name: 'Sony Bakery Long Bay',
        address: '83 Te Oneroa way,Long Bay ,auckland 0792',
        priceRange: '$10-20',
        tags: ['Vegetarian'],
        image: '/restaurant7.jpg',
        url: 'http://testh5.yugu.co.nz/member/orderFood?id=450&name=Pophut',
    }
];
