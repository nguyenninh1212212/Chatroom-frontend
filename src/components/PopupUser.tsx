import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PopupUser = ({ togglePopup }: { togglePopup: () => void }) => {
  const token = Cookies.get("token");
  const navication = useNavigate();
  const signOut = () => {
    if (token) {
      Cookies.remove("token");
      navication("/auth/login");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100 text-black"
      onClick={togglePopup} // Khi bấm ngoài popup sẽ đóng
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()} // Chặn sự kiện click lan ra ngoài popup
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold ">Thông tin người dùng</h2>
          <p className="text-gray-400 cursor-pointer " onClick={togglePopup}>
            X
          </p>
        </div>
        <p>Chi tiết thông tin user...</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default PopupUser;
