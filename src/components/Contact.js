import React, { useState } from 'react';
// Assuming FancyButton is in the same directory
// import { FancyButton } from './fancyButton'; 

const FancyButton = ({ text }) => (
  <button 
    type="submit" 
    className="px-6 py-3 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 text-sm sm:text-base"
  >
    {text}
  </button>
);

export const Contact = () => {
  const [btnText, setbtnText] = useState("Send");

  const onSubmit = async (event) => {
    event.preventDefault();
    setbtnText("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "15d76f77-810c-454a-9e80-ecfde34e344e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setbtnText("Sent");
      setTimeout(() => {
        setbtnText("Send");
        event.target.reset();
      }, 3000);
    } else {
      console.log("Error", data);
      setbtnText("Error!");
      setTimeout(() => setbtnText("Send"), 3000);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-16 scroll-mt-20 bg-emerald-100">
      <h4 className="text-center mb-2 text-base sm:text-lg font-ovo text-emerald-700">
        Connect With Me
      </h4>

      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-800">
        Get in touch
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-4 mb-10 sm:mt-5 sm:mb-12 font-serif text-gray-700 text-sm sm:text-base">
        I'd love to hear from you! If you have any questions, comments, or feedback, 
        please use the form below.
      </p>
      
      <form 
        onSubmit={onSubmit} 
        className="max-w-2xl mx-auto bg-emerald-100 p-5 sm:p-6 md:p-8 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <input 
            type="text" 
            placeholder="Enter Your Name" 
            required
            className="w-full p-3 sm:p-4 text-green-500 border bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
            name="name"
          />
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            required
            className="w-full p-3 sm:p-4 border text-green-500 bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
            name="email"
          />
        </div>

        <textarea 
          rows={5} 
          placeholder="Enter Your Message" 
          required
          className="w-full p-3 sm:p-4 border text-green-500 bg-emerald-100 border-emerald-400 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 mb-6 text-sm sm:text-base"
          name="message"
        ></textarea>

        <div className="flex justify-center">
          <FancyButton text={btnText} />
        </div>
      </form>
    </div>
  )
}
