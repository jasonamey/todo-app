import React, { useState } from "react";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

function TodoItem({
  id,
  onDeleteClick,
  todoItemContent,
  setComplete,
  completed,
}) {
  const [hovered, setHovered] = useState(false);

  const completeHandler = (id) => {
    setComplete(id, true);
  };

  const notCompleteHandler = (id) => {
    setComplete(id, false);
  };
  return (
    <TodoItemWrapper>
      <div className="container-left">
        {!completed && !hovered && (
          <div className="border grey">
            <div className="circle" onMouseEnter={() => setHovered(true)}></div>
          </div>
        )}
        {hovered && !completed && (
          <div className="border purple">
            <div
              className="circle"
              onMouseLeave={() => setHovered(false)}
              onClick={() => completeHandler(id)}
            ></div>
          </div>
        )}
        {completed && (
          <div className="border purple" onClick={() => notCompleteHandler(id)}>
            <BsCheck className="check-mark" />
          </div>
        )}
        <span className={`item-content ${completed && "finished"}`}>
          {todoItemContent}
        </span>
      </div>
      <span className="delete-btn" onClick={() => onDeleteClick(id)}>
        <IoCloseOutline />
      </span>
    </TodoItemWrapper>
  );
}

const TodoItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.appBackgroundColor};
  color: ${({ theme }) => theme.appColor};
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.appDiminishedColor};
  transition: all 0.5s;
  .container-left {
    display: flex;
    align-items: center;
    .border {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      padding: 1px;
      display: grid;
      place-items: center;
      margin-right: 22px;
      &.grey {
        background: ${({ theme }) => theme.appDiminishedColor};
      }
      &.purple {
        background: -webkit-linear-gradient(left top, #70bff7 0%, #a774f2 100%);
      }
    }

    .circle {
      background: ${({ theme }) => theme.appBackgroundColor};
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .check-mark {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
    .finished {
      text-decoration-line: line-through;
      color: ${({ theme }) => theme.appDiminishedColor};
    }
  }
  .delete-btn {
    cursor: pointer;
  }
  @media only screen and (max-width: 470px) {
  }
`;

export default TodoItem;
