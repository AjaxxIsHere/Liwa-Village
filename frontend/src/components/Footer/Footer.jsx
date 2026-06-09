import { FaBehance } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";

import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-screen h-dvh px-6 mt-10'>
            <p className='text-[.7rem] text-[#4D4D4D] choose-subtitle mt-10'>Interested in an amazing adventure?<br />Reserve one of our houses<span></span></p>
            <div>
                <MarqueeText />
            </div>

            <div className='flex justify-between items-center text-2xl mt-14'>
                <h3 className='text-[#4D4D4D]'>This website is just the concept<br />
                    work done by—Moyra to showcase<br />
                    our capabilities.<br /><br />
                    If you would like to outsource a similar<br />
                    website project—<a href="#" className='text-[#E3000F] hover:text-[#B8000C] underline'> contact us.</a>
                </h3>

                <div className='flex flex-col justify-center items-end'>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Welcome</a>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Introduction</a>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Houses</a>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Why Liwa Village</a>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Activites</a>
                    <a href="#welcome" className='text-black text-2xl hover:text-[#E3000F]'>Feedback</a>
                </div>
            </div>

            <div className="w-full flex justify-between items-center mt-20">
                <div className="flex justify-center items-center gap-1">
                    <div className='border-[1px] border-[#E0E0E0] rounded-full p-3 text-black'><FaBehance className="text-xl" /></div>
                    <div className='border-[1px] border-[#E3000F] rounded-full p-3 text-[#E3000F]'><FaInstagram className="text-xl" /></div>
                    <div className='border-[1px] border-[#E0E0E0] rounded-full p-3 text-black'><CiLinkedin className="text-xl" /></div>
                    <div className='border-[1px] border-[#E0E0E0] rounded-full p-3 text-black'><FaDribbble className="text-xl" /></div>
                </div>

                <div>
                    <p className="text-[0.8rem] text-[#4D4D4D] text-right">
                        Liwa Village - Your ultimate winter escape<br />
                        in the heart of Al Dhafra.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;