import React, { useState, useEffect } from 'react';

const TitleSlide = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY * 0.3);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    const backgroundImageUrl =
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85';

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center snap-start">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translateY(${scrollOffset}px)`,
                    transition: 'transform 0.05s ease-out',
                }}
            >
                <img
                    src={backgroundImageUrl}
                    alt="Digital Summit 2025 — полный зал"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

            <div className="relative z-10 max-w-5xl px-8 text-white text-center md:text-left md:ml-12">
                <div className="mb-6">
          <span className="text-[8rem] md:text-[10rem] font-black tracking-[-4px] leading-none text-white drop-shadow-2xl">
            500+
          </span>
                    <p className="text-3xl md:text-4xl font-medium -mt-2 ml-2 tracking-wide">участников</p>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 drop-shadow-2xl">
                    Digital Summit 2025
                </h1>

                <p className="text-3xl md:text-4xl font-light mb-8 tracking-wide">
                    Москва, 15—16 октября 2025
                </p>

                <p className="text-4xl md:text-5xl font-medium max-w-2xl leading-tight drop-shadow-xl">
                    Два дня, которые изменили рынок
                </p>
            </div>

            <button
                onClick={scrollToNext}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-cyan-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
        <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
          Листайте дальше
        </span>
                <div className="animate-bounce">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default TitleSlide;