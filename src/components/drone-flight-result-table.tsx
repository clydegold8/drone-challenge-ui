import { FaEye } from "react-icons/fa6";
import { BillBoardData } from "../composables/useSendInstruction";

export type DroneFlightResultsProps = {
    billBoardData: BillBoardData[];
    onActionBtnClick: (id: string) => void;
};


export default function DroneFlightResultsTable({
    billBoardData = [] as BillBoardData[],
    onActionBtnClick
}: DroneFlightResultsProps) {
    return (
        <>
            <div className="mt-10 mr-15 ml-5 text-center mb-5" >
                <h1 className="font-bold text-[30px]" >Drone Flight Results</h1>
            </div>
            {billBoardData.length === 0 ? (
                <div role="alert" className="mr-15 ml-15 mb-15 alert alert-info alert-soft">
                    <span className="font-bold text-[15px]" >No Drone Flight Results</span>
                </div>
            ) : (
                <div className="h-75 overflow-x-auto mr-15 ml-15 rounded-box border border-base-content/5 bg-base-100">
                    <table className="table table-pin-rows bg-base-200">
                        <thead>
                            <tr className="bg-base-300">
                                <th>Advertiser</th>
                                <th>Address</th>
                                <th>Photos Taken</th>
                                <th>Billboard Text</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billBoardData.map((billBoardData: BillBoardData, index) =>
                                <tr key={index}>
                                    <td> {billBoardData.isNew && (
                                        <span className="badge badge-soft badge-accent badge-xs">New</span>
                                    )} {billBoardData.advertiser}</td>
                                    <td>{billBoardData.address}</td>
                                    <td className="text-center" >{billBoardData.photosTaken}</td>
                                    <td>{billBoardData.billboardText}</td>
                                    <td>
                                        <button onClick={() => onActionBtnClick(billBoardData.id)} className="btn btn-square bg-accent">
                                            <FaEye className="text-[20px]" />
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}