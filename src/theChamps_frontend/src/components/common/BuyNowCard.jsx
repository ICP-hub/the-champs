import React from "react";
import { RadioGroup } from "@headlessui/react";
import IcpLogo from "../../assets/IcpLogo";
import placeholderimg from "../../assets/CHAMPS.png";

const BuyNowModal = ({
  isOpen,
  onClose,
  nft,
  plans,
  selected,
  handleConfirm,
  handler,
  exchange,
}) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
        <div className="md:w-[28%] w-[75%] rounded-xl bg-white p-8 pt-4 pb-4">
          <p className="text-center font-bold text-sm">
            You are about to make a purchase!
          </p>
          <div className="flex items-center justify-center mt-4">
            <img
              src={
                nft[0][0]?.fractional_token?.logo
                  ? nft[0][0]?.fractional_token?.logo
                  : placeholderimg
              }
              alt=""
              className="w-1/2 md:h-40 h-20 rounded-lg shadow-md"
            />
          </div>
          <p className="text-center text-gray-400 mt-4 text-sm">
            You are about to purchase this NFT from your connected wallet.
          </p>
          <div className="border-[1px] mt-2 mb-4 border-gray-200 w-full"></div>
          <RadioGroup value={selected} onChange={(plan) => selected(plan)}>
            <RadioGroup.Label className="text-black xl:text-sm text-xs font-semibold uppercase tracking-wider w-full">
              Payment Method
            </RadioGroup.Label>
            <div className="grid xl:grid-cols-2 grid-cols-2 gap-4 pt-2 max-sm:flex max-sm:flex-col font-medium">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.name}
                  value={plan}
                  className={({ active, checked }) =>
                    `border-2 p-3 rounded-xl text-sm uppercase ${
                      active ? "button text-white border-none" : "bg-white"
                    }`
                  }
                >
                  {({ active, checked }) => (
                    <RadioGroup.Label className="flex justify-between w-full ml-2 items-center">
                      <p>{plan.name}</p>
                      {active && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-6 w-6"
                        >
                          <circle
                            cx={12}
                            cy={12}
                            r={12}
                            fill="#fff"
                            opacity="0.2"
                          />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="flex items-center justify-between font-bold text-sm mt-4">
            <p>TOTAL:</p>
            <p className="flex items-center gap-1">
              <IcpLogo size={16} />
              {nft[0][0]?.nft?.priceinusd?.toFixed(4) / exchange}
              <span className="text-XS text-gray-500">
                ({nft[0][0]?.nft?.priceinusd?.toFixed(4)} USD){" "}
              </span>
            </p>
          </div>
          <div className="mt-2 md:block hidden text-center text-gray-400 text-xs">
            This process may take a minute. Transactions can not be reversed. By
            clicking confirm you show acceptance to our{" "}
            <span className="text-[#FC001E] underline"> Terms and Service</span>
            .
          </div>
          <div className="flex items-center justify-end mt-4 text-md text-white font-medium">
            <button
              className="mr-4 button button bg-opacity-100 text-white rounded-md px-5 py-2 text-md flex items-center justify-center"
              onClick={handler}
            >
              Cancel
            </button>
            <button
              className="button button bg-opacity-100 text-white rounded-md px-5 py-2 text-md flex items-center justify-center"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BuyNowModal;
