
    var listModule = (function () {
       

        function addSection() {

            var sectionTittle = document.getElementById("sectionItem").value;
            var target = document.getElementById("container");

            //create Section Container
            var section = document.createElement("div");
            section.id = sectionTittle;
            var header = document.createElement("header");
            header.innerHTML = sectionTittle;
            header.id = "sectionHeader";
            section.appendChild(header);
            section.style.border = "1px solid grey";

            target.appendChild(section);

            //create section footer
            var footer = document.createElement("div");
            footer.id = "sectionFooter";
            var itemInput = document.createElement("input");
            itemInput.id = section.id + "Item";
            itemInput.placeholder = "Add Item...";

            var itemAddButton = document.createElement("button");
            itemAddButton.id = sectionTittle + "Button";
            itemAddButton.type = "button";
            itemAddButton.innerHTML = "New Item";
            
            footer.appendChild(itemInput);
            footer.appendChild(itemAddButton);
            
            target.appendChild(footer);
            target.style.textTransform = "capitalize";

            document.getElementById(itemAddButton.id).onclick = function () { addItem(section.id, itemInput.id) };
            
            
        }
        

        function addItem(targetId, targetItemTittle) {
            var target = document.getElementById(targetId);
            var itemTittle = document.getElementById(targetItemTittle).value;

            var checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.className = "checkBox";
            checkBox.id = itemTittle + "Box";
            
            target.appendChild(checkBox);
            
            var div = document.createElement("div");
            div.className = "itemTittle";
            div.id = itemTittle + "Div";
            
            
            div.innerHTML = itemTittle;            

            target.appendChild(div);
            target.innerHTML += "<br/>";

            document.getElementById(checkBox.id).onclick = function () { changeColor(div.id) };
        }

        function changeColor(targetId) {            
            document.getElementById(targetId).style.backgroundColor = "green";           
        }
        
        return {
            addSection: addSection,
            addItem: addItem,
            changeColor: changeColor
            

        };

    }());
    



