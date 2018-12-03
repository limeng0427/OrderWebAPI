const uri = "api/order";
let orders = null;
function getCount(data) {
    const el = $("#counter");
    let name = "order";
    if (data) {
        if (data > 1) {
            name = "orders";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#orders");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.orderId))
                    .append($("<td></td>").text(item.customerName))
                    .append($("<td></td>").text(item.deliveryAddress))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.orderId);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                            deleteItem(item.orderId);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            orders = data;
        }
    });
}

function addItem() {
    const item = {
        customerName: $("#add-customerName").val(),
        deliveryAddress: $("#add-deliveryAddress").val()
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-customerName").val("");
            $("#add-deliveryAddress").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(orders, function (key, item) {
        if (item.orderId === id) {
            $("#edit-customerName").val(item.customerName);
            $("#edit-deliveryAddress").val(item.deliveryAddress);
            $("#edit-orderId").val(item.orderId);
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        customerName: $("#edit-customerName").val(),
        deliveryAddress: $("#edit-deliveryAddress").val(),
        orderId: $("#edit-orderId").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-orderId").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}