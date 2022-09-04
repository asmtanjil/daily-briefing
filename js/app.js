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
  toggleSpinner(true);
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
            <img style="width: 70px; border-radius:50%;" src="${newsCategory.author.img ? newsCategory.author.img : 'No Photo Found'}" class="img-fluid" alt="">
            <div class="ps-2 text-muted d-dlex flex-column align-items center">
              <p><small>Name: ${newsCategory.author?.name ? newsCategory.author?.name : 'No Name Found'}</small></p>
              <p><small class="text-wrap">
              ${newsCategory.author?.published_date ? newsCategory.author?.published_date : 'No Date Found'}
              </small></p>
            </div>
          </div>
          <div>
            <div>
              <p><i class="bi bi-eye"></i>
              ${newsCategory.total_view ? newsCategory.total_view : 'No Data Found'}
              </p>
            </div>
          </div>
          <div>
            <p>${newsCategory.rating.number ? newsCategory.rating.number : 'Not Rated Yet'}<i class="bi bi-star-fill"></i></p>
          </div>
          <div>
            <button type="button" class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${newsCategory._id}')">
            <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(newCardDiv);
  })
  toggleSpinner(false);
}
// Add Toggle Spinner
const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner-loader');
  if(isLoading){
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
}
// Load News Details
const loadNewsDetails = (news_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
  fetch(url)
   .then(res => res.json())
   .then(data => displayNewsDetails(data.data))
   .catch(err => console.log(err))
}
const displayNewsDetails = details =>{
  console.log(details);
  const modalContainer = document.getElementById('modal-container');
  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerText = `${details[0].title}`;
  modalContainer.innerHTML = `
        <div class="text-center">
        <p>Author: ${details[0].author.name ? details[0].author.name : 'No Name Found'}</p>
        <img style="width: 50px;" src="${details[0].author?.img ? details[0].author.img : 'No Image Found'}" alt="">
        <p>Publish Date: ${details[0].author.published_date ? details[0].author.published_date : 'No Date Found'}</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="tex-warning">Rating: ${details[0].rating ? details[0].rating.number : 'Not Rated Yet'}</p>
        <p>Total Views: <i class="bi bi-eye"></i> ${details[0].total_view ? details[0].total_view : 'No View Yet'}</p>
      </div>
      
      <div>
      <div class="text-center"> <img src="${details[0].thumbnail_url ? details[0].thumbnail_url : 'No Thumbnail Found'}" alt=""></div>
        <h3>Details:</h3>
        <p><small>${details[0].details ? details[0].details.slice(0,1000) + '....' : 'Nothing Found'}</small></p>
      </div>
  `
}

categoryLoader();
