"use client"

import { About } from "./about";
import { Contact } from "./contact";
import { Features } from "./features";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";


export function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header/>
      <Hero/>
      <Features/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  );
}