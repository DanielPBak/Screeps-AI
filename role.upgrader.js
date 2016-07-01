module.exports = {
    run: function(creep){

        var roomHasAssignedSpots = creep.room.memory.upgradeSpots.length > 0;
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 50});
        var target = creep.room.controller;

        if (roomHasAssignedSpots){
            var spot;
            var currentSpot;
            var inGoodSpot = false;

            for (i in creep.room.memory.upgradeSpots){
                var posToCheck = new RoomPosition(creep.room.memory.upgradeSpots[i].x, creep.room.memory.upgradeSpots[i].y, creep.room.name);

                if (posToCheck.findInRange(FIND_MY_CREEPS, 0).length === 0){
                    spot = posToCheck;
                }
                else if ((creep.pos.x == posToCheck.x) && (creep.pos.y == posToCheck.y)){
                inGoodSpot = true;
                }
            }

            if (inGoodSpot){
                if (creep.carry.energy <= creep.carryCapacity / 2) {
                    if (source != null) {
                        source.transfer(creep, "energy");
                    }
                    }
                creep.upgradeController(creep.room.controller);
            }

            else if (spot != null){
                console.log("Moving to spot: " + spot);
                creep.moveTo(spot);
            }

            else {
                console.log("All spots are filled.");
            }

        }

        else
        {
            if (creep.memory.gathering == true) {

                if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.gathering = false;
                    creep.moveTo(target);

                }

                else if (source.transfer(creep, "energy") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

                else if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.gathering = false;
                    creep.moveTo(target);
                }
            }


            else if (creep.memory.gathering == false) {
                if (creep.carry.energy == 0) {
                    creep.memory.gathering = true;

                }
                else if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                else if (creep.pos.getRangeTo(target) > 0) {
                    creep.moveTo(target);
                }

                if (creep.carry.energy == 0) {
                    creep.memory.gathering = true;
                    creep.moveTo(source);
                }

                else if (creep.pos.getRangeTo([19, 22]) == 0) {
                    creep.moveTo(target);
                }
            }
        }




    },

    upgraded_run: function(creep){
        creep.memory.upgrading = false;
        // Move to the nearest source
        var controller = creep.room.controller;
        var nearest_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: site =>
        site.structureType == STRUCTURE_CONTAINER
        });


        if (creep.memory.upgrading == true){
            creep.upgradeController(controller);
            nearest_container.transfer(creep, "energy");

        }

        else {

            var upgradeSpots = creep.room.memory.upgradeSpots;

            for (i in upgradeSpots){

            }
        }
        // Harvest until full.
        // If full, then deposit in nearest container.
    },

    reset: function(creep){
        creep.memory["target"] = null;
        creep.memory["harvesting"] = true;
        creep.memory["gathering"] = true;
    }

};



