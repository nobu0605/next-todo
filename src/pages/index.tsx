import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Loading from "@components/atoms/loading";
import Column from "@components/organisms/column";
import Template from "@components/templates/template";

export default function Home() {
  const status = {
    [uuid()]: {
      name: "Requested",
      color: "#FFFAE6",
      items: [],
    },
    [uuid()]: {
      name: "To do",
      color: "#EAE6FF",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      color: "#DEEBFF",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      color: "#E3FCEF",
      items: [],
    },
  };
  const [columns, setColumns] = useState(status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then((response: any) => {
        setColumns({
          [uuid()]: {
            name: "Requested",
            color: "#FFFAE6",
            items: response.data,
          },
          [uuid()]: {
            name: "To do",
            color: "#EAE6FF",
            items: [],
          },
          [uuid()]: {
            name: "In Progress",
            color: "#DEEBFF",
            items: [],
          },
          [uuid()]: {
            name: "Done",
            color: "#E3FCEF",
            items: [],
          },
        });
        setIsLoading(false);
      })
      .catch(() => {
        console.log("hoge");
      });
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
                <div style={{ margin: 8 }}>
                  <Column droppableId={columnId} key={columnId} index={index} column={column} />
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </Template>
  );
}
