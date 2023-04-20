import avatarUser from "../Assets/avatarUser.jpg";
import avatarChat from "../Assets/avatarChat.png";
import "./Chatty.css";

function ChatBubble({ type, message }) {
  const name = type === "user" ? avatarUser : avatarChat;
  const chatEnd = type === "user" ? "justify-end" : "justify-start";
  const chatBubblePrimary =
    type === "user" ? "bg-button text-white" : "bg-white";

  return (
    <div className={`flex-${chatEnd} mb-4`}>
      <div className="w-10 h-10 rounded-full mr-4">
        <img
          width={9}
          height={9}
          src={name}
          alt={`${type} avatar`}
          className="w-3 h-3 rounded-full"
        />
      </div>
      <div>
        {message !== "Cargando" ? (
          <div className={`py-2 px-4 rounded-lg ${chatBubblePrimary}`}>
            <p className="text-sm leading-normal">{message}</p>
          </div>
        ) : (
          <div className="chat-bubble">
            <div className="loading">
              <div className="dot one"></div>
              <div className="dot two"></div>
              <div className="dot three"></div>
            </div>
            <div className="tail"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
