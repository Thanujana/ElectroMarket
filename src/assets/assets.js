import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import bg_image from './bg_image.jpg'

import category_1 from './category_1.jpeg'
import category_2 from './category_2.png'
import category_3 from './category_3.png'
import category_4 from './category_4.png'
import category_5 from './category_5.jpeg'

import item_auto from './item_auto.jpeg'
import item_side from './item_side.jpeg'
import item_1_3 from './item_1_3.jpeg'
import item_1_4 from './item_1_4.jpeg'
import item_1_5 from './item_1_5.jpeg'

import item_2_1 from './item_2_1.jpeg'
import item_2_2 from './item_2_2.jpeg'
import item_2_3 from './item_2_3.jpeg'
import item_2_4 from './item_2_4.jpeg'
import item_2_5 from './item_2_5.jpeg'

import item_3_1 from './item_3_1.jpeg'
import item_3_2 from './item_3_2.jpeg'
import item_3_3 from './item_3_3.jpeg'
import item_3_4 from './item_3_4.jpeg'
import item_3_5 from './item_3_5.jpeg'

import item_4_1 from './item_4_1.jpeg'
import item_4_2 from './item_4_2.jpeg'
import item_4_3 from './item_4_3.jpeg'

import item_5_1 from './item_5_1.jpeg'
import item_5_2 from './item_5_2.jpeg'
import item_5_3 from './item_5_3.jpeg'
import item_5_4 from './item_5_4.jpeg'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'


import item_allinone from './item_Allinone.png';
import item_frontload from './item_frontload.png';
import item_topload from './item_topload.png';
import item_laundrycenter from './item_laundrycenter.png';
import item_laundryset from './item_laundryset.png';

import item_bottomfreezer from './item_bottomfreezer.png';
import item_topfreezer from './item_topfreezer.png';
import item_builtin from './item_builtin.png';
import item_countertop from './item_countertop.png';
import item_fourdoor from './item_fourdoor.png';
import item_frenchdoor from './item_frenchdoor.png';
import item_sidebyside from './item_sidebyside.png';

import item_overtherange from './item_overtherange.png';
import item_lowprofile from './item_lowprofile.png';


export const assets = {
    bg_image,
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}
export const category_list = [
  { category_name: "home-appliances", category_image: category_1 },
  { category_name: "consumer-electronics", category_image: category_2 },
  { category_name: "computer-components", category_image: category_3 },
  { category_name: "smart-home-products", category_image: category_4 },
  { category_name: "industrial-specialized-electronics", category_image: category_5 },
];

export default category_list;

