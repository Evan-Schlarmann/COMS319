
console.log("This is a static file!")
const trashcans = document.querySelectorAll("button.delete")
trashcans.forEach(trashcan => {
    trashcan.addEventListener('click', (event) => {
        const url = `/donations/${trashcan.dataset.doc}`

        fetch(url, {
            method: 'DELETE'
        }).then((response) =>  response.json())
        .then((data) => window.location.href = data.redirect)
        .catch((err) => console.log(err))
        
    });			
})