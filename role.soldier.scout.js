var spawnManager = require('manager.spawn');

module.exports = {
    run: function (creep) {
        if (creep.memory.need_replacement == null){
            creep.memory.need_replacement = false;
        }

        var scoutFlag = Game.flags["Scout"];

        if (creep.ticksToLive == 200){
            creep.memory.need_replacement = true;
        }

        if (creep.memory.need_replacement){
            let name = spawnManager.spawn_creep('soldier.scout',Game.getObjectById("5775e490efd3405c4bb4e8e8"), 50);
            if (!(name < 0)){
                creep.memory.need_replacement = false;
            }
        }


        if (scoutFlag != null) {
            creep.moveTo(scoutFlag);
        }

    }
};