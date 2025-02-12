import { icons } from "../../constanst";
import { Link } from "react-router-dom";
import { roomInfo } from "../../type/room";
interface CardRoomProps {
  data: roomInfo;
}

const CardRoom: React.FC<CardRoomProps> = ({ data }) => {
  const { name, latestMessage } = data;

  return (
    <div className="w-full p-4 mb-1 hover:bg-gray-300 rounded-lg">
      <Link to={"/"}>
        <div className="flex gap-4 items-center">
          <img src={icons.User} alt="User" className="h-14 w-14" />
          <div className="flex flex-col items-start">
            <p className="font-bold text-black">{name}</p>
            <p className="text-sm text-gray-400 line-clamp-1">
              {latestMessage}
            </p>
          </div>
          <p className="text-blue-500 text-3xl ml-auto">•</p>
        </div>
      </Link>
    </div>
  );
};

export default CardRoom;
