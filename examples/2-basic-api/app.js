const result = document.querySelector('.result');

const fetchData = async () => {
  // console.log('Second Example');
  try {
    const { data } = await axios.get('/api/2-basic-api');
    const products = data
      .map((product) => {
        // console.log(product);
        const {
          image: { url },
          price,
          name,
        } = product;
        return `<article class="product">
      <img
        src="${url}"
        alt="${name}"
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </article>`;
      })
      .join('');
    result.innerHTML = products;
    // console.log(data);
    // result.innerHTML = `<h2>Success</h2>`;
  } catch (error) {
    result.innerHTML = `<h4>There was an error. Plase try leter again</h4>`;
  }
};
fetchData();
