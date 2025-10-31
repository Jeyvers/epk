import Summary from "./(pages)/_summary/page";

export default function Home() {
 //  const hasPromotionBanner = true;

 return (
  <>
   {/* <div className="fixed top-0 w-full bg-purple-600 z-50 text-center text-3xl py-4 md:py-0 md:text-[40px] font-lovers-quarrel">
    <Link
     href="/songwriter/treasures-and-palettes-of-gold"
     className="relative w-fit mx-auto animate-in"
    >
     <span>rock the city live with me</span>
     <span className="absolute left-0">rock the city live with me</span>
     <span className="absolute left-0">rock the city live with me</span>
     <span className="absolute left-0">rock the city live with me</span>
     <div className="bg-white/30 h-[0.5px] absolute top-7 w-full left-0" />
    </Link>
   </div>
   {hasPromotionBanner && <div className="h-10 md:h-12" />} */}

   <Summary />
  </>
 );
}
