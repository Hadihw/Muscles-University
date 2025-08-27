'use client'

import NavigationBar from '@/components/PreAuth/NavigationBar'
import SlideInOnViewAnimation from '@/components/Animations/SlideInOnViewAnimation'
import FadeInOnViewAnimation from '@/components/Animations/FadeInOnViewAnimation'
import ShineOnViewAnimation from '@/components/Animations/ShineOnViewAnimation'
import { FaDumbbell } from 'react-icons/fa'
import Link from 'next/link'

const MainContent = () => {
  return (
    <SlideInOnViewAnimation>
      <div className="flex flex-1 items-center justify-center md:justify-start pl-4 md:pl-20 text-white">
        <div className="max-w-lg w-full text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-axiom mb-4">Muscles University</h1>
          <p className="mb-8">Unleash your inner Titan.</p>
          <Link href="/preauth/register" className="btn-light">Get Started</Link>
        </div>
      </div>
    </SlideInOnViewAnimation>
  )
}

const Benefit = ({ icon, title, description }: { icon?: React.ReactNode; title: string; description: string }) => {
  return (
    <div className={`flex items-center text-white mb-8`}>
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-light flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-bold font-axiom text-light uppercase">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

const Benefits = () => {
  return (
    <section className="bg-black">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center py-32 md:py-32">
        <div className="w-full lg:w-2/5">
          <SlideInOnViewAnimation direction="left">
            <h2 className="text-3xl mb-8 text-light font-axiom">Why Muscles University?</h2>
            <Benefit title="Stronger" description="Personalized plans to help you grow stronger." icon={<FaDumbbell className="text-3xl text-white" />} />
            <Benefit title="Faster" description="Improve your speed with expert-guided routines." />
            <Benefit title="Smoother" description="Form coaching for smoother, safer movements." />
            <Benefit title="More Durable" description="Build resilience and avoid injury." />
          </SlideInOnViewAnimation>
        </div>
        <div className="lg:w-1/3 lg:ml-20 flex justify-center lg:justify-end relative">
          <FadeInOnViewAnimation>
            <img src="/assets/images/flexingImg1.png" alt="Person" className="w-full h-auto object-cover" />
          </FadeInOnViewAnimation>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-0 right-0 bottom-0 w-10 h-full bg-gradient-to-l from-black to-transparent"></div>
          <div className="absolute top-0 left-0 bottom-0 w-10 h-full bg-gradient-to-r from-black to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

const CallToAction = () => {
  return (
    <div className="flex flex-wrap bg-black justify-center items-center w-full py-20 md:py-20">
      {['onlineCoachingCTA.png', 'fitnessConsultationCTA.png'].map((image, index) => (
        <div key={index} className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:last:justify-start">
          <div className="w-full lg:max-w-2xl relative m-5">
            <ShineOnViewAnimation>
              <img src={`/assets/images/${image}`} alt="Call to Action" className="w-full h-auto cursor-pointer" />
            </ShineOnViewAnimation>
            <div className="absolute inset-0 bg-light bg-opacity-0 hover:bg-opacity-10 cursor-pointer"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-t from-transparent to-black" />
            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent"></div>
            <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Background = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-landingPageBackground bg-no-repeat bg-cover bg-center" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in-0.5">
      <div className="relative h-screen flex flex-col">
        <Background />
        <NavigationBar />
        <div className="flex-1 flex items-center z-10">
          <MainContent />
        </div>
      </div>
      <Benefits />
      <CallToAction />
    </div>
  )
}


