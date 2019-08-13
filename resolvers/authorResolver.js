import authors from './../model/author';

export const getAllAuthors = () => {
  return authors;
};

export const findAuthorById = value => {
  const result = authors.find(author => author.id === value.id);
  return result;
};

export const findBookAuthor = book => {
  return authors.find(author => author.id === book.authorId);
};

export const addAuthor = data => {
  const author = { id: authors.length + 1, name: data.name };
  authors.push(author);
  return author;
};
