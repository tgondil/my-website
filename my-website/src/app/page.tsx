import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col bg-[url('/calvin.jpg')] bg-cover w-full bg-center bg-fixed min-h-screen ">
      <div className=" flex justify-end gap-12 text-xl animate-intro-unhide font-semibold pt-8 w-full pb-16">
        <h1 className=" gradient text-zanah font-roboto">
        {"<"}home{">"}
        </h1>
        <h1 className="text-zanah font-roboto">
        {"<"}projects{">"}
        </h1>
        <h1 className=" mr-10 text-zanah font-roboto">
        {"<"}contact{">"}
        </h1>
      </div>
<div className="flex flex-grow flex-col items-center animate-slide-right ">
<h1 className="text-1.1e animate-slide-right tracking-wide text-zanah leading-hero font-invis">
        Hey, my name is
      </h1>
      <h1 className="text-1.2e gradient tracking-wide text-zanah leading-hero font-invis">
        Tanay Gondil
      </h1>
</div>
      
    </main>
  );
}
