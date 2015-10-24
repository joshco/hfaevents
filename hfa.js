var json;
var targets;
var events;
var _ls = window.localStorage;
var attendState = null;


$(document).ready(function () {
    // $(".event-link").click(eventDetails);
    loadTargets();
});


function loadTargets() {

    // Load event attendance state
    loadAttendState();


    // Load Events

    $.getJSON("events-results.json", function (data) {
            targets = {};
            items = [];
            json = data;
            events = data.events;
            events.sort(function (e1, e2) {
                return new Date(e2.startDate) - new Date(e1.startDate);
            });

            events.forEach(function (ev) {
                var event = ev;

                var event_locations = []
                // if there are locations, iterate
                if (event.locations.length > 0) {
                    loc = event.locations[0];
                    // Assumption: the JSON will always have these fields even if blank
                    event_locations.push(["<p><i class='fa fa-home'></i>&nbsp;Address: ", loc.address1, loc.address2, loc.city, loc.state, loc.postalCode, "</p>"].join(' '));

                    // iterate shifts
                    var shifts = [];
                    if (loc.shifts.length > 0) {
                        shifts.push("<div class='shifts-div'><p><i class='fa fa-calendar'></i>&nbsp;Shifts:</p><ul>");
                        loc.shifts.forEach(function (shift) {
                            shifts.push("<li>" + formatDate(shift.startDate) + " -- " + formatDate(shift.endDate) + "</li>");
                        });
                        shifts.push('</ul></div>');
                    }
                    ;

                    // iteracte tiers
                    var tiers = [];
                    if (loc.tiers.length > 0) {
                        tiers.push("<p class='event-tiers'><i class='fa fa-dollar'></i>&nbsp;Tiers :</p><ul>");
                        loc.tiers.forEach(function (tier) {
                            tiers.push("<li>" + tier.title + " Price: " + tier.price + "</li>");

                        });
                        tiers.push("</ul>");


                    }
                }
                ;


                details = '<h3 class="details-heading">Details</h3>\
    <div class="address">' + event_locations + '</div>' + shifts.join("\n") +
                    '<div class="shifts">' + tiers.join("\n") + '</div>' +
                    '<div class="attend-button-div"><a class="attend-button" href="#!" onClick="attendEvent(' + event.id + ')">Attend</a></div>'


                items.push("<li event='" + ev.id + "'><h2><a class='event-title' href='#!' onClick='eventDetails(" + ev.id + ")' class='event-link' id='" + ev.id + "'>" + ev.name + "</a><span " +
                    "id='attend-" + event.id + "' class='attend-status'><i class='fa fa-check-circle'></i>&nbsp;Attending</span></h2>");
                items.push("<p class='event-date'>" + formatDate(event.startDate) + "</p>");
                items.push("<p class='event-description' onClick='eventDetails(" + ev.id + ")'>" + ev.description + "<p>");
                items.push("<div class='event-details' id='details-" + event.id + "''>" + details + "</div>");
                items.push("</li>");

                ev.locations.forEach(function (loc) {
                    if (loc.contactPhone) {
                        //console.log(loc.contactEmail);
                        targets[loc.contactEmail] = loc.contactPhone;

                    }
                })
            });


            $("ul").append(items.join(""));
            $(".loading").hide();

            // render saved attend state
            renderAttendState(events);

        }
    );
};

function eventDetails(eid) {
    var id = '#details-' + eid;
    $(id).toggle();
    return false;
}

function formatDate(date_str) {
    // crap - this apparently doesnt work on mobile - but ran out time to make work

    var options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    var date = new Date(date_str);

    formatted_date = date.toLocaleTimeString("en-us", options);
    return formatted_date;

};

function attendEvent(eid) {
    var id = '#attend-' + eid;
    var isVisible = $(id).is(":visible");

    if (isVisible) {
        // turn it off
        attendState[eid] = false;
        $(id).hide();
    } else {
        // turn it on
        attendState[eid] = true;
        $(id).show();
    }
    saveAttendState();
    return false;
}

function renderAttendState(events) {
    events.forEach(function (event) {
        eid = event.id;
        console.log("Checking attendState for " + eid);
        if (attendState[eid] == true) {
            console.log("Attending eid " + eid);
            var id = '#attend-' + event.id;
            $(id).show();
        }
    })

}
function loadAttendState() {
    if (_ls['attendState'] == null) {
        console.log("Created new attendState");
        attendState = {};
    } else {
        attendState = JSON.parse(_ls['attendState']);
    }

}

function saveAttendState() {
    _ls['attendState'] = JSON.stringify(attendState);

}
