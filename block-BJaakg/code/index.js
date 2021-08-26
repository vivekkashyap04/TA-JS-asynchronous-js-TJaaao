let ul = document.getElementById('main');
let modal = document.getElementById('modal');
let container = document.querySelector('.container');

let url = 'https://www.anapioficeandfire.com/api/books';
function loader(root, status = false) {
  if (status) {
    root.innerHTML = `<div class="donut"></div>`;
  }
}

function createUi(data) {
  ul.innerHTML = '';
  data.forEach((data) => {
    let li = document.createElement('li');
    let name = document.createElement('h2');
    name.innerText = data.name;
    let author = document.createElement('h3');
    author.innerText = data.authors[0];
    let noOfpages = document.createElement('span');
    noOfpages.innerText = data.numberOfPages;
    let publisher = document.createElement('h4');
    publisher.innerText = data.publisher;
    let released = document.createElement('span');
    released.innerText = data.released;
    let country = document.createElement('h4');
    country.innerText = data.country;
    let button = document.createElement('button');
    button.innerText = `show charcter ${data.characters.length}`;
    button.addEventListener('click', (e) => {
      modal.innerHTML = '';
      createModal(data.characters);
      container.style.display = 'block';
      document.querySelector('.close').addEventListener('click', () => {
        console.log('close');
        container.style.dispaly = 'none';
      });
    });
    li.append(name, author, noOfpages, publisher, released, country, button);
    main.append(li);
  });
}

function createModal(data) {
  Promise.all(data.map((char) => fetch(char).then((res) => res.json()))).then(
    (data) => {
      data.forEach((elem) => {
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        li.classList.add('list');
        h3.innerText = elem.name;
        li.append(h3);
        modal.append(li);
      });
    }
  );
}

function show() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createUi(data);
      console.log(data);
    })
    .catch((error) => console.log(error))
    .finally(() => loader(ul));
}

show();
