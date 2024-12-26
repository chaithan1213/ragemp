// BY VLAD GARASHENKO
// TAXI WORK

mp.events.add('playerJoin', (player) => {
    if (player.taxitime > 0)
	{

	}
    player.money = 0;
	player.workmoney = 0;
    player.taxiedet = 0; 
    player.taxicall = 0; 
	player.taxistart = 0;
    player.taxitime = 0;
    player.taxistat = 0;
	player.taxiclientname = null;
	player.taxiclient = 0;
	player.taximustgive = 0;
	player.taxipos = new mp.Vector3 ();
	player.taxioldpos = new mp.Vector3 ();
});

mp.events.add('playerMarkWaypoint', (player, position) => {
      player.outputChatBox(`test`); 
});

let taxists = 0;
let marker = mp.markers.new(0, new mp.Vector3(895.621, -179.463, 74.700), 1, {color: [255, 255, 255, 255]});
marker.setColor(255, 255, 255, 255);
let taxiuse = mp.colshapes.newRectangle(895.621, -179.463, 4, 4);
const taxi_car = [
{
    model: mp.joaat('taxi'),
    position: new mp.Vector3(901.621, -179.463, 74.700),
	rotation: new mp.Vector3(0, 0, 180),
	color: (88, 88)
},
{
    model: mp.joaat('taxi'),
    position: new mp.Vector3(5, 5, 72),
	rotation: new mp.Vector3(0, 0, 90),
	color: (88, 88)
}, 
{
    model: mp.joaat('taxi'),
    position: new mp.Vector3(10, 10, 72),
	rotation: new mp.Vector3(0, 0, 90),
	color: (88, 88)
}];

taxi_car.forEach(_vehicle => {
    mp.vehicles.new(_vehicle.model, _vehicle.position, _vehicle.rotation, _vehicle.color);
});

let taxiBlip = mp.blips.new(198, new mp.Vector3(896.637, -176.338, 74.676));
taxiBlip.color = 66;
taxiBlip.name = 'Таксопарк';
console.log(`[TAXI] JOB STARTED`);

function playerQuitHandler(player, exitType, reason) {
    if (player.taxiclient == 1)
	{
		mp.players.forEach(
		    (player1, id) => { 
		  	    if(player.vehicle)
			    {
			       if (player1.seat == -1)
			       {
					    mp.blips.forEach(
		                (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                }
	                    );
				   }
				}
			}
	    ); 
	}

   if(player.taxistart == 1)
   {
        taxists -= 1;	
		player.taxiclient = 0;
		player.taximustgive = 0;
		player.taxipos = new mp.Vector3 ();
   }
}

mp.events.add("playerQuit", playerQuitHandler);

