const releases = [
 "https://open.spotify.com/embed/track/28BhTl4IRcvp4Zh2Afmogj?utm_source=generator",
 "https://open.spotify.com/embed/track/3isz5SZatzmx6Qv3axRARF?utm_source=generator&theme=0",
 "https://open.spotify.com/embed/track/5esxX8xka0sJ4D5U5gX2YO?utm_source=generator&theme=0",
 "https://open.spotify.com/embed/track/6IM4OkAeAdnlJgz6NJt9US?utm_source=generator",
];
const Releases = () => {
 return (
  <div className="max-w-md md:max-w-4xl my-28 lg:my-32 mx-auto px-6 md:px-0">
   <h1 className="text-3xl font-bold text-white mb-6 text-center">
    My Releases
   </h1>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {releases.map((release) => (
     <iframe
      key={release}
      data-testid="embed-iframe"
      style={{ borderRadius: "12px", width: "100%" }}
      src={release}
      height={352}
      frameBorder={0}
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
     />
    ))}
   </div>
  </div>
 );
};

export default Releases;
