/**
 * Created by sagarsaurus on 6/12/15.
 */
function parseCommand() {
    var command = document.getElementById('command').value;
    if(!command.includes(" $to ")) {
        alert("You must specify a destination in order to plan a trip!");
    }
    else if(command.includes(" $from ")) {
        var pieceOne = command.split("$from");
        var souce = "";
        var destination = "";
        if(pieceOne[1].includes(" $to ")) {
            var pieceTwo = pieceOne[1].split(" $to ");
            source = pieceTwo[0];
            destination = pieceTwo[1];
        }
        else {
            source = pieceOne[1];
            var pieceTwo = pieceOne[0].split(" $to ");
            destination = pieceTwo[1];
        }
        source = source.trim();
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin:source,
            destination:destination,
            travelMode: google.maps.TravelMode.DRIVING
            //need to add different travel types, transit, driving, biking and walking are handled via google
            //what we need to do is add flights and work on optimizing.  That'd be pretty insane.
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setDirections(response);
                console.log(response);
            }
            else {
                console.log(status);
            }
        });
    }
    else {
        var destination = command.split(" $to ");
        destination = destination[1];
        destination = destination.trim();
        alert("Destination is: "+destination);
    }
}