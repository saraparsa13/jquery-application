import $ from 'jquery';
import { Menu, Service, SubmenuEntry } from './js/menu.js';
import { Entry } from './js/menu.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { data } from './js/data.js';
import { findDataByChild, generateAccordion, generateDropdownItems } from './js/helper.js';

// User Interface Logic ---------

let menu = new Menu();
let service = new Service();

const dropdownMenu = $("#navbarDropdown");
const accordionContainer = $('#accordion');
const serviceList = $("#entry-list")

function displayEntryDetails(serviceToDisplay) {
    let entriesList = $(serviceList);
    let htmlForEntryInfo = "";
    Object.keys(serviceToDisplay.entries).forEach(function (key) {
        const entry = serviceToDisplay.findEntry(key);
        htmlForEntryInfo += "<div class='service-card' id=" + entry.id + "> <div class='text-container'> <span class='card-title'>" + entry.title + "</span> <span class='card-subtitle'>Integration>" + entry.body + "</span> </div> <div class='delete-icon' id=" + entry.id + "></div>  </div> ";
    });
    entriesList.html(htmlForEntryInfo);
}


//Event Listener
function attachEntryListeners() {
    $("button#add-service").on("click", function () {
        $(serviceList).hide();
        $(this).hide();
        $("#service-list").show()
    })

    $("span#close-icon").on("click", function () {
        $("#service-list").hide();
        $("#add-service").show();
        $(serviceList).show();
    })

    $(serviceList).on("click", ".delete-icon", function () {
        service.deleteEntry(this.id);
        displayEntryDetails(service);
    });

    $(accordionContainer).on('click', '.list-group-item', function () {
        $('.list-group-item').removeClass('list-group-item-active'); // Remove the 'list-group-item-active' class from all list items
        $(this).addClass('list-group-item-active');  // Add the 'list-group-item-active' class to the clicked item
    });

    // Close dropdown when clicking outside
    $(document).on("click", function (event) {
        const $target = $(event.target);
        if (!$target.closest(".dropdown-submenu").length) {
            $(".dropdown-menu").removeClass("show");
        }
    });

    // Manually initialize the nested dropdowns
    $(dropdownMenu).on("click", ".dropdown-submenu .dropdown-toggle", function (event) {
        event.preventDefault();
        $(this).siblings(".dropdown-menu").toggleClass("show");
    });


    $(dropdownMenu).on('click', 'li:not(.dropdown-submenu)' ,function () {
        const clickedItemText = $(this).text().trim();

        // Check if the entry with the same title already exists in the service
        let entryExists = false;
        for (const key in service.entries) {
            if (service.entries.hasOwnProperty(key)) {
                const entry = service.entries[key];
                if (entry.title === clickedItemText) {
                    entryExists = true;
                    break;
                }
            }
        }
    
        if (!entryExists) {
            // Find the data associated with the selected item
            const foundData = findDataByChild(data, clickedItemText);
    
            // Create a new submenu entry and add it to the service
            const newSubmenuEntry = new SubmenuEntry(clickedItemText, foundData.title);
            service.addEntries(newSubmenuEntry);
            displayEntryDetails(service);
        } else {
            console.log('Entry already exists in the service.');
        }

        $(".dropdown-menu").removeClass("show");
    });
}

$(document).ready(function () {
    attachEntryListeners();
    $("form#formOne").submit(function (event) {
        event.preventDefault();

        const selectedAccordionItem = $(".list-group-item-active");
        const clickedItemText = selectedAccordionItem.text().trim();

        // Find the data associated with the selected item
        const foundData = findDataByChild(data, clickedItemText);
        if (foundData) {
            // Create a new entry only if it doesn't already exist in the menu
            const newEntry = new Entry(foundData);
            if (menu.addEntry(newEntry)) {
                const dropdownItemsHtml = generateDropdownItems([newEntry.data]);
                dropdownMenu.append(dropdownItemsHtml);
            } else {
                console.log('Entry already exists in the menu.');
            }
        }
    });


    data.forEach((item, index) => {
        const accordionItem = generateAccordion(item, index);
        accordionContainer.append(accordionItem);
    });
});

