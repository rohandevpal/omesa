import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {

  const contactInfo = [
    {
      label: "Email Us",
      value: "info@omesa.in",
      href: "mailto:info@omesa.in",
      iconClass: "fas fa-envelope",
      bgGradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
      gradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
    },
    {
      label: "Call Us",
      value: "+91 98101 86798",
      href: "tel:+919810186798",
      iconClass: "fas fa-phone",
      bgGradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
      gradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
    },
    {
      label: "Visit Office",
      value: "Nehru Enclave Chittaranjan Park, New Delhi, Delhi",
      href: "https://www.google.com/maps/dir//Nehru+Enclave+Chittaranjan+Park+New+Delhi,+Delhi",
      iconClass: "fas fa-map-marker-alt",
      bgGradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
      gradient: "bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    phoneNumber: false,
    subject: false,
    comments: false,
  });

  // Regex validations
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,13}$/;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstName:
        !formData.firstName.trim() ||
        !nameRegex.test(formData.firstName),

      email:
        !formData.email.trim() ||
        !emailRegex.test(formData.email),

      phoneNumber:
        formData.phoneNumber &&
        !phoneRegex.test(formData.phoneNumber),

      subject: !formData.subject.trim(),

      comments: formData.comments.trim().length < 5,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {

      const templateParams = {
        from_name: formData.firstName,
        from_email: formData.email,
        phone: formData.phoneNumber,
        subject: formData.subject,
        comments: formData.comments,
      };

      emailjs.send(
        "service_slptbe9",
        "template_0iwhh2m",
        templateParams,
        "AVDJ6-gG1yfcH_At0"
      )
      .then(() => {

        alert("Message sent successfully!");

        setFormData({
          firstName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          comments: "",
        });

      })
      .catch((error) => {
        console.error("Email error:", error);
      });
    }
  };

  return (
    <>
      <div className="bg-slate-950 contact-form flex justify-center items-center">

        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 
          mx-auto mt-8 mb-8 bg-slate-950 p-6 text-white border-2 border-gray-900 rounded-md">

          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Left Info */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg p-10 flex flex-col justify-center">

                <h2 className="text-3xl font-[heading] mb-4">
                  Start a Conversation
                </h2>

                <p className="text-blue-100 font-[textFont]">
                  Ready to build something great? From partnerships to complex solutions, our team is here to help.
                </p>

              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block mb-2">Name *</label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-md bg-slate-800 border ${
                      errors.firstName ? "border-red-500" : "border-gray-600"
                    }`}
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2">Email *</label>
                  <input
                    type="email"
                    className={`w-full p-3 rounded-md bg-slate-800 border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    }`}
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2">Phone</label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-md bg-slate-800 border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-600"
                    }`}
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2">Subject *</label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-md bg-slate-800 border ${
                      errors.subject ? "border-red-500" : "border-gray-600"
                    }`}
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                  />
                </div>

                {/* Comments */}
                <div>
                  <label className="block mb-2">Comments</label>
                  <textarea
                    className={`w-full p-3 rounded-md bg-slate-800 border ${
                      errors.comments ? "border-red-500" : "border-gray-600"
                    } min-h-[120px]`}
                    value={formData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition"
                >
                  Submit
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ContactForm;