
// Variables globales
let currentFact = '';
let addFavorites = [];

// Función para mostrar notificaciones
function showNotification(message, isError = false) {
  // Remover notificación anterior si existe
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'error' : ''}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Mostrar la notificación
  setTimeout(() => notification.classList.add('show'), 100);

  // Ocultar después de 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Función para obtener datos de la API
function fetchData() {
  const dataElement = document.getElementById('data');
  dataElement.innerHTML = 'Loading curious fact...';
  
  fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      currentFact = data.text;
      dataElement.innerHTML = currentFact;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      dataElement.innerHTML = 'Sorry, could not load a fact. Please try again.';
      showNotification('Error loading fact. Please try again.', true);
    });
}

// Función para agregar a favoritos
function addToFavorites() {
  if (!currentFact) {
    showNotification('Please load a fact first!', true);
    return;
  }

  // Obtener favoritos existentes
  let storedFavorites = JSON.parse(localStorage.getItem('addFavorites')) || [];
  
  // Verificar si ya está en favoritos
  if (storedFavorites.includes(currentFact)) {
    showNotification('This fact is already in your favorites!', true);
    return;
  }

  // Agregar a favoritos
  storedFavorites.push(currentFact);
  localStorage.setItem('addFavorites', JSON.stringify(storedFavorites));
  
  showNotification('Fact added to favorites! ⭐');
  showFavorites(); // Actualizar la lista
}

// Función para mostrar favoritos
function showFavorites() {
  const tbodyElement = document.getElementById('favorites-list');
  tbodyElement.innerHTML = ''; // Limpiar contenido previo
  
  let storedFavorites = JSON.parse(localStorage.getItem('addFavorites'));
  
  if (!storedFavorites || storedFavorites.length === 0) {
    const trElement = document.createElement('tr');
    const tdElement = document.createElement('td');
    tdElement.colSpan = 2;
    tdElement.className = 'empty-message';
    tdElement.textContent = 'No favorites yet. Add some curious facts!';
    trElement.appendChild(tdElement);
    tbodyElement.appendChild(trElement);
    return;
  }

  storedFavorites.forEach((favorite, index) => {
    const trElement = document.createElement('tr');
    
    // Celda del texto
    const tdText = document.createElement('td');
    tdText.textContent = favorite;
    tdText.style.color = "white";
    
    // Celda de acciones
    const tdActions = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteFavorite(index);
    tdActions.appendChild(deleteBtn);
    
    trElement.appendChild(tdText);
    trElement.appendChild(tdActions);
    tbodyElement.appendChild(trElement);
  });
}

// Función para eliminar un favorito específico
function deleteFavorite(index) {
  let storedFavorites = JSON.parse(localStorage.getItem('addFavorites')) || [];
  storedFavorites.splice(index, 1);
  localStorage.setItem('addFavorites', JSON.stringify(storedFavorites));
  showFavorites();
  showNotification('Favorite removed!');
}

// Función para limpiar todos los favoritos
function clearAllFavorites() {
  if (confirm('Are you sure you want to clear all favorites?')) {
    localStorage.removeItem('addFavorites');
    showFavorites();
    showNotification('All favorites cleared!');
  }
}

// Cargar favoritos al cargar la página
window.addEventListener("load", function() {
  showFavorites();
  fetchData(); // Cargar un fact inicial
});

// Agregar evento de clic al elemento data para agregar a favoritos
document.addEventListener('DOMContentLoaded', function() {
  const dataElement = document.getElementById('data');
  dataElement.addEventListener('click', addToFavorites);
});
