import React from 'react'
import { Container } from 'semantic-ui-react'

function PageContainer({ children }) {
  return (
    <div>
      <Container fluid textAlign='center'>
        {children}
      </Container>
    </div>
  )
}

export default PageContainer