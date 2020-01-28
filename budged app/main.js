class UI {
    constructor() {
        this.incomeInput = document.querySelector("#income-input");
        this.consumptionInputName = document.querySelector("#consumption-input-name");
        this.consumptionInputValue = document.querySelector("#consumption-input-value");
        this.incomeBtnForm = document.querySelector("#confirm-btn-income");
        this.consumptionBtnForm = document.querySelector("#confirm-btn-consumption");
        this.budgetValue = document.querySelector("#budget-value");
        this.consumptionValue = document.querySelector("#consumption-value");
        this.balanceValue = document.querySelector("#balance-value");
        this.consumptionList = document.querySelector(".consumption-list__list");
        this.consumptionText = document.querySelectorAll(".description");
        this.consumptionListValue = document.querySelectorAll(".consumption-list-item");
        this.editBtn = document.querySelectorAll(".btn-edit");
        this.deleteBtn = document.querySelectorAll(".btn-delete");
        this.itemList = [];
        this.itemID = 0;
    }

    submitBudgedForm() {
        const value = this.incomeInput.value;
        if (value > 0) {
            this.showCurrentIncome();
            this.incomeInput.value = "";
            this.showBallance();
        }
    }

    submitConsumptionForm() {
        const value = this.consumptionInputValue.value;
        const title = this.consumptionInputName.value;
        if (value > 0 && value != "") {
            this.consumptionInputName.value = "";
            this.consumptionInputValue.value = "";
            
            let amount = parseInt(value);
            const expense = {
                id: this.itemID,
                title: title,
                amount: amount
            };
            
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBallance();

        } else console.log("Something went wrong!");
    }

    addExpense(expense) {
        const list = this.consumptionList;
        const li = document.createElement('li');
        li.classList.add("consumption-list__list-item");
        li.innerHTML = `
        <p class="description">${expense.title}</p>
          <div class="settings">
            <span class="consumption-list-item">${expense.amount}</span>
            <a href="#" class="btn-edit" data-id="${expense.id}"><i class="fas fa-edit"></i></a>
            <a href="#" class="btn-delete" data-id="${expense.id}"><i class="fas fa-times"></i></a>
          </div>   
        `;
        list.appendChild(li);
        this.showCurrentConsumption(list.children);
    }

    showBallance() {
        const budgetValue = this.budgetValue.textContent;
        const consumptionValue = this.consumptionValue.textContent;

        this.balanceValue.textContent = +budgetValue - (+consumptionValue);
    }

    showCurrentConsumption(list) {
        let __sum__ = 0;
        Array.from(list).forEach(item => {
            const itemAmount = parseInt(item.querySelector(".consumption-list-item").textContent);
            __sum__ += itemAmount;
        });

        this.consumptionValue.textContent = __sum__;
    }

    showCurrentIncome() {
        const value = this.incomeInput.value;
        this.budgetValue.textContent = +this.budgetValue.textContent + (+value);
    }

    deleteConsumption(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;
        //remove from dom
        this.consumptionList.removeChild(parent);
        this.itemList.filter(item => {
            return item.id !== id;
        });
        this.showCurrentConsumption(this.consumptionList.children);
        this.showBallance();
    }

    editConsumption(element) { 
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;
        //remove from dom
        this.consumptionList.removeChild(parent);
        let expense = this.itemList.filter(item => {
            return item.id === id;
        });
        // changing expense name
        this.consumptionInputName.value = expense[0].title;
        // changing expense amount
        this.consumptionInputValue.value = expense[0].amount;
    }
}

function eventListeners() {
    const incomeForm = document.querySelector(".income-form");
    const consumptionForm = document.querySelector(".consumption-form");
    const consumptionsList = document.querySelector(".consumption-list__container");

    // new instance of UI class 
    const ui = new UI();

    // creating a bunch of e.listeners for forms
    incomeForm.addEventListener("submit", e => {
        e.preventDefault();
        ui.submitBudgedForm();
    });
    consumptionForm.addEventListener("submit", e => {
        e.preventDefault();
        ui.submitConsumptionForm();
    });
    //for list container
    consumptionsList.addEventListener("click", e => {
        if (e.target.parentElement.classList.contains('btn-edit')) {
            ui.editConsumption(e.target.parentElement);
        } else if (e.target.parentElement.classList.contains('btn-delete')) {
            ui.deleteConsumption(e.target.parentElement);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    eventListeners();
});




