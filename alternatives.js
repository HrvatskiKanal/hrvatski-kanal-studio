const searchInput = document.getElementById('projectSearch');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const emptyState = document.getElementById('emptyState');
const projectCount = document.getElementById('projectCount');
let activeFilter = 'all';

function applyFilters() {
  const query = (searchInput?.value || '').trim().toLocaleLowerCase('hr-HR');
  let visible = 0;

  cards.forEach((card) => {
    const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
    const textMatches = !query || card.dataset.search.includes(query) || card.textContent.toLocaleLowerCase('hr-HR').includes(query);
    const show = categoryMatches && textMatches;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (projectCount) projectCount.textContent = String(visible);
  if (emptyState) emptyState.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    applyFilters();
  });
});

searchInput?.addEventListener('input', applyFilters);
applyFilters();
