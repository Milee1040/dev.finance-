const Modal= {
    open(){
        document
        .querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        document
        .querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '18/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '18/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '18/01/2021',
    }
]

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)
    }

    incomes() {
        let income = 0;
        Transactions.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },
    expanses() {
        let expanse = 0;
        Transactions.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expanse += transaction.amount;
            }
        })
        return expanse;
    },
    total() {
        return Transaction.incomes() + Transaction.expanses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expanse"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        `
        return html 
    } ,

    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expanseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expanses())
        document.getElementById('totalDisplay')
        .innerHTML =Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")
        value = Number(value) /100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()

Transaction.add({
    
})