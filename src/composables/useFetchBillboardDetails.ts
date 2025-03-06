
import { useState } from "react";
import { BillBoardData } from "./useSendInstruction";

export interface BillboardDetails {
    success: boolean;
    billboard: BillBoardData;
  }

export const useFetchBillboardDetails = () => {
  const [billboardDetails, setBillboardDetails] = useState({} as BillboardDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({} as Error);

/**
 * @param id 
 * 
 * Im using javascript Native api fetch
 * though in a large applications we can use SWR or AXIOS to handle http calls to make it
 * more robust and simple. In our case we need to be lightweight and no need to use those libraries.
 * 
 */
  const fetchBillboardDetails = async (id: string) => {

    try {
        /**
         * this can be used on a .env file for the api domain set up (in real production app)
         * but for the sake of this test app we will use the localhost:4001
         */
      const response = await fetch(
        `http://localhost:4001/get-billboard?id=${id}`
      );
      if (!response.ok) {
        setErrorMsg(new Error(`Response status: ${response.status}`));
        throw errorMsg;
      }
      setIsLoading(true);
      const json = await response.json();

      // this is to emulate latency
      setTimeout(() => {
        setBillboardDetails(json);
      }, 2000);
      
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(new Error(error.message));
      } else {
        console.error(error);
      }
    } finally {
    // this is to emulate latency
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return {
    billboardDetails,
    isLoading,
    errorMsg,
    fetchBillboardDetails
  };
};
