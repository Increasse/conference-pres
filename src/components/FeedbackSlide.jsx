import React, { useEffect, useRef, useState } from 'react';

const testimonialsData = [
    {
        id: 1,
        name: 'Алексей Иванов',
        position: 'CTO в TechStart',
        avatar: '👨‍💼',
        photo: 'https://i.pravatar.cc/150?img=7', // Можно заменить на реальные фото
        text: 'Лучшая конференция года! Организация на высшем уровне, спикеры — топовые эксперты. Особенно понравилась секция про AI в продакшене. Обязательно приедем в следующем году всей командой.',
        rating: 5,
        date: '16 октября 2025',
        platform: 'Twitter',
    },
    {
        id: 2,
        name: 'Екатерина Смирнова',
        position: 'Product Manager в Яндекс',
        avatar: '👩‍💼',
        photo: 'https://i.pravatar.cc/150?img=5',
        text: 'Очень крутой нетворкинг! Познакомилась с десятками профессионалов из индустрии. Доклады про тренды 2025 — просто космос. Спасибо организаторам за атмосферу!',
        rating: 5,
        date: '17 октября 2025',
        platform: 'LinkedIn',
    },
    {
        id: 3,
        name: 'Дмитрий Петров',
        position: 'Lead Frontend Developer',
        avatar: '👨‍💻',
        photo: 'https://i.pravatar.cc/150?img=3',
        text: 'Отличный выбор спикеров и тем. Много практических кейсов, которые сразу можно применить в работе. Отдельное спасибо за трансляцию — кто не смог приехать, тоже были в курсе.',
        rating: 4,
        date: '15 октября 2025',
        platform: 'Telegram',
    },
    {
        id: 4,
        name: 'Анна Соколова',
        position: 'UX/UI Designer',
        avatar: '👩‍🎨',
        photo: 'https://i.pravatar.cc/150?img=1',
        text: 'Вдохновляющие выступления! После конференции столько идей и энергии. Организаторы молодцы — всё продумано до мелочей: кофе-брейки, зоны для общения, фотозоны.',
        rating: 5,
        date: '16 октября 2025',
        platform: 'Instagram',
    },
    {
        id: 5,
        name: 'Михаил Козлов',
        position: 'Data Scientist',
        avatar: '👨‍🔬',
        photo: 'https://i.pravatar.cc/150?img=8',
        text: 'Очень понравился уровень докладов. Видно, что спикеры готовились и действительно разбираются в теме. Полезно было и для новичков, и для профи. Жду следующий год!',
        rating: 5,
        date: '17 октября 2025',
        platform: 'Twitter',
    },
    {
        id: 6,
        name: 'Ольга Новикова',
        position: 'Marketing Director',
        avatar: '👩‍💼',
        photo: 'https://i.pravatar.cc/150?img=10',
        text: 'Отличная организация, удобная площадка, вкусный кофе :) По делу — маркетинговая секция дала много инсайтов. Уже внедряем в работу!',
        rating: 4,
        date: '15 октября 2025',
        platform: 'LinkedIn',
    },
];

const TestimonialsSlide = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // Расчет количества отзывов на странице в зависимости от экрана
    const getItemsPerPage = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }
        return 3;
    };

    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
    const startIndex = currentIndex * itemsPerPage;
    const visibleTestimonials = testimonialsData.slice(startIndex, startIndex + itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToPage = (index) => {
        setCurrentIndex(index);
    };

    // Функция для отображения звезд рейтинга
    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            'Twitter': '🐦',
            'LinkedIn': '💼',
            'Telegram': '✈️',
            'Instagram': '📷',
            'Facebook': '📘',
        };
        return icons[platform] || '💬';
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 md:px-12 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#a855f7_0%,transparent_50%)]" />
                <div className="w-full h-full bg-[radial-gradient(circle_at_80%_70%,#3b82f6_0%,transparent_50%)] absolute inset-0" />
            </div>

            <div className="absolute top-20 left-10 text-9xl text-white/5 font-serif select-none">"</div>
            <div className="absolute bottom-20 right-10 text-9xl text-white/5 font-serif select-none">"</div>

            <div className="relative z-10 max-w-7xl w-full h-full flex flex-col py-8 md:py-12">

                <div className="flex-shrink-0 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-in">
                        Отзывы участников
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        Что говорят те, кто был с нами
                    </p>
                </div>

                <div className="flex-1 min-h-0 flex flex-col justify-center">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 max-h-[50%]">
                        {visibleTestimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:border-white/30 flex flex-col transform-gpu"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transitionDelay: `${400 + index * 150}ms`,
                                }}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-400">
                                        {testimonial.photo ? (
                                            <img
                                                src={testimonial.photo}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                                {testimonial.avatar}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-400 truncate">{testimonial.position}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {renderStars(testimonial.rating)}
                                            <span className="text-xs text-gray-500">
                                                {testimonial.date.split(' ')[0]}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-200 mb-4 flex-1 line-clamp-4 italic">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto">
                                    <span>{getPlatformIcon(testimonial.platform)}</span>
                                    <span>{testimonial.platform}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-shrink-0 flex items-center justify-between">
                        {/* Точки пагинации */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToPage(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === currentIndex
                                            ? 'w-8 bg-purple-400'
                                            : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Перейти к странице ${i + 1}`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 text-2xl"
                                aria-label="Предыдущий отзыв"
                            >
                                ←
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 text-2xl"
                                aria-label="Следующий отзыв"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    <div className="flex-shrink-0 text-center mt-4 text-gray-400 text-sm">
                        {startIndex + 1}-{Math.min(startIndex + itemsPerPage, testimonialsData.length)} из {testimonialsData.length} отзывов
                    </div>
                </div>
            </div>

            <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 9, behavior: 'smooth' })}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-purple-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
                <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
                    Дальше — благодарности
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

export default TestimonialsSlide;