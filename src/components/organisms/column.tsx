import { Droppable } from "@hello-pangea/dnd";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { memo } from "react";
const Task = dynamic(() => import("@components/molecules/task"), { ssr: false });

const Column = ({ droppableId, column }: any) => {
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "#D8D8D8",
              padding: 4,
              width: 250,
              minHeight: 500,
              border: "2px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {column?.items?.map((item: any, index: number) => {
              return <Task key={item.id} item={item} index={index} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string,
};

export default memo(Column);
