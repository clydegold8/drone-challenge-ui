export interface BillBoardData {
  id: string;
  x: number;
  y: number;
  photosTaken: number;
  advertiser: string;
  address: string;
  billboardText: string;
  image: string;
  isNew?: boolean;
}
export interface DroneData {
  success: boolean;
  instructions: string;
  billboards: BillBoardData[];
}
import { useState } from "react";

export const useSendInstruction = () => {
  const [droneData, setDroneData] = useState({} as DroneData);
  const [billBoardData, setBillBoardData] = useState([] as BillBoardData[]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({} as Error);

/**
 * @param instructionSet 
 * 
 * Im using javascript Native api fetch
 * though in a large applications we can use SWR or AXIOS to handle http calls to make it
 * more robust and simple. In our case we need to be lightweight and no need to use those libraries.
 * 
 */
  const fetchInstructions = async (instructionSet: string) => {

    billBoardData.forEach((data) => {
      data.isNew = false;
    })

    try {
        /**
         * this can be used on a .env file for the api domain set up (in real production app)
         * but for the sake of this test app we will use the localhost:4001
         */
      const response = await fetch(
        `http://localhost:4001/instruct-drone?instructions=${instructionSet}`
      );
      if (!response.ok) {
        setErrorMsg(new Error(`Response status: ${response.status}`));
        throw errorMsg;
      }
      setIsLoading(true);
      const json = await response.json();
      
      json.billboards.forEach((data: { isNew: boolean; }) => {
        data.isNew = true;
      })

      // this is to emulate latency
      setTimeout(() => {
        setDroneData(json);
        setBillBoardData([...json.billboards,...billBoardData])
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
    droneData,
    isLoading,
    errorMsg,
    billBoardData,
    fetchInstructions,
  };
};
