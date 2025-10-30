const SORT = {
  ASC: 'asc',
  DESC: 'desc',
};

export function sortByDate(data, sortOrder) {
  console.log(sortOrder)
  const order = sortOrder.toLowerCase();
  if (order === SORT.ASC) {
    data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  if (order === SORT.DESC) {
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return data;
}

export function applyLimit(data, limit) {
  if (!limit) return data;
  return data.slice(0, parseInt(limit));
}
