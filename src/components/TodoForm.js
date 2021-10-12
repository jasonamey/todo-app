import React from "react";
import styled from "styled-components";
const TodoForm = ({ todo, onFormSubmit, onInputChange }) => {
  return (
    <TodoFormWrapper onSubmit={onFormSubmit}>
      <div className="border grey">
        <div className="circle"></div>
      </div>

      <input
        name="todo"
        type="text"
        placeholder="Create new todo"
        value={todo}
        onChange={onInputChange}
      />
    </TodoFormWrapper>
  );
};

const TodoFormWrapper = styled.form`
  background-color: ${({ theme }) => theme.appBackgroundColor};
  color: ${({ theme }) => theme.appDiminishedColor};
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 3px;
  transition: all 0.5s;

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
  }
  .circle {
    background: ${({ theme }) => theme.appBackgroundColor};
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  input {
    background-color: transparent;
    border: none;
    font-family: inherit;
    font-size: 16px;
    line-height: 18px;
    outline: none;
    padding: 5px 0 3px 0;
    caret-color: ${({ theme }) => theme.caretColor};
    color: ${({ theme }) => theme.appColor};
    transition: all 0.5s;
  }
  input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.appSelectedBlue};
  }

  input:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export default TodoForm;
