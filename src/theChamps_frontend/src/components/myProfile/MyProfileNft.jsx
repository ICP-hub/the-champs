import { useEffect, useState } from "react";
import CommonModal from "../common/CommonModal";
import { RiErrorWarningFill } from "react-icons/ri";

const MyProfileNFT = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <button className="p-4 border" onClick={toggleModal}>
        open modal
      </button>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <CommonModal
              toggleModal={toggleModal}
              title="Transfer NFT"
              message="Please enter the address or Principal you want to send the NFT to"
              warningText="Beware, not all wallets support all tokens"
              inputPlaceholder="Address or Principal of receiver"
              confirmText="Transfer"
              cancelText="Back"
            />
          </div>
        </>
      )}
    </>
  );
};

export default MyProfileNFT;