function playerStartExitVehicleHandler(player) {
    if (player.taxiclient == 1)
	{
		mp.players.forEach(
		    (player1, id) => {  
			       if (player1.seat == -1)
			       {
				   	  if (player.taxitime == 0)
					  {
					   	let getDistance1 = Math.sqrt(((player.position.x - player.taxipos.x) * (player.position.x - player.taxipos.x) + (player.position.y - player.taxipos.y) * (player.position.y - player.taxipos.y) + (player.position.z - player.taxipos.z) * (player.position.z - player.taxipos.z)));
	                    let mmDistance1 = parseInt(getDistance1);
						const taxizakaz = mp.blips.at(0);
					    mp.blips.forEach(
		                (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                }
	                    );
						if (((player.taximustgive - mmDistance1) / 2) <= 0)
						{
						  player1.money += 0;
				          player.taxitime = 1800;
						  player1.taxiclientname = null;
						  player1.call(`hideTaxiClient`);
					      player.outputChatBox(`Вы покинули такси. С вас снято: !{green}0$`); 
					      player1.outputChatBox(`Клиент покинул такси. Ваша прибыль: !{green}0$`); 
					      player.money -= 0;
			              player.taxiclient = 0; 
					      player.taxipos = new mp.Vector3 ();	
						  player.taximustgive = 0;
						  player.taxioldpos = new mp.Vector3 ();	
						  player1.taxistat = 0;
						}
						if (((player.taximustgive - mmDistance1) / 2) > 0)
						{
						  player1.money += ((player.taximustgive - mmDistance1) / 2);
				          player.taxitime = 1800;
						  player1.taxiclientname = null;
						  player1.call(`hideTaxiClient`);
					      player.outputChatBox(`Вы покинули такси. С вас снято: !{green}${(player.taximustgive - mmDistance1) / 2}$`); 
					      player1.outputChatBox(`Клиент покинул такси. Ваша прибыль: !{green}${(player.taximustgive - mmDistance1) / 2}$`); 
					      player.money -= ((player.taximustgive - mmDistance1) / 2);
			              player.taxiclient = 0; 
					      player.taxipos = new mp.Vector3 ();	
						  player.taximustgive = 0;
					      player.taxioldpos = new mp.Vector3 ();	
						  player1.taxistat = 0;
						}
					  }	

                      else {					 				 
					   	let getDistance1 = Math.sqrt(((player.position.x - player.taxipos.x) * (player.position.x - player.taxipos.x) + (player.position.y - player.taxipos.y) * (player.position.y - player.taxipos.y) + (player.position.z - player.taxipos.z) * (player.position.z - player.taxipos.z)));
	                    let mmDistance1 = parseInt(getDistance1);
						const taxizakaz = mp.blips.at(0);
					    mp.blips.forEach(
		                (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                }
	                    );
						if (((player.taximustgive - mmDistance1) / 2) <= 0)
						{
						  player1.money += 0;
				          player.taxitime = 1800;
						  player1.taxiclientname = null;
						  player1.call(`hideTaxiClient`);
					      player.outputChatBox(`Вы покинули такси. С вас снято: !{green}0$`); 
					      player1.outputChatBox(`Клиент покинул такси. Ваша прибыль: !{green}0$`); 
					      player.money -= 0;
			              player.taxiclient = 0; 
					      player.taxipos = new mp.Vector3 ();	
						  player.taximustgive = 0;
						  player.taxioldpos = new mp.Vector3 ();	
						  player1.taxistat = 0;
						}
						if (((player.taximustgive - mmDistance1) / 2) > 0)
						{
						  player1.money += ((player.taximustgive - mmDistance1) / 2) * 3;
				          player.taxitime = 1800;
						  player1.taxiclientname = null;
						  player1.call(`hideTaxiClient`);
					      player.outputChatBox(`Вы покинули такси. С вас снято: !{green}${((player.taximustgive - mmDistance1) / 2) * 3}$`); 
					      player1.outputChatBox(`Клиент покинул такси. Ваша прибыль: !{green}${((player.taximustgive - mmDistance1) / 2) * 3}$`); 
						  taxizakaz.unrouteFor(player1);
					      player.money -= ((player.taximustgive - mmDistance1) / 2) * 3;
			              player.taxiclient = 0; 
					      player.taxipos = new mp.Vector3 ();	
						  player.taximustgive = 0;
						  player.taxioldpos = new mp.Vector3 ();	
						  player1.taxistat = 0;
						}
					  }				 
				   }				 
		    }
	    ); 
	}
}

mp.events.add("playerStartExitVehicle", playerStartExitVehicleHandler);

function playerEnterVehicleHandler(player, vehicle, seat) {
   const playerName = player.name;
   const vehicleID = vehicle.id;

	 if (player.seat == 3)
	 {
	     player.taxicall = 0;
	     player.taxiedet = 0;
	     player.outputChatBox(`Используйте /tset [x, y], чтобы показать маршрут водителю!`);   
	 }
     if (player.seat == 2)
	 { 
	     player.taxicall = 0;
	  	 player.taxiedet = 0;
	     player.outputChatBox(`Используйте /tset [x, y], чтобы показать маршрут водителю!`);   
	 }
	 if (player.seat == 1)
	 {
	     player.taxicall = 0;
	  	 player.taxiedet = 0;
	     player.outputChatBox(`Используйте /tset [x, y], чтобы показать маршрут водителю!`);  
	 }
     if (player.seat == 0)
	 { 
	   if (player.taxistart == 0)
	   {
		   console.log(`[TAXI] ${player.name} tryed to sit in taxi-car!`);
  	       player.outputChatBox(`Вы не работаете таксистом!`); 
		   player.removeFromVehicle();
	   }   	
	 } 
};

mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);

function playerEnterColshapeHandler(player, shape) 
{
  if(shape == taxiuse && !player.vehicle) 
  {
    if (player.taxistart == 0)
	{	  
		taxists += 1;
	  	player.taxistart = 1;
  	    player.outputChatBox(` !{green}Поздравляем! !{white} Вы устроились на работу таксиста!`); 
		console.log(` ${player.name} start TAXI WORK!`);
	}      
	else {
		taxists -= 1;
		player.taxistart = 0;
  	    player.outputChatBox(`Вы уволились с работы таксиста!`); 
		mp.blips.forEach(
		 (blip) => {
		    blip.unrouteFor(player);
		}
		);
		console.log(`[TAXI] ${player.name} end TAXI WORK!`);
	}
  }
}

mp.events.add("playerEnterColshape", playerEnterColshapeHandler);

mp.events.addCommand('warp', (player, _, playerID) => {
    if (playerID && playerID.trim().length > 0) {
        let sourcePlayer = mp.players.at(parseInt(playerID));
        if (sourcePlayer) {
            let playerPos = sourcePlayer.position;
            playerPos.x += 1;
            player.position = playerPos;
        } else {
            player.outputChatBox(`<b>Warp:</b> player with such ID not found!`);
        }
    } else
        player.outputChatBox(`<b>Command syntax:</b> /warp [player_id]`);
});

mp.events.addCommand('ttime', (player) => {
	player.outputChatBox(`Время: ${player.taxitime}`);
});		 

mp.events.addCommand('calltaxi', (player) => {
   const playerName = player.name;
    if (player.taxiedet == 1)
	{
	       player.outputChatBox(`Такси уже выехало за вами!`);
	}

    if (player.taxicall == 1)
	{
	       player.outputChatBox(`Вы уже вызвали такси!`);
	}

	if (taxists == 0)
	{	  
			  player.outputChatBox(`В штате !{red}нет !{white}свободных таксистов!`);
	} 

	if (player.taxicall != 1 && player.taxiedet != 1 && taxists != 0)
	{
		 player.outputChatBox(`Вы вызвали такси, ожидайте когда вызов примут! Таксистов в штате: !{red} ${taxists}`);
		 console.log(`[TAXI] ${player.name} called taxi!`);
		 player.taxicall = 1; 
 
 	mp.players.forEach(
		(player1, id) => {
		 if (player1.taxistart == 1)
	     {	  
		      let getDistance = Math.sqrt((player.position.x - player1.position.x) * (player.position.x - player1.position.x) + (player.position.y - player1.position.y) * (player.position.y - player1.position.y) + (player.position.z - player1.position.z) * (player.position.z - player1.position.z));
	          let mmDistance = parseInt(getDistance);
			  player1.outputChatBox(`[ВЫЗОВ] от ${playerName}[${player.id}]. Расстояние: !{orange}${mmDistance.toFixed(0)}м !{white}( /accept [id] - принять )`);
	     }  
		}
	);    			   	     
	}
});

mp.events.addCommand('cord', (player) => {
    let vehicle = player.vehicle;
	let playerRot = player.heading;
	player.outputChatBox(`Координаты: ${player.position}`);
	player.outputChatBox(`ПЕРСОРОТАЦИЯ: ${playerRot}`);
});

mp.events.addCommand('accept', (player, _, playerID) => {
   const playerName = player.name;
   const target = mp.players.at(parseInt(playerID)); 
   if (!isNaN(parseInt(playerID)))
   	 if (player.taxistart == 0)
	 {	  
		   player.outputChatBox(`Вы не работаете таксистом!`);
	 } 

     if (target.taxicall == 0 && player.taxistart == 1 && playerID >= 0 && target.taxiedet != 1)
	 {
	       player.outputChatBox(`Данный игрок не вызывал такси!`);
	 } 
	 if (target.taxiedet == 1 && player.taxistart == 1 && playerID >= 0)
	 {
	       player.outputChatBox(`К данному игрока уже едет такси!`);
	 } 
	 if (target.taxicall != 0 && target.taxiedet != 1 && player.taxistart == 1 && playerID >= 0)
	 {
	       target.outputChatBox(`${playerName} принял ваш вызов! Ожидайте!`);
	       player.outputChatBox(`Вы приняли вызов! На карте отмеченна точка!`);
		   console.log(`[TAXI] ${player.name} accepted taxi_call!`);
		   target.taxicall = 0;
		   target.taxiedet = 1;
		   let taxiblips = mp.blips.new(1, target.position);
		   taxiblips.color = 1;
           taxiblips.name = 'Место прибытия';
		   taxiblips.alpha = 0;
		   taxiblips.routeFor(player, 1, 1);
	 }
});

mp.events.addCommand('money', (player) => {
	player.money = 9999999;
});	

mp.events.addCommand('tset', (player, _, x, y) => {
    const playerName = player.name;
	if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)))
	mp.players.forEach(
		(player1, id) => {
		     if(player.vehicle)
			 {
			   if (player1.seat == -1)
			   {
			   	  if (player1.taxistat == 0)
				  {				     
				  	 let getDistance = Math.sqrt((player.position.x - parseFloat(x)) * (player.position.x - parseFloat(x)) + (player.position.y - parseFloat(y)) * (player.position.y - parseFloat(y)));
	                 let mmDistance = parseInt(getDistance);
					 if (player.taxitime != 0)
					 {
					     if ((mmDistance.toFixed(0) / 2) * 3 > player.money)
						 {
						    player.outputChatBox(`У вас недостаточно денег! Вам не хватает: !{green}${((mmDistance.toFixed(0) / 2) * 3) - player.money}$`);
						 }

	                     if ((mmDistance.toFixed(0) / 2) * 3 <= player.money)
						 {
						   mp.blips.forEach(
		                   (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                   }
	                       );
						   player1.taxiclientname = player.name;
			               let taxizakaz = mp.blips.new(1, new mp.Vector3(parseFloat(x),parseFloat(y)));
						   taxizakaz.color = 1;
                           taxizakaz.name = 'Место прибытия';
						   taxizakaz.alpha = 0;
						   taxizakaz.routeFor(player1, 1, 1);
						   taxizakaz.routeFor(player, 1, 1);
					       let getDistance = Math.sqrt((player.position.x - taxizakaz.position.x) * (player.position.x - taxizakaz.position.x) + (player.position.y - taxizakaz.position.y) * (player.position.y - taxizakaz.position.y) + (player.position.z - taxizakaz.position.z) * (player.position.z - taxizakaz.position.z));
	                       let mmDistance = parseInt(getDistance);
						   let setTaxiDoedet1 = (player1, (parseFloat(x)), parseFloat(y));
					  	   player.outputChatBox(`Вы указали маршрут! Расстояние: !{orange}${mmDistance.toFixed(0)}м !{white}Стоимость: !{green}${(mmDistance.toFixed(0) / 2) * 3}$`);
	                       player1.outputChatBox(`Пассажир указал маршрут, едьте к точке прибытия! Расстояние: !{orange}${mmDistance.toFixed(0)}м`);
						   player.taxiclient = 1;
					       player1.taxistat = 1;
						   player.taximustgive = mmDistance.toFixed(0);
						   player.taxipos = new mp.Vector3 (taxizakaz.position.x, taxizakaz.position.y, player.position.z);
						   player.taxioldpos = new mp.Vector3 (player.position.x, player.position.y, player.position.z);
						   let getDistance1 = Math.sqrt(((player.position.x - player.taxipos.x) * (player.position.x - player.taxipos.x) + (player.position.y - player.taxipos.y) * (player.position.y - player.taxipos.y) + (player.position.z - player.taxipos.z) * (player.position.z - player.taxipos.z)));
	                       let mmDistance1 = parseInt(getDistance1);	
						   let summa = ((player.taximustgive - mmDistance1) / 2) * 3;	
						   player1.call(`TaxiMenu`);
						 }
					 }

					 if (player.taxitime == 0)
					 {
					 	mp.blips.forEach(
		                (blip) => {
			            blip.unrouteFor(player1);
						blip.unrouteFor(player);
		                }
	                    );
					 	 if ((mmDistance.toFixed(0) / 2) > player.money)
						 {
						    player.outputChatBox(`У вас недостаточно денег! Вам не хватает: !{green}${(mmDistance.toFixed(0) / 2) - player.money}$`);
						 }

	                     if ((mmDistance.toFixed(0) / 2) <= player.money)
						 { 
						   player1.taxiclientname = player.name;
						   let taxizakaz = mp.blips.new(1, new mp.Vector3(parseFloat(x),parseFloat(y)));
						   taxizakaz.color = 1;
                           taxizakaz.name = 'Место прибытия';
						   taxizakaz.alpha = 0;
						   taxizakaz.routeFor(player1, 1, 1);
						   taxizakaz.routeFor(player, 1, 1);
                           let getDistance = Math.sqrt((player.position.x - taxizakaz.position.x) * (player.position.x - taxizakaz.position.x) + (player.position.y - taxizakaz.position.y) * (player.position.y - taxizakaz.position.y) + (player.position.z - taxizakaz.position.z) * (player.position.z - taxizakaz.position.z));
	                       let mmDistance = parseInt(getDistance);
					       player.outputChatBox(`Вы указали маршрут! Расстояние: !{orange}${mmDistance.toFixed(0)}м !{white}Стоимость: !{green}${mmDistance.toFixed(0) / 2}$`);
					       player1.outputChatBox(`Пассажир указал маршрут, едьте к точке прибытия! Расстояние: !{orange}${mmDistance.toFixed(0)}м`);
						   player.taxiclient = 1;
					       player1.taxistat = 1;
						   player.taximustgive = mmDistance.toFixed(0);
						   player.taxipos = new mp.Vector3 (taxizakaz.position.x, taxizakaz.position.y, player.position.z);
						   player.taxioldpos = new mp.Vector3 (player.position.x, player.position.y, player.position.z);
						   let getDistance1 = Math.sqrt(((player.position.x - player.taxipos.x) * (player.position.x - player.taxipos.x) + (player.position.y - player.taxipos.y) * (player.position.y - player.taxipos.y) + (player.position.z - player.taxipos.z) * (player.position.z - player.taxipos.z)));
	                       let mmDistance1 = parseInt(getDistance1);
						   let summa = (player.taximustgive - mmDistance1) / 2;
						   player1.call(`TaxiMenu`);
						 }
					 }					 
				  }
				  else {
				   	 player.outputChatBox(`Водитель занят другим заказом, ожидайте!`);
				  }
			   }
			 } 
		}
	); 
});

mp.events.addCommand('tp', (player, _, x, y ,z) => {
    if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z)))
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
    else
        player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
});

