import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import './MessageManager.css'

const Message = ({ children, onRemove }) => {
  useEffect(() => {
    let timer
    timer = setTimeout(() => {
      onRemove()
    }, 2000)
  }, [])

  return <div className="messageItem">{children}</div>
}

const MessageContainer = React.forwardRef((props, ref) => {
  const [messageList, setMessageList] = useState([])

  useImperativeHandle(ref, () => {
    return {
      info: text => {
        const id = '' + Date.now() + text + Math.random()
        setMessageList(list => [...list, { id, text }])
      },
      error: text => {
        const id = '' + Date.now() + text + Math.random()
        setMessageList(list => [...list, { id, text }])
      },
    }
  })

  return (
    <>
      {messageList.map(msg => (
        <Message key={msg.id} onRemove={() => setMessageList(list => list.filter(item => item.id !== msg.id))}>
          {msg.text}
        </Message>
      ))}
    </>
  )
})

export const message = { current: null, info: null }

export default function MessageManager() {
  const msgRef = useRef()

  useEffect(() => {
    message.current = msgRef.current
    message.info = msgRef.current.info
    message.error = msgRef.current.error
  }, [])

  return <MessageContainer ref={msgRef}></MessageContainer>
}
