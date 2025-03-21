const container = document.querySelector("#container")
const modal = document.querySelector("#modal")
const button = document.querySelector("#button")
const names = document.querySelector("#name")
const page = document.querySelector("#page")
const author = document.querySelector("#author")
const closeButton = document.querySelector("#close")
const form = document.querySelector("#form")


button.addEventListener("click", ()=>modal.showModal())

closeButton.addEventListener("click", ()=>modal.close())

form.addEventListener("submit", (event)=> {
    
    event.preventDefault()
    let isChecked = document.querySelector("#read").checked
    let uid = crypto.randomUUID()
    createBook(uid, names.value, author.value, page.value, isChecked)
    form.reset()
    modal.close()
    createDiv(uid, isChecked)
    
})

let array = []

function Book(id, name, author, page, check){
    this.id = id
    this.name = name
    this.author = author
    this.page = page
    this.check = check
}

function createBook(id, name, author, page, checked){

    let newBook
    if(checked){
        newBook = new Book(id,name, author, page, "Read")
    }else{
        newBook = new Book(id,name, author, page,"Unread")
    }
    
    array.push(newBook)
}

function createDiv(uid, isChecked){
    
    const div = document.createElement("div")
    div.setAttribute("id",uid)
    div.className = 'created'
    container.appendChild(div)
    
    const nameDiv = document.createElement("div")
    const authorDiv = document.createElement("div")
    const pageDiv = document.createElement("div")
           
    nameDiv.textContent = `Name : ${array[array.length-1].name}`
    authorDiv.textContent = `Author : ${array[array.length-1].author}`
    pageDiv.textContent = `Pages : ${array[array.length-1].page}`

    div.appendChild(nameDiv)
    div.appendChild(authorDiv)
    div.appendChild(pageDiv)
    

    const buttonDiv = document.createElement("div")
    const readButton = document.createElement("button")
    const removeButton = document.createElement("button")

    buttonDiv.className = 'buttonDiv'
    readButton.className = 'readButton'

    if(isChecked){

        readButton.textContent = "Read"

    }else{

        readButton.textContent = "unRead"
        readButton.style.backgroundColor = "red"

    }

    removeButton.className = 'removeButton'
    removeButton.textContent = "x"
    buttonDiv.appendChild(readButton)
    buttonDiv.appendChild(removeButton)
    div.appendChild(buttonDiv)
    
    readButton.addEventListener("click",function(){
        if(readButton.textContent == "Read"){
            readButton.textContent = "unRead"
            readButton.style.backgroundColor = "red"
            array.forEach(function(prop){
                if(prop.id == div.id){
                    prop.check = "UnRead"
                }
            })
        }else{
            readButton.textContent = "Read"
            readButton.style.backgroundColor = "green"
            array.forEach(function(prop){
                if(prop.id == div.id){
                    prop.check = "Read"
                }
            })
        }
    })

    removeButton.addEventListener("click", function(){
        array.forEach(function(prop){
            if(prop.id == div.id){
                array.splice(array.indexOf(prop),1)
            }
        })
        div.remove()
    })
}

