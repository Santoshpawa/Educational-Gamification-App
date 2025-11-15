import algo from "../assets/algorithms.webp";

function About() {
  const fadeColor = "transparent";
  return (
    <>
      <div
        className="relative flex flex-col justify-center items-center h-[600px] p-8" // Increased height and added p-8
        style={{
          // Apply a complex background property that layers the linear gradient over the image
          backgroundImage: `
            linear-gradient(to bottom, ${fadeColor} 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, ${fadeColor} 100%), 
            url(${algo})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-2xl font-bold mt-6 text-white">Cheat-Code</div>
        <div className="mt-4 w-2xl text-justify text-white">
          Welcome to <span className="font-semibold">Cheat-Code !</span> We
          transform Data Structures and Algorithms (DSA) practice into an
          exciting adventure. Our platform is designed to help you master
          essential DSA concepts through a curated library of challenging
          problems. Solve problems, submit correct solutions, and immediately
          earn scores and unique badges that showcase your expertise. Track your
          progress, compete with peers, and climb the leaderboards. Whether
          you're a beginner or prepping for tech interviews, Cheat-Code makes
          learning DSA engaging, rewarding, and fun.{" "}
          <span className="font-semibold">Start coding, start earning!</span>
        </div>
      </div>
    </>
  );
}

export default About;
