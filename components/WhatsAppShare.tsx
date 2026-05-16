"use client";

export default function WhatsAppShare() {
  const share = () => {
    const message = encodeURIComponent(
      "🧠 I am doing Brain Boost daily exercises to keep my mind sharp! Come join me!\n\n" +
      "5 fun brain exercises every day:\n" +
      "🔤 Word Puzzle\n" +
      "🔢 Number Challenge\n" +
      "📖 Memory Recall\n" +
      "🌍 Learn Something New\n" +
      "🧘 Mind Journey\n\n" +
      "It only takes 15 minutes a day and it's FREE! 🌟"
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={share}
      className="shine-btn flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-2xl py-4 px-6 text-xl font-bold transition-all shadow-lg"
    >
      <span className="text-2xl">📲</span>
      Share with Friends on WhatsApp
    </button>
  );
}
