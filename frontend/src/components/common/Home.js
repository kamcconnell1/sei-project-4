import React from 'react'
import { Header, Image } from 'semantic-ui-react'

import PageContainer from './PageContainer'
import exampleImage from '../../assets/jobr-example.png'

const Home = () => {

  return (
    <PageContainer>
      <div className='hero'>
        <Header as='h1'>Take the work out of the job search</Header>
      </div>
      <p>Finding a job can be a stressful and time-consuming process. JOBR helps make it just a bit easier by providing one platform to organise, prioritise and track your job search. Use JOBR to create your own job board to store and update applications as they progress through various stages, from your initial search to when you finally land the offer.</p>
      <Image src={exampleImage} size='massive'/>
    </PageContainer>
  )
}

export default Home