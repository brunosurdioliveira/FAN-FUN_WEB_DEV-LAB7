/*
			generateTrackingNumber()
			Purpose: Helper function - generates a random tracking number
			Parameters: none
			Returns: string
*/
function generateTrackingNumber() {
    const TN_LENGTH = 10;
    const TN_PREFIX = "IWD";
    var tokens = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var trackingNumber = new String(TN_PREFIX);
    for (var x = 0; x < TN_LENGTH; x++) {
        trackingNumber = trackingNumber.concat(tokens[Math.floor(Math.random() * tokens.length)]);
    }
    console.log("Generated: " + trackingNumber);
    return trackingNumber;
} // end generateTrackingNumber

// Constructor for the Parcel Object
function ParcelObj(t, s, d, w, e) {
    this.trackingNumber = t; // String
    this.status = s;	     // String
    this.destination = d;	 // String
    this.weight = w;		 // Float
    this.express = e;		 // Boolean
}

// Array to store the Parcel objects
var parcels = [];

// Create some parcel objects and store in parcel array
parcels.push(new ParcelObj(generateTrackingNumber(), "Processing", "Ontario", 12, true));
parcels.push(new ParcelObj(generateTrackingNumber(), "Shipped", "Alberta", 34, true));
parcels.push(new ParcelObj(generateTrackingNumber(), "In Transit", "Manitoba", 56, false));
parcels.push(new ParcelObj(generateTrackingNumber(), "Delivered", "Quebec", 78, false));

// Create parcel
function createParcel() {
    // Get the destination value
    var tempDestination = document.getElementById("createParcel_Destination").value;

    // Get the Weight value
    var tempWeight = document.getElementById("createParcel_Weight").value;

    // Get the Express Shipping 
    if (document.querySelector("input[id='createParcel_expressShipping']:checked")) {
        var tempExpress = true;
    }
    else {
        var tempExpress = false;
    }

    // Call the constructor and pass the 5 values to it and add to the parcels array
    parcels.push(new ParcelObj(generateTrackingNumber(), "Processing", tempDestination, tempWeight, tempExpress));

    // Call the displayParcels() function
    displayParcels();
}

// Function to display Parcels
function displayParcels() {
    // Clear the contents already in the output div
    var displayParcelsOutput = document.getElementById("displayParcelOutput");
    displayParcelsOutput.innerHTML = "";

    // Get the value from the status textbox
    var statusFilter = document.getElementById("displayParcelsFilter").value;

    for (var i = 0; i < parcels.length; i++) {
        var tempParcel = parcels[i];

        // Display Based on Filter
        if ((tempParcel.status == "Processing" && statusFilter == "Processing") || (tempParcel.status == "Shipped" && statusFilter == "Shipped") || (tempParcel.status == "In Transit" && statusFilter == "In Transit") || (tempParcel.status == "Delivered" && statusFilter == "Delivered") || statusFilter == "All") {
            // Create the paragraph element
            var tempEl = document.createElement("p");

            tempEl.innerHTML += tempParcel.trackingNumber + " | " + tempParcel.status + " | " + tempParcel.destination + " | " + tempParcel.weight + "(g) | " + tempParcel.express;

            // Append to the display Output
            displayParcelsOutput.appendChild(tempEl);
        }
    }
}

// Process Parcel function 
function processParcel() {
    // Get the values from the textbox and the dropdown
    var findTrackingNumber = document.getElementById("tbTrackingNumber");
    var setStatus = document.getElementById("processParcel_Status").value;

    // Cost variable - with $5 of flat rate
    var cost = 5.00;

    // array.find() returns the parcelObject accourding with criteria (trackingNumber is equal to the value entered in the input findTrackingNumber)
    var parcelFound = parcels.find(parcel => parcel.trackingNumber == findTrackingNumber.value);
    console.log(parcelFound);

    // validation 
    // If the parcel isn’t found or nothing was provided, alert the user
    if (parcelFound !== null && typeof parcelFound !== "undefined") {
        // Assign the new status to the parcel’s status property
        parcelFound.status = setStatus;
        // Calculate the cost of shipping
        if (parcelFound.express == true) {
            cost += 10;
            cost += (0.05 * parcelFound.weight);
            cost *= 1.13;
        }
        else {
            cost += (0.05 * parcelFound.weight);
            cost *= 1.13;
        }

        alert("Shipping for Parcel: " + parcelFound.trackingNumber + "\n$" + cost.toFixed(2));

        // Call the displayParcels() function
        displayParcels();
    }
    else {
        alert("Tracking Number Invalid!")
    }
}
