const PagesLayout = ({ children }: { children: React.ReactNode }) => {
 return (
  <div className="min-h-screen relative overflow-hidden">
   {/* Scrollable background layer */}
   <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-neutral-800" />
    <div
     className="absolute inset-0 bg-sky-500"
     style={{
      clipPath: "ellipse(60% 7.5% at 50% 0%)",
      //   ellipse(25% 40% at 50% 50%)
     }}
    />
   </div>

   {/* Foreground content */}
   <div className="relative z-10">{children}</div>
  </div>
 );
};

export default PagesLayout;
