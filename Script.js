const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
const inputTransactionQuantity = document.querySelector('#quantity')

//local storage
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}
//valor salvo na local storage
const addTransactionIntoDOM = ({ amount, name, id, quantity }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const multi = amount * quantity
    const amountWithoutOperator = Math.abs(multi)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `${name}
    <span> R$ ${operator}${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`

    transactionsUl.prepend(li)
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2))
const getIncomes = transactionsAmounts => transactionsAmounts
.filter(value => value > 0)
.reduce((accumulator, value) => accumulator + value, 0)
.toFixed(2)
const getTotal = transactionsAmounts => transactionsAmounts
.reduce((accumulator, transaction) => accumulator + transaction, 0)
.toFixed(2)


const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({ calculo }) => calculo)
    const total = getTotal(transactionsAmounts)
    const income = getIncomes(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ -${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()
//atualizar Localstorage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount, transactionQuantity) => {
    transactions.push({
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount),
        quantity: Number(transactionQuantity),
        calculo: amount.value * quantity.value
    })
    
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
    inputTransactionQuantity.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const transactionQuantity = inputTransactionQuantity.value.trim()
    const inputEmpty = transactionName === '' || transactionAmount === '' || transactionQuantity === ''

    if (inputEmpty) {
        alert('Por favor digite o nome, o valor e a quantidade do produto')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount, transactionQuantity)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)