const colorMap: Record<string, string> = {
  A: "bg-red-500",
  B: "bg-green-500",
  C: "bg-blue-500",
  D: "bg-yellow-500",
  E: "bg-purple-500",
  F: "bg-teal-500",
  G: "bg-orange-500",
  H: "bg-pink-500",
  I: "bg-indigo-500",
  J: "bg-lime-500",
  K: "bg-emerald-500",
  L: "bg-rose-500",
  M: "bg-cyan-500",
  N: "bg-violet-500",
  O: "bg-sky-500",
  P: "bg-fuchsia-500",
  Q: "bg-amber-500",
  R: "bg-gray-500",
  S: "bg-slate-500",
  T: "bg-zinc-500",
  U: "bg-stone-500",
  V: "bg-neutral-500",
  W: "bg-lime-400",
  X: "bg-teal-400",
  Y: "bg-orange-400",
  Z: "bg-red-400",
  "1": "bg-red-400",
  "2": "bg-blue-400",
  "3": "bg-green-400",
  "4": "bg-yellow-400",
  "5": "bg-purple-400",
  "6": "bg-teal-400",
  "7": "bg-orange-400",
  "8": "bg-pink-400",
  "9": "bg-indigo-400",
  "0": "bg-gray-400",
};

export const getFirstLetterOfLastWord = (name: string): string => {
  if (!name.trim()) return ""; // Trả về chuỗi rỗng nếu không có tên
  const words = name.trim().split(" "); // Tách chuỗi thành mảng từ
  return words[words.length - 1][0].toUpperCase(); // Lấy chữ cái đầu của từ cuối
};

export const getTailwindBgColor = (name: string): string => {
  if (!name) return "bg-stone-300";
  const firstLetter = getFirstLetterOfLastWord(name);
  return colorMap[firstLetter] || "bg-gray-300";
};
