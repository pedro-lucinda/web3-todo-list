import { LoginView } from '@/views/login-view'
import type { NextPage } from 'next'
import { PublicPage } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <PublicPage>
      <LoginView />
    </PublicPage>
  )
}

export default Home
