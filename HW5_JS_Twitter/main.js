const user1 =  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
}

function showLoader() {
    document.querySelector('.loader-container').style.display = 'flex';
}

function hideLoader() {
    document.querySelector('.loader-container').style.display = 'none';
}


const addPostBtn = document.querySelector('#add-post');
const addPostForm = document.querySelector("#add-post-form"); 
const dialog = document.querySelector('#post-form-dialog');


function addPostToFeed(user, post) {
    const card = new Card(user, post);
    const cardElement = card.render();
    cardElement.setAttribute('data-post-id', post.id);
    const feedElement = document.getElementById('feed');
    feedElement.prepend(cardElement);
}

const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    

    fetch('https://ajax.test-danit.com/api/json/posts', {
        method: "POST",
        body: JSON.stringify(
            {
                id: new Date().valueOf(),
                userId: 1,
                ...formProps,
            }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then(data => {
        addPostToFeed(user1, data)
        dialog.open = false;
    })
   
  };

addPostForm.addEventListener("submit", handleSubmit);

function addPost () {
    dialog.show()
    dialog.style.display = 'block'

}


class Card {
    constructor(user, post) {
        this.user = user;
        this.post = post;
    }

    render() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.textContent = `${this.user.name} ${this.user.username} (${this.user.email})`;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = this.post.title;

        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.textContent = this.post.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => this.deleteCard());

        cardDiv.appendChild(userDiv);
        cardDiv.appendChild(titleDiv);
        cardDiv.appendChild(textDiv);
        cardDiv.appendChild(deleteButton);

        return cardDiv;
    }

    deleteCard() {
        // Send DELETE request to the server for this post
        fetch(`https://ajax.test-danit.com/api/json/posts/${this.post.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // If the deletion was successful, remove the card from the page
                const cardElement = document.querySelector(`[data-post-id="${this.post.id}"]`);
                cardElement.remove();
            }
        })
        .catch(error => console.error(error));
    }
}

showLoader();

try{

Promise.all([
    fetch('https://ajax.test-danit.com/api/json/users'),
    fetch('https://ajax.test-danit.com/api/json/posts')
])
.then(responses => Promise.all(responses.map(response => response.json())))
.then(data => {
    const [users, posts] = data;

    const feedElement = document.getElementById('feed');
    posts.forEach(post => {
        const user = users.find(user => user.id === post.userId);
        const card = new Card(user, post);
        const cardElement = card.render();
        cardElement.setAttribute('data-post-id', post.id);
        feedElement.appendChild(cardElement);
    });
    hideLoader()
})
.catch(error => console.error(error));

} catch (error){
    console.log(error);
}
