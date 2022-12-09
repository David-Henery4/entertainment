// SEARCH ARRAY FUNCTIONALITY

const handleSearch = (query, contentArray) => {
  if (query.length > 0) {
    const queriedItems = contentArray.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return queriedItems
  }
};

export default handleSearch