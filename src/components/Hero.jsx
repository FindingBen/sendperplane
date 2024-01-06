import React from 'react'
import styles from '../style'
import { discount, robot, mockup3,tablet, mcbook,mock5 } from '../assets'
import GetStarted from './GetStarted'
const Hero = () => {
  return (
    <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 relative`}>
        {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} className='w-[32px] h-[32px]' />
          <p className={`${styles.paragraph} ml-2`}>
          <span className='text-white'>20%</span> Discount for {""}
        
          <span className='text-white'>1 Month</span>
          </p>
        </div> */}
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px]
          leading-[60px]'>Reach out to <br className='sm:block hidden'/>
          <span className='text-gradient'>your recipients</span></h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
           <GetStarted></GetStarted>
          </div>
        </div>
        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px]
          leading-[75px] w-full'>Get more <span className='text-gradient'>responses</span></h1>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our product seamlessly sends SMS messages containing links to custom landing pages created within our platform.
          </p>
          <div className={`flex-1 flex ${styles.flexCenter} relative`}>
      
      </div>
      </div>
     
     <div className='flex flex-col'>
     <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={mock5} alt="billing" className="xl:w-[100%] w-[80%] relative z-[5]" />


        {/* gradient start */}
        {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[60%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[30%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
        <div className="absolute z-[0] w-[70%] h-[60%] right-20 bottom-40 blue__gradient" />
        {/* gradient end */}
      </div>
     
     </div>
    
      <div className={`ss:hidden ${styles.flexCenter}`}>
          <GetStarted></GetStarted>
      </div>
    </section>
  )
}

export default Hero
