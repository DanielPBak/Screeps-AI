module.exports = {
    run: function (creep) {
        var militaryFlag = Game.flags["MilitaryFlag"];
        var killFlag = Game.flags["KillFlag"];
        var retreatFlag = Game.flags["RetreatFlag"];
        var gruntInCombatFlag = Game.flags["GruntCombatFlag"];
        var closestEnemyCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestEnemySpawn = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
        // var closestEnemyTower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: str => str.structureType == STRUCTURE_TOWER});


        if (gruntInCombatFlag != null){
            creep.moveTo(gruntInCombatFlag);
        }

        else if (retreatFlag != null) {
            creep.moveTo(retreatFlag);
        }

        else if (killFlag != null) {

            try {
                var toKill = killFlag.pos.findInRange(FIND_STRUCTURES, 0)[0];

                if (creep.attack(toKill) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toKill);
                }
            }
            catch(err){
                creep.moveTo(killFlag);
            }
        }

        else if (closestEnemyCreep != null) {
            if (creep.attack(closestEnemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestEnemyCreep, {reusePath: 0});
            }
        }

        else if (closestEnemySpawn != null) {
            if (creep.attack(closestEnemySpawn) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestEnemySpawn);
            }
        }

        else {
            creep.moveTo(militaryFlag);
        }


    }
}