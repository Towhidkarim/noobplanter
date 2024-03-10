import About from '@/components/LandingPage/About/About';
import Hero from '@/components/LandingPage/Hero/Hero';
import Services from '@/components/LandingPage/OurServices/Services';
import Products from '@/components/LandingPage/Products/Products';
import Navbar from '@/components/Navbar/Navbar';
import PageFade from '@/components/framer-motion/PageFade';
import Image from 'next/image';

export default function Home() {
  return (
    <PageFade className='flex min-h-screen flex-col items-center'>
      <Navbar />
      <Hero />
      <br />
      <Services />
      <Products />
      {/* <About /> */}
    </PageFade>
  );
}
