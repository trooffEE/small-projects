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
            this.budgetValue.textContent = +this.budgetValue.textContent + (+value);
            this.incomeInput.value = "";
            this.showBallance();
        }
    }

    submitConsumptionForm() {
        const value = this.consumptionInputValue.value;
        if (value > 0 && value != "") {
            this.consumptionValue.textContent = +this.consumptionValue.textContent + (+value);
            this.consumptionInputValue.value = "";
            this.showBallance();
        }
    }

    showBallance() {
        this.balanceValue.textContent = this.calcCurrentBalance();
    }

    calcCurrentBalance() {
        const budgetValue = this.budgetValue.textContent;
        const consumptionValue = this.consumptionValue.textContent;
        
        return +budgetValue - (+consumptionValue);
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
    consumptionsList.addEventListener("click", () => {

    });
}

document.addEventListener("DOMContentLoaded", () => {
    eventListeners();
});




