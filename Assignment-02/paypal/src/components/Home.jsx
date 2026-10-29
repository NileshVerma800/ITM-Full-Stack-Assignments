import { useState } from 'react'
import Toggle from './Toggle'
import Hero from './Hero'
import { heroContent } from '../data/content'

function Home() {
  const [activeTab, setActiveTab] = useState('Business')

  return (
    <main className="main">
      <Toggle
        options={Object.keys(heroContent)}
        active={activeTab}
        onChange={setActiveTab}
      />
      <Hero content={heroContent[activeTab]} />
    </main>
  )
}

export default Home
