import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { user_id } from "../../api";
import { createRoom } from "../../api/room";

interface Payload {
  showDiagram: boolean;
  setShowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

const availableUsers: User[] = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/50?img=3" },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/50?img=4" },
];

const CreateRoomScreen: React.FC<Payload> = ({
  setShowDiagram,
  showDiagram,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (name: string) => createRoom(user_id || "", name),
    onSuccess: () => {
      alert("Room created successfully!");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      alert("Failed to create room");
    },
  });

  const handleCreateRoom = () => {
    if (name.length === 0) {
      alert("Name of room cannot be empty");
      return;
    } else {
      setLoading(true);
      mutation.mutate(name);
    }
  };

  const toggleUserSelection = (user: User) => {
    if (selectedIds.includes(user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
      setSelectedIds(selectedIds.filter((id) => id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setSelectedIds([...selectedIds, user.id]);
    }
  };

  const removeUserFromRoom = (id: number) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  return (
    <div className="text-black border-white flex flex-col justify-between overflow-hidden gap-2 h-full">
      {/* Header */}
      <p className="text-center border border-b-stone-500 flex justify-between pb-3">
        <p className="w-1/6"></p>
        <p className="font-bold text-2xl w-4/6">Create new room</p>
        <button
          className="w-1/6 text-red-500 font-bold"
          onClick={() => setShowDiagram(!showDiagram)}
        >
          Exit
        </button>
      </p>

      {/* Content */}
      <div className="p-3 h-[80%] overflow-hidden">
        <div className="flex flex-col gap-2">
          <p>Name of room :</p>
          <input
            type="text"
            className="w-full border p-2 rounded-2xl bg-stone-300"
            placeholder="Enter name of room"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Hiển thị danh sách người đã thêm */}
        <div className="mt-4">
          <p className="font-semibold">Members:</p>
          <div className="flex items-center gap-2 mt-2">
            {selectedUsers.length > 0 ? (
              selectedUsers.map((user) => (
                <div key={user.id} className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    title={user.name}
                  />
                  <button
                    className="absolute -top-1 -right-1 bg-stone-300 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => removeUserFromRoom(user.id)}
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No members added</p>
            )}
          </div>
        </div>

        {/* Suggest */}
        <p className="mt-4">Suggest</p>
        <div className="overflow-y-auto h-40 w-full mt-2 border p-2 rounded-lg bg-gray-100">
          {availableUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <p>{user.name}</p>
              </div>
              <button
                className={`px-3 py-1 rounded-lg transition-all h-8 w-8  flex items-center justify-center ${
                  selectedIds.includes(user.id)
                    ? "bg-purple-600 text-white"
                    : "border-2 border-stone-400 text-white"
                }`}
                onClick={() => toggleUserSelection(user)}
              >
                {selectedIds.includes(user.id) ? "☑️" : ""}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nút tạo phòng */}
      <button
        className={`w-full h-12 self-center font-bold rounded-lg transition-all duration-200 bg-blue-500 hover:bg-blue-700
        text-white`}
        onClick={handleCreateRoom}
        disabled={loading}
      >
        {"Create room +"}
      </button>
    </div>
  );
};

export default CreateRoomScreen;
