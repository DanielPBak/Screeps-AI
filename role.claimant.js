module.exports = {
    run: function (creep) {
        var targetController = Game.rooms[creep.memory.targetRoom].controller;
        console.log(targetController);

        if(targetController) {
            if(console.log(creep.claimController(creep.room.controller)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            console.log("Claimant not working");
        }
    }
}