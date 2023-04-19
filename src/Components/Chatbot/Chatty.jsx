import { useState, useRef, useEffect } from "react";

import ChatBubble from "./ChatBubble";
import "./Chatty.css";

function Chatty() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const scrollToDiv = useRef(null);

  function scrollToBottom() {
    setTimeout(function () {
      scrollToDiv.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const messages = [...chatMessages, { role: "user", content: query }];
    setChatMessages(messages);

    setQuery("");
    const response = await fetch(
      "https://pfservidor-production.up.railway.app/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      }
    );
    if (!response.ok) {
      handleError(response.statusText);
    }
    const json = await response.json();
    scrollToBottom();
    try {
      setLoading(false);
      setChatMessages((m) => [...m, json.choices[0].message]);
      setAnswer("");
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      }
    }
  };

  function handleError(err) {
    setLoading(false);
    setQuery("");
    setAnswer("");
    console.error(err);
  }

  useEffect(() => {
    if (scrollToDiv.current) {
      scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, answer, loading]);

  return (
    <div
      className="container-chat"
      style={{ position: "fixed", top: "150px", right: "30px" }}>
      <div className="container-messages">
        <div className="messages">
          <ChatBubble
            type="assistant"
            message="Hola! ¿Cómo puedo ayudarte hoy?"
          />
          {chatMessages.map((message, index) => (
            <ChatBubble
              key={index}
              type={message.role}
              message={message.content}
            />
          ))}
          {answer && <ChatBubble type="assistant" message={answer} />}
          {loading && <ChatBubble type="assistant" message="Cargando.." />}
        </div>
        <div ref={scrollToDiv} />
      </div>
      <form className="form-chat" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-chat"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-button text-white font-bold py-2 px-4 rounded-md">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chatty;
