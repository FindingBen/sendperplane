import React from 'react'

const Button = ({styles}) => {
  return (
    <button className={`py-4 px-6 bg-ngrokBlue font-poppins font-medium text-[18px]
    text-white rounded outline-none`}>
      <a href='https://spplane.app/register' target='_blank'>Get started</a>
    </button>
  )
}

export default Button
