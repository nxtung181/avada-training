const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async (limit = 8) => {
  const response = await fetch(`${API_URL}?limit=${limit}`);
  return response.json();
};

export const createTodo = async (title) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return true;
};

export const updateTodo = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json()
};
