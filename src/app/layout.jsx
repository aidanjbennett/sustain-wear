import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'SustainWear',
  description: 'SustainWear: A Smart Clothes Donation and Sustainability Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
