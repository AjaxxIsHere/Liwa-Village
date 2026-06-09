import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gallery.css';
import { BsFillPlusCircleFill } from "react-icons/bs";

import gbg1 from '../../assets/background1.png';
import gbg2 from '../../assets/background2.png';
import gbg3 from '../../assets/background3.png';
import gbg4 from '../../assets/background4.png';
// Mock imports for the new 4 slides - replace with your actual file paths
import gbg5 from '../../assets/background1.png'; 
import gbg6 from '../../assets/background2.png';
import gbg7 from '../../assets/background3.png';
import gbg8 from '../../assets/background4.png';

gsap.registerPlugin(ScrollTrigger);

// Data array makes it easy to manage 8 (or any number of) slides
const slideData = [
    { 
        id: "gallery-1", 
        title: "Go Water Kart", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/Water-Kart.webp", 
        isFirst: true,
        desc: "Dive into adventure with the Go Water Kart Experience, where speed meets splash! Enjoy a thrilling yet safe ride that combines the excitement of karting with the rush of jet-skiing. Perfect for families and friends." 
    },
    { 
        id: "gallery-2", 
        title: "Smash Room", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/Smash-Room-1.webp",
        desc: "Unleash your energy at the Smash Room, where thrill meets freedom in a rush of excitement and adrenaline. Smash, break, and shatter your stress away in a safe, electrifying space that captures the adventurous and vibrant spirit of Liwa Village."
    },
    { 
        id: "gallery-3", 
        title: "4x4 Track", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/n3.webp",
        desc: "Experience the thrill of the 4x4 Track, where Liwa’s desert spirit meets family-friendly adventure and fun. Navigate sandy trails in a mini jeep for an unforgettable ride filled with excitement and energy."
    },
    { 
        id: "gallery-4", 
        title: "New Year’s Eve", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/n4.webp",
        desc: "Celebrate New Year’s Eve at Liwa Village, a dazzling fusion of culture, music, and desert splendour beneath a sky ablaze with fireworks, lights, and dreams that never fade away — a night to remember."
    },
    { 
        id: "gallery-5", 
        title: "Desert Rally", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/c1.webp",
        desc: "Feel the roar of engines and the power of the dunes beneath your wheels. This ultimate off-road rally captures the spirit of Liwa’s wild adventure, blending thrill, and desert freedom."
    },
    { 
        id: "gallery-6", 
        title: "RC Race", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/rc-2-1.jpg",
        desc: "Live the action with high-speed remote control (RC) cars and challenge your friends to a desert-inspired race, where Liwa’s rich heritage meets modern adrenaline and pure excitement."
    },
    { 
        id: "gallery-7", 
        title: "Skyline", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/c3.webp",
        desc: "Take a thrilling flight across the desert sky and glide over Liwa Village, a breathtaking adventure for kids and adults, where adrenaline, freedom, and unforgettable views meet."
    },
    { 
        id: "gallery-8", 
        title: "Pony Grove", 
        img: "https://liwavillage.ae/wp-content/uploads/2025/11/Pony-Groove.png",
        desc: "A charming new addition to the Petting Zoo, saddle up for a gentle trot across Liwa’s sands. A timeless activity that blends the region’s equestrian heritage with unforgettable childhood joy."
    },
];

const Gallery = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        // Create new timeline - Extended end to +=800% to accommodate 8 slides smoothly
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-page4",
                start: "10% 10%",
                end: "+=800%", 
                scrub: 1,
                pin: true,
            }
        });

        // Add background color animation
        tl4.to(".gallery-page4", {
            backgroundColor: "#FFFFFF",
        }, 'start');

        gsap.set(".gallery-topText h4, .gallery-topText h3, .gallery-bottomText h3", {
            opacity: 1,
            x: 0
        });

        // --- NEW: Set initial size to be bigger and more rounded ---
        gsap.set(".gallery-first-slide", {
            width: "65vw",       // Made wider
            height: "70vh",      // Made taller
            borderRadius: "4rem" // Made more rounded
        });

        // Step 1: Animate the first slide expanding
        tl4.to(".gallery-box h3", {
            opacity: 0,
        }, 'a')
        .to(".gallery-first-slide", {
            width: "calc(100vw - 1rem)",
            height: "calc(100vh - 1rem)",
            borderRadius: "3.5rem",
            y: -40,
        }, 'a')
        .to(".gallery-first-slide img", {
            transform: "scale(1)",
        }, 'a')
        .from(".gallery-first-slide .gallery-topText h4, .gallery-first-slide .gallery-topText h3, .gallery-first-slide .gallery-bottomText h3", {
            opacity: 0,
            x: 50,
        })
        .to({}, { duration: 0.4 }, "+=0");

        // Step 2: Dynamically loop through the remaining 7 slides
        for (let i = 1; i < slideData.length; i++) {
            const currentId = `#${slideData[i].id}`;
            const prevClassOrId = i === 1 ? ".gallery-first-slide" : `#${slideData[i - 1].id}`;
            const label = `slide_${i}`;

            tl4.to(currentId, {
                transform: "translate(-50%, -56%)",
            }, label)
            .to(`${currentId} img`, {
                transform: "scale(1)",
            }, label)
            .to(prevClassOrId, {
                scale: 0.9,
                opacity: 0,
                y: i === 1 ? -50 : 0 // Keep consistent with original logic
            }, label)
            .from(`${currentId} .gallery-topText h4, ${currentId} .gallery-topText h3, ${currentId} .gallery-bottomText h3`, {
                opacity: 0,
                x: 50,
            })
            .to({}, { duration: 0.4 }, "+=0");
        }

        // Clean up function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const generateCapsules = (quantity = 6) => {
        const capsules = [];
        for (let i = 1; i <= quantity; i++) {
            capsules.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    Additions
                </h3>
            );
        }
        return capsules;
    };

    return (
        <section className="gallery-page4 relative h-screen w-full overflow-hidden" ref={pageRef}>
            <div className="gallery-slider">
                <div
                    className="gallery-box"
                    style={{ "--time": "40s", "--quantity": 6 }}
                >
                    {generateCapsules(6)}
                </div>
            </div>

            {/* Dynamically render all 8 slides */}
            {slideData.map((slide, index) => {
                const isFirst = slide.isFirst;
                
                // Calculate progress bar width based on 8 slides (e.g., 1/8 = 12.5%, 2/8 = 25%)
                const progressWidth = `${((index + 1) / slideData.length) * 100}%`;

                return (
                    <div 
                        key={slide.id}
                        id={!isFirst ? slide.id : undefined} 
                        className={isFirst ? "gallery-background gallery-first-slide" : "gallery-background2"}
                    >
                        <img src={slide.img} alt={slide.title} />
                        
                        <div className="gallery-topText">
                            <h4>{slide.title}</h4>
                            <h3>(Scroll)</h3>
                        </div>
                        
                        <div className="gallery-bottomText">
                            <div className='w-full flex justify-center items-center gap-0'>
                                <BsFillPlusCircleFill className='w-8 h-8 text-white/60 min-w-[2rem]' />
                                <h3 className="ml-4 max-w-2xl text-left">
                                    {slide.desc}
                                </h3>
                            </div>
                            <div className="relative z-9 w-50 h-[0.1rem] bg-white/20 mt-6">
                                <div 
                                    className="progress-line absolute z-10 bg-white h-[0.1rem] top-1/2 -translate-y-1/2 left-0"
                                    style={{ width: progressWidth }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default Gallery;