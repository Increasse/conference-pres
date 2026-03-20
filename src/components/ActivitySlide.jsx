import React, { useState } from 'react';

const ActivitySlide = () => {
    const [hovered, setHovered] = useState(null); // { type: 'visitors'|'sessions', day: 0|1 }

    const visitors = { day1: 320, day2: 480 };
    const sessions = { day1: 18, day2: 24 };

    const width = 720;
    const height = 400;
    const padding = { top: 50, right: 40, bottom: 80, left: 80 };
    const barWidth = 120;
    const gap = 120;

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-indigo-950 via-black to-purple-950 text-white px-6 md:px-12 overflow-hidden">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_70%_30%,#8b5cf6_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 md:mb-24 tracking-tight">
                    Активность по дням
                </h2>

                <div className="flex flex-row justify-center">
                    <div className="mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                            Количество посетителей
                        </h3>

                        <div className="relative mx-auto" style={{ width: `${width}px`, height: `${height}px` }}>
                            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#4b5563" strokeWidth="2" />
                                <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#4b5563" strokeWidth="2" />

                                <text x={padding.left + gap / 2} y={height - padding.bottom + 40} textAnchor="middle" fill="#d1d5db" fontSize="18">День 1</text>
                                <text x={padding.left + gap + gap / 2} y={height - padding.bottom + 40} textAnchor="middle" fill="#d1d5db" fontSize="18">День 2</text>

                                {['day1', 'day2'].map((key, i) => {
                                    const value = visitors[key];
                                    const max = Math.max(visitors.day1, visitors.day2);
                                    const barHeight = (value / max) * (height - padding.top - padding.bottom);
                                    const x = padding.left + i * gap;
                                    const isHovered = hovered?.type === 'visitors' && hovered?.day === i;

                                    return (
                                        <g key={key}>
                                            <rect
                                                x={x}
                                                y={height - padding.bottom - barHeight}
                                                width={barWidth}
                                                height={barHeight}
                                                rx="8"
                                                fill="#3b82f6"
                                                opacity={i === 1 ? 1 : 0.85}
                                                className="transition-all duration-200"
                                                onMouseEnter={() => setHovered({ type: 'visitors', day: i })}
                                                onMouseLeave={() => setHovered(null)}
                                            />
                                            <text
                                                x={x + barWidth / 2}
                                                y={height - padding.bottom - barHeight - 12}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="20"
                                                fontWeight="bold"
                                            >
                                                {value}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>

                            {hovered?.type === 'visitors' && (
                                <div
                                    className="absolute bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-xl border border-cyan-500/30 shadow-xl pointer-events-none z-10 text-base"
                                    style={{
                                        left: `${padding.left + hovered.day * gap + barWidth / 2}px`,
                                        top: `${height - padding.bottom - (visitors[`day${hovered.day + 1}`] / Math.max(visitors.day1, visitors.day2)) * (height - padding.top - padding.bottom) - 80}px`,
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    <div className="font-semibold">{`День ${hovered.day + 1}`}</div>
                                    <div className="text-cyan-300 text-lg">Посетители: <strong>{visitors[`day${hovered.day + 1}`]}</strong></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="">
                        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                            Количество сессий / докладов
                        </h3>

                        <div className="relative mx-auto" style={{ width: `${width}px`, height: `${height}px` }}>
                            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                                <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#4b5563" strokeWidth="2" />
                                <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#4b5563" strokeWidth="2" />

                                <text x={padding.left + gap / 2} y={height - padding.bottom + 40} textAnchor="middle" fill="#d1d5db" fontSize="18">День 1</text>
                                <text x={padding.left + gap + gap / 2} y={height - padding.bottom + 40} textAnchor="middle" fill="#d1d5db" fontSize="18">День 2</text>

                                {['day1', 'day2'].map((key, i) => {
                                    const value = sessions[key];
                                    const max = Math.max(sessions.day1, sessions.day2);
                                    const barHeight = (value / max) * (height - padding.top - padding.bottom);
                                    const x = padding.left + i * gap;
                                    const isHovered = hovered?.type === 'sessions' && hovered?.day === i;

                                    return (
                                        <g key={key}>
                                            <rect
                                                x={x}
                                                y={height - padding.bottom - barHeight}
                                                width={barWidth}
                                                height={barHeight}
                                                rx="8"
                                                fill="#8b5cf6"
                                                opacity={i === 1 ? 1 : 0.85}
                                                className="transition-all duration-200"
                                                onMouseEnter={() => setHovered({ type: 'sessions', day: i })}
                                                onMouseLeave={() => setHovered(null)}
                                            />
                                            <text
                                                x={x + barWidth / 2}
                                                y={height - padding.bottom - barHeight - 12}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="20"
                                                fontWeight="bold"
                                            >
                                                {value}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>

                            {hovered?.type === 'sessions' && (
                                <div
                                    className="absolute bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-xl border border-purple-500/30 shadow-xl pointer-events-none z-10 text-base"
                                    style={{
                                        left: `${padding.left + hovered.day * gap + barWidth / 2}px`,
                                        top: `${height - padding.bottom - (sessions[`day${hovered.day + 1}`] / Math.max(sessions.day1, sessions.day2)) * (height - padding.top - padding.bottom) - 80}px`,
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    <div className="font-semibold">{`День ${hovered.day + 1}`}</div>
                                    <div className="text-purple-300 text-lg">Доклады: <strong>{sessions[`day${hovered.day + 1}`]}</strong></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-center text-xl md:text-2xl font-medium mt-10 md:mt-14 max-w-4xl mx-auto leading-relaxed opacity-90">
                    Второй день оказался самым насыщенным — пик посещаемости пришелся на выступление ключевого спикера
                </p>
            </div>

            <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-purple-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
        <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
          Дальше — Спикеры
        </span>
                <div className="animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
                    </svg>
                </div>
            </button>
        </section>
    );
};

export default ActivitySlide;