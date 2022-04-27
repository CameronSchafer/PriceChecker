function writeItemToPage(item) {
    const itemToAppend = `
        <tr id="${item.itemName}">
            <td id="nameColumn">${item.itemName}</td>
            <td id="linkColumn">
                <div class="itemDiv">
                    <a href="${item.coles}" target="_blank">Search Coles</a>
                </div>
                <div class="itemDiv">
                    <a href="${item.woolies}" target="_blank">Search Woolies</a>
                </div>
            </td>
            <td id="removeItemColumn">
                <button class="button buttonCancel" onclick="removeItem('${item.itemName}')">Remove Item</button>
            </td>
        </tr>
    `;

    $("#savedItems").append(itemToAppend);
}

function clearInputBox() {
    $('#itemInput').val("");
}

function removeItemHtml(itemName) {
    $(`#${itemName}`).remove();
}

function removeItem(itemName) {
    $.ajax({
        url: '/remove_item',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'itemName': itemName }),
        success: function (data) {
            console.log(data);
            removeItemHtml(data.itemName);
        },
        error: function (data) {
            console.log(data);
        },
    });
}

function getSavedItems() {
    $.ajax({
        url: '/get_saved_items',
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            if (data.items) {
                data.items.forEach(item => writeItemToPage(item));
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
}

function addItem(e) {
    e.preventDefault();
    const item = $('#itemInput').val();
    console.log(item);

    if (!item) return;

    $.ajax({
        url: '/add_item',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'item': item }),
        success: function (data) {
            writeItemToPage(data.item);
            clearInputBox();
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}