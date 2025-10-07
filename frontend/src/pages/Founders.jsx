// src/pages/Founders.jsx
export default function Founders() {
  const founders = [
    { name: "Mr. Ahmed Khan", role: "President" },
    { name: "Mrs. Fatima Sheikh", role: "Vice President" },
    { name: "Mr. Sameer Patel", role: "Treasurer" },
    { name: "Mr. Irfan Ali", role: "Secretary" },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Society Founders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {founders.map((f, idx) => (
          <div key={idx} className="card bg-base-100 shadow-md p-6">
            <h3 className="text-xl font-semibold">{f.name}</h3>
            <p className="text-gray-500">{f.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
