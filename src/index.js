import "normalize.css";
import "./styles/main.scss";

let container = document.getElementById("container");
let searchText = document.getElementById('search');
searchText.value = '';

async function searchRepo() {
  
  if (searchText.value.length < 2) {
    alert('Слишком короткий текст запроса');
    return false;
  }

  let baseUrl = `https://api.github.com/search/repositories?q=${searchText.value}`;
  let repo = await fetch(baseUrl)
  let answer = await repo.json();

  let resDiv = document.createElement('div');
  resDiv.id = 'resBox';
  let resultDiv = document.getElementById('resBox');

  !resultDiv ? container.append(resDiv) : (resultDiv.remove(), container.append(resDiv));

  if (answer.items.length > 0) {
    for (let item of answer.items.slice(0, 10)) {

      let result = document.createElement("div");
      result.id = "box";
      result.className = 'box'
      let link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', item.svn_url)
      let strLink = document.createElement("p");
      strLink.id = "box__link";
      let strText = document.createElement("p");
      strText.id = "box__str";
      let strDate = document.createElement("p");
      strDate.id = "box__str";

      resDiv.append(result);
      result.append(strLink, strText, strDate);
      strLink.append(link);

      link.innerHTML = item.svn_url;

      strText.innerHTML = 'Name: ' + item.name + ',  ' + 'language: ' + item.language + ',  ' + 'description: ' + item.description;
      let formDate = new Date(item.created_at);
      strDate.innerHTML = 'Created: ' + formDate.toLocaleDateString() + ', ' + formDate.toLocaleTimeString();
    }
  } else {
    let strNull = document.createElement('p');
    strNull.id = 'notFound'
    strNull.innerHTML = 'Ничего не найдено';
    resDiv.append(strNull);
  }

  searchText.value = '';
  return false;

}


searchText.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    searchRepo();
  }
})

document.getElementById('search__btn').onclick = function () {
  searchRepo();
};