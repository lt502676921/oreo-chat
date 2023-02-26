import './index.css'

const Loading = props => {
  const { content } = props

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
        {content && <div className="loadingContent">{content}</div>}
      </div>
    </div>
  )
}

export default Loading
