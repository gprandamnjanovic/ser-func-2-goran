const results = document.querySelector('.result');

const fetchData = async () => {
  // console.log('fetch data');
  try {
    // const { data } = await axios.get('/.netlify/functions/1-hello');
    const { data } = await axios.get('/api/1-hello');
    console.log(data);
    results.textContent = data;
  } catch (error) {
    console.log(error.response.data);
    results.textContent = error.response.data;
  }
};

fetchData();
