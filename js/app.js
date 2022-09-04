// Load All categories
const categoryLoader = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.data.news_category))
  .catch(err => console.log(err));
}
// Display Category
const displayCategory = categories => {
  const newCategory = document.getElementById('new-categories');
  categories.forEach(category =>{
    const li = document.createElement('li')
    li.classList.add('nav-item');
    li.innerHTML = `
    <a onclick="loadNews('${category.category_id}')" id="news-category" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
    `
    newCategory.appendChild(li);
  })
}
// Loadnews Category
const loadNews = () =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayNews(data.data))
  .catch.apply(err => console.log(err))
}
// Display News Category

const displayNews = (newsCategories) =>{
  newsCategories.sort((a,b) => {
    return b.total_view - a.total_view;
  })
  console.log(newsCategories);
  const newsContainer = document.getElementById
}


categoryLoader();
