import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { GoogleGenAI } from '@google/genai'
import crudService from '../../backend/appwrite/service/crud.service.js'

function TalkToAI({ foods, setFoods }) {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const { user } = useAuth()
    const context = foods.map(food => `Food: ${food.name} - ${food.calories} calories, ${food.protein}g protein, ${food.carbs}g carbs, ${food.fat}g fat, Custom entry? - ${food.isCustom}`).join("\n")
    const [contextAttached, setContextAttached] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
      if (!user) return;

      const fetchFoods = async() => {
        const response = await crudService.getFoods(user.$id)
        if (response) {
          setFoods(response.documents)
        }
      }
      fetchFoods()
    }, [user])


    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY
    })

    const handleAISubmit = async (e) => {
      e.preventDefault();
      if (!message.trim()) return;

      const userMessage = { role: "user", content: message }

      
      setMessage("")
      
      // if context is attached, add it to the message
      const contents = contextAttached ? `${context}\n\n${message}` : message;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents,
      })
      
      const assisstantMessage = { role: "assistant", content: response.text }
      
      setMessages(prev => [...prev, userMessage, assisstantMessage])

      const postResponse = await crudService.postMessages({
        userId: user.$id,
        userMessages: String(userMessage.content),
        assisstantMessages: String(assisstantMessage.content)
      })
      if (postResponse) {
        console.log("Messages posted successfully")
      }
      
      
      setContextAttached(false)
    }

    useEffect(() => {
      console.log("Updated messages:", messages)
    }, [messages])
    
    const handleContext = (e) => {
      e.preventDefault();
      setContextAttached(prev => !prev)
    }

    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


  const loggedIn = !!user;

    if (!loggedIn) {
      return <div className="min-h-screen mt-10 flex flex-col items-center justify-center text-2xl font-bold">You're not <b className="text-red-500">logged in.</b> <a href="/login" className="text-blue-700 underline hover:text-blue-800 transition duration-300">Login</a> to continue</div>
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">AI Companion</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-1">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">Start a conversation with your AI nutritionist!</div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
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
                <div ref={bottomRef} />
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-row items-center gap-2'>
        <button
        className='w-50 h-10 mb-2 text-center bg-blue-600 text-white px-5 py-2 rounded-2xl hover:bg-blue-700 transition font-semibold'
        onClick={(e) => {handleContext(e)}}
        >{contextAttached ? "Remove Context" : "Attach Context"}
        </button>
        {contextAttached &&
        <p className='text-gray-400 text-center'>Context attached</p>}
        </div>
        <form
          className="flex gap-2"
          onSubmit={handleAISubmit}
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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