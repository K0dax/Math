'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () =>{
    document.getElementById('modal').classList.remove('active')
    cleanInputs()
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_product')) ?? []
const setLocalStorage = (dbProduct) => localStorage.setItem("db_product", JSON.stringify(dbProduct))

//CRUD CREATE
const createProduto = (product) => {
    const dbProduct = getLocalStorage()
    dbProduct.push(product)
    setLocalStorage(dbProduct)
}

//CRUD READ
const readProduct = () => getLocalStorage()

const updateProduct = (index, product) => {
    const dbProduct = readProduct()
    dbProduct[index] = product
    setLocalStorage(dbProduct)
}

//CRUD DELETE
const deleteProduct = (index) => {
    const dbProduct = readProduct()
    dbProduct.splice(index, 1)
    setLocalStorage(dbProduct)
}

//inputs modal form
const cleanInputs = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação
const saveProduct = () => {
    debugger
    if (isValidFields()){
        const product = {
            nome: document.getElementById('name').value,
            compra: Number(document.getElementById('compra').value),
            venda: Number(document.getElementById('venda').value),
            qnt: Number(document.getElementById('qnt').value),
            lucro: Number(venda.value - compra.value),
            subt:  (venda.value - compra.value)* qnt.value
        }
        const index = document.getElementById('name').dataset.index
        if(index == 'new'){
            createProduto(product)
            updateTable()
            closeModal()
        }else{
            updateProduct(index, product)
            updateTable()
            closeModal()
        }
            
    }
}

//inserindo produtos na tabela
const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    const subt = product.lucro * product.qnt
    const subt2 = product.venda * product.qnt
    newRow.innerHTML = `<td data-title="Nome">${product.nome}</td>
    <td data-title="Lucro Unidade">${product.lucro}</td>
    <td data-title="Qnt vendida">${product.qnt}
    </td>
    <td data-title="Sub lucro">R$ ${subt}</td>
    <td data-title="Subt Bruto">R$ ${subt2}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>`

    document.querySelector('#tbProduct>tbody').appendChild(newRow)
}


//table functions
const clearTable = () => {
    const rows = document.querySelectorAll('#tbProduct>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbProduct = readProduct()
    clearTable()
    dbProduct.forEach(createRow)
}

updateTable()

const fillFields = (product) => {
    document.getElementById('name').value = product.nome
    document.getElementById('venda').value = product.venda
    document.getElementById('compra').value = product.compra
    document.getElementById('qnt').value = product.qnt
    document.getElementById('name').dataset.index = product.index
}

const editProduct = (index) => {
    const product = readProduct()[index]
    product.index = index
    fillFields(product)
    openModal()
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        if(action == 'edit'){
            editProduct(index)
        }else{
            deleteProduct(index)
            updateTable()
        }
    }
}

//Eventos
document.getElementById('cadastro')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
    
document.getElementById('salvar')
    .addEventListener('click', saveProduct)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.querySelector('#tbProduct>tbody')
    .addEventListener('click', editDelete)
