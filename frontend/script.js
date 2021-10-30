// GET
const grphql = async () => {
  const query = `
    query {
        getBooks {
           id
           name
           author
        }
      }
    `;
  const json = await fetch("http://localhost:777", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await json.json();
  console.log(data.data.getBooks);
};

// POST
const grphqlPost = async () => {
  const query = `
    mutation($name: String!, $author: String!) {
        createBook(name: $name, author: $author) {
           id
           name
           author
        }
    }
    `;
  const variables = { name: "Boy ota", author: "Sirojiddin" };
  const json = await fetch("http://localhost:777", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await json.json();
  console.log(data.data.createBook);
};

// PUT
const grphqlPut = async () => {
  const query = `
    mutation($updateBookId: Int!, $name: String!, $author: String!){
        updateBook(id: $updateBookId, name: $name, author: $author) {
           id
           name
           author
        }
    }
    `;
  const variables = { updateBookId: 6, name: "Boy aka", author: "Durdona" };
  const json = await fetch("http://localhost:777", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await json.json();
  console.log(data.data.updateBook);
};

// DELETE
const grphqlDelete = async () => {
  const query = `
    mutation($deleteBookId: Int!){
        deleteBook(id: $deleteBookId) {
           id
           name
           author
        }
    }
    `;
  const variables = { deleteBookId: 5 };
  const json = await fetch("http://localhost:777", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await json.json();
  console.log(data.data.deleteBook);
};
grphql();
grphqlDelete();
grphqlPost();
grphqlPut();
grphql();
