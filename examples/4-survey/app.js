const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/4-survery');
    const reponse = data
      .map((vote) => {
        const { room, votes, id } = vote;
        return `<li>
      <div class="key">
      ${room.toUpperCase().substring(0, 2)}
      </div>
      <div>
      <h4>${room}</h4>
      <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
      </div>
      <button data-id="${id}">
      <i class="fas fa-vote-yea"></i>
      </button>
      </li>`;
      })
      .join('');
    result.innerHTML = reponse;
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};
//fetchData
window.addEventListener('load', () => {
  fetchData();
});

//increase votes
const modifyData = async (votes) => {
  title.textContent = 'Loading...';
  try {
    const { data } = await axios.put(`/api/4-survery`, { id, votes });
    const newVotes = data.fields.votes;
    return newVotes;
  } catch (error) {
    // console.log(error.response);
    return null;
  }
};

result.addEventListener('click', async (e) => {
  console.log(e.target);
  if (e.target.classList.contains('fa-vote-yea')) {
    const btn = e.target.parentElement;
    const id = btn.dataset.id;
    // console.log(id);
    const voteNode = result.querySelector(`.vote-${id}`);
    // console.log(voteNode);
    const votes = voteNode.dataset.votes;
    const newVotes = await modifyData(id, votes);
    title.textContent = 'Survery';
    if (newVotes) {
      //upisuje glasove
      voteNode.textContent = `${votes} votes`;
      //povecava broj glasova
      voteNode.dataset.votes = newVotes;
    }
  }
});
