import React, {useEffect, useRef, useState} from 'react';

const engagementMetrics = [
    {icon: '❤️', label: 'Лайки / реакции', value: 2840, color: '#ef4444'},
    {icon: '❓', label: 'Заданные вопросы', value: 320, color: '#3b82f6'},
    {icon: '📊', label: 'Участие в опросах', value: 680, color: '#10b981'},
    {icon: '💬', label: 'Комментарии', value: 1450, color: '#8b5cf6'},
];

const wordCloudData = [
    {text: 'AI', size: 80, color: '#60a5fa'},
    {text: 'маркетинг', size: 65, color: '#a78bfa'},
    {text: 'персонализация', size: 55, color: '#34d399'},
    {text: 'данные', size: 50, color: '#fbbf24'},
    {text: 'генеративный', size: 45, color: '#f472b6'},
    {text: 'тренды', size: 40, color: '#60a5fa'},
    {text: 'этика', size: 35, color: '#f87171'},
    {text: 'автоматизация', size: 32, color: '#a78bfa'},
    {text: 'ROI', size: 30, color: '#34d399'},
    {text: 'чат-боты', size: 28, color: '#fbbf24'},
    {text: '2025', size: 25, color: '#60a5fa'},
];

const EngagementSlide = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.15}
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-blue-950 via-black to-purple-950 text-white px-6 md:px-12 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_50%_30%,#3b82f6_0%,transparent_60%)]"/>
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 md:mb-16 tracking-tight animate-fade-in">
                    Вовлечённость аудитории
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20">
                    {engagementMetrics.map((item, index) => (
                        <div
                            key={item.label}
                            className="text-center transform transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: `${index * 150}ms`,
                            }}
                        >
                            <div className="text-2xl md:text-4xl mb-4" style={{color: item.color}}>
                                {item.icon}
                            </div>
                            <div className="text-3xl md:text-5xl font-black mb-2">
                                <Counter end={item.value} duration={1800} isAnimating={isVisible}/>
                            </div>
                            <p className="text-xl md:text-2xl font-medium opacity-90">{item.label}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <h3 className="text-2xl md:text-4xl font-semibold mb-8 animate-fade-in"
                        style={{animationDelay: '800ms'}}>
                        Самые частые слова в вопросах и комментариях
                    </h3>

                    <div
                        className="relative bg-black/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 max-w-5xl mx-auto min-h-[240px] md:min-h-[320px]">
                        <WordCloud words={wordCloudData} isVisible={isVisible}/>
                    </div>
                </div>
            </div>

            <button
                onClick={() => window.scrollTo({top: window.innerHeight * 5, behavior: 'smooth'})}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-cyan-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
        <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
          Дальше — Социальные сети
        </span>
                <div className="animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7"/>
                    </svg>
                </div>
            </button>
        </section>
    );
};

const Counter = ({end, duration = 1800, isAnimating}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isAnimating) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            setCount(Math.min(Math.floor(start), end));
            if (start >= end) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [isAnimating, end, duration]);

    return count.toLocaleString();
};

const WordCloud = ({words, isVisible}) => {
    const width = 920;
    const height = 320;
    const centerX = width / 2;
    const centerY = height / 2;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {words.map((word, i) => {
                const angle = (i / words.length) * Math.PI * 10; // спираль
                const radius = (i + 1) * 18 + word.size / 4;
                const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 80;
                const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60;

                return (
                    <text
                        key={i}
                        x={x}
                        y={y}
                        fontSize={word.size}
                        fill={word.color}
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        opacity={isVisible ? 1 : 0}
                        className="transition-opacity duration-1000"
                        style={{transitionDelay: `${800 + i * 80}ms`}}
                    >
                        {word.text}
                    </text>
                );
            })}
        </svg>
    );
};

export default EngagementSlide;