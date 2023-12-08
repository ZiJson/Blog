import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserPannel from '@/components/admin/UserPannel'
import ServerSupabase from '@/utils/supabase/supabase.server'
import { getUserFromSession } from '@/controllers/serverController'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog | ZiJie Lin 林子捷',
  description: 'personal blog',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromSession()
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head> */}
      <body className={inter.className}>
        <div className="min-h-screen overflow-hidden">
          {children}
          <Footer />

        </div>
        <UserPannel user={user} />

      </body>
    </html>
  )
}
