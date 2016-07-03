// Construct the faucetList and sinkList.
var managerRoomEnergy = require('manager.room.energy');

module.exports = {
    manage_towers: function (room) {
        var sinks = managerRoomEnergy.get_sinks(room);
        sinks = sinks.filter(function(s){
            return (((s.structureType == STRUCTURE_EXTENSION) && (s.energy != s.energyCapacity))
            || ((s.structureType == STRUCTURE_CONTAINER) && (s.store[RESOURCE_ENERGY] < s.storeCapacity * .50)))
        });

        var emergency_repairs = room.find(FIND_STRUCTURES, {filter: s => ((s.hits / s.hitsMax < .02) && (s.hits < 20000))});

        var towers = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER});

        for (i in towers){
            var tower = towers[i];
            var containers_are_full = tower.room.find(FIND_MY_STRUCTURES, {
                    filter: s => ((s.structureType == STRUCTURE_CONTAINER) &&
                    (s.store[RESOURCE_ENERGY] < s.storeCapacity - 1000) &&
                    (s.pos.getRangeTo(s.pos.findClosestByRange(FIND_SOURCES)) > 2))}).length > 0;


                var hostile_healer = (tower["pos"].findClosestByRange(FIND_HOSTILE_CREEPS, {filter: c => (c.getActiveBodyparts(HEAL) > 0)}));
            if (hostile_healer != null){
                hostile_creep = hostile_healer;
            }
            else {
                hostile_creep = (tower["pos"].findClosestByRange(FIND_HOSTILE_CREEPS));
            }




            if (!(hostile_creep == null)){
                tower.attack(hostile_creep);
            }
            else if ((tower.energy > tower.energyCapacity * .50) && (tower.room.energyAvailable == tower.room.energyCapacityAvailable) && (sinks.length == 0)){
                var structs = room.find(FIND_STRUCTURES, {filter: s => (s.hits < 20000)});
                var lowest = 100;
                var target_struct;
                for (i in structs){
                    if ((structs[i].hits / structs[i].hitsMax) < lowest){
                        lowest = (structs[i].hits / structs[i].hitsMax);
                        target_struct = structs[i];
                    }
                }
                if (target_struct != null) {
                    tower.repair(target_struct);
                }
            }

                else if ((tower.energy > tower.energyCapacity * .25) && (emergency_repairs.length > 0)){
                tower.repair(emergency_repairs[0]);
            }


            else {
                var damaged_creep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c => c.hits < c.hitsMax});
                if (damaged_creep){
                    tower.heal(damaged_creep);
                }
                else {
                }
            }


        }

    }


}

