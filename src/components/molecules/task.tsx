import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import React, { memo } from "react";

function Task({ item, index }: any) {
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
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
              backgroundColor: "white",
              color: "black",
              borderRadius: "4px",
              ...provided.draggableProps.style,
            }}
          >
            <div className="conten-card">
              <span>Title: {item.title}</span>
              <br />
              <span>Description: {item.description}</span>
              <br />
              <span>Status: {item.status}</span>
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
