import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import w1 from "../../assets/welcome-1.png";
import w2 from "../../assets/welcome-2.png";

const Welcome = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
                // markers: true
            },
        });

        lines.forEach((line) => {
            tl.to(line, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            });
        });

    });

    return (
        <div className='welcome-section w-full min-h-screen text-gray-500 md:px-12 px-6 pb-24'>
            {/* Top Text Section */}
            <div className='flex flex-col gap-2'>
                <div className="w-full md:w-[95%] lg:text-[72px] md:text-[60px] text-[36px] welcome-line md:pt-24 pt-16 leading-[1.05]">
                    <div className="w-full welcome-text flex flex-col justify-center items-start">
                        {welcomeLines.map((text, index) => (
                            <span key={index} className="relative block text-darkBrown md:tracking-[-0.015em] tracking-[0.010em]">
                                {text}
                                <span className="clip-text-welcome md:tracking-[-0.015em] tracking-[0.010em]">{text}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Images and Paragraph */}
            <div className="flex md:flex-row flex-col justify-between items-center lg:gap-20 md:gap-12 gap-10 md:p-4 md:mt-32 mt-16">
                
                {/* Images Container - Changed to gap-0 so they touch */}
                <div className="flex flex-row justify-center items-center gap-0">
                    <img src={w1} alt="welcome image" className="md:rounded-[10rem] rounded-[8rem] lg:w-80 md:w-64 w-52 object-cover shadow-sm" />
                    <img src={w2} alt="welcome image" className="md:rounded-[10rem] rounded-[8rem] lg:w-80 md:w-64 w-52 object-cover shadow-sm" />
                </div>

                {/* Bottom Text - Removed flex gap and added <br/> for perfectly even line-height */}
                <div className="md:w-[45%] w-full">
                    <p className="lg:text-[2.5rem] md:text-[2.2rem] text-[1.6rem] text-[#4D4D4D] leading-[1.3] lg:pr-16 font-normal tracking-[-0.2px]">
                        A place where you can be with yourself and your loved ones.<br />
                        A place where you can experience unforgettable desert moments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;