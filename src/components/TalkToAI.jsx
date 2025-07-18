import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function TalkToAI() {

    const [messages, setMessages] = useState([])

    // TODO: Implement the logic to send messages to the AI
    // TODO: Implement the logic to get messages from the AI
    // TODO: Implement the logic to display messages in the UI
    // TODO: Implement the logic to handle user input
    // TODO: Implement the logic to handle AI response
    // TODO: Implement the logic to handle error
    // TODO: Implement the logic to handle loading state

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">AI Companion</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-1">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">Start a conversation with your AI nutritionist!</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow
                  ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            // Placeholder for sending message logic
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            // value and onChange should be implemented for real input
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default TalkToAI