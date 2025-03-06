import './App.css'
import ControllerPage from './components/controller'
import ControllerGuide from './components/controller-guide'

function App() {
  return (
    <>
      <div className="grid grid-cols-1 grid-flow-row-dense text-center">
        <h1 className='font-bold text-[25px] m-5' >Bigdatr Drone Control Panel</h1>
      </div>
      <div className="grid grid-cols-1 grid-flow-row-dense">
        <ControllerGuide />
      </div>
      <div className="grid grid-cols-1 grid-flow-row-dense">
        <ControllerPage />
      </div>
    </>
  )
}

export default App
