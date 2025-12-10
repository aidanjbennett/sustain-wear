import DonorNavbar from '@/components/DonorNavbar'
import './globals.css'

export const metadata = {
  title: 'SustainWear',
  description: 'SustainWear: A Smart Clothes Donation and Sustainability Platform',
}

export default function DonorLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        <DonorNavbar />
        {children}
      </body>
    </html>
  )
}
