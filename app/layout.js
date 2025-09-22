import QueryProvider from './providers/QueryProvider';

export const metadata = {
  title: 'Notifications App',
  description: 'Modern notifications interface with infinite pagination',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div className="page-right-border" />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
