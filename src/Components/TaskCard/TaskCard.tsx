import { useDrag } from "react-dnd";

export default function TaskCard({ task }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task?.id, status: task?.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <li ref={dragRef} className=" bg-white p-3 m-2 rounded-2 ">
        {task?.title}
      </li>
    </>
  );
}
