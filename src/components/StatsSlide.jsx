import React, { useEffect, useRef, useState } from 'react';

const stats = [
    { value: 500, suffix: '+', label: 'Участников' },
    { value: 35, suffix: '', label: 'Спикеров' },
    { value: 4, suffix: '', label: 'Страны-участницы' },
    { value: 85, suffix: '%', label: 'Заполняемость зала' },
];

const registrationData = [50, 120, 280, 420, 580, 720, 950]; // значения по неделям
const weeks = ['-6 нед', '-5', '-4', '-3', '-2', '-1', 'Событие'];

const StatsSlide = () => {
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6 md:px-12"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_70%,#3b82f6_0%,transparent_40%)]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16 tracking-tight">
                    Digital Summit 2025 в цифрах
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-4xl lg:text-6xl font-black tracking-[-4px]">
                                <Counter
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    duration={1800} // ms
                                    isAnimating={isVisible}
                                />
                            </div>
                            <p className="text-xl md:text-xl font-medium mt-3 opacity-90">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                        Динамика регистрации участников
                    </h3>

                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10">
                        <LineChart data={registrationData} labels={weeks} />
                    </div>
                </div>
            </div>

            <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-cyan-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
        <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
          Дальше — Активность
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
        </section>
    );
};

const Counter = ({ end, suffix = '', duration = 2000, isAnimating }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isAnimating) return;

        let start = 0;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
            start += Math.ceil(end / 50); // плавность — чем больше, тем резче
            setCount(start);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            }
        }, stepTime || 20);

        return () => clearInterval(timer);
    }, [isAnimating, end, duration]);

    return (
        <>
            {count}
            {suffix}
        </>
    );
};

const LineChart = ({ data, labels }) => {
    const width = 800;
    const height = 320;
    const padding = 60;

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const points = data.map((val, i) => {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - ((val - minValue) / range) * (height - 2 * padding);
        return { x, y };
    });

    return (
        <div className="relative w-full h-64 md:h-80">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                {/* Оси */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4b5563" strokeWidth="2" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#4b5563" strokeWidth="2" />

                {/* Линия графика */}
                <polyline
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Точки с hover */}
                {data.map((val, i) => {
                    const { x, y } = points[i];
                    const isHovered = hoveredIndex === i;

                    return (
                        <g key={i}>
                            <circle
                                cx={x}
                                cy={y}
                                r={isHovered ? 10 : 6}
                                fill="#3b82f6"
                                stroke="#111827"
                                strokeWidth="2"
                                className="transition-all duration-150"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                            <circle
                                cx={x}
                                cy={y}
                                r={18}
                                fill="transparent"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </g>
                    );
                })}

                {labels.map((label, i) => {
                    const x = padding + (i * (width - 2 * padding)) / (labels.length - 1);
                    return (
                        <text key={i} x={x} y={height - 20} textAnchor="middle" fill="#9ca3af" fontSize="14">
                            {label}
                        </text>
                    );
                })}

                <text x={padding - 10} y={padding + 10} textAnchor="end" fill="#9ca3af" fontSize="14">
                    {maxValue}
                </text>
                <text x={padding - 10} y={height - padding + 10} textAnchor="end" fill="#9ca3af" fontSize="14">
                    {minValue}
                </text>
            </svg>

            {hoveredIndex !== null && (
                <div
                    className="absolute bg-gray-900/95 backdrop-blur-md text-white text-sm px-4 py-2 rounded-lg border border-cyan-500/30 shadow-xl pointer-events-none z-10"
                    style={{
                        left: `${points[hoveredIndex].x}px`,
                        top: `${points[hoveredIndex].y - 50}px`,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="font-semibold">{labels[hoveredIndex]}</div>
                    <div className="text-cyan-300">
                        {data[hoveredIndex]} участников
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsSlide;