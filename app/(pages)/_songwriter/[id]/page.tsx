"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SingleLyrics = () => {
 const router = useRouter();

 return (
  <div className="flex flex-col items-center px-4 my-16 max-w-xl mx-auto text-center text-gray-100">
   <button
    className="fixed left-8 top-6 opacity-80"
    onClick={() => router.back()}
   >
    <ArrowLeft />
   </button>
   <Image
    src="/images/memories.jpg"
    alt="Treasures and Palettes of Gold"
    className="rounded-full object-cover h-[60px] w-[60px] mb-4"
    width={100}
    height={100}
   />
   {/* Title */}
   <p className="text-center mx-auto font-zalando font-semibold leading-5 mb-20">
    Treasures
    <br /> &
    <br />
    Palettes of Gold
   </p>

   <div className="space-y-10 text-sm leading-relaxed font-open-sans text-gray-100 mt-3">
    {/* Verse 1 */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold mb-2 tracking-wide">
      Verse 1
     </h3>
     <p>
      I put your memory on repeat{" "}
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuuuu)
      </span>
      I discerned what we needed{" "}
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuu, uuu)
      </span>
      I never wanted to deceive
      <br />
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuuuuu)
      </span>
      Bleeding off from pieces
      <br />
     </p>
    </section>

    {/* Chorus */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold mb-2 tracking-wide">
      Chorus
     </h3>
     <p>
      Treasures and palette of gold
      <br />
      My tongue is thirsting
      <br />
      Hold doors but we have to let go{" "}
      <span className="block text-red-300 italic py-6">
       <small className="block text-[0.65rem] uppercase text-red-300">
        You
       </small>
       (Giving a little candor to you)
      </span>
      Rhythm, rhythm and you
      <br />
      What I wanna hear oh
      <br />
      Treasures and palette of gold
     </p>
    </section>

    {/* Interlude */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold tracking-wide">
      Interlude humming
     </h3>
     <p>
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuuuuuu)
       <br />
       (Ahh ahhh) <br /> (Ahh ah ahhh) <br /> (Ahh ahhh) <br /> (Uuuu)
      </span>
     </p>
    </section>

    {/* Verse 2 */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold mb-2 tracking-wide">
      Verse 2
     </h3>
     <p>
      Burn to ashes
      <br />
      And form again
      <br />
      We turn to matches{" "}
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuuuu)
      </span>
      Lights out, lights, we had grit, but now
      <br />
      Turn the lights on lights
      <br />
      <br />
      We were never gonna work out
     </p>
    </section>

    {/* Chorus */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold mb-2 tracking-wide">
      Chorus
     </h3>
     <p>
      Treasures and palette of gold
      <br />
      My tongue was thirsting
      <br />
      Held doors, but we had to let go{" "}
      <span className="block text-red-300 italic py-6">
       <small className="block text-[0.65rem] uppercase text-red-300">
        You
       </small>
       (Gave a little candor to you)
      </span>
      Rhythm, rhythm, and blues
      <br />
      What I wanna hear now
      <br />
      Treasures and palette to go
     </p>
    </section>

    {/* Interlude repeat */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold tracking-wide">
      Repeat Interlude humming
     </h3>
     <p>
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Uuuuuuu)
       <br />
       (Ahh ahhh) <br /> (Ahh ah ahhh) <br /> (Ahh ahhh) <br /> (Uuuu)
      </span>
     </p>
    </section>

    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-red-300 uppercase text-xs font-semibold tracking-wide">
      AGAIN, SHALL WE?
     </h3>
     <p>
      <span className="block text-sky-400 italic py-6">
       <small className="block text-[0.65rem] uppercase text-sky-300">
        You
       </small>
       (Ahh ahhh) <br /> (Ahh ah ahhh) <br /> (Ahh ahhh) <br /> (Uuuu)
      </span>
     </p>
     <p>
      <span className="block text-sky-400 italic py-6">
       (Ahh ahhh) <br /> (Ahh ah ahhh) <br /> (Ahh ahhh) <br /> (Uuuu)
      </span>
     </p>
    </section>

    <section className="bg-neutral-600/20 p-6 rounded font-zalando">
     Don't worry, drums and nice things
    </section>

    {/* Outro */}
    <section className="bg-neutral-600/20 p-6 rounded">
     <h3 className="font-zalando text-sky-300 uppercase text-xs font-semibold mb-2 tracking-wide">
      Outro
     </h3>
     <p className="space-y-1">
      Treasures and palette of gold
      <br />
      My tongue still thirsting
      <br />
      Held doors, but we have to let go
      <br />
      Rhythm, you, rhythm, and blues
      <br />
      What I wanna hear oh
      <br />
      Treasures and palette oh no
     </p>
    </section>
   </div>
  </div>
 );
};

export default SingleLyrics;
