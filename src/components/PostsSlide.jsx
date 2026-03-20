import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Данные для графика упоминаний
const mentionsData = [
    { date: '1 окт', mentions: 120 },
    { date: '5 окт', mentions: 350 },
    { date: '10 окт', mentions: 280 },
    { date: '13 окт', mentions: 890 },
    { date: '14 окт', mentions: 2450 }, // Пик в первый день
    { date: '15 окт', mentions: 3200 }, // Пик во второй день
    { date: '16 окт', mentions: 1800 },
    { date: '18 окт', mentions: 600 },
    { date: '20 окт', mentions: 300 },
];

// Данные для топ-постов
const topPosts = [
    {
        id: 1,
        author: '@techlead',
        avatar: '👨‍💻',
        platform: 'Twitter',
        platformIcon: '🐦',
        text: 'Невероятный первый день на Digital Summit! Классные спикеры и море нетворкинга 🔥',
        likes: 1245,
        retweets: 342,
        image: '🎤',
        color: '#1DA1F2',
    },
    {
        id: 2,
        author: '@maria_design',
        avatar: '👩‍🎨',
        platform: 'LinkedIn',
        platformIcon: '💼',
        text: 'Выступление Анны Смирновой про AI в дизайне — просто космос! Жду записи.',
        likes: 876,
        retweets: 156,
        image: '🚀',
        color: '#0A66C2',
    },
    {
        id: 3,
        author: '@startup_news',
        avatar: '📰',
        platform: 'Telegram',
        platformIcon: '✈️',
        text: 'Главные анонсы второго дня конференции: новый инструмент для аналитики и партнерство с крупным фондом',
        likes: 2341,
        retweets: 567,
        image: '📢',
        color: '#26A5E4',
    },
];

// Данные для общего охвата
const reachData = {
    total: 1200000,
    growth: '+45%',
    platforms: [
        { name: 'Twitter', reach: 450000, color: '#1DA1F2', icon: '🐦' },
        { name: 'LinkedIn', reach: 380000, color: '#0A66C2', icon: '💼' },
        { name: 'Telegram', reach: 290000, color: '#26A5E4', icon: '✈️' },
        { name: 'VK', reach: 80000, color: '#0077FF', icon: '📱' },
    ],
};

const SocialSlide = () => {
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
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Находим максимальный охват для прогресс-баров
    const maxReach = Math.max(...reachData.platforms.map(p => p.reach));

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white px-6 md:px-12 overflow-hidden"
        >
            {/* Фон с градиентами */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_70%_20%,#8b5cf6_0%,transparent_50%)]" />
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_80%,#3b82f6_0%,transparent_50%)] absolute inset-0" />
            </div>

            <div className="relative z-10 max-w-7xl w-full h-full">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 md:mb-6 tracking-tight animate-fade-in">
                    Социальный резонанс
                </h2>
                <p className="text-xl md:text-2xl text-center text-gray-300 mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    Как нас обсуждали в соцсетях
                </p>

                {/* Основной контент: два блока рядом */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Левая колонка - Общий охват и график */}
                    <div className="space-y-8">

                        {/* Карточка общего охвата */}
                        <div
                            className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '300ms',
                            }}
                        >
                            <h3 className="text-lg font-medium text-gray-300 mb-2">Общий охват</h3>
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-3xl md:text-5xl font-bold text-white">
                                    <Counter end={reachData.total} duration={2000} isAnimating={isVisible} formatter={(n) => (n / 1000000).toFixed(1) + 'M'} />
                                </span>
                                <span className="text-xl md:text-2xl text-green-400 font-semibold">
                                    {reachData.growth}
                                </span>
                            </div>

                            {/* Прогресс-бары по платформам */}
                            <div className="space-y-5">
                                {reachData.platforms.map((platform) => (
                                    <div key={platform.name}>
                                        <div className="flex justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{platform.icon}</span>
                                                <span className="font-medium">{platform.name}</span>
                                            </div>
                                            <span className="font-semibold">
                                                <Counter end={platform.reach} duration={1800} isAnimating={isVisible} formatter={(n) => (n / 1000).toFixed(0) + 'K'} />
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                                            <div
                                                className="h-3 rounded-full transition-all duration-1000"
                                                style={{
                                                    width: isVisible ? `${(platform.reach / maxReach) * 100}%` : '0%',
                                                    backgroundColor: platform.color,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* График упоминаний */}
                        <div
                            className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '500ms',
                            }}
                        >
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span>📈</span> Динамика упоминаний
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mentionsData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1F2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#fff'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="mentions"
                                            stroke="#c084fc"
                                            strokeWidth={3}
                                            dot={{ fill: '#c084fc', strokeWidth: 2 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between mt-4 text-sm text-gray-400">
                                <span>Пик 1-го дня: 2.5K</span>
                                <span>Пик 2-го дня: 3.2K</span>
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка - Топ-посты */}
                    <div
                        className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 transition-all duration-700"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transitionDelay: '400ms',
                        }}
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-3xl">🔥</span>
                            Топ-посты
                        </h3>

                        <div className="space-y-5 max-h-[660px] overflow-y-auto pr-2 custom-scrollbar">
                            {topPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/30"
                                    style={{
                                        transitionDelay: `${600 + index * 150}ms`,
                                    }}
                                >
                                    {/* Шапка поста */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-lg">{post.author}</span>
                                                <span
                                                    className="text-xs px-2 py-1 bg-white/20 rounded-full flex items-center gap-1"
                                                    style={{ color: post.color }}
                                                >
                                                    <span>{post.platformIcon}</span>
                                                    {post.platform}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Текст поста */}
                                    <p className="text-gray-200 mb-3 text-lg">{post.text}</p>

                                    {/* Эмодзи-изображение (как заглушка фото) */}
                                    {post.image && (
                                        <div className="mb-3 text-7xl text-center py-4 bg-white/5 rounded-lg">
                                            {post.image}
                                        </div>
                                    )}

                                    {/* Статистика поста */}
                                    <div className="flex gap-4 text-base text-gray-400">
                                        <span className="flex items-center gap-1">❤️ <Counter end={post.likes} duration={1500} isAnimating={isVisible} /></span>
                                        <span className="flex items-center gap-1">🔄 <Counter end={post.retweets} duration={1500} isAnimating={isVisible} /></span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Кнопка "Смотреть все" */}
                        <button className="w-full mt-6 py-4 px-4 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all duration-300 border border-white/30 text-lg">
                            Смотреть все посты
                        </button>
                    </div>
                </div>

                {/* Подпись слайда */}
                <div className="text-center mt-8 text-gray-400 text-sm animate-fade-in" style={{ animationDelay: '800ms' }}>
                    Данные собраны за период 10-20 октября 2025
                </div>
            </div>

            {/* Стрелка вниз */}
            <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 6, behavior: 'smooth' })}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-purple-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
                <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
                    Дальше — Отзывы
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

// Улучшенный анимированный счётчик с форматтером
const Counter = ({ end, duration = 1800, isAnimating, formatter = (n) => n.toLocaleString() }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isAnimating) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            const newValue = Math.min(Math.floor(start), end);
            setCount(newValue);
            if (start >= end) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [isAnimating, end, duration]);

    return formatter(count);
};

// Добавляем стили для кастомного скроллбара
const style = document.createElement('style');
style.textContent = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.05);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.2);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255,255,255,0.3);
    }
`;
document.head.appendChild(style);

export default SocialSlide;