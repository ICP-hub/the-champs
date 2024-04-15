/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */

import FancyHeader from "../common/FancyHeader";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageG /> : Champ's roadmap
/* ----------------------------------------------------------------------------------------------------- */
const HomePageG = () => {
  /* ----------------------------------------------------------------------------------------------------- */
  /*  @ phases : Fake data : Replace by originals
/* ----------------------------------------------------------------------------------------------------- */
  const phases = [
    {
      title: "Phase 01",
      progress: "0%",
      heading: "Planning",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      title: "Phase 02",
      progress: "25%",
      heading: "Production",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      title: "Phase 03",
      progress: "50%",
      heading: "Launch",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      title: "Phase 04",
      progress: "75%",
      heading: "Minting",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      title: "Phase 05",
      progress: "95%",
      heading: "New NFTs",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
    {
      title: "Phase 06",
      progress: "100%",
      heading: "Metaverse",
      description:
        "Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.",
      points: [
        "Release website and logo",
        "Grow community",
        "Launch the project",
      ],
    },
  ];

  return (
    <div className="md:p-24 max-md:p-6">
      <FancyHeader normal="Champ's" fancy="Roadmap" />
      <div className="py-12">
        <div className="grid lg:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-4">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 border-2 flex gap-8 flex-col"
            >
              <div className="flex justify-between items-center">
                <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text font-bold">
                  {phase.title}
                </span>
                <div className="rounded-full bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] p-2 text-white font-bold rotate-12 relative h-12 w-12 flex items-center justify-center">
                  <span className="absolute">{phase.progress}</span>
                </div>
              </div>
              <h1 className="font-bold text-3xl max-[900px]:text-2xl">
                {phase.heading}
              </h1>
              <h3 className="text-[#7B7583] font-medium text-lg">
                {phase.description}
              </h3>
              <span className="w-20 border-2"></span>
              <div className="flex flex-col gap-2">
                {phase.points.map((point, i) => (
                  <p key={i} className="cursor-pointer font-medium">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageG;
