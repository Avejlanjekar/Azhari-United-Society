const bcrypt = require("bcryptjs");
const fs = require("fs");

const members = [
  ["Zahir", "", "Nachare"],
  ["Zubair", "", "Nachare"],
  ["Arman", "", "Lanjekar"],
  ["Avej", "", "Lanjekar"],
  ["Aftab", "", "Choche"],
  ["Sohel", "", "Choche"],
  ["Asif", "A", "Nachare"],
  ["Miraj", "", "Nachare"],
  ["Asif", "I", "Choche"],
  ["Tahir", "", "Nachare"],
  ["Sohel", "R", "Lanjekar"],
  ["Dildar", "", "Lanjekar"],
  ["Tufel", "", "Nandkar"],
  ["Altaj", "", "Nandkar"],
  ["Muzaffar", "", "Lanjekar"],
  ["Ajmeer", "", "Nachare"],
  ["Ashfak", "I", "Lanjekar"],
  ["Sallu", "", "Nachare"],
  ["Mainuddin", "", "Nachare"],
  ["Siddik", "", "Nachare"],
  ["Shaibaz", "", "Choche"],
  ["Tanveer", "", "Thodge"],
  ["Ahmad", "", "Hafiz"],
  ["Junaid", "", "Nachare"],
  ["Ahmad", "H", "Lanjekar"],
  ["Altaf", "R", "Lanjekar"],
  ["Gaus", "S", "Nandkar"],
  ["Shakib", "", "Nachare"],
  ["Nawaz", "", "Nachare"],
  ["Sohel", "N", "Lanjekar"],
  ["Gulam", "S", "Choche"],
  ["Mustak", "", "Nachare"],
  ["Ramjan", "", "Nachare"],
  ["Mubarak", "A", "Lanjekar"],
  ["Ismail", "", "Nachare"],
  ["Sahil", "", "Nandkar"],
  ["G.Gaus", "", "Nachare"],
  ["Ashfak", "", "Raut"],
  ["Mansoor", "", "Nachare"],
  ["Nijam", "", "Nandkar"],
  ["Ahmad", "", "Nandkar"],
  ["Tayyab", "", "Lanjekar"],
  ["Iqbal", "", "Lanjekar"],
  ["Nawaz", "A", "Nachare"],
  ["Ajaj", "", "Choche"],
  ["Avej sayaad", "", "Lanjekar"],
  ["Aman", "salim", "Lanjekar"],
  ["Nawaz", "", "Thodge"],
  ["altaj", "k", "Nachare"],
  ["Anis", "", "lanjekar"],
  ["Abuturab", "", "lanjekar"],
  ["Rajjef", "", "Nandkar"],
  ["Gulam", "M", "choche"],
  ["Danish", "S", "Lanjekar"],
  ["Majjid", "", "thodage"]
];

async function generate() {
  const result = [];

  for (let i = 0; i < members.length; i++) {
    const [name, middlename, lastname] = members[i];

    const password = `azharimember${i + 1}@gmail.com`;

    const passwordHash = await bcrypt.hash(password, 10);

    const email =
      `${name}${middlename || ""}${lastname}`
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/\./g, "") +
      "@gmail.com";

    result.push({
      name,
      middlename,
      lastname,
      email,
      password: passwordHash,
      role: "member",
      deposits: 1500
    });
  }

  fs.writeFileSync(
    "members-compass.json",
    JSON.stringify(result, null, 2)
  );

  console.log(`✅ ${result.length} members generated`);
  console.log("📄 members-compass.json created");
}

generate();