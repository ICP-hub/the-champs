/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ questions : Fake data : Replace by originals
/* ----------------------------------------------------------------------------------------------------- */
const questions = [
  {
    question: "What is Champs’ Digital Collectible Collection?",
    answer: (
      <>
        <p>
          Our new Digital Collectible Collection includes an exclusive picture
          of 20 Indonesian Football stars taken by renowned photographer Jerry
          Aurum.
        </p>
        {/* <p>
          These artworks are tokenized on the blockchain, allowing collectors to
          own unique digital assets.
        </p> */}
      </>
    ),
  },
  {
    question: "Who are the players in the Champs Season 2024?",
    answer: (
      <>
        {/* <p>
          Buying and investing in NFTs involves purchasing digital assets using
          cryptocurrency on NFT marketplaces.
        </p>
        <p>
          Investors can participate in auctions or directly purchase NFTs from
          creators or secondary markets.
        </p> */}
      </>
    ),
  },
  {
    question: "Why choose Champs’ Digital Collectible?",
    answer: (
      <>
        <p>
          Champs is pioneering the Digital Collectible space for football fans
          in Southeast Asia, making high-value collectibles accessible through
          fractional ownership. Deeply integrated with Indonesian football,
        </p>
        <p>
          It features top footballers and clubs, offering real-world benefits
          like meet-and-greets and signed merchandise. Additionally, a
          significant portion of proceeds supports the development of local
          football talent, aligning fans' passion with a meaningful cause.
        </p>
      </>
    ),
  },
  {
    question: "Will other collections be added in the future?",
    answer: (
      <>
        <p>
          Definitely. The 2024 collection is just a starting point for Champs
          and we have exciting upcoming projects on their way.
        </p>
        {/* <p>
          Popular marketplaces include OpenSea, Rarible, and Foundation, among
          others.
        </p> */}
      </>
    ),
  },
  {
    question: "How do I contact customer service?",
    answer: (
      <>
        <p>
          {/* Champ's token is built on a secure blockchain network, ensuring
          transparency and immutability. */}
          You can reach out to us by email at xxxx@gmail.com.
        </p>
        {/* <p>
          Smart contract audits and security measures are implemented to
          safeguard the token and protect investors' assets.
        </p> */}
      </>
    ),
  },
  // {
  //   question: "What is your contract address?",
  //   answer: (
  //     <>
  //       <p>
  //         The contract address for Champ's token is available on our official
  //         website and can be verified on blockchain explorers.
  //       </p>
  //       <p>
  //         Please refer to our documentation or contact support for further
  //         assistance.
  //       </p>
  //     </>
  //   ),
  // },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageI /> : FAQ section.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageI = () => {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center font-bold text-6xl max-[900px]:text-3xl">
        <h1>Your Questions,</h1>
        <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text">
          answered
        </span>
      </div>
      <QuestionBox />
    </div>
  );
};

const QuestionBox = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const handleAccordion = (index) => {
    setOpenIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  return (
    <div className="rounded-3xl py-6 px-12 lg:mx-48 border-2">
      {questions.map((item, index) => (
        <div
          key={index}
          className={`py-6 cursor-pointer ${
            index !== questions.length - 1 && "border-b-2"
          }`}
          onClick={() => handleAccordion(index)}
        >
          <div className="flex flex-col">
            <div className="flex justify-between pb-2">
              <h3 className="font-bold text-xl">{item.question}</h3>
              <span>
                {openIndices.includes(index) ? (
                  <MdArrowDropUp size={24} />
                ) : (
                  <MdArrowDropDown size={24} />
                )}
              </span>
            </div>
            <AnimatePresence>
              {openIndices.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[#7B7583] font-normal text-lg text-start"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageI;
