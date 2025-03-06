import { FaAngleUp, FaAngleDown, FaAngleRight, FaAngleLeft, FaCamera } from "react-icons/fa";

export type ControllerPadProps = {
    onClickDirectionsPad: (data: Instructions) => void;
    isLoadingInstructions: boolean;
};

export type Instructions = {
    instructions: string;
    direction: string;
}


export default function ControllerPadSection({ onClickDirectionsPad, isLoadingInstructions = false }: ControllerPadProps) {
    return (
        <div className="pt-5 pb-5 w-full flex flex-col items-center space-y-2">
            <button disabled={isLoadingInstructions} onClick={() => onClickDirectionsPad({ instructions: '^', direction: 'north' })} className="btn btn-lg h-[70px] p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 active:scale-95 shadow-md transition">
                <FaAngleUp className="text-[45px]" />
            </button>
            <div className="flex space-x-2">
                <button disabled={isLoadingInstructions} onClick={() => onClickDirectionsPad({ instructions: '>', direction: 'west' })} className="btn btn-lg h-[70px] p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 active:scale-95 shadow-md transition">
                    <FaAngleLeft className="text-[45px]" />
                </button>
                <button disabled={isLoadingInstructions} onClick={() => onClickDirectionsPad({ instructions: 'x', direction: 'taking a picture' })} className="btn btn-lg h-[70px] p-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 active:scale-95 shadow-md transition">
                    <FaCamera className="text-[45px]" />
                </button>
                <button disabled={isLoadingInstructions} onClick={() => onClickDirectionsPad({ instructions: '<', direction: 'east' })} className="btn btn-lg h-[70px] p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 active:scale-95 shadow-md transition">
                    <FaAngleRight className="text-[45px]" />
                </button>
            </div>
            <button disabled={isLoadingInstructions} onClick={() => onClickDirectionsPad({ instructions: 'v', direction: 'south' })} className="btn btn-lg h-[70px] p-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 active:scale-95 shadow-md transition">
                <FaAngleDown className="text-[45px]" />
            </button>
        </div>
    )
}