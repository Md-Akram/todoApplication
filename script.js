let all = document.querySelector('.all')
let active = document.querySelector('.active-span')
let completed = document.querySelector('.completed')
let clear = document.querySelector('.clear')

all.addEventListener('click', () => {
    getData()
    all.classList.add('active')
    active.classList.remove('active')
    completed.classList.remove('active')
})
active.addEventListener('click', () => {
    all.classList.remove('active')
    active.classList.add('active')
    completed.classList.remove('active')
    db.collection('Items').where('status', "==", 'active')
        .get()
        .then((querySnapshot) => {
            let items = []
            querySnapshot.forEach(doc => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            generateItems(items)
        })
        .catch((error) => {
            console.log(error)
        })

})
completed.addEventListener('click', () => {
    all.classList.remove('active')
    active.classList.remove('active')
    completed.classList.add('active')
    db.collection('Items').where('status', "==", 'completed')
        .get()
        .then((querySnapshot) => {
            let items = []
            querySnapshot.forEach(doc => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            generateItems(items)
        })
        .catch((error) => {
            console.log(error)
        })
})
clear.addEventListener('click', () => {
    deleteCompleted()
})


function addItem(e) {

    e.preventDefault();
    const text = document.getElementById('todo-input')
    db.collection('Items').add({
        text: text.value,
        status: 'active'
    })
    text.value = ''
}

function getData() {

    db.collection('Items').onSnapshot((snapshot) => {
        let items = []
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        });
        generateItems(items)
    })

}

function generateItems(items) {

    let numOfItem = items.length
    let numSpan = document.querySelector('.number')
    numSpan.textContent = numOfItem
    let itemsHTML = ''
    items.forEach((item) => {
        itemsHTML += `
        <div class="todo-item ${item.status == 'completed' ? 'checked' : ''}" data-id=${item.id}>
          <div class="check">
            <div class="check-mark ${item.status == 'completed' ? 'checked' : ''}">
              <img src="images/icon-check.svg" alt="check">
            </div>
          </div>
          <div class="todo-text ${item.status == 'completed' ? 'checked' : ''}">
            ${item.text}
          </div>
        </div>
        `
    })
    document.querySelector('.todo-items').innerHTML = itemsHTML
    createEventListener()
}

function createEventListener() {

    let todoItems = document.querySelectorAll('.todo-item')
    todoItems.forEach(todoItem => {
        todoItem.addEventListener('click', () => {

            markCompleted(todoItem.dataset.id)
        })
    });

}

function markCompleted(id) {

    let item = db.collection('Items').doc(id);
    item.get().then((doc) => {
        if (doc.exists) {
            let status = doc.data().status;
            if (status == 'active') {
                item.update({
                    status: 'completed'
                })
            } else if (status == 'completed') {
                item.update({
                    status: 'active'
                })
            }
        }
    })
}

function deleteCompleted() {

    let itemsToDelete = document.querySelectorAll('.todo-item.checked')


    itemsToDelete.forEach((item) => {
        db.collection("Items").doc(item.dataset.id).delete().then(() => {
            all.classList.add('active')
            active.classList.remove('active')
            completed.classList.remove('active')
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    })
}



getData()
