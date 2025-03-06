import { BillboardDetails } from "../composables/useFetchBillboardDetails";

export type BillboardDetailsProps = {
    billBoardDetails: BillboardDetails;
    isLoadingBillboardDetails: boolean;
};

export default function BillboardDetailModal({
    billBoardDetails = {} as BillboardDetails,
    isLoadingBillboardDetails = false
}: BillboardDetailsProps) {
    return (
        <>
            <dialog id="billboard_detail_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Billboard Details</h3>
                    {isLoadingBillboardDetails ? (
                        <div className="flex w-full flex-col gap-4 mt-5">
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-32 w-full"></div>
                        </div>
                    ) : (<div className="card bg-base-100 w-full shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-[25px]">{billBoardDetails?.billboard?.advertiser}</h1>
                            <p className="text-[13px]" >{billBoardDetails?.billboard?.address}</p>
                            <p className="italic">{billBoardDetails?.billboard?.billboardText}</p>
                        </div>

                        <figure>
                            <div className="skeleton h-70 w-900" id="skeleton"></div>

                            <img
                                src={billBoardDetails?.billboard?.image}
                                alt="Billboard Image"
                                onLoad={(e) => {
                                    const img = e.currentTarget;
                                    img.style.opacity = '1';
                                    document.getElementById('skeleton')!.style.display = 'none';
                                }}
                                onError={(e) => {
                                    const img = e.currentTarget;
                                    img.src = 'fallback-image.jpg';
                                    img.style.opacity = '1';
                                }}
                            />
                        </figure>
                    </div>)}

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button disabled={isLoadingBillboardDetails} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}