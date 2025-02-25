import { icons } from "../../constanst";
import { Link } from "react-router-dom";
import { IRoomInfo } from "../../type/room";
import {
  getTailwindBgColor,
  getFirstLetterOfLastWord,
} from "../../util/BgColorAlpha";
interface CardRoomProps {
  data: IRoomInfo;
  target: string;
}

const CardRoom: React.FC<CardRoomProps> = ({ data, target }) => {
  const { name, latestMessage, id } = data;

  return (
    <div
      className={`w-full p-4 mb-1 rounded-lg ${
        id == target ? "bg-gray-300" : "hover:bg-stone-300"
      }`}
    >
      <Link to={`/${id}`}>
        <div className="flex gap-4 items-center">
          <div
            className={`${getTailwindBgColor(
              name || ""
            )} w-12 h-12 rounded-full items-center justify-center flex`}
          >
            <p className="text-xl"> {getFirstLetterOfLastWord(name || "")}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="font-bold text-black">{name}</p>
            <p className="text-sm text-gray-500 line-clamp-1">
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
