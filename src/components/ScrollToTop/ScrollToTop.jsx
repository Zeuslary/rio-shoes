import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop({ children }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return <>{children}</>;
}

export default ScrollToTop;
