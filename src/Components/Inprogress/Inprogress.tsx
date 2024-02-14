import { useContext } from "react";
import { useDrop } from "react-dnd";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import TaskCard from "../TaskCard/TaskCard";

export default function Inprogress({ allTasks, getAllTasks }) {
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: ({ id, status }: any) => {
      dropTask(id, status);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  const dropTask = (id: number, status: string) => {
    if (status === "InProgress") {
      return null;
    } else {
      axios
        .put(
          `${baseUrl}/Task/${id}/change-status`,
          {
            status: "InProgress",
          },
          {
            headers: requstHeaders,
          }
        )
        .then((res) => {
          getAllTasks();
        });
    }
  };

  return (
    <>
      <div className="tasksContainer one3 p-2  " ref={dropRef}>
        <ul className="list-unstyled ">
          {allTasks?.map((task ,index) => (
            <TaskCard task={task} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
}
