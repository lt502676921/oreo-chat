import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { nextTick, uuid } from './utils';
import './index.css';

const MESSAGE_CONTAINER_ID = 'message_container';
let containerRoot = null;

function createContainer() {
  let container = document.getElementById(MESSAGE_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', MESSAGE_CONTAINER_ID);
    document.body.appendChild(container);
  }
  return container;
}

function renderMessageRoot() {
  const container = createContainer();
  if (!containerRoot) {
    containerRoot = ReactDOM.createRoot(container);
    containerRoot.render(<MessageManager />);
  }
}

const MessageItem = ({ children, onRemove }) => {
  const messageItemRef = useRef();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer = null;
    timer = setTimeout(() => {
      if (messageItemRef.current) {
        messageItemRef.current.addEventListener('animationend', onRemove, {
          once: true,
        });
      }
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={messageItemRef} className={`messageItem ${isVisible ? 'messageItem-appear' : 'messageItem-disappear'}`}>
      {children}
    </div>
  );
};

const MessageContainer = React.forwardRef((props, ref) => {
  const { messageList, setMessageList } = props;

  useImperativeHandle(ref, () => {
    return {
      info: text => {
        const id = uuid();
        setMessageList(list => [...list, { id, text }]);
      },
      error: text => {
        const id = uuid();
        setMessageList(list => [...list, { id, text }]);
      },
    };
  });

  return (
    <>
      {messageList.map(msg => (
        <MessageItem key={msg.id} onRemove={() => setMessageList(list => list.filter(item => item.id !== msg.id))}>
          <span className="messageItem-icon">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="info-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg>
          </span>
          <span>{msg.text}</span>
        </MessageItem>
      ))}
    </>
  );
});

function MessageManager() {
  const [messageList, setMessageList] = useState([]);

  const msgRef = useRef();

  useEffect(() => {
    message.current = msgRef.current;
    message.info = msgRef.current.info;
    message.error = msgRef.current.error;
  }, []);

  return <MessageContainer ref={msgRef} messageList={messageList} setMessageList={setMessageList} />;
}

let taskQueue = [];
function flushQueue() {
  if (!containerRoot || !message.current) {
    renderMessageRoot();
    setTimeout(flushQueue);
    return;
  }

  taskQueue.forEach(msg => {
    message[msg.type](msg.content);
  });

  taskQueue = [];
}

const message = {
  current: null,
  open: ({ type = 'info', content }) => {
    nextTick(() => {
      taskQueue.push({ type, content });
    });
    flushQueue();
  },
};

export default message;
