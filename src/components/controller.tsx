import { useEffect, useState } from 'react'
import { useSendInstruction } from "../composables/useSendInstruction";
import ControllerPadSection, { Instructions } from "./controller-pad";
import ControllerDetailsSection from "./controller-details";
import DroneFlightResultsTable from "./drone-flight-result-table";
import BillboardDetailModal from './detail-modal';
import { useFetchBillboardDetails } from '../composables/useFetchBillboardDetails';

export type InstructionsSetData = {
    instruction: string;
    direction: string;
};

export default function ControllerPage() {

    const [instructionsSet, setInstructionsSet] = useState([] as InstructionsSetData[]);
    const [showInstructOne, setShowInstructOne] = useState(false);
    const [showInstructTwo, setShowInstructTwo] = useState(false);
    const [showInstructThree, setShowInstructThree] = useState(false);

    const {
        fetchInstructions,
        isLoading: isLoadingInstructions,
        droneData,
        billBoardData
    } = useSendInstruction()

    const {fetchBillboardDetails, billboardDetails, isLoading: isLoadingBillboardDetails} = useFetchBillboardDetails()

    const onClickDirectionsPad = (instructionsSetData: Instructions) => {
        setInstructionsSet([...instructionsSet, { instruction: instructionsSetData.instructions, direction: instructionsSetData.direction }])
    }

    const OnSendInstructions = () => {
        let instructionStr = '';
        instructionsSet.forEach((data) => {
            instructionStr = instructionStr.concat(data.instruction);
        })
        fetchInstructions(instructionStr);
        setShowInstructOne(true);
    }

    useEffect(() => {
        setShowInstructTwo(!isLoadingInstructions && droneData?.billboards?.length > 0);
        if (!isLoadingInstructions && droneData?.billboards?.length > 0) {
            setShowInstructThree(true);
            setTimeout(() => {
                onResetStates()
            }, 2000);
        }
    }, [isLoadingInstructions, droneData]);

    const onResetStates = () => {
        setInstructionsSet([]);
        setShowInstructOne(false);
        setShowInstructTwo(false);
        setShowInstructThree(false)
    }

    const onActionBtnClick = (id: string) => {
        fetchBillboardDetails(id);
        (document.getElementById('billboard_detail_modal') as HTMLDialogElement)?.showModal();     
    }

    return (
        <>
            <fieldset className="fieldset mr-15 ml-15 bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend">Drone Controller</legend>
                <div className="flex w-full">
                    {/* controller pad */}
                    <ControllerPadSection isLoadingInstructions={isLoadingInstructions} onClickDirectionsPad={onClickDirectionsPad} />
                    <div className="divider divider-horizontal"></div>
                    {/* controller details */}
                    <ControllerDetailsSection 
                     isLoadingInstructions={isLoadingInstructions} 
                     instructionsSet={instructionsSet}
                     showInstructOne={showInstructOne}
                     showInstructTwo={showInstructTwo}
                     showInstructThree={showInstructThree}
                     OnSendInstructions={OnSendInstructions}
                     onResetStates={onResetStates}
                    />
                </div>
            </fieldset>
            {/* table */}
            <DroneFlightResultsTable
             billBoardData={billBoardData}
             onActionBtnClick={onActionBtnClick}
            />
            {/* billboard details */}
            <BillboardDetailModal
             billBoardDetails={billboardDetails}
             isLoadingBillboardDetails={isLoadingBillboardDetails}
            />
        </>
    )
}