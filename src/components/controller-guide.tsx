import { TbDrone } from "react-icons/tb";
import { useState } from 'react'

export default function ControllerGuide() {

    const [showInstructions, setShowInstructions] = useState(true);

    return (
        <>
            {showInstructions ? (
                <div className="card bg-info card-md shadow-sm ml-15 mr-15 mb-5 text-black">
                    <div className="card-body">
                        <div className="flex items-center space-x-2">
                            <TbDrone />
                            <h1 className="card-title">Bigdatr Drone Control Instructions</h1>
                        </div>
                        <p>Bigdatr operates an aerial drone to capture photographs of billboards. The drone moves in precise 1 km increments in four directions or can take a photograph when positioned correctly.</p>
                        <p className="font-bold" >Control Pad Functions:</p>
                        <ul>
                            <li>🔼 Up → Moves 1 km north</li>
                            <li>🔽 Down → Moves 1 km south</li>
                            <li>◀ Left → Moves 1 km west</li>
                            <li>▶ Right → Moves 1 km east</li>
                            <li>📷 Center → Takes a photograph</li>
                        </ul>
                        <p>Ensure the drone is positioned correctly before taking a photograph. Happy flying! 🚁📷</p>
                        <div className="justify-end card-actions">
                            <button onClick={() => setShowInstructions(false)} className="btn btn-primary">Hide Control Instructions</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mr-15 ml-15">
                    <button onClick={() => setShowInstructions(true)} className="btn btn-primary float-right">Show Control Instructions</button>
                </div>

            )}
        </>
    )
}