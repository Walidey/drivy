'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4

var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];


//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function RecuperationPrice (rental){
	
	var carId = rental.carId;
	for (var i = 0 ; i< cars.length; i++)
	{
		if (carId == cars[i].id)
		{
			var result = [cars[i].pricePerKm, cars[i].pricePerDay] ;
		}
	}

	return result;
}
function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff.day+1;
}

function DiffRent(rental){
	var date1 = new Date(rental.returnDate);
	var date2 = new Date(rental.pickupDate);
	return dateDiff(date2,date1);
}


function price (rental){

	rental.price = rental.distance * RecuperationPrice(rental)[0] + DiffRent(rental)* RecuperationPrice(rental)[1];
	if (DiffRent(rental) >=1 && DiffRent(rental) < 4 )
	{
		rental.price = rental.price - (rental.price*10)/100;
	}

	if (DiffRent(rental) >=4 && DiffRent(rental) < 10 )
	{
		rental.price = rental.price - (rental.price*30)/100;
	}
	if (DiffRent(rental) >=10)
	{
		rental.price = rental.price - (rental.price*50)/100;
	}
	rental.commission.assistance = DiffRent(rental);
	rental.commission.insurance = ((rental.price*30)/100)/2;
	rental.commission.drivy = ((rental.price*30)/100) - (rental.commission.insurance + rental.commission.assistance);
	if (rental.options.deductibleReduction == true)
	{
		rental.price+= 4* DiffRent(rental);//EXERCICE 4
	}
}

function RecupRent(actor)
{
	var rentalId = actor.rentalId;
	
	for (var i =0; i< rentals.length;i++)
	{
		
		if (rentalId == rentals[i].id)
		{
		
			var result = [rentals[i].price, rentals[i].commission.insurance, rentals[i].commission.assistance, rentals[i].commission.drivy, rentals[i].options.deductibleReduction, rentals[i].returnDate, rentals[i].pickupDate];
			 
		}

	}

	return result;

}

function Paye(actor) //EXERCICE 5 
{
	var rental = RecupRent(actor);
	actor.payment[0].amount = rental[0]; //driver
	actor.payment[1].amount = (rental[0]*70)/100; //Owner
	actor.payment[2].amount= rental[1] ; //insurance
	actor.payment[3].amount= rental[2]; //assistance
		if (rental[4] == true) // option or not
	{
		actor.payment[4].amount = rental[3] + 4* dateDiff(rental[5], rental[6]);//drivy + option
	}
		else{
			actor.payment[4].amount = rental[3]; //drivy
		}
}
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
