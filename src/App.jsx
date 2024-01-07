import React from 'react'
import styles from './style'
import { Navbar,Billing,Business,Button,CardDeal,Client,CTA,Hero,Stats,Testimonials, FeedbackCard, Footer } from './components'
import ProductVideo from './components/ProductVideo'
import { tablet } from './assets'

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <div className='flex lg:flex-row flex-col items-center'>
        <img src={tablet} alt="billing" className="w-[60%] h-[40%] relative z-[5] lg:mb-0 mb-5" />
        <div className="absolute z-[0] w-[100%] h-[40%] right-20 bottom-[20px] blue__gradient" />
        <div className='flex flex-col items-start w-full'>
          <h1 className='flex-1 font-poppins ml-5 font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[70px]
          leading-[30px]'>Access your <br className='sm:block hidden'/>
          content from anywhere!</h1>
          <p className={`${styles.paragraph} max-w-[470px] ml-5`}>Our user-friendly platform breaks down barriers, offering you the convenience of exploring, managing, and utilizing your content effortlessly. Embrace a new level of accessibility and stay productive no matter where life takes you.</p>
          
        </div>

        </div>
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* <Stats /> */}
        <Business />
        <div className='flex flex-row'>
        <ProductVideo id='product'/>
        <div className='mx-auto'>
        <h1 className='flex-1 font-poppins ml-5 font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[70px]
          leading-[30px]'>See what <br className='sm:block hidden'/>
          is Sendperplane and how it works!</h1>



        </div>
        </div>
        {/* <Billing />
        <CardDeal />
        <Testimonials />
        <Client />
        <CTA /> */}
        <Footer />
      </div>
    </div>
  </div>
  )
}

export default App
