import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import React, { memo } from "react";

function Task({ item, index }: any) {
  console.log("item: ", item);
  return (
    <Draggable key={item.id} draggableId={`${item.ID}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              color: "white",
              borderRadius: "4px",
              ...provided.draggableProps.style,
            }}
          >
            <div className="conten-card">
              <span>Title: {item.Title}</span>
              <br />
              <span>Description: {item.Description}</span>
              <br />
              <span>Status: {item.Status}</span>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

Task.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
};
export default memo(Task);
