const getImageUrl = (path) => {
  if (!path) return null;
  const base = process.env.REACT_APP_API_URL || '';
  return `${base}${path}`;
};

export default getImageUrl;
