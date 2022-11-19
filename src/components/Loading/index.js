import './index.css'

const Loading = () => {
  return (
    <div className="mask">
      <div className="loadingContainer">
        <div className="flex-center">
          <div className="three-balls-bounce">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
