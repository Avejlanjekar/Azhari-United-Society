// import { useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function RegisterMember() {
//   const [form, setForm] = useState({
//     name: "",
//     middlename: "",
//     lastname: "",
//     phone: "",
//     email: "",
//     password: ""
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosClient.post("auth/register", form);
//       setMessage(res.data.message);

//       // reset form after success
//       setForm({
//         name: "",
//         middlename: "",
//         lastname: "",
//         phone: "",
//         email: "",
//         password: ""
//       });
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error registering member");
//     }
//   };

//   return (
//     <div className="max-w-lg w-full mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-6">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
//         Register New Member
//       </h2>

//       <form onSubmit={handleSubmit} className="grid gap-5">
//         {["name", "middlename", "lastname", "phone", "email", "password"].map(
//           (field) => (
//             <div key={field} className="flex flex-col">
//               <label
//                 htmlFor={field}
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 type={
//                   field === "password"
//                     ? "password"
//                     : field === "email"
//                     ? "email"
//                     : "text"
//                 }
//                 name={field}
//                 id={field}
//                 placeholder={`Enter ${field}`}
//                 value={form[field]}
//                 onChange={handleChange}
//                 className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 rounded-lg outline-none transition-all"
//                 required
//               />
//             </div>
//           )
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all"
//         >
//           Register
//         </button>
//       </form>

//       {message && (
//         <p
//           className={`mt-6 text-center font-medium ${
//             message.toLowerCase().includes("error")
//               ? "text-red-600"
//               : "text-green-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function RegisterMember() {
  const [form, setForm] = useState({
    name: "",
    middlename: "",
    lastname: "",
    phone: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("auth/register", form);
      setMessage(res.data.message);

      // reset form after success
      setForm({
        name: "",
        middlename: "",
        lastname: "",
        phone: "",
        email: "",
        password: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "email/phone already exist");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-4 sm:mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-700">
        Register New Member
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
        {["name", "middlename", "lastname", "phone", "email", "password"].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                id={field}
                placeholder={`Enter ${field}`}
                value={form[field]}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 sm:p-3 rounded-lg outline-none transition-all text-sm sm:text-base"
                required
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all text-sm sm:text-base"
        >
          Register
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 sm:mt-6 text-center font-medium text-sm sm:text-base ${
            message.toLowerCase().includes("error")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
