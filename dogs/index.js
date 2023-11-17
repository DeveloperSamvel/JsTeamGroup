function showDog(elementsBox) {
    let breed = "";
    if (elementsBox[elementsBox.selectedIndex].value) {
        breed = elementsBox[elementsBox.selectedIndex].value;
    }

    if (breed === "") {
        document.querySelector("#imgResult").querySelector("img").setAttribute('src', "./images/choose.png");
        return;
    }


    breed = breed.replace('-', '/');
    const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };

    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.text());
            }

            return response.json()
        })
        .then(data => {
            let img = document.querySelector("#imgResult").querySelector("img");
            img.onerror = function() {
                alert('Ошибка загрузки изображения');
                img.setAttribute('src', './images/choose.png');
            };
            img.setAttribute('src', data.message);
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}

function getListAllBreeds() {
    const apiUrl = 'https://dog.ceo/api/breeds/list/all';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };


    return fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.json());
            }

            return response.json()
        })
        .then(data => {
            let breeds = data.message;
            if(breeds) {
                let newOption = document.createElement("option");
                const newContent = document.createTextNode("-- Select a breed --");
                newOption.setAttribute("value", '');
                newOption.appendChild(newContent);
                document.querySelector("#listAllBreeds").appendChild(newOption);

                for (const bread in breeds) {
                    if (breeds[bread].length) {
                        for (const item of breeds[bread]) {
                            let newBreadInForEach = document.createElement("option")
                            const newContentInForEach = document.createTextNode(`${item} ${bread}`);
                            newBreadInForEach.setAttribute("value", `${bread}-${item}`);
                            newBreadInForEach.appendChild(newContentInForEach);
                            document.querySelector("#listAllBreeds").appendChild(newBreadInForEach);
                        }
                    }
                    else {
                        let newBreadInForEach = document.createElement("option")
                        const newContentInForEach = document.createTextNode(bread);
                        newBreadInForEach.setAttribute("value", bread);
                        newBreadInForEach.appendChild(newContentInForEach);
                        document.querySelector("#listAllBreeds").appendChild(newBreadInForEach);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}

function loading() {
    var mainToHide = document.body.children[0];
    mainToHide.style.display = 'none';


    window.onload = function() {
        mainToHide.style.display = '';
        document.querySelector('#loader').style.display = 'none';
        getListAllBreeds();
    }
}

loading();