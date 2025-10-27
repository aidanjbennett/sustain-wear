import './globals.css'

export const metadata = {
  title: 'SustainWear',
  description: 'SustainWear: A Smart Clothes Donation and Sustainability Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
