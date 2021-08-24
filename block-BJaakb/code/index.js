let input = document.querySelector('input');
let ul = document.querySelector('ul');

let url =
  'https://api.unsplash.com/photos/?client_id=SvC0GOeRgsLlzyqle__37j2EzczPvxqK7YM-_ez6AgU';

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject(console.log('something went wrong'));
    xhr.send();
  });
}

function createUI(data) {
  let li = document.createElement('li');
  data.forEach((elm) => {
    let img = document.createElement('img');
    img.src = elm.urls.small;
    img.classList.add('image');
    li.append(img);
  });
  ul.append(li);
}

fetch(url)
  .then((data) => {
    createUI(data);
  })
  .catch((error) => console.log(error));

function imageSearch(event) {
  if (event.keyCode === 13 && input.value) {
    ul.innerHTML = '';
    let url = `https://api.unsplash.com/search/photos/?query=${input.value}&client_id=SvC0GOeRgsLlzyqle__37j2EzczPvxqK7YM-_ez6AgU`;
    fetch(url)
      .then((data) => {
        console.log(data);
        createUI(data.results);
      })
      .catch((error) => console.log(error));

    input.value = '';
  }
}

input.addEventListener('keyup', imageSearch);
