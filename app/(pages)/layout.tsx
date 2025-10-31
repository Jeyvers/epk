const PagesLayout = ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="min-h-screen relative overflow-hidden">
   {/* Scrollable background layer */}
   <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-neutral-800" />
    <div
     className="absolute inset-0 bg-sky-500 top-0"
     style={{
      clipPath: "polygon(0 0, 100% 0, 100% 3%, 65% 8%, 35% 8%, 0 3%)",
      //clipPath: polygon(0 0, 100% 0, 100% 13%, 65% 35%, 35% 35%, 0 15%);
     }}
    />
   </div>

   {/* Foreground content */}
   <div className="relative z-10">{children}</div>
  </div>
 );
};

export default PagesLayout;
