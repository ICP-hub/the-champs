import FancyHeader from "../common/FancyHeader";
import { motion } from "framer-motion";

const AboutPageContainerMain = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-28 md:p-24 p-6 grid md:grid-cols-2"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="flex justify-start">
            <FancyHeader fancy="About Us" />
          </span>
          <h1 className="max-md:text-3xl text-5xl font-bold">
            Leading the Way in an Open Digital Economy at Champs
          </h1>
        </div>
        <p className="font-medium">
          At Champs, we're at the forefront of the evolving digital landscape,
          pioneering the integration of non-fungible tokens (NFTs) with Internet
          Computer Protocol (ICP). NFTs are unique, provably scarce, tradable,
          and usable across multiple platforms, combining the tangibility of
          physical goods with the versatility and programmability of digital
          items. Driven by our commitment to innovation, Champs leverages ICP to
          enhance our platform's performance and decentralization. This
          cutting-edge technology allows us to offer unparalleled security,
          speed, and scalability, ensuring a seamless and efficient marketplace
          for digital assets. Our platform is built on the foundation of open
          protocols like Ethereum, alongside interoperable standards such as
          ERC-721 and ERC-1155, which enable us to support a vibrant and diverse
          digital economy. At Champs, consumers can freely trade their items,
          creators can launch revolutionary digital works, and developers have
          the tools they need to create integrated marketplaces. As the first
          and largest NFT marketplace utilizing ICP, Champs is not just
          participating in the digital economy—we are shaping its future. Join
          us as we explore the expansive potential of NFTs and build a truly
          open, innovative digital economy together.
        </p>
      </div>
      <div className="max-md:order-first">image</div>
    </motion.div>
  );
};

export default AboutPageContainerMain;
