import gsap from "gsap/all";
import mobileHeroBg from "../../assets/hero-mobile.png"
import heroBg from "../../assets/Liwa-Village-Recap-v2_1.webm"
import liwaLogo from "../../assets/liwalogo.png"
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });


    useGSAP(() => {
        if (!isMobHero) {
            gsap.to(".hero-section .hero-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);

    return (
        <section className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5 mb-20">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="responsive-mobile">
                    {/* Hero background video */}
                    <video
                        src={heroBg}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hero-img absolute inset-0 w-full h-full object-cover z-0 md:block hidden"
                    ></video>

                    {/* Mobile image fallback */}
                    <div className="block lg:hidden mt-6 mb-6">
                        <img
                            src={mobileHeroBg}
                            alt="mobile bg"
                            className="w-full rounded-[2rem] object-cover shadow-[0_-25px_45px_-10px_rgba(255,0,0,0.15)]"
                        />
                    </div>
                </div>
                <div className="p-4 flex flex-col md:justify-center">
                    <div className="relative h-dvh">
                        <img
                            src={liwaLogo}
                            alt="Liwa Village"
                            className="lg:absolute lg:left-2 w-48 md:w-72 h-auto"
                        />

                        {/* ── Main Hero Content ── */}
                        <div className="absolute left-0 right-0 bottom-[6%] px-0 md:px-2">
                            {/* Title */}
                            <h1
                                className="text-[#f4efe7] text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-3"
                                style={{ textShadow: '2px 2px 4px #000' }}
                            >
                                The Desert&apos;s<br className="md:hidden" /> Grand Stage
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#b1a696] text-sm md:text-xl lg:text-2xl font-medium tracking-wide max-w-3xl mb-3 leading-snug">
                                The ultimate winter destination where the spirit of heritage meets the joy of celebration
                            </p>

                            {/* Date */}
                            <p className="text-[#eae5dd] text-xs md:text-sm tracking-[0.2em] uppercase mb-8 font-semibold">
                                12 December 2026 &mdash; 3 January 2027
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="group relative overflow-hidden border border-white/40 text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:border-[#E3000F] hover:shadow-[0_0_30px_rgba(227,0,15,0.3)]"
                                >
                                    <span className="relative z-10">Discover more</span>
                                </button>
                                <button
                                    className="group relative overflow-hidden bg-[#E3000F] text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-[#B8000C] hover:shadow-[0_0_40px_rgba(227,0,15,0.4)]"
                                >
                                    <span className="relative z-10">Book your tickets</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
