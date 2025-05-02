import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ success: false, error: false, message: "" });

    const form = e.target;
    const formData = new FormData(form);
    const templateParams = {
      name: formData.get("user_name"),
      from_email: formData.get("user_email"),
      phone: formData.get("phone") || "Not provided",
      message: formData.get("message"),
      time: new Date().toLocaleString(),
      
    };

    emailjs
      .send(
        /*"service_el7aac4",*/"service_pbvkued",
        /*"template_ygvlqrm",*/"template_s1eqjec",
        templateParams,
        /*"DO9l_PdQsidrEtOsB"*/ "UfuvENU7zST-xz36W"
      )
      .then(
        () => {
          setFormStatus({
            success: true,
            error: false,
            message: "Message sent successfully!",
          });
          form.reset();
        },
        () => {
          setFormStatus({
            success: false,
            error: true,
            message: "Failed to send message. Please try again later.",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">Contact Us</h2>
        <p className="text-center text-gray-500 mb-6">We’d love to hear from you</p>

        {formStatus.success && (
          <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300">
            {formStatus.message}
          </div>
        )}

        {formStatus.error && (
          <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300">
            {formStatus.message}
          </div>
        )}

        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-gray-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-gray-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone (Optional)</label>
            <input
              type="text"
              name="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-gray-50"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-gray-50 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:bg-orange-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
