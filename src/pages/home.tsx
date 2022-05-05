import { AuthPage } from '@/components/layouts/auth-page'
import { HomeView } from '@/views/home-view'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <AuthPage>
      <HomeView />
    </AuthPage>
  )
}

export default Home
