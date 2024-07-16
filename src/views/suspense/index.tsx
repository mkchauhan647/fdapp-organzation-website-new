import React, { Suspense } from 'react'

function ReactSuspense({children}:any) {
  return (
    <Suspense fallback={<>Loading...</>}>
      {children}
    </Suspense>
  )
}

export default ReactSuspense