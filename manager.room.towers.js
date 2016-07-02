// Construct the faucetList and sinkList.
module.exports = {
    manage_towers: function (room) {

        var towers = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER});

        for (i in towers){
            var tower = towers[i];
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
            else if (tower.energy > tower.energyCapacity * .80){
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

