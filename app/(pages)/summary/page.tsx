import {
 Avatar,
 AvatarFallback,
 AvatarImage,
} from "@/app/components/ui/avatar";
import { links, socialLinks } from "@/lib/links";
import { ArrowRight, MailIcon } from "lucide-react";
import Image from "next/image";

export default function Summary() {
 return (
  <div>
   <div className="relative w-full max-w-md lg:max-w-4xl my-48 mx-auto">
    <Avatar className="size-48 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
     <AvatarImage src="/images/pic.jpg" className="object-cover" alt="Jeyi" />
     <AvatarFallback>J</AvatarFallback>
    </Avatar>
    {/* Profile Section */}
    <div className="text-center p-8 bg-[#353535] pt-32 mx-auto">
     {/* Name */}
     <h1 className="text-2xl font-bold text-white mb-2">Jeyi</h1>

     {/* Bio */}
     <p className="text-gray-300 text-sm mb-2">Hi, I'm glad you found me :)</p>
     <p className="text-gray-300 text-sm mb-4">
      I'm Jeyi—an artist: songwriter, singer, and rapper.
     </p>

     <div className="max-w-fit mx-auto">
      <a
       href="mailto:meetjeyi@gmail.com"
       className="flex gap-2 bg-gray-70 items-center mx-auto py-1 px-3 border border-neutral-600 hover:border-neutral-50 hover:rounded transition-all duration-300"
      >
       <MailIcon size={16} />
       <span>Email</span>
      </a>
     </div>
    </div>

    {/* Social Icons */}
    <div className="flex justify-center pb-6 gap-3 flex-wrap bg-[#353535]">
     {socialLinks.map(({ name, icon, href }) => (
      <a
       key={name}
       href={href}
       target="_blank"
       rel="noopener noreferrer"
       className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-black/20 hover:opacity-80 transition-opacity"
       title={name}
      >
       <Image
        width={42}
        height={42}
        src={`/images/social-media-icons/${icon}.svg`}
        alt={`${name} icon`}
       />
      </a>
     ))}
    </div>

    <div>
     {/* Separator Line */}
     <div className="w-full h-0.5 bg-sky-500/30 mb-6"></div>
    </div>

    {/* Links Section */}
    <div className="px-2 grid grid-cols-2 gap-6">
     {links.map(({ name, href, icon, label, linkText }) => (
      <a
       key={name}
       href={href}
       target="_blank"
       rel="noopener noreferrer"
       className="relative group shadow shadow-accent flex items-center"
      >
       <Image
        width={60}
        height={60}
        src={`/images/social-media-icons/big/${icon}.svg`}
        alt={`${name} icon`}
        className="z-10 rounded-xs absolute mr-4 -left-3 object-cover group-hover:-translate-y-1 transition"
       />
       <div className="overflow-hidden flex items-center bg-[#353535] py-4 pr-6 pl-16 flex-1">
        <div
         className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30"
         style={{
          backgroundImage: `url(/images/social-media-icons/${icon}.svg)`,
         }}
        ></div>

        <div className="flex-1">
         <div className="text-white font-semibold">{label}</div>
         <div className="text-neutral-400 text-xs truncate mt-0.5">
          {linkText}
         </div>
        </div>

        <ArrowRight
         size={16}
         className="text-neutral-400 text-lg group-hover:translate-x-1 transition"
        />
       </div>
      </a>
     ))}
    </div>
   </div>
  </div>
 );
}
