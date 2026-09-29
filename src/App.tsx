import { Route, Routes } from 'react-router-dom'

import { CookieBanner } from './components/CookieBanner'
import { PageSeo } from './components/PageSeo'
import { ScrollManager } from './components/ScrollManager'
import { TimedPopup } from './components/TimedPopup'
import { AboutUsPage } from './pages/AboutUsPage'
import { BlogPage } from './pages/BlogPage'
import { ClassesPage } from './pages/ClassesPage'
import { HallsPage } from './pages/HallsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CookiePolicyPage } from './pages/CookiePolicyPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsOfServicePage } from './pages/TermsOfServicePage'

export default function App() {
  return (
    <>
      <PageSeo />
      <ScrollManager />
      <TimedPopup />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about_us" element={<AboutUsPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/tariffs" element={<HallsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
