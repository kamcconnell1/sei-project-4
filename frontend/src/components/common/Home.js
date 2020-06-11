import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import PageContainer from './PageContainer'
import Footer from './Footer'
import exampleImage from '../../assets/jobr-example.png'
import exampleImageMobile from '../../assets/jobr-example-mobile.png'

const Home = () => {

  return (
    <PageContainer>
      <div className='home'>
        <div className='hero'>
          <Header as='h1'>JOBR</Header>
          <Header as='h2'>Take the work out of the job search</Header>
        </div>
        <p>Finding a job can be a stressful and time-consuming process. JOBR helps make it just a bit easier by providing one platform to organise, prioritise and track your job search. Use JOBR to create your own job board to store and update applications as they progress through various stages, from your initial search to when you finally land the offer.</p>
        <div className='image-desktop'>
          <Image src={exampleImage} size='massive' />
        </div>
        <div className='image-mobile'>
          <Image src={exampleImageMobile} size='massive' />
        </div>
        <p>Let JOBR take the work out of your job search so you can focus on landing that offer!</p>
      </div>
      <Footer />
    </PageContainer>
  )
}

export default Home