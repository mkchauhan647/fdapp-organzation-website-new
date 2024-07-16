import React from 'react'

function CommonSection({children , name} : {children :any , name : string}) {
  return (
    <section className={`${name} py-8 sm:py-12`}>
      <div className='container mx-auto'>
        {children}
      </div>
    </section>
  )
}

export default CommonSection