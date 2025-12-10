import StaffNavbar from '@/components/StaffNavbar'
import '@/app/globals.css'

export const metadata = {
  title: 'SustainWear',
  description: 'SustainWear: A Smart Clothes Donation and Sustainability Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        <StaffNavbar />
        {children}
      </body>
    </html>
  )
}
