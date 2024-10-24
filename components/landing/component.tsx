"use client"

import { About } from "./about";
import { Contact } from "./contact";
import { Features } from "./features";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";


export function Component() {
  return (
    <main className="flex flex-col w-full h-full items-center gap-8 p-24 max-md:p-6">
      <Header/>
      <Hero/>
      <Features/>
      <About/>
      <Contact/>
      <Footer/>
    </main>
  );
}