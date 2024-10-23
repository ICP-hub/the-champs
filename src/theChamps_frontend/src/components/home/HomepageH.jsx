/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import anim4 from "../../assets/images/anim-4.png";
import anim5 from "../../assets/images/anim-5.png";
import anim6 from "../../assets/images/anim-6.png";
import anim7 from "../../assets/images/anim-7.png";
import { IoLogoGithub, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
// import { FaDiscord } from "react-icons/fa";
import FancyHeader from "../common/FancyHeader";
import { motion } from "framer-motion";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ artistData : Fake data : Replace by originals
/* ----------------------------------------------------------------------------------------------------- */
const artistData = [
  {
    name: "Jerry Aurum",
    role: "Artist",
    image: anim4,
    socials: [
      { icon: <IoLogoTwitter size={16} />, link: "#" },
      {
        icon: <IoLogoLinkedin size={16} />,
        link: "https://www.linkedin.com/in/jerryaurum/?originalSubdomain=id",
      },
      {
        icon: <IoLogoInstagram size={16} />,
        link: "https://www.instagram.com/jerryaurum/",
      },
    ],
  },
  {
    name: "Grace Sabandar",
    role: "Founder",
    image: anim5,
    socials: [
      {
        icon: <IoLogoTwitter size={16} />,
        link: "https://x.com/GraceSabandar?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
      },
      {
        icon: <IoLogoLinkedin size={16} />,
        link: "https://www.linkedin.com/in/gracesabandar/",
      },
      {
        icon: <IoLogoInstagram size={16} />,
        link: "https://www.instagram.com/gracesabandar/",
      },
    ],
  },
  {
    name: "Vinayak kalra",
    role: "Developer",
    image: anim6,
    socials: [
      {
        icon: <IoLogoTwitter size={16} />,
        link: "https://x.com/vinayakkalra2",
      },
      {
        icon: <IoLogoLinkedin size={16} />,
        link: "https://www.linkedin.com/in/vinayak-kalra-b40910105?originalSubdomain=in",
      },
      {
        icon: <IoLogoGithub size={16} />,
        link: "https://github.com/vinayakkalra",
      },
    ],
  },
  {
    name: "Bruno Calabretta",
    role: "Advisor",
    image: anim7,
    socials: [
      {
        icon: <IoLogoTwitter size={16} />,
        link: "https://x.com/CalabrettaBruno",
      },
      {
        icon: <IoLogoLinkedin size={16} />,
        link: "https://www.linkedin.com/in/bruno-calabretta?trk=feed_main-feed-card_feed-reaction-header ",
      },
      {
        icon: <IoLogoInstagram size={16} />,
        link: "https://www.instagram.com/browncal88/",
      },
    ],
  },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageH /> : Artists section.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageH = () => {
  return (
    <div className="p-6 md:p-8">
      <FancyHeader normal="Meet" fancy="the team" />
      <Artists />
    </div>
  );
};

const Artists = () => {
  return (
    <div className="grid grid-cols-4 py-6 gap-x-4 gap-y-4 max-[900px]:grid-cols-2">
      {artistData.map((artist, index) => (
        <motion.div
          whileHover={index % 2 === 0 ? { y: -40 } : { y: 40 }}
          transition={index % 2 === 0 ? null : { delay: 0.5 }}
          key={index}
          className={`flex flex-col gap-4 justify-center items-center ${
            index % 2 === 0 ? "min-[900px]:mt-20 " : ""
          }`}
        >
          <img
            src={artist.image}
            alt={`anim-${index + 4}`}
            className="h-40 w-40 rounded-2xl p-2 border-2"
          />
          <div className="flex flex-col gap-2 items-center justify-center">
            <h3 className="font-bold text-md md:text-xl">{artist.name}</h3>
            <p className="text-[#7B7583]">{artist.role}</p>
          </div>
          <span className="flex items-center gap-4">
            {artist.socials.map((social, i) => (
              <Link
                to={`${social.link}`}
                target="_blank"
                key={i}
                href={social.link}
                className="cursor-pointer"
              >
                {social.icon}
              </Link>
            ))}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default HomePageH;
