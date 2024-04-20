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
    question: "What is Champ's NFT Collection?",
    answer: (
      <>
        <p>
          Champ's NFT Collection is a curated set of digital artworks created by
          talented artists.
        </p>
        <p>
          These artworks are tokenized on the blockchain, allowing collectors to
          own unique digital assets.
        </p>
      </>
    ),
  },
  {
    question: "How can we buy and invest in NFTs?",
    answer: (
      <>
        <p>
          Buying and investing in NFTs involves purchasing digital assets using
          cryptocurrency on NFT marketplaces.
        </p>
        <p>
          Investors can participate in auctions or directly purchase NFTs from
          creators or secondary markets.
        </p>
      </>
    ),
  },
  {
    question: "Why should we choose Champ's NFT?",
    answer: (
      <>
        <p>
          Champ's NFT offers a unique collection of high-quality artworks
          created by renowned artists.
        </p>
        <p>
          Each NFT is securely stored on the blockchain, ensuring authenticity
          and provenance.
        </p>
      </>
    ),
  },
  {
    question: "Where can we buy and sell NFTs?",
    answer: (
      <>
        <p>
          NFTs can be bought and sold on various online marketplaces and
          platforms dedicated to digital art and collectibles.
        </p>
        <p>
          Popular marketplaces include OpenSea, Rarible, and Foundation, among
          others.
        </p>
      </>
    ),
  },
  {
    question: "How secure is Champ's token?",
    answer: (
      <>
        <p>
          Champ's token is built on a secure blockchain network, ensuring
          transparency and immutability.
        </p>
        <p>
          Smart contract audits and security measures are implemented to
          safeguard the token and protect investors' assets.
        </p>
      </>
    ),
  },
  {
    question: "What is your contract address?",
    answer: (
      <>
        <p>
          The contract address for Champ's token is available on our official
          website and can be verified on blockchain explorers.
        </p>
        <p>
          Please refer to our documentation or contact support for further
          assistance.
        </p>
      </>
    ),
  },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageI /> : FAQ section.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageI = () => {
  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
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
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">{item.question}</h3>
            <span>
              {openIndex === index ? (
                <MdArrowDropUp size={24} />
              ) : (
                <MdArrowDropDown size={24} />
              )}
            </span>
          </div>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ maxHeight: 0 }}
                animate={{ maxHeight: 200 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#7B7583] font-normal text-lg"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default HomePageI;
