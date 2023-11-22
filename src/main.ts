// Importing styles
import "./style.css";

// Defining the Todo interface
interface Todo {
  taskTitle: string;
  isCompleted: boolean;
  readonly id: string;
}

// Initializing an array to store todos
let todos: Array<Todo> = [];

// References to HTML elements
const todosContainer = document.querySelector(
  ".toDoContainer"
) as HTMLDivElement;

const todosInput = document.getElementsByName("task")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

// Event listener for form submission
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  // Creating a new todo object
  const todo: Todo = {
    taskTitle: todosInput.value,
    isCompleted: false,
    id: String(Math.round(Math.random() * 1000)),
  };

  // Clearing input field
  todosInput.value = "";

  // Adding todo to the array
  todos.push(todo);

  // Displaying updated todos
  displayTodo(todos);
};

// Function to create and add a task to the DOM
const createAndAddTask = (
  TaskTitle: string,
  isCompleted: boolean,
  id: string
) => {
  // Creating Task div
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // Creating a checkbox
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;

  // Creating P for title
  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = TaskTitle;

  // Creating delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.id = id;

  // Appending elements to the task div
  todo.append(checkbox, para, btn);
  todosContainer.append(todo);

  // Event listener for delete button click
  btn.onclick = () => {
    const btnId: string = btn.id;

    // Filtering out the selected todo
    const filteredTodos: Todo[] = todos.filter((item) => {
      console.log(item.id, btnId);
      return item.id != btnId;
    });

    // Updating the todos array
    todos = filteredTodos;

    // Displaying updated todos
    displayTodo(todos);
  };

  // Event listener for checkbox click
  checkbox.addEventListener("click", (e) => {
    console.log(e.target);

    // Updating checkbox state
    checkbox.checked = true;

    // Setting a timeout to simulate a transition effect
    setTimeout(() => {
      todo.style.transform = "translateX(100vw)";
    }, 1000);

    // Setting a timeout to remove the todo after the transition
    setTimeout(() => {
      const btnId: string = btn.id;

      // Filtering out the selected todo
      const filteredTodos: Todo[] = todos.filter((item) => {
        return item.id != btnId;
      });

      // Updating the todos array
      todos = filteredTodos;

      // Displaying updated todos
      displayTodo(todos);
    }, 1500);
  });
};

// Function to display todos
const displayTodo = (items: Todo[]) => {
  // Clearing the todos container
  todosContainer.innerHTML = "";

  // Creating and adding tasks for each todo in the array
  items.forEach((item: Todo) => {
    createAndAddTask(item.taskTitle, item.isCompleted, item.id);
  });
};
