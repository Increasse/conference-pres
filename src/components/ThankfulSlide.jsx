import React, { useEffect, useRef, useState } from 'react';

const sponsorsData = {
    general: [
        { id: 1, name: 'ТехноЛидер', logo: '🏢', description: 'Генеральный партнер' },
        { id: 2, name: 'ИнноваЦентр', logo: '💡', description: 'Генеральный партнер' },
    ],
    gold: [
        { id: 3, name: 'КодБудущего', logo: '⚡', description: 'Золотой партнер' },
        { id: 4, name: 'МедиаХаб', logo: '📱', description: 'Золотой партнер' },
        { id: 5, name: 'КлаудСервис', logo: '☁️', description: 'Золотой партнер' },
    ],
    silver: [
        { id: 6, name: 'ВебСтудия', logo: '🎨', description: 'Серебряный партнер' },
        { id: 7, name: 'МаркетПро', logo: '📊', description: 'Серебряный партнер' },
        { id: 8, name: 'СтартапХаб', logo: '🚀', description: 'Серебряный партнер' },
        { id: 9, name: 'Аналитика24', logo: '📈', description: 'Серебряный партнер' },
    ],
    info: [
        { id: 10, name: 'ИТ-журнал', logo: '📰', description: 'Инфопартнер' },
        { id: 11, name: 'ТехноБлог', logo: '📝', description: 'Инфопартнер' },
        { id: 12, name: 'СтартапМедиа', logo: '📺', description: 'Инфопартнер' },
        { id: 13, name: 'ITNews', logo: '🌐', description: 'Инфопартнер' },
        { id: 14, name: 'ДижиталЛайф', logo: '📲', description: 'Инфопартнер' },
    ],
};

const teamData = [
    { id: 1, name: 'Анна Смирнова', role: 'Генеральный продюсер', avatar: '👩‍💼' },
    { id: 2, name: 'Павел Волков', role: 'Программный директор', avatar: '👨‍💼' },
    { id: 3, name: 'Елена Павлова', role: 'Руководитель по работе с партнерами', avatar: '👩‍💼' },
    { id: 4, name: 'Дмитрий Соколов', role: 'Технический директор', avatar: '👨‍💻' },
];

const FinalSlide = () => {
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

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white px-4 md:px-12 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,#a855f7_0%,transparent_50%)]" />
                <div className="w-full h-full bg-[radial-gradient(circle_at_70%_60%,#3b82f6_0%,transparent_50%)] absolute inset-0" />
            </div>

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-[60%] h-full flex flex-col py-6 md:py-10">

                <div className="flex-shrink-0 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight animate-fade-in bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                        Спасибо, что были с нами!
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
                        Digital Summit 2025 состоялся благодаря вам
                    </p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4">

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-center mb-4 text-yellow-300">Генеральные партнеры</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {sponsorsData.general.map((sponsor, index) => (
                                <div
                                    key={sponsor.id}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-500/50 hover:border-yellow-400 transition-all duration-500 hover:scale-105 text-center transform-gpu"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        transitionDelay: `${300 + index * 100}ms`,
                                    }}
                                >
                                    <div className="text-7xl mb-3">{sponsor.logo}</div>
                                    <h4 className="text-2xl font-bold">{sponsor.name}</h4>
                                    <p className="text-yellow-300">{sponsor.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-center mb-3 text-amber-300">Золотые партнеры</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sponsorsData.gold.map((sponsor, index) => (
                                <div
                                    key={sponsor.id}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30 hover:border-amber-400 transition-all duration-500 hover:scale-105 text-center"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        transitionDelay: `${400 + index * 80}ms`,
                                    }}
                                >
                                    <div className="text-5xl mb-2">{sponsor.logo}</div>
                                    <h4 className="font-semibold">{sponsor.name}</h4>
                                    <p className="text-xs text-amber-300">{sponsor.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-center mb-3 text-gray-300">Серебряные партнеры</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {sponsorsData.silver.map((sponsor, index) => (
                                <div
                                    key={sponsor.id}
                                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-gray-500/30 hover:border-gray-400 transition-all duration-500 hover:scale-105 text-center"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        transitionDelay: `${500 + index * 60}ms`,
                                    }}
                                >
                                    <div className="text-4xl mb-1">{sponsor.logo}</div>
                                    <h4 className="text-sm font-medium">{sponsor.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-center mb-3 text-blue-300">Информационные партнеры</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {sponsorsData.info.map((sponsor, index) => (
                                <div
                                    key={sponsor.id}
                                    className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/20 hover:border-blue-400 transition-all duration-500 hover:scale-105 text-center inline-flex items-center gap-2"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${600 + index * 40}ms`,
                                    }}
                                >
                                    <span className="text-2xl">{sponsor.logo}</span>
                                    <span className="text-sm">{sponsor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-center mb-3">Организаторы</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {teamData.map((member, index) => (
                                <div
                                    key={member.id}
                                    className="text-center"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${700 + index * 100}ms`,
                                    }}
                                >
                                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl mb-2">
                                        {member.avatar}
                                    </div>
                                    <h4 className="font-semibold text-sm">{member.name}</h4>
                                    <p className="text-xs text-gray-400">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 text-center mt-3 pt-3 border-t border-white/10">

                    <p className="text-xs text-gray-500 mt-3">
                        © 2025 Digital Summit. Все права защищены.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FinalSlide;