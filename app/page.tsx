"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import { SafeWrapper } from "./components/SafeWrapper";

const Hero = dynamic(() => import("./sections/Hero"), { ssr: false });
const NeuralNetworkZoom = dynamic(() => import("./sections/NeuralNetworkZoom"), { ssr: false });
const NeuralNetwork = dynamic(() => import("./sections/NeuralNetwork"), { ssr: false });
const SkillsMatrix = dynamic(() => import("./sections/SkillsMatrix"), { ssr: false });
const ProjectSolarSystem = dynamic(() => import("./sections/ProjectSolarSystem"), { ssr: false });
const ExperienceTimeline = dynamic(() => import("./sections/ExperienceTimeline"), { ssr: false });
const EducationSection = dynamic(() => import("./sections/EducationSection"), { ssr: false });
const AboutNik = dynamic(() => import("./sections/AboutNik"), { ssr: false });
const ContactPortal = dynamic(() => import("./sections/ContactPortal"), { ssr: false });
const AchievementsSection = dynamic(() => import("./sections/AchievementsSection"), { ssr: false });
const CertificationsSection = dynamic(() => import("./sections/CertificationsSection"), { ssr: false });

import BootSequence from "./components/BootSequence";
import EasterEggs from "./components/EasterEggs";
import NikAIAssistant from "./components/NikAIAssistant";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>
      
      {booted && (
        <main className="relative bg-black min-h-screen">
          <SafeWrapper name="Hero_Core">
            <Hero />
          </SafeWrapper>

          <SafeWrapper name="Neural_Transition">
            <NeuralNetworkZoom />
          </SafeWrapper>

          <SafeWrapper name="Graph_Visual">
            <NeuralNetwork />
          </SafeWrapper>

          <SafeWrapper name="Skill_Network">
            <SkillsMatrix />
          </SafeWrapper>

          <SafeWrapper name="Deployment_Archives">
            <ProjectSolarSystem />
          </SafeWrapper>

          <SafeWrapper name="Achievement_Log">
            <AchievementsSection />
          </SafeWrapper>

          <SafeWrapper name="Certification_Ledger">
            <CertificationsSection />
          </SafeWrapper>

          <SafeWrapper name="Experience_Timeline">
            <ExperienceTimeline />
          </SafeWrapper>

          <SafeWrapper name="Academic_Foundation">
            <EducationSection />
          </SafeWrapper>

          <SafeWrapper name="Identity_Module">
            <AboutNik />
          </SafeWrapper>

          <SafeWrapper name="Communication_Node">
            <ContactPortal />
          </SafeWrapper>

          <EasterEggs />
          <ErrorBoundary>
            <NikAIAssistant />
          </ErrorBoundary>
        </main>
      )}
    </>
  );
}
