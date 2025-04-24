import './globals.css';
export const metadata = { title: 'ToDo App' };

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body
        className="
          min-h-screen 
          bg-gradient-to-br from-purple-400 via-pink-300 to-blue-200 
          font-sans
          flex items-center justify-center
          p-4
        "
      >
        {children}
      </body>
    </html>
  );
}
