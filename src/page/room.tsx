import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import { decodeToken } from "../api";
import { IMessageInfo } from "../type/message";
import { getTheRoom } from "../api/room";
import InfoRoom from "../components/InfoRoom";
import Empty from "./Empty";
import { formatDate } from "../util/formatDate";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../util/BgColorAlpha";
import { icons } from "../constanst";
import MessageCard from "../components/Card/MessageCard";

const Room = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessageInfo[]>([]);
  const [message, setMessage] = useState("");
  const stompClientRef = useRef<Client | null>(null);
  const myEmail = decodeToken()?.sub3 || "";

  // Fetch dữ liệu phòng từ API
  const { data, isLoading, error } = useQuery({
    queryKey: ["theRoom", id],
    queryFn: () => getTheRoom(decodeToken()?.sub2, id || ""),
    enabled: !!id,
    retry: 2,
  });

  // Kết nối WebSocket khi vào phòng
  useEffect(() => {
    if (!id) return;

    const socket = new SockJS("http://localhost:8080/ws-chat", {
      withCredentials: true,
    });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        // Sửa đường dẫn topic để đúng với cấu hình của server
        stompClient.subscribe(`/topic/room/${id}`, (message) => {
          const newMessage = JSON.parse(message.body);

          // Lấy email của người gửi ngay lập tức
          const senderEmail = newMessage;
          console.log("Người gửi:", senderEmail); // In ra email người gửi

          setMessages((prev) => {
            // Kiểm tra xem tin nhắn đã tồn tại trong danh sách chưa
            if (prev.some((msg) => msg.created === newMessage.created)) {
              return prev;
            }
            return [...prev, newMessage]; // Nếu chưa, thêm tin nhắn vào danh sách
          });
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [id]);

  // Gửi tin nhắn qua WebSocket
  const sendMessage = useCallback(() => {
    if (stompClientRef.current?.connected && message.trim()) {
      const chatMessage: IMessageInfo = {
        user_id: decodeToken()?.sub2,
        content: message,
        room_id: id!,
        email: myEmail,
        created: new Date().toISOString(),
        sender: decodeToken()?.sub3,
        mine: true, // Đánh dấu tin nhắn của chính mình
      };

      // Cập nhật UI ngay lập tức
      setMessages((prev) => [...prev, chatMessage]);

      stompClientRef.current.publish({
        destination: `/app/room/${id}`,
        body: JSON.stringify(chatMessage),
      });

      setMessage(""); // Xóa input sau khi gửi tin nhắn
    }
  }, [id, message, myEmail]);

  // Auto-scroll xuống tin nhắn mới nhất
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!id) return <Empty />;
  if (error) return <p className="text-red-500">Lỗi tải dữ liệu phòng!</p>;

  return (
    <div className="flex w-full h-auto overflow-hidden gap-2">
      {/* Header */}
      <div className="w-full border border-gray-400 rounded-lg bg-white overflow-auto">
        <div className="w-full text-black flex justify-between p-4">
          <div>
            <p className="text-lg font-bold">{data?.data?.name}</p>
            <p className="flex gap-1 items-center text-xs text-green-500">
              <img src={icons.dot} alt="" className="w-4 h-4" /> Online
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

        {/* Tin nhắn */}
        <div className="flex-1 overflow-auto h-3/4 p-4 bg-gray-300">
          <div className="space-y-3">
            {isLoading ? (
              <center>
                <p>Loading...</p>
              </center>
            ) : (
              [...(data?.data?.messages || []), ...messages].map(
                (msg, index) => (
                  <MessageCard key={index} data={msg} myEmail={myEmail} />
                )
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="w-full bg-transparent p-2 border-t flex items-center pt-3 border-gray-300">
          <input
            className="w-full border border-gray-400 rounded-l-3xl bg-transparent px-4 py-3 text-black placeholder-gray-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white rounded-r-3xl p-3 border border-blue-500"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      {/* Thông tin phòng */}
      {data && <InfoRoom data={data} />}
    </div>
  );
};

export default Room;
