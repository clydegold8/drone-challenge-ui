import { TbDrone } from "react-icons/tb";
import { InstructionsSetData } from "./controller";

export type ControllerDetailsProps = {
    isLoadingInstructions: boolean;
    showInstructOne: boolean;
    showInstructTwo: boolean;
    showInstructThree: boolean;
    instructionsSet: InstructionsSetData[];
    onResetStates: () => void;
    OnSendInstructions: () => void;
};


export default function ControllerDetailsSection({
    isLoadingInstructions = false,
    showInstructOne = false,
    showInstructTwo = false,
    showInstructThree = false,
    instructionsSet = [] as InstructionsSetData[],
    onResetStates,
    OnSendInstructions
}: ControllerDetailsProps) {
    return (
        <div className="w-full" >
            <div className="flex items-center space-x-2 justify-center mt-2">
                <TbDrone className="text-[40px]" />
                <h1 className="card-title text-[25px]">{!isLoadingInstructions ? 'Drone on Standby' : 'Drone executing instructions'}</h1> <span className="loading loading-dots loading-md"></span>
            </div>
            <div className="mockup-code w-full mt-2">
                <pre data-prefix="$"><code>{instructionsSet.length > 0 ? (<>Detecting instructions <span className="loading loading-bars loading-xs"></span></>) : 'Waiting for Instructions'}</code></pre>
                <pre data-prefix=">" className="text-warning max-w-md">
                    {instructionsSet.map((instructionData: InstructionsSetData, index) => <code key={index} >{instructionData.direction}{instructionsSet.length > 1 && (index !== instructionsSet.length - 1) ? ',' : ''}{""}</code>)}
                </pre>
                {showInstructOne && (<pre data-prefix=">"><code>Sending Instructions to the drone <span className="loading loading-bars loading-xs"></span></code></pre>)}
                {showInstructTwo ? (<pre data-prefix=">" className="text-success"><code>Done!</code></pre>) : ''}
                {showInstructThree ? (<pre data-prefix=">" className="text-warning"><code>Console resets in 2 seconds..</code></pre>) : ''}
            </div>
            <div className="text-center w-full mt-5">
                <button disabled={isLoadingInstructions} onClick={onResetStates} className=" sm:mb-3 sm:w-full sm:mr-0 sm:btn-sm md:w-[130px] md:text-[12px] md:btn-md md:mb-0 md:mr-2 lg:w-auto lg:btn-lg xl:btn-xl btn btn-lg btn-secondary text-[25px] mr-5">Clear Instructions</button>
                <button disabled={isLoadingInstructions || instructionsSet.length === 0} onClick={OnSendInstructions} className="sm:w-full sm:ml-0 sm:btn-sm md:w-[130px] md:text-[12px] md:ml-2 md:btn-md lg:w-auto lg:btn-lg xl:btn-xl btn btn-lg btn-primary text-[25px] ml-5">Send Instructions</button>
            </div>
        </div>
    )
}