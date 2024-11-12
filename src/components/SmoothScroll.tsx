'use client'

import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

const LenisScroll = ({ children }) => {
  // useLenis is used to trigger any action on scroll
  useLenis(({ scroll }) => {
    // This callback is triggered on every scroll event
    console.log('Current scroll position:', scroll)
  })

  return (
    // ReactLenis component wraps the content to enable smooth scrolling
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}

export default LenisScroll
