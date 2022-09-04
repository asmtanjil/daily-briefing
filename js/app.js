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
const loadNews = (category_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayNews(data.data))
  .catch(err => console.log(err))
}



// Display News Category

const displayNews = newsCategories =>{
  newsCategories.sort((a,b) => {
    return b.total_view - a.total_view;
  })
  console.log(newsCategories);
  const cardContainer  = document.getElementById('card-container')
  const newsCount = document.getElementById('news-count')

  cardContainer.innerHTML = '';
  newsCount.textContent = '';

  if(newsCategories.length > 0){
    newsCount.innerHTML = `${newsCategories.length} News Found`
  }
  else{
    newsCount.innerHTML = `No News Found`
  }

  newsCategories.forEach(newsCategory => {
    console.log(newsCategory);
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add('card');
    newCardDiv.classList.add('mb-3');
    newCardDiv.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${newsCategory.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${newsCategory.title}</h4>
        <p class="card-text">${newsCategory.details.length > 300 ? newsCategory.details.slice(0, 300) + '...' : newsCategory.details}</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-start">
            <img src="" class="img-fluid" alt="">
            <p class="d-flex flex-column">
              <span>Jane Cooper</span>
              <span>Jan 10, 2022</span>
            </p>
          </div>
          <div>
            <span><i class="bi bi-eye"></i></span>
            <span class="fw-bold">1.5 M</span>
          </div>
          <div>
            <span><i class="bi bi-star-half"></i></span>
            <span><i class="bi bi-star"></i></span>
            <span><i class="bi bi-star"></i></span>
            <span><i class="bi bi-star"></i></span>
            <span><i class="bi bi-star"></i></span>
          </div>
          <div>
            <span class="fs-3 fw-bold"><i class="bi bi-arrow-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(newCardDiv);
  })

}


categoryLoader();
