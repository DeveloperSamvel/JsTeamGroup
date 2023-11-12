function getDog() {
    const apiUrl = 'https://dog.ceo/api/breed/akita/images/random';
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
            console.log("Полученные данные:", data);
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}

getDog();

// function getListAllBreeds() {
//     console.log("test");
//     const apiUrl = 'https://dog.ceo/api/breeds/list/all';
//     const options = {
//         method: 'GET',
//         headers: {
//     'Content-Type': 'text/plain;charset=UTF-8'
            // }
//     };

//     return fetch(apiUrl, options)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.json());
//             }

//             return response.json()
//         })
//         .then(data => {
//             // data
//             // document.getElementById("listAllBreeds") 
//             // let option = document.createElement("option");
//             // console.log("option", option);
//             // document.getElementById("listAllBreeds").appendChild(option);
//             console.log("option", data.message);
//             console.log("option", Array.from(data.message));
//             return Array.from(data.message);
//         })
//         .catch(error => {
//             console.error('Ошибка запроса:', error);
//         });
// }

// getListAllBreeds();
// let listAllBreeds = getListAllBreeds();
// console.log("listAllBreeds", listAllBreeds);