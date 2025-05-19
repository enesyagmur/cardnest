export const getCollectionList = () => {
  const rawData = localStorage.getItem("collectionList");
  const data = JSON.parse(rawData) || [];
  return data;
};