export const item_list =[
    {
        _id:"1",
        name:"Washing machines",
        image:item_auto,
        price:300,
        description:"Efficient washing machines with multiple modes to suit your laundry needs.",
        category:"home-appliances",
},
{
    _id: "2",
    name: "Refrigerators",
    image: item_side, 
    price: 400, 
    description: "Keep your food fresh and beverages chilled with our range of refrigerators.",
    category: "home-appliances",

},
{
    _id: "3",
    name: "Microwave oven",
    image: item_1_3, 
    price: 200, 
    description: "Quick and convenient cooking with advanced microwave technology.",
    category: "home-appliances",
},
{
    _id: "4",
    name: "Air Conditioners",
    image: item_1_4, 
    price: 500,
    description: "Stay cool during the summer with energy-efficient air conditioners.",
    category: "home-appliances",
},
{
    _id: "5",
    name: "Electric Kettles",
    image: item_1_5, 
    price: 50, 
    description: "Quickly boil water with stylish and efficient electric kettles.",
    category: "home-appliances",
},
{
    _id: "6",
    name: "Cameras",
    image: item_2_1, 
    price: 1200, 
    description: "High-quality digital cameras for photography enthusiasts.",
    category: "consumer-electronics",
  },
  {
    _id: "7",
    name: "Smart TVs",
    image: item_2_2,
    price: 900, 
    description: "Smart TVs with UHD 4K resolution and built-in streaming apps.",
    category:"consumer-electronics",
  },
  {
    _id: "8",
    name: "Laptops",
    image: item_2_3,
    price: 1500, 
    description: "Powerful laptops for work and gaming.",
    category: "consumer-electronics",
  },
  {
    _id: "9",
    name: "Smartphones",
    image: item_2_4,
    price: 800, 
    description: "Latest smartphones with advanced features and sleek designs.",
    category:"consumer-electronics",
  },
  {
    _id: "10",
    name: "Tablets",
    image: item_2_5,
    price: 600, 
    description: "Lightweight tablets for productivity and entertainment.",
    category: "consumer-electronics",
  },
  {
    _id: "11",
    name: "Monitors",
    image: item_3_1,
    price: 300,
    description: "High-resolution monitors for gaming and productivity.",
    category:  "computer-components",
  },
  {
    _id: "12",
    name: "Mouse",
    image: item_3_2,
    price: 50,
    description: "Ergonomic and responsive computer mouse for smooth navigation.",
    category: "computer-components",
  },
  {
    _id: "13",
    name: "Motherboards",
    image: item_3_3,
    price: 200,
    description: "Versatile motherboards compatible with the latest hardware.",
    category:  "computer-components",
  },
  {
    _id: "14",
    name: "Processors (CPUs)",
    image: item_3_4,
    price: 400,
    description: "High-performance processors for efficient computing.",
    category:  "computer-components",
  },
  {
    _id: "15",
    name: "Keyboards",
    image: item_3_5,
    price: 70,
    description: "Durable keyboards with smooth typing experience.",
    category:  "computer-components",
  },
  {
    _id: "16",
    name: "Security Cameras",
    image:item_4_1,
    price: 120,
    description: "Smart security cameras with night vision and motion detection.",
    category: "smart-home-products",
  },
  {
    _id: "17",
    name: "Smart Plugs",
    image: item_4_2,
    price: 25,
    description: "Control your appliances remotely with these smart plugs.",
    category: "smart-home-products",
  },
  {
    _id: "18",
    name: "Video Doorbells",
    image: item_4_3,
    price: 150,
    description: "Stay secure with HD video doorbells and two-way communication.",
    category: "smart-home-products",
  },
  {
    _id: "19",
    name: "Sensors (Temperature, Proximity, Pressure)",
    image: item_5_1,
    price: 50,
    description: "Advanced sensors for industrial and specialized applications.",
    category: "industrial-specialized-electronics",

  },
  {
    _id: "20",
    name: "Microcontrollers",
    image: item_5_2,
    price: 35,
    description: "Powerful microcontrollers for embedded system designs.",
    category: "industrial-specialized-electronics",

  },
  {
    _id: "21",
    name: "Multimeters",
    image:item_5_3,
    price: 40,
    description: "Accurate and versatile multimeters for electrical measurements.",
    category: "industrial-specialized-electronics",

  },
  {
    _id: "22",
    name: "Oscilloscopes",
    image: item_5_4,
    price: 400,
    description: "High-quality oscilloscopes for signal analysis and debugging.",
    category: "industrial-specialized-electronics",

  }
  
  
];
export const varieties_list ={
  refrigerators: [
    { type: 'Bottom Freezer', image: item_bottomfreezer, price: 499,description: 'Spacious bottom freezer refrigerator for easy access to fresh foods.'  },
    { type: 'Four Door', image: item_fourdoor, price: 1399, description: 'Flexible four-door design with customizable storage options.'  },
    { type: 'French Door', image: item_frenchdoor, price: 1299, description: 'Elegant French door design with wide shelves and ample storage.'  },
    { type: 'Side by Side', image: item_sidebyside, price: 1099, description: 'Side-by-side refrigerator for organized fresh and frozen food storage.' },
    { type: 'Top Freezer', image: item_topfreezer, price: 399,'Classic top freezer design with energy-efficient performance.' },
  ],
  washers: [
    { type: 'Top Load', image: item_topload, price: 549, description: '1.6-5.3 Cu. Ft. Capacity with Agitator or Impeller.' },
    { type: 'Front Load', image: item_frontload, price: 699, description: 'Efficient front load washers for a deep clean.' },
    { type: 'All In One', image: item_allinone, price: 799, description: 'Combination of washer and dryer in one unit.' },
    { type: 'Laundry Center', image: item_laundrycenter, price: 999, description: 'Stacked washer and dryer combo.' },
    { type: 'Laundry Set', image: item_laundryset, price: 1199, description: 'Matching washer and dryer set.' },
  ],
  microwaves: [
    { type: 'Over the Range', image: item_overtherange, price: 299, description: 'Convenient over-the-range microwave with exhaust fan.'  },
    { type: 'Low Profile', image: item_lowprofile, price: 199,description: 'Sleek low-profile microwave ideal for compact spaces.'  },
    { type: 'Countertop', image: item_countertop, price: 199,description: 'Versatile countertop microwave for quick and easy cooking.'  },
    { type: 'Built-In', image: item_builtin, price: 999,description: 'Stylish built-in microwave with advanced cooking technology.'  },
  ],
  


};

