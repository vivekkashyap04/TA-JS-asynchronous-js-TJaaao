let input = document.querySelector('input');
let ul = document.querySelector('ul');

let baseUrl = 'https://sleepy-falls-37563.herokuapp.com/api/todo';

function creatUi(todo) {
  todo.forEach((data) => {
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    input.checked = data.isCompleted;
    input.id = data._id;
    let h2 = document.createElement('h2');
    h2.innerText = data.title;
    let span = document.createElement('span');
    span.innerText = 'X';
    span.addEventListener('click', () => {
      deleteTodo(data._id);
    });
    li.append(checkbox, h2, span);
    ul.append(li);
  });
}

function get() {
  fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      creatUi(data.todos);
      console.log(data.todos);
    });
}

function post(event) {
  if (event.keyCode === 13 && event.target.value) {
    console.log(event);
    let data = {
      todos: {
        title: `${event.target.value}`,
        isCompleted: false,
      },
    };

    fetch(baseUrL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => get())
      .catch(console.error(error));
  }
}

input.addEventListener('click', post);

function deleteTodo(id) {
  fetch(baseUrl + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => get());
}

get();
