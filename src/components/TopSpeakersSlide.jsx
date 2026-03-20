import React, { useState } from 'react';

const speakers = [
    {
        id: 1,
        name: 'Анна Смирнова',
        position: 'Chief AI Officer',
        company: 'Yandex',
        topic: 'ИИ в продуктовой разработке: от экспериментов к миллиардной экономии',
        rating: 4.9,
        attendees: 420,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        review: 'Анна невероятно понятно объяснила, как внедрять ИИ без огромных бюджетов. Самый практичный доклад конференции!',
    },
    {
        id: 2,
        name: 'Михаил Иванов',
        position: 'Head of Data Science',
        company: 'Sber AI',
        topic: 'Генеративные модели в финансах: риски и возможности 2025–2030',
        rating: 4.8,
        attendees: 380,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://www.youtube.com/embed/example2',
        review: 'Очень глубокий анализ, цифры и кейсы, которые сразу хочется применить. Один из лучших докладов по AI в финтехе за год.',
    },
    {
        id: 3,
        name: 'Екатерина Петрова',
        position: 'Product Lead, Growth',
        company: 'Tinkoff',
        topic: 'Как мы выросли на 340% за год благодаря персонализации через ML',
        rating: 4.7,
        attendees: 350,
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        videoUrl: null,
        review: 'Практика, кейсы, метрики — всё, что нужно продакту. После доклада сразу пошли внедрять похожие подходы.',
    },
];

const TopSpeakersSlide = () => {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-purple-950 via-black to-indigo-950 text-white px-6 md:px-12 overflow-y-auto">

            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_80%,#a855f7_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16 tracking-tight animate-fade-in">
                    Топ-3 спикера по оценкам участников
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {speakers.map((speaker, index) => (
                        <div
                            key={speaker.id}
                            onClick={() => setSelectedSpeaker(speaker)}
                            className={`bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl cursor-pointer hover:scale-105 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <img
                                src={speaker.photo}
                                alt={speaker.name}
                                className="w-full h-96 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-1">{speaker.name}</h3>
                                <p className="text-purple-300 mb-1">{speaker.position}</p>
                                <p className="text-gray-400 mb-4">{speaker.company}</p>

                                <p className="text-lg font-medium mb-4 italic">«{speaker.topic}»</p>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                    <span className="text-2xl font-black text-yellow-400 mr-2">
                      {speaker.rating.toFixed(1)}
                    </span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-5 h-5"
                                                    fill={i < Math.floor(speaker.rating) ? 'currentColor' : 'none'}
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-gray-300">
                                        {speaker.attendees}+ посетили
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSpeaker && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedSpeaker(null)}
                >
                    <div
                        className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
                            onClick={() => setSelectedSpeaker(null)}
                        >
                            ×
                        </button>

                        <div className="p-8">
                            <h3 className="text-4xl font-bold mb-2">{selectedSpeaker.name}</h3>
                            <p className="text-2xl text-purple-400 mb-1">{selectedSpeaker.position}</p>
                            <p className="text-xl text-gray-400 mb-6">{selectedSpeaker.company}</p>

                            <p className="text-xl italic mb-8">«{selectedSpeaker.topic}»</p>

                            <div className="flex items-center mb-8">
                <span className="text-5xl font-black text-yellow-400 mr-4">
                  {selectedSpeaker.rating.toFixed(1)}
                </span>
                                <div className="text-3xl text-yellow-400">★★★★★</div>
                            </div>

                            <p className="text-lg mb-6">
                                <strong>{selectedSpeaker.attendees}+ участников</strong> присутствовали на выступлении
                            </p>

                            {selectedSpeaker.videoUrl ? (
                                <div className="mb-8">
                                    <h4 className="text-2xl font-semibold mb-4">Фрагмент выступления</h4>
                                    <div className="aspect-video">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={selectedSpeaker.videoUrl}
                                            title="Видеофрагмент"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <h4 className="text-2xl font-semibold mb-4">Отзыв участника</h4>
                                    <blockquote className="text-xl italic border-l-4 border-purple-500 pl-6 py-2">
                                        {selectedSpeaker.review}
                                    </blockquote>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white hover:text-purple-300 transition-all duration-300 group z-20"
                aria-label="Прокрутить вниз"
            >
        <span className="text-xs uppercase tracking-[3px] font-medium mb-3 opacity-80 group-hover:opacity-100">
          Дальше — Вовлеченность
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

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
`;

export default TopSpeakersSlide;