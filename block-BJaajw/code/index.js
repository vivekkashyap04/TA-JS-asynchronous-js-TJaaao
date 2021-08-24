let main = document.querySelector('.section');
let select = document.getElementById('source');

function createLoader() {
  let preLoader = document.createElement('div');
  let iframe = document.createElement('iframe');
  iframe.src = 'https://giphy.com/embed/xTkcEQACH24SMPxIQg';
  iframe.classList.add('iframe');
  preLoader.append(iframe);
  main.prepend(preLoader);
}
setTimeout(() => createLoader,1000);


function createUi(data) {
  data.forEach((elm) => {
    let flex = document.createElement('div');
    flex.classList.add('flex');
    let col1 = document.createElement('div');
    col1.classList.add('col-30');
    let col2 = document.createElement('div');
    col2.classList.add('col-50');
    let img = document.createElement('img');
    img.src = elm.imageUrl;
    let h2 = document.createElement('h2');
    h2.innerText = elm.title;
    let p = document.createElement('p');
    p.innerText = elm.summary;
    let a = document.createElement('a');
    a.href = elm.url;
    let btn = document.createElement('button');
    btn.innerText = 'Read More';
    btn.append(a);
    col1.append(img);
    col2.append(h2, p, btn);
    flex.append(col1, col2);
    main.append(flex);
  });
}

fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Error : ${res.status}`);
    }
    return res.json();
  })
  .then((value) => createUi(value))
  .catch(error => main.innerHTML = error)

function handlechange(event) {
  main.innerHTML = '';
  fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((res) => res.json())
    .then((userData) => {
      let data = userData.filter((data) =>
        data.newsSite.includes(event.target.value)
      );
      createUi(data);
    })
    .catch((error) => (main.innerHTML = error));
}

select.addEventListener('change', handlechange);