// Construct the faucetList and sinkList.
//var energyManager = require('manager.energy');

module.exports = {
    maintain: function() {

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                //energyManager.clearJobs(Memory.creeps[name]);
                delete Memory.creeps[name];
            }
        }


    }
};

