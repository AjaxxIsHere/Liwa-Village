import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../constants/welcome";

// Data array for the interactive chips, mapping each to a color and an Unsplash image
const zones = [
    { name: "Shams Liwa", type: "grey", img: "https://liwavillage.ae/wp-content/uploads/2025/11/1-2.webp" },
    { name: "Wanasa", type: "red", img: "https://liwavillage.ae/wp-content/uploads/2025/11/2-17.webp" },
    { name: "Meydan", type: "grey", img: "https://liwavillage.ae/wp-content/uploads/2025/11/Smash-Room-1.webp" },
    { name: "Souk", type: "red", img: "https://liwavillage.ae/wp-content/uploads/2025/11/4-4.webp" },
    { name: "Auto", type: "grey", img: "https://liwavillage.ae/wp-content/uploads/2025/11/5-1.webp" },
    { name: "Adrenaline", type: "red", img: "https://liwavillage.ae/wp-content/uploads/2025/11/6-5.webp" }
];

const Choose = () => {

    const isMobD = useMediaQuery({ query: "(max-width:768px)" });
    const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;
    
    // Refs for hover reveal
    const cursorRef = useRef(null);
    const [hoverImg, setHoverImg] = useState(zones[0].img); 
    
    const xMove = useRef(null);
    const yMove = useRef(null);

    useGSAP(() => {
        // --- Scroll Animations ---
        const lines = gsap.utils.toArray(".choose-title-clip");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".choose-section",
                start: "top 75%",
                end: "bottom 100%",
                scrub: true,
            },
        });

        // Background transition
        tl.fromTo(".bg-transition", 
            { opacity: 0, scale: 1.05 },
            { opacity: 0.4, scale: 1, duration: 1, ease: "none" }
        );

        tl.from(".choose-subtitle", { yPercent: 100, opacity: 0, ease: "power1.inOut" }, "<");

        if (!isMobD) {
            tl.fromTo(".title-part", { height: "10vh" }, { height: "55vh", ease: "none" }, "<");
        }

        tl.to(lines, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", stagger: 0.2, duration: 1 }, "<");

        if (!isMobD) {
            tl.from(".choose-sec", { yPercent: 100, duration: 1 }, "<");
        }

        // --- Cursor Hover Setup ---
        // Changed yPercent to -100 to push it above the cursor, and added transformOrigin so it scales upwards
        gsap.set(cursorRef.current, { 
            scale: 0, 
            opacity: 0, 
            xPercent: -50, 
            yPercent: -100, 
            transformOrigin: "bottom center" 
        });
        
        xMove.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
        yMove.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
    }, []);

    const handleMouseMove = (e) => {
        if (xMove.current && yMove.current) {
            xMove.current(e.clientX);
            // Added a 20px offset so there is a small gap between the pointer and the image
            yMove.current(e.clientY - 20); 
        }
    };

    const handleMouseEnter = (img) => {
        setHoverImg(img);
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
    };

    return (
        <section 
            className="choose-section relative w-full min-h-screen p-8 lg:p-12 pt-10 overflow-hidden z-10"
            onMouseMove={handleMouseMove}
        >
            {/* Background Image */}
            <img 
                src="https://images.unsplash.com/photo-1576159470850-494c8b17aca0?q=80&w=1170&auto=format&fit=crop" 
                alt="Desert dunes background" 
                className="bg-transition absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none"
            />
            
            {/* Floating Cursor Image — portaled to body to escape smooth-scroller */}
            {createPortal(
                <div 
                    ref={cursorRef} 
                    className="fixed top-0 left-0 w-80 h-96 z-[9999] pointer-events-none rounded-[2rem] overflow-hidden shadow-2xl border-[1px] border-white/20 will-change-transform"
                >
                    <img src={hoverImg} alt="Preview" className="w-full h-full object-cover" />
                </div>,
                document.body
            )}

            {/* Subtitle */}
            <p className='text-[.7rem] text-[#4D4D4D] choose-subtitle'><span></span></p>
            
            {/* Main Animated Heading */}
            <div className="lg:mt-6 mt-4 title-part origin-bottom">
                {chooseLines.map((line, index) => (
                    <h1 key={index} className={`choose-heading text-black lg:text-[10.5rem] text-[3.5rem] leading-[0.9] font-medium tracking-tighter choose-title`}>
                        <span className={`choose-title-break ${index === 1 ? "lg:pb-3 pb-2" : ""}`}>
                            {line}
                            <span className={`choose-title-clip ${index === 1 ? "lg:pb-3 pb-2" : ""}`}>
                                {line}
                            </span>
                        </span>
                    </h1>
                ))}
            </div>

            {/* Bottom Content Section */}
            <div className="choose-sec relative w-full flex lg:flex-row flex-col justify-center items-start lg:gap-12 gap-8 lg:mt-8 mt-8 z-10">
                
                {/* Paragraph Side */}
                <div className='lg:w-1/2 w-full text-[#4D4D4D] lg:text-[2.5rem] md:text-[1.8rem] text-[1.4rem] leading-[1.2] lg:pr-12'>
                    <p>Explore a variety of immersive zones designed to celebrate culture, entertainment, and culinary excellence. Each area offers a unique experience tailored to your sense of adventure. Discover the zone you love most.</p>
                </div>
                
                {/* Tags Side (Forced 2 rows of 3 chips) */}
                <div className='lg:w-1/2 w-full flex flex-col lg:gap-4 gap-3 lg:mt-0 mt-4'>
                    
                    {/* Row 1: First 3 Chips */}
                    <div className="flex flex-row flex-wrap justify-start items-center lg:gap-4 gap-2">
                        {zones.slice(0, 3).map((zone, i) => (
                            <div 
                                key={i}
                                onMouseEnter={() => handleMouseEnter(zone.img)}
                                onMouseLeave={handleMouseLeave}
                                className={`cursor-pointer w-fit whitespace-nowrap transition-colors duration-300 border-[1.5px] lg:text-[2.6rem] md:text-[2rem] text-[1.4rem] lg:px-[36px] lg:py-[10px] px-[20px] py-[6px] rounded-full hover:bg-black hover:text-white hover:border-black ${
                                    zone.type === 'red' 
                                        ? 'border-[#E3000F] text-[#E3000F]' 
                                        : 'border-[#4D4D4D] text-[#4D4D4D]'
                                }`}
                            >
                                {zone.name}
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Last 3 Chips */}
                    <div className="flex flex-row flex-wrap justify-start items-center lg:gap-4 gap-2">
                        {zones.slice(3, 6).map((zone, i) => (
                            <div 
                                key={i + 3}
                                onMouseEnter={() => handleMouseEnter(zone.img)}
                                onMouseLeave={handleMouseLeave}
                                className={`cursor-pointer w-fit whitespace-nowrap transition-colors duration-300 border-[1.5px] lg:text-[2.6rem] md:text-[2rem] text-[1.4rem] lg:px-[36px] lg:py-[10px] px-[20px] py-[6px] rounded-full hover:bg-black hover:text-white hover:border-black ${
                                    zone.type === 'red' 
                                        ? 'border-[#E3000F] text-[#E3000F]' 
                                        : 'border-[#4D4D4D] text-[#4D4D4D]'
                                }`}
                            >
                                {zone.name}
                            </div>
                        ))}
                    </div>

                </div>
                
            </div>
        </section>
    );
};

export default Choose;