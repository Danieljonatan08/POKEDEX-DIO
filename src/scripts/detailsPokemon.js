const links = document.querySelectorAll('nav a');
const tabs = document.querySelectorAll('.tab-content');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-tab');

    // Remove 'active' de todos os links e abas
    links.forEach(l => l.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    // Adiciona 'active' ao link clicado e à aba correspondente
    link.classList.add('active');
    document.querySelector(`.${target}`).classList.add('active');
  });
});
