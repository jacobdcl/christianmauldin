import { ThemeProvider } from 'styled-components';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PrintsPage from './pages/PrintsPage';
import PersonalPage from './pages/PersonalPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';

// Wrapper component for AnimatePresence
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/prints" element={<PrintsPage />} />
                <Route path="/personal" element={<PersonalPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </AnimatePresence>
    );
}

// Create router with future flags
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="*" element={
            <>
                <Navbar />
                <AnimatedRoutes />
            </>
        } />
    ),
    {
        future: {
            v7_startTransition: true
        }
    }
);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App; 