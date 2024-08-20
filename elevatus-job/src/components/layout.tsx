import { ReactNode } from 'react';
import Header from './header'; // Assuming you have a Header component
import Footer from './footer'; // Assuming you have a Footer component
import { Container } from '@mui/material';
interface LayoutProps {
    children?: ReactNode;
}
function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Header />
            <main className="layout-content">
                <Container>
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;