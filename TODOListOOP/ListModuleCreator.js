var listModule = (function () {

    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };

    var DOMElement = (function () {
        function DOMElement(tittle) {
            validateInputValue(tittle);
            this._tittle = tittle;
        }

        return DOMElement;
    }());

    var Container = (function () {
        function Container(tittle) {
            DOMElement.call(this, tittle);
        }

        function setContainerId() {           
            this._id = "container";
            return this._id;
        }
        function getContainerId() {
            return setContainerId();
        }

        Container.extends(DOMElement);

        var sectionsCollection = [];

        function createSection() {
            var sectionTittle = document.getElementById("addedSectionItem").value;

            validateInputValue(sectionTittle, "Section tittle can't be empty!");
            if (sectionsCollection.indexOf(sectionTittle) >= 0) {
                alert("You already have that section in your list");

            } else {
                sectionsCollection.push(sectionTittle);

                var target = document.getElementById(getContainerId());
                var section = document.createElement("div");
                section.id = sectionTittle;

                var header = document.createElement("header");
                header.innerHTML = sectionTittle;
                header.id = "sectionHeader";
                header.style.textAlign = "right";
                header.style.marginRight = "5px";
                header.style.fontSize = "20px";

                section.appendChild(header);
                section.style.border = "1px solid grey";

                target.appendChild(section);

                var footer = document.createElement("div");
                footer.id = "sectionFooter";

                var itemInput = document.createElement("input");
                itemInput.id = section.id + "Item";
                itemInput.placeholder = "Add Item...";
                itemInput.style.fontFamily = "Times New Roman";

                var itemAddButton = document.createElement("button");
                itemAddButton.type = "button";
                itemAddButton.id = sectionTittle + "Button";
                itemAddButton.innerHTML = "New Item";

                footer.appendChild(itemInput);
                footer.appendChild(itemAddButton);
                target.appendChild(footer);
                target.style.textTransform = "capitalize";

                document.getElementById(itemAddButton.id).onclick =
                    function () { Section.addItem(section.id, itemInput.id) };
            }
        }

        function addSection() {
            return createSection();
        }

        return {
            addSection: addSection
        }

        return Container;
    }());

    var Section = (function () {
        function Section(tittle) {
            DOMElement.call(this, tittle);
            this._id = setSectionId(tittle);
        }
        function setSectionId(value) {
            validateInputValue(value, "Tittle can't be empty!");
            this._id = value;
            return this._id;
        }
        function getSectionId() {
            return this._id;
        }

        Section.extends(DOMElement);

        var itemCollection = [];

        function addItem(targetId, targetItemTittle) {
            var target = document.getElementById(targetId);
            var itemTittle = document.getElementById(targetItemTittle).value;

            validateInputValue(itemTittle, "Item Tittle can't be empty!");
            if (itemCollection.indexOf(itemTittle) < 0) {
                itemCollection.push(itemTittle);

                var checkBox = Item.getCheckbox(itemTittle);
                var div = Item.getTextContent(itemTittle);

                target.appendChild(checkBox);
                target.appendChild(div);
                target.innerHTML += "<br/>";

                document
                    .getElementById(checkBox.id)
                    .addEventListener(
                    'click',
                    function changeColor() {
                        if (document.getElementById(checkBox.id).checked == true) {
                            document.getElementById(div.id).style.backgroundColor = "#C4FFC9";

                            Item.setStatus("completed");
                        }
                    });
            } else {
                alert("You already have that Item in this section");
            }
        }

        return {
            addItem: addItem,
        }

        return Section;
    }());

    var Item = (function () {
        function Item(tittle) {
            DOMElement.call(this, tittle);
            this.status = setStatus(status);

        }

        Item.extends(DOMElement);

        function setStatus(value) {
            this.status = value;
            return this.status;
        }

        function getCheckBox(item) {
            var checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("class", "checkbox");
            checkBox.id = item + "Box";

            return checkBox;
        }

        function getTextContent(content) {
            var div = document.createElement("div");
            div.setAttribute("class", "itemTittle");
            div.id = content + "Div";
            div.innerHTML = content;

            return div;
        }

        return {
            getCheckbox: getCheckBox,
            getTextContent: getTextContent,
            setStatus: setStatus
        }
    }());

    function validateInputValue(input, message) {
        if (input == "" || input == undefined || input == null) {
            alert(message);
        }
    }

    return {
        DomElement: DOMElement,
        Container: Container,
        Section: Section,
        Item: Item
    }
}());