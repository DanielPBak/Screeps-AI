multiRoomNav = require('multiroom_navigation');

module.exports = {
    run: function (creep) {
        var target_container = Game.getObjectById("5777cd8a75d76f9244178047");

        var in_target_room = creep.room.name == "W33N11";


        if (creep.memory.harvesting == false) {

            if (creep.carry.energy == 0) {
                creep.memory.harvesting = true;
            }
            else if ((creep.transfer(target_container, "energy") == ERR_NOT_IN_RANGE) || (creep.transfer(target_container, "energy") == ERR_INVALID_TARGET)) {
                    creep.moveTo(target_container);
                }


            }






        else if (creep.memory.harvesting == true) {


            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
            }

            else if (in_target_room){

                if (creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES));
                }
            }
            else {
                creep.moveTo(new RoomPosition(44, 14, "W33N11"));
            }
        }

    }

};
