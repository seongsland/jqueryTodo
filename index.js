let id = 1;
let viewState = "all";
let todoStorage = [];

$(() => {
  $("#title").text("Todo List");
  getLocalStorage();
});

const getLocalStorage = () => {
  try {
    todoStorage = JSON.parse(localStorage.getItem("todoStorage"));
    id = todoStorage.at(-1)["id"] + 1;
    changeTodosState();
    $("#leftCount").html(
      todoStorage.filter((obj) => {
        return !obj.checked;
      }).length
    );
  } catch {
    console.log("localstorage parsing error");
    todoStorage = [];
  }
};

const changeTodoStorage = () => {
  localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
  changeTodosState();
  $("#leftCount").html(
    todoStorage.filter((obj) => {
      return !obj.checked;
    }).length
  );
};

const changeTodosState = () => {
  console.log(viewState);
  if (viewState == "all") {
    setTodos([...todoStorage]);
  } else if (viewState == "uncheck") {
    setTodos(
      [...todoStorage].filter((obj) => {
        return !obj.checked;
      })
    );
  } else if (viewState == "check") {
    setTodos(
      [...todoStorage].filter((obj) => {
        return obj.checked;
      })
    );
  }
};

const setTodos = (todos) => {
  $("#todoItemList").html("");
  for (todo of todos) {
    const todoHtml = `<div id="${
      todo.id
    }" class="todoItem list-group-item list-group-item-action d-flex align-items-center justify-content-between" onclick="handleToggle('${
      todo.id
    }');">
    <div class="checkbox col-auto d-flex align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-square"
        viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
        ${
          todo.checked
            ? '<path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path>'
            : ""
        }
      </svg>
    </div>
    <div class="todoText flex-fill ${
      todo.checked ? "text-decoration-line-through" : ""
    }">
      <div class="text-start ms-2">${todo.text}</div>
    </div>
    <div class="col-auto">
      <button type="button"
        class="remove btn btn-outline-danger btn-sm d-block d-sm-none" onclick="handleRemove('${
          todo.id
        }');">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
        </svg>
      </button>
    </div>
  </div>`;
    $("#todoItemList").append(todoHtml);
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleCreate();
  }
};

const handleCreate = () => {
  const $todoInput = $("#todoInput");
  if ($todoInput.val()) {
    todoStorage.push({ id: id++, text: $todoInput.val(), checked: false });
    $todoInput.val("");
    changeTodoStorage();
  }
};

const handleToggle = (id) => {
  todoStorage.map((todo) => {
    if (todo.id == id) todo.checked = !todo.checked;
  });
  changeTodoStorage();
};

const handleRemove = (id) => {
  todoStorage = todoStorage.filter((todo) => todo.id != id);
  changeTodoStorage();
};

const handleChangeViewState = (pViewState) => {
  if (pViewState == "clear") {
    pViewState = "all";
    todoStorage = todoStorage.filter((todo) => !todo.checked);
    changeTodoStorage();
  }

  if (viewState != pViewState) {
    viewState = pViewState;
    changeTodosState();
    $(".actionBtn").removeClass("btn-dark").addClass("btn-outline-dark");
    $(".actionBtn." + pViewState)
      .removeClass("btn-outline-dark")
      .addClass("btn-dark");
  }
};
