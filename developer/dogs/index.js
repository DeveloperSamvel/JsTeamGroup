function getDog(elementsBox) {
    let breed = "";
    if (elementsBox[elementsBox.selectedIndex].value) {
        breed = elementsBox[elementsBox.selectedIndex].value;
    }

    if (breed === "") {
        document.querySelector("#imgResult").querySelector("img").setAttribute('src', "");

        return;
    }

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
            document.querySelector("#imgResult").querySelector("img").setAttribute('src', data.message);
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
            if(data.message) {
                let arrOption = Object.keys(data.message);
                let newOption = document.createElement("option");
                const newContent = document.createTextNode("-- Select a breed --");
                newOption.setAttribute("value", '');
                newOption.appendChild(newContent);
                document.querySelector("#listAllBreeds").appendChild(newOption);
    
                arrOption.forEach((option) => {
                    let newOptionInForEach = document.createElement("option")
                    const newContentInForEach = document.createTextNode(option);
                    newOptionInForEach.setAttribute("value", option);
                    newOptionInForEach.appendChild(newContentInForEach);
                    document.querySelector("#listAllBreeds").appendChild(newOptionInForEach);
                });

                console.log("option typeof", Object.keys(data.message));
            }
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}

getListAllBreeds();