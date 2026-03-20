import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import TitleSlide from './components/TitleSlide.jsx'
import StatsSlide from "./components/StatsSlide.jsx";
import ActivitySlide from "./components/ActivitySlide.jsx";
import TopSpeakersSlide from "./components/TopSpeakersSlide.jsx";
import EngagementSlide from "./components/EngagementSlide.jsx";
import PostsSlide from "./components/PostsSlide.jsx";
import FeedbackSlide from "./components/FeedbackSlide.jsx";
import ThankfulSlide from "./components/ThankfulSlide.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TitleSlide/>
        <StatsSlide/>
        <ActivitySlide/>
        <TopSpeakersSlide/>
        <EngagementSlide/>
        <PostsSlide/>
        <FeedbackSlide/>
        <ThankfulSlide/>
    </StrictMode>,
)
