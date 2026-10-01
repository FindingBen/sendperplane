import { Route, Routes } from "react-router-dom";
import styles from "./style";
import { Navbar, Business, Footer, Blog } from "./components";
import { BlogPost } from "./components/Blog";
import { heroImage2, secondHero } from "./assets";

const HomePage = () => (
  <div className="bg-ngrokDark w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-ngrokDark ${styles.flexStart} relative overflow-hidden`}>
      <div className="absolute z-[0] w-[60%] h-[60%] rounded-full bg-ngrokBlue opacity-20 blur-[120px] -top-20 -left-20" />
      <div className={`relative z-[1]`}>
        <div className="w-full relative">
          <img
            src={heroImage2}
            alt="Sendperplane dashboard on a laptop"
            className="w-full h-auto relative z-[5] rounded-2xl shadow-2xl"
          />
          <a
            href="https://spplane.app/register"
            target="_blank"
            rel="noreferrer"
            className="absolute z-[10] left-[4%] sm:left-[6%] top-[72%] xs:top-[74%] px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg bg-ngrokBlue font-poppins font-medium text-white text-[13px] sm:text-[18px] hover:opacity-90 transition-opacity shadow-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Business />
        <div className="w-full relative" id="product">
          <img
            src={secondHero}
            alt="Build your content, express your product"
            className="w-full h-auto relative z-[5] rounded-2xl shadow-2xl"
          />
          <a
            href="https://spplane.app/register"
            target="_blank"
            rel="noreferrer"
            className="absolute z-[10] right-[3%] sm:right-[4%] top-[68%] xs:top-[70%] px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg bg-ngrokBlue font-poppins font-medium text-white text-[13px] sm:text-[18px] hover:opacity-90 transition-opacity shadow-lg"
          >
            Try it out
          </a>
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="bg-primary min-h-screen w-full">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <Blog />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPageDetail />} />
      <Route path="/blogs/:slug" element={<BlogPageDetail />} />
    </Routes>
  );
};

const BlogPageDetail = () => (
  <div className="bg-primary min-h-screen w-full">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <BlogPost />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
