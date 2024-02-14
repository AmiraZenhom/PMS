import { useContext } from "react";
import { useDrop } from "react-dnd";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import TaskCard from "../TaskCard/TaskCard";

export default function Done({ allTasks, getAllTasks }) {
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);

  //***********drop task********* */

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
    if (status === "Done") {
      return null;
    } else {
      axios
        .put(
          `${baseUrl}/Task/${id}/change-status`,
          {
            status: "Done",
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
      <div className="tasksContainer one2 p-2 " ref={dropRef}>
        <ul className="list-unstyled">
          {allTasks?.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
}
