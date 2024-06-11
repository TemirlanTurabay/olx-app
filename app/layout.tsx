'use client'
import { QueryClient, QueryClientProvider } from 'react-query';
import './globals.css';
const queryClient = new QueryClient();
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <QueryClientProvider client={queryClient}>
          <header style={{ backgroundColor: '#333', color: '#fff', padding: '1rem' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>OLX</h1>
              <nav>
                <span style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/createProduct'}>Create Product</span>
              </nav>
            </div>
          </header>
          <main style={{ maxWidth: '960px', margin: '2rem auto', padding: '1rem' }}>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
