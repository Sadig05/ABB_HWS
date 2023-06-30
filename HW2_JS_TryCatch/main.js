const books = [
    {
        author: "Lucy Foley",
        name: "List of Invitees",
        price: 70
    },
    {
        author: "Susanna Clarke",
        name: "Jonathan Strange & Mr Norrell",
    },
    {
        name: "Design. A Book for Non-Designers.",
        price: 70
    },
    {
        author: "Alan Moore",
        name: "Neonomicon",
        price: 70
    },
    {
        author: "Terry Pratchett",
        name: "Moving Pictures",
        price: 40
    },
    {
        author: "Angus Hyland",
        name: "Cats in Art",
    }
];


const root = document.querySelector('#root');
const list = document.createElement('ul');
books.forEach(item => {
    const li = document.createElement('li');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const price = document.createElement('p');

    try{
        if(item.name && item.author && item.price){
            name.textContent = item.name;
            author.textContent = item.author;
            price.textContent = item.price;
            li.appendChild(name)
            li.appendChild(author)
            li.appendChild(price)
            list.appendChild(li)
            root.appendChild(list)
        } else{
            throw new TypeError(`Missing field: ${!item.name ? 'name' : !item.author ? 'author' : 'price'}`);
        }
    }
    catch(error){
        console.log(error);
    }
})
