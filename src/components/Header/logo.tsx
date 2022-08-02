import React from 'react'

export const LogoTimer: React.FC<{ width?: number; height?: number }> = ({
  width = 32,
  height = 31,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 32 31'
    >
      <path
        fill='#00B37E'
        d='M31.993.586l-7.83 27.788a.179.179 0 01-.291.076l-5.242-4.983 3.928-13.925c.04-.126-.08-.24-.212-.202l-14.65 3.734L2.48 8.117c-.093-.089-.053-.24.08-.278L31.78.384c.134-.025.253.089.213.202zM18.629 23.468l-2.017 7.19a.179.179 0 01-.292.075L.05 15.282c-.092-.089-.052-.24.08-.278l7.564-1.93L18.63 23.468z'
        opacity='0.5'
      ></path>
      <path
        fill='#00B37E'
        d='M22.558 9.541L18.63 23.467 7.695 13.073l14.65-3.734c.133-.037.253.076.213.202z'
      ></path>
    </svg>
  )
}
