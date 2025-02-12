import MessageCard from "../components/Card/MessageCard";
import { icons } from "../constanst";

const Room = () => {
  const messages = [
    { content: "Hello!", created: "10:00 AM", isMine: false },
    { content: "Hi! How are you?", created: "10:01 AM", isMine: true },
    {
      content: "I'm good, thanks! What about you?",
      created: "10:02 AM",
      isMine: false,
    },
    { content: "I'm doing great!", created: "10:03 AM", isMine: true },
  ];
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {/* Header (Không cuộn) */}
      <div className="w-full bg-white text-black flex justify-between p-4  ">
        <div>
          <p className="text-lg font-bold">Room chat 01</p>
          <p className="flex gap-1 items-center text-xs text-green-500">
            <img src={icons.dot} alt="" className="w-4 h-4" />
            Online
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <button>
            <img src={icons.phonecall} className="w-6 h-6" alt="" />
          </button>
          <button>
            <img src={icons.videocall} className="w-7 h-7" alt="" />
          </button>
        </div>
      </div>

      {/* Phần tin nhắn (Cuộn) */}
      <div className="flex-1 overflow-auto p-4 bg-gray-300">
        <div className="space-y-3">
          {messages.map((e) => (
            <MessageCard
              content={e.content}
              created={e.created}
              isMine={e.isMine}
            />
          ))}
        </div>
      </div>

      <div
        className="w-full bg-transparent px-4 border-t border-transparent mb-20 flex items-center pt-4"
        style={{ borderTop: "1px solid gray " }}
      >
        <input
          className="w-full border border-gray-400 rounded-l-3xl bg-transparent px-4 py-3 text-black placeholder-gray-500"
          placeholder="Nhập tin nhắn..."
        />
        <button
          className="bg-blue-500 text-white rounded-r-3xl p-3 border border-blue-500"
          onClick={(e) => e.preventDefault()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
