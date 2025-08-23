import React, { useState } from 'react'
import { FancyButton } from './fancyButton'

export const Contact = () => {
  const [btnText,setbtnText] = useState("Send")

  const onSubmit = async (event) => {
    event.preventDefault()
    setbtnText("Sending...")
    const formData = new FormData(event.target)

    formData.append("access_key", "15d76f77-810c-454a-9e80-ecfde34e344e")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      setbtnText("Sent")
      setTimeout(() => {
        setbtnText("Send")
        event.target.reset()
      }, 3000);
    } else {
      console.log("Error", data)
    }
  }

  return (
    <div className="w-full px-[12%] py-16 scroll-mt-20 bg-emerald-100">
      <h4 className="text-center mb-2 text-lg font-ovo text-emerald-700">
        Connect With Me
      </h4>

      <h2 className="text-center text-5xl font-serif font-bold text-gray-800">
        Get in touch
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-serif text-gray-700">
        I'd love to hear from you! If you have any questions, comments, or feedback, 
        please use the form below.
      </p>
      

      {/* ✅ uniform shadow around form */}
      <form 
        onSubmit={onSubmit} 
        className="max-w-2xl mx-auto bg-emerald-100 p-8 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input 
            type="text" 
            placeholder="Enter Your Name" 
            required
            className="w-full p-3 border bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            name="name"
          />
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            required
            className="w-full p-3 border bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
            name="email"
          />
        </div>

        <textarea 
          rows={6} 
          placeholder="Enter Your Message" 
          required
          className="w-full p-4 border bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
          name="message"
        ></textarea>

        <div className="flex justify-center">
          <FancyButton text={btnText} />
        </div>

      </form>
    </div>
  )
}
