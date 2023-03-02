import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState, useContext } from "react";
// import { v4 as uuid } from "uuid";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "@components/atoms/loading";
import Column from "@components/organisms/column";
import CreateCard from "@components/organisms/create-card";
import Template from "@components/templates/template";
import axios from "@utils/axios";

interface IOption {
  id: number;
  name: string;
}

interface IStatus {
  name: string;
  color: string;
  items: any[];
}

interface IStatuses {
  [key: number]: IStatus;
}

export default function Home() {
  const status: IStatuses = {
    1: {
      name: "Requested",
      color: "white",
      items: [],
    },
    2: {
      name: "To do",
      color: "white",
      items: [],
    },
    3: {
      name: "In Progress",
      color: "white",
      items: [],
    },
    4: {
      name: "Done",
      color: "white",
      items: [],
    },
  };
  const [columns, setColumns] = useState(status);
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
      const res = await axios.get(`/`);
      setColumns({
        1: {
          name: "Requested",
          color: "white",
          items: res.data,
        },
        2: {
          name: "To do",
          color: "white",
          items: [],
        },
        3: {
          name: "In Progress",
          color: "white",
          items: [],
        },
        4: {
          name: "Done",
          color: "white",
          items: [],
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getStatuses();
    getTodos();
  }, []);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
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
                <CreateCard options={options} />
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
