const getBUtton = document.getElementById('get');
const postButton = document.getElementById('post');

getBUtton.addEventListener('click' , () => {
    fetch('http://localhost:3000/feed/POST')
    .then(result => result.json())
    .then(res => {
        console.log(res);
    })
    .catch(errr => console.log(err));
})

postButton.addEventListener('click' , () => {
    fetch('http://localhost:3000/feed/post',{
        method : 'POST',
        body: JSON.stringify({ // stringify to convert arrau ofr an string to JSON
            title : "this is First POST",
            content : "this is content to First POST"
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(res => {
        console.log(res);
    })
    .catch(errr => console.log(err));
})