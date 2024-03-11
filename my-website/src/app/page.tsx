import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-[url('/calvin.jpg')] bg-cover bg-center bg-fixed min-h-screen p-24">
      <h1 className="text-1.1e tracking-wide text-zanah leading-hero w-1/2 ml-20p font-invis">
        Hi, my name is <span className="text-1.2e text-black animate-text bg-gradient-to-r from-my-pink via-my-blue to-my-pink bg-clip-text text-transparent">Tanay Gondil</span> 
      </h1>
      <div className="text-2.3v tracking-wide mr-20p leading-extra-loose text-zanah w-1/2 font-nexa">

      <h1 >
      When I initially made the decision to attend college in the US, I was uncertain about which major to pursue. Eventually, I chose to explore Computer Science, and as time passed, my passion for the subject grew immensely. During my freshman year, I took part in my first hackathon, and even though I had limited coding experience, my team and I secured the 2nd position. With the burst of motivation I got through placing at this hackathon, I decided to explore the subject beyond the bounds of the syllabus.
      </h1>
      <h1 className="pt-10">
      Looking ahead to the present day, I am an aspiring full-stack developer and currently a sophomore at Purdue University, dedicated to obtaining a degree in Computer Science. In my free time, I love to read, code, hit the gym, and watch the UFC.
      </h1>
      </div>
    </main>
  );
}
