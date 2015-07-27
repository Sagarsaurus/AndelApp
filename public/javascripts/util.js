/**
 * Created by sagarsaurus on 6/12/15.
 */
function parseCommand() {
    var driving;
    var transit;
    var biking;
    var walking;
    var destination = document.getElementById('destination').value;
    if(destination.length==0) {
        alert("You must specify a destination in order to plan a trip!");
    }
    else if(document.getElementById('source').value.length!=0) {
        var source = document.getElementById('source').value;
        source = source.trim();
        var directionsService = new google.maps.DirectionsService();

        var drivingRequest = {
            origin:source,
            destination:destination,
            travelMode: google.maps.TravelMode.DRIVING
            //need to add different travel types, transit, driving, biking and walking are handled via google
            //what we need to do is add flights and work on optimizing.  That'd be pretty insane.
        };

        directionsService.route(drivingRequest, function(response, status) {
            driving = response;
            finished(driving, transit, biking, walking);
        });

        var transitRequest = {
            origin:source,
            destination:destination,
            travelMode: google.maps.TravelMode.TRANSIT
            //need to add different travel types, transit, driving, biking and walking are handled via google
            //what we need to do is add flights and work on optimizing.  That'd be pretty insane.
        };

        directionsService.route(transitRequest, function(response, status) {
            transit = response;
            finished(driving, transit, biking, walking);
        });

        var bikingRequest = {
            origin:source,
            destination:destination,
            travelMode: google.maps.TravelMode.BICYCLING
            //need to add different travel types, transit, driving, biking and walking are handled via google
            //what we need to do is add flights and work on optimizing.  That'd be pretty insane.
        };

        directionsService.route(bikingRequest, function(response, status) {
            biking = response;
            finished(driving, transit, biking, walking);
        });

        var walkingRequest = {
            origin:source,
            destination:destination,
            travelMode: google.maps.TravelMode.WALKING
            //need to add different travel types, transit, driving, biking and walking are handled via google
            //what we need to do is add flights and work on optimizing.  That'd be pretty insane.
        };

        directionsService.route(walkingRequest, function(response, status) {
            walking = response;
            finished(driving, transit, biking, walking);
        });

    }

    else {
        destination = destination.trim();
        alert("We have to gather your location in order to plan your trip!");
        alert("Destination is: "+destination);
    }
}

function finished(driving, transit, biking, walking) {
    if(driving != null && transit != null && biking != null && walking != null) {
        console.log(driving);
        console.log(transit);
        console.log(biking);
        if(walking.status=='OK' && (parseFloat(walking.routes[0].legs[0].duration.value)/60 < 15) ) {
            alert("It's under 15 minutes away!  You should walk!");
        }
    }
}

//https://www.mashape.com/zilyo/zilyo
//have to learn to use this API, it's brilliant.
function loadHousing() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(result) {
    var lat = parseFloat(result['coords'].latitude);
    var long = parseFloat(result['coords'].longitude);
    console.log(lat);
    var xml = new XMLHttpRequest();
    //currently the distance is hardcoded but it must be changed in the future to whatever the user wants
    var apiString = 'https://zilyo.p.mashape.com/search?latitude='+lat+'&longitude='+long+"&maxdistance=10";
    xml.onreadystatechange=function() {
        if (xml.readyState==4 && xml.status==200) {
            console.log(JSON.parse(xml.responseText));
        }
    };
    xml.open("GET", apiString, true); //AJAX Set request
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.setRequestHeader("X-Mashape-Key", "QKQrYHI0vlmshS4Kvv4dVZHL937Hp1cwkCPjsnLESO3qr8oj9C");
    xml.send();
}

//use developer.flightstats.com for API, 20,000 lifetime requests for free, have to make them count
function loadFlights() {

}

function updateSource() {
    var urlString = 'http://autocomplete.wunderground.com/aq?query='+document.getElementById('source').value+'&cb=sourceCallback';
    $.ajax({
        type: 'GET',
        url : urlString,
        dataType : "jsonp"
    });
}

function sourceCallback(result) {
    var options = [];
    for(var i = 0; i < result['RESULTS'].length; i++) {
        options.push(result['RESULTS'][i].name);
    }

    $( "#source" ).autocomplete({
        source: options
    });
}

function updateDestination() {
    var urlString = 'http://autocomplete.wunderground.com/aq?query='+document.getElementById('destination').value+'&cb=destinationCallback';
    $.ajax({
        type: 'GET',
        url : urlString,
        dataType : "jsonp"
    });
}

function destinationCallback(result) {
    var options = [];
    for(var i = 0; i < result['RESULTS'].length; i++) {
        options.push(result['RESULTS'][i].name);
    }

    $( "#destination" ).autocomplete({
        source: options
    });
}