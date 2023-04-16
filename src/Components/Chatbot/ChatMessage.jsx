import avatarUser from "../Assets/avatarUser.jpg";
import avatarChat from "../Assets/avatarChat.png";

function ChatBubble({ type, message }) {
  const name = type === "user" ? avatarUser : avatarChat;
  const chatEnd = type === "user" ? "justify-end" : "justify-start";
  const chatBubblePrimary =
    type === "user" ? "chat-bubble-primary.user" : "chat-bubble-primary.user";

  return (
    <div className={`chat-message ${chatEnd}`}>
      <div className="chat-message-img">
        <img
          width={80}
          height={80}
          src={name}
          alt={`${type} avatar`}
          className="avatar"
        />
      </div>
      <div>
        <div className={`chatbubble ${chatBubblePrimary}`}>
          <p className="parrafo">{message}</p>
        </div>
      </div>
    </div>
  );
}
// import { Avatar, Comment } from "antd";

// function ChatMessage({ name, type, message, chatEnd, chatBubblePrimary }) {
//   return (
//     <Comment
//       className={`chat-message ${chatEnd}`}
//       author={name}
//       content={<p className="parrafo">{message}</p>}
//       avatar={
//         <Avatar
//           src={name}
//           alt={`${type} avatar`}
//           size={80}
//           className="avatar"
//         />
//       }
//     />
//   );
// }

export default ChatBubble;
