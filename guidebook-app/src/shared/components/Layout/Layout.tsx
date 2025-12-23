import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import BackToTop from '../ui/BackToTop';
import { ChatbotProvider } from '@features/chatbot/hooks/useChatContext';
import ChatbotButton from '@features/chatbot/components/ChatbotButton';
import ChatbotWindow from '@features/chatbot/components/ChatbotWindow';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Feature flag - can be disabled via environment variable
  const isChatbotEnabled = import.meta.env.VITE_CHATBOT_ENABLED !== 'false';

  return (
    <div className={styles.layout}>
      <Header />
      <Breadcrumbs />
      <main className={styles.main}>{children}</main>
      <Footer />
      <BackToTop />
      {isChatbotEnabled && (
        <ChatbotProvider>
          <ChatbotButton />
          <ChatbotWindow />
        </ChatbotProvider>
      )}
    </div>
  );
}

