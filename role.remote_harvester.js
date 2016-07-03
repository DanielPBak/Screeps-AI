
module.exports = {
    run: function (creep) {
        var closest_container = pos.findClosestByRange(FIND_MY_STRUCTURES, function(str){ str => str.structureType == STRUCTURE_CONTAINER});
        var closest_source_in_assigned_room = creep.pos.findClosestByRange(Game.rooms[creep.memory.assignedRoom].find(FIND_SOURCES));
        // Harvest from closest source in assigned room.
        // Return it to closest container.

        if (creep.memory.harvesting == false){

            if (creep.carry.energy == 0){
                creep.memory.harvesting = true;
                creep.moveTo(closest_source_in_assigned_room);
            }

            else if (creep.transfer("energy", closest_container) == ERR_NOT_IN_RANGE){
                creep.moveTo(closest_container);
            }

        }

        else if (creep.memory.harvesting == true){

            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.harvesting = false;
                creep.moveTo(closest_container);
            }

            else if (creep.harvest(closest_source_in_assigned_room) == ERR_NOT_IN_RANGE){
                creep.moveTo(closest_source_in_assigned_room);
            }
        }

    }

    };