mp.events.add('endTaxiZakaz', function(player) {
		mp.players.forEach(
		    (player1, id) => {
			       if (player1.taxiclient == 1)
			       {
				   	  if (player1.taxitime == 0)
					  {
					   	let getDistance1 = Math.sqrt(((player1.position.x - player1.taxipos.x) * (player1.position.x - player1.taxipos.x) + (player1.position.y - player1.taxipos.y) * (player1.position.y - player1.taxipos.y) + (player1.position.z - player1.taxipos.z) * (player1.position.z - player1.taxipos.z)));
	                    let mmDistance1 = parseInt(getDistance1);
						const taxizakaz = mp.blips.at(0);
					    mp.blips.forEach(
		                (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                }
	                    );
						if (((player1.taximustgive - mmDistance1) / 2) <= 0)
						{
						  player1.money += 0;
				          player1.taxitime = 1800;
					      player1.outputChatBox(`Таксист прервал поездку! С вас снято: !{green}0$`); 
					      player.outputChatBox(`Вы прервали поездку! Ваша прибыль: !{green}0$`); 
					      player1.money -= 0;
			              player1.taxiclient = 0; 
					      player1.taxipos = new mp.Vector3 ();	
						  player1.taximustgive = 0;
						  player1.taxioldpos = new mp.Vector3 ();	
						  player.taxistat = 0;
						  player1.removeFromVehicle();
						}
						if (((player1.taximustgive - mmDistance1) / 2) > 0)
						{
						  player1.money += ((player1.taximustgive - mmDistance1) / 2);
				          player1.taxitime = 1800;
					      player1.outputChatBox(`Таксист прервал поездку! С вас снято: !{green}${(player.taximustgive - mmDistance1) / 2}$`); 
					      player.outputChatBox(`Вы прервали поездку! Ваша прибыль: !{green}${(player.taximustgive - mmDistance1) / 2}$`); 
					      player1.money -= ((player1.taximustgive - mmDistance1) / 2);
			              player1.taxiclient = 0; 
					      player1.taxipos = new mp.Vector3 ();	
						  player1.taximustgive = 0;
					      player1.taxioldpos = new mp.Vector3 ();	
						  player.taxistat = 0;
						  player1.removeFromVehicle();
						}
					  }	

                      else {					 				 
					   	let getDistance1 = Math.sqrt(((player1.position.x - player1.taxipos.x) * (player1.position.x - player1.taxipos.x) + (player1.position.y - player1.taxipos.y) * (player1.position.y - player1.taxipos.y) + (player1.position.z - player1.taxipos.z) * (player1.position.z - player1.taxipos.z)));
	                    let mmDistance1 = parseInt(getDistance1);
						const taxizakaz = mp.blips.at(0);
					    mp.blips.forEach(
		                (blip) => {
			            	blip.unrouteFor(player1);
							blip.unrouteFor(player);
		                }
	                    );
						if (((player1.taximustgive - mmDistance1) / 2) <= 0)
						{
						  player1.money += 0;
				          player1.taxitime = 1800;
					      player1.outputChatBox(`Таксист прервал поездку! С вас снято: !{green}0$`); 
					      player.outputChatBox(`Вы прервали поездку! Ваша прибыль: !{green}0$`); 
					      player1.money -= 0;
			              player1.taxiclient = 0; 
					      player1.taxipos = new mp.Vector3 ();	
						  player1.taximustgive = 0;
						  player1.taxioldpos = new mp.Vector3 ();	
						  player.taxistat = 0;
						  player1.removeFromVehicle();
						}
						if (((player1.taximustgive - mmDistance1) / 2) > 0)
						{
						  player.money += ((player.taximustgive - mmDistance1) / 2) * 3;
				          player1.taxitime = 1800;
					      player1.outputChatBox(`Таксист прервал поездку! С вас снято: !{green}${((player.taximustgive - mmDistance1) / 2) * 3}$`); 
					      player.outputChatBox(`Вы прервали поездку! Ваша прибыль: !{green}${((player.taximustgive - mmDistance1) / 2) * 3}$`); 
						  taxizakaz.unrouteFor(player);
					      player1.money -= ((player1.taximustgive - mmDistance1) / 2) * 3;
			              player1.taxiclient = 0; 
					      player1.taxipos = new mp.Vector3 ();	
						  player1.taximustgive = 0;
						  player1.taxioldpos = new mp.Vector3 ();	
						  player.taxistat = 0;
						  player1.removeFromVehicle();
						}
					  }				 
				   }				 
			}
	    ); 
});