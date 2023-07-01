const books = [{
        author: "Lucy Foley",
        name: "List of Invitees",
        price: 70,
    },
    {
        author: "Susanna Clarke",
        name: "Jonathan Strange & Mr Norrell",
    },
    {
        name: "Design. A Book for Non-Designers.",
        price: 70,
    },
    {
        author: "Alan Moore",
        name: "Neonomicon",
        price: 70,
    },
    {
        author: "Terry Pratchett",
        name: "Moving Pictures",
        price: 40,
    },
    {
        author: "Angus Hyland",
        name: "Cats in Art",
    },
];

const findAllUniqueFields = (books) => {
    const uniqueFields = [];
    books.forEach((item) => {
        Object.keys(item).forEach((key) => {
            if (!uniqueFields.includes(key)) {
                uniqueFields.push(key);
            }
        });
    });

    return uniqueFields;
};

const fields = findAllUniqueFields(books);

const validateBook = (book) => {
    try {
        fields.forEach((item) => {
            if (!Object.keys(book).includes(item)) {
                throw new TypeError(`Missing property "${item}" in the book object.`);
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

const createBookList = (books) => {
    const root = document.querySelector("#root");
    const list = document.createElement("ul");

    books.forEach((item) => {
        if (validateBook(item)) {
            const li = document.createElement("li");
            const bookDetails = Object.entries(item)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
            li.textContent = bookDetails;
            list.appendChild(li);
        }
    });

    root.appendChild(list);
};

createBookList(books);