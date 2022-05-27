const results = document.querySelector('.result');

const fetchSingleProduct = async () => {
  // console.log('Single Product!');
  results.innerHTML = `<h2>Loading...</h2>`;
  try {
    const id = window.location.search;
    // console.log(id);
    // const {
    //   data: { fields },
    // } = await axios.get(`/api/3-product${id}`);
    const {
      data: { fields },
    } = await axios.get(`/api/3-z-complete${id}`);
    const { name, price, image, desc } = fields;
    results.innerHTML = ` <h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src="${image[0].url}"
    alt="${name}"
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="price">$${price}</h5>
      <p class="desc">${desc}</p>
    </div>
  </article>`;
    // console.log(data);
  } catch (error) {
    results.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};
fetchSingleProduct();
