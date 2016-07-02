module.exports = {
    run: function (creep) {
        var militaryFlag = Game.flags["MilitaryFlag"];
        var medicFlag = Game.flags["MedicFlag"];
        var retreatFlag = Game.flags["RetreatFlag"];
        var medicRetreatFlag = Game.flags["MedicRetreat"];
        var closestDamagedFriendlyCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c => c.hits < c.hitsMax});
        // var closestEnemyTower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: str => str.structureType == STRUCTURE_TOWER});

        if (medicRetreatFlag != null){
            creep.moveTo(medicRetreatFlag)
        }
        else if (retreatFlag != null) {
            creep.moveTo(retreatFlag);
        }


        else if (closestDamagedFriendlyCreep != null) {
            if (creep.heal(closestDamagedFriendlyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedFriendlyCreep, {reusePath: 0});
            }
            else if (creep.pos.getRangeTo(closestDamagedFriendlyCreep["pos"]) > 1){
                creep.moveTo(closestDamagedFriendlyCreep);
            }
        }

            else if (medicFlag != null){
            creep.moveTo(medicFlag);
        }


        else {
            creep.moveTo(militaryFlag);
        }


    }
};