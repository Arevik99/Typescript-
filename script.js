'use strict';

let range = {
    from: 0,
    to: 10
}
range[Symbol.iterator] = function () {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current < this.last) {
                return { done: false, value: this.current++ }
            }
            else {
                return { done: true }
            }
        }
    }
}
// let iterator = range[Symbol.iterator]();
// while(true){
//     let result = iterator.next();
//     if(result.done) break;
//     console.log(result.value);
// }
// function longestSubstring(str) {
//     var longest = '';
//     var current = '';
//     for (var i = 0; i < str.length; i++) {
//       if (current.indexOf(str[i]) === -1) {
//         current += str[i];
//       } else {
//         if (current.length > longest.length) {
//           longest = current;
//         }
//         current = str[i];
//       }
//     }
//     return longest;
// }
let fun = function (str) {
    let supText = "";
    let rez = "";
    let el = str[0];
    let x = 1;
    let y = 0;

    for (let i = 0; i < str.length - 1; i++) {
        if (el != str[i + 1]) {
            supText += str[i + 1];
            x++;
            if (x >= y) {
                y = x;
                rez = supText;
            }
            if (x >= 2) {
                el = str[i + 1];
            }
        }
        else {
            supText = "" + str[i];
            el = str[i];
            x = 1;
        }
    }
    return rez;
}
console.log(fun("afgfhyt"));
function reArrange(arr) {
    let countsArray = [];
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let k = 0; k < arr.length; k++) {
            let isDifferent = false;
            if (k !== i) {
                for (let j = 0; j < arr[i].length; j++) {
                    if (arr[k][j] !== arr[i][j]) {
                        if (!isDifferent) {
                            count++;
                            isDifferent = true;
                        }
                    }
                }
            }
        }
            countsArray.push(count);
    }
    countsArray.sort();
    if(countsArray[0] ===1 && countsArray[1] ===1 && !countsArray.splice(0,2).contains(1)){
return true;
    }
    else {return false;}
}
console.log(reArrange(["aca", "abd", "abb", "acb"]));
async function tableCall() {
    let prom = await fetch("https://dummyjson.com/products");
    let data = (await prom).json();
    let obj = await data;
        let page = document.createElement("div");
        page.className = "page";
        let dropDown = document.createElement("div");
        dropDown.className = "dropDown";
        let tableBlock = document.createElement("div");
        tableBlock.className = "tableBlock";


        let title = Object.keys(obj.products[0]);
        let tr = document.createElement("tr");
        let table = document.createElement("table");

        for (let i = 1; i < 4; i++) {
            let th = document.createElement("th");
            th.innerText = title[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);

        let nav = document.createElement("nav");
        let menu = document.createElement("menu");
        let menuitem = document.createElement("div");
        let menuValue = document.createElement("menu");
        menuitem.id = "demo1";
        let aHeader = document.createElement("a");
        aHeader.innerText = "Products";
        menuitem.appendChild(aHeader);

        for (let i = 0; i < obj.products.length; i++) {
            let value = Object.values(obj.products[i]);
            let tr = document.createElement("tr");

            for (let j = 0; j < value.length - 2; j++) {
                let td = document.createElement("td");
                if (j == 1) {
                    let menuitemValue = document.createElement("div");

                    let a = document.createElement("a");
                    a.type = "button";
                    a.id = i + 1;
                    a.innerText = value[j];
                    a.addEventListener("click", addProducts);
                    menuitemValue.appendChild(a);
                    menuValue.appendChild(menuitemValue);
                }
                td.innerText = value[j];
                if (j <= 3) {
                    td.className = "columns"
                }
                tr.appendChild(td);
            }

            menuitem.appendChild(menuValue);
            menu.appendChild(menuitem);
            nav.appendChild(menu);

            function addProducts(event) {
                document.getElementById(i + 1).remove();
                let trValue = document.createElement("tr");
                trValue.id = i + 1;
                let subText = document.createElement("div");
                subText.className = "noneSubTextStyle";
                subText.id = (i + 1) * -1;
                for (let j = 4; j < title.length - 2; j++) {
                    subText.innerText += title[j] + ": " + value[j] + ", ";
                }
                let buttonDelete = document.createElement("button");
                buttonDelete.id = i + 1;
                buttonDelete.className = "DeleteButton";
                buttonDelete.innerText = "Delete";
                buttonDelete.addEventListener("click", deleteButton);
                for (let i = 1; i < 4; i++) {
                    let td = document.createElement("td");
                    td.innerText = value[i];
                    trValue.appendChild(td);
                }
                trValue.appendChild(buttonDelete);
                trValue.addEventListener("mouseover", hoverRow);
                trValue.addEventListener("mouseout", outHoverRow);
                trValue.appendChild(subText);
                table.appendChild(trValue);
                
            };

            function hoverRow(event) {
                document.getElementById((i + 1) * -1).className = "subTextStyle";
            }

            function outHoverRow(event) {
                document.getElementById((i + 1) * -1).className = "noneSubTextStyle";
            }
            function deleteButton(event) {
                let a = document.createElement("a");
                let menuitemValue = document.createElement("div");
                document.getElementById(i + 1).remove();
                a.type = "button";
                a.id = i + 1;
                a.addEventListener("click", addProducts);
                a.innerText = obj.products[i].title;
                menuitemValue.appendChild(a);

                if (i + 1 == 1) {
                    menuValue.insertBefore(menuitemValue, menuValue.firstChild);
                }
                else if(i + 1 == obj.products.length){
                    menuValue.appendChild(menuitemValue);
                }
                else{
                    let el = document.getElementById(i + 2);
                    let type = el.type;
                    let k = 1;
                    while (el.type != "button") {
                        el = document.getElementById(i + 2 + k);
                        if (i + 1 + k == obj.products.length) {
                            menuValue.appendChild(menuitemValue);
                        }
                        k++;
                    } 
                    menuValue.insertBefore(menuitemValue, el.parentNode);
                }
            }
        }


        document.querySelector('h1').remove();
        dropDown.appendChild(nav)
        page.appendChild(dropDown);
        tableBlock.appendChild(table);
        page.appendChild(tableBlock);
        document.body.appendChild(page);

        let button = document.createElement("button");
        button.innerText = "Remove";
        button.className = "btn";
        tableBlock.insertBefore(button, tableBlock.firstChild);
        function clickRemove(event) {
            table.remove();
            button.remove();
            nav.remove();
            createButtonTable();
        };
        button.addEventListener("click", clickRemove);
    }

    function createButtonTable() {
        let button = document.createElement("button");
        button.innerText = "Enter";
        button.className = "btn";
        document.body.appendChild(button);
        function clickEnter() {
            button.remove();
            let h1 = document.createElement("h1");
            h1.innerText = "Products table coming soon...";
            document.body.appendChild(h1);
            tableCall();
        }
        button.addEventListener("click", clickEnter);
    }

createButtonTable();