import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import Loading from "@components/atoms/loading";
import Column from "@components/organisms/column";
import CreateCard from "@components/organisms/create-card";
import Template from "@components/templates/template";
import { IStatus, IStatuses, Todo } from "@models/todo";
import axios from "@utils/axios";

interface IOption {
  id: number;
  name: string;
}

export default function Home() {
  const [columns, setColumns] = useState<IStatuses>({});
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<IOption[]>([]);

  async function getStatuses() {
    const res = await axios.get(`/getStatuses`);
    console.log("res: ", res.data);
    const choices: IOption[] = [];
    res.data.forEach((status: any) => {
      choices.push({
        id: status.id,
        name: status.name,
      });
    });
    setOptions(choices);
  }

  async function getTodos() {
    try {
      const res: any = await axios.get(`/`);
      setColumns(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getStatuses();
    getTodos();
  }, []);

  console.log("columns: ", columns);
  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTodos = [...sourceColumn.todos];
      const destTodos = [...destColumn.todos];
      const [removed] = sourceTodos.splice(source.index, 1);
      destTodos.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          todos: sourceTodos,
        },
        [destination.droppableId]: {
          ...destColumn,
          todos: destTodos,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedTodos = [...column.todos];
      const [removed] = copiedTodos.splice(source.index, 1);
      copiedTodos.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          todos: copiedTodos,
        },
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Template>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <CreateCard options={options} statusId={column.status_id} getTodos={getTodos} />
                <div style={{ margin: 8 }}>
                  <Column droppableId={columnId} key={columnId} column={column} />
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </Template>
  );
}
