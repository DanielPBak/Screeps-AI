// Todo: Update target only when switching gathering state
// Todo: creep.pos.findClosestByPath(FIND_EXTENSION, { filter: e => e.energy < e.energyCapacity });
// Todo: If there are already two creeps next to the source, forget about it.
energyStorageManager = require('manager.energy.storage');

module.exports = {
    run: function (creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (creep.ticksToLive <= 2){
            creep.role = null;
            creep.harvesting = null;
            for (i in creep.room.memory.extensions){
                if (creep.room.memory.extensions[i]["extension_structure"]["id"] == creep.target){
                    creep.room.memory.extensions[i]["is_target"] = false;
                }
            }

            creep.target = null;
        }



        else if (creep.memory.gathering == true) {

            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.gathering = false;
                setNewTarget(creep);
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }

            else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }


            // We are currently moving energy back
        else if (creep.memory.gathering == false) {


            // We've transmitted all of our energy
            if (creep.carry.energy == 0) {
                creep.memory.gathering = true;

                // Reset the target's "is_target" to false.
                var extensionTarget = creep.room.memory.extensions.filter(function (ext) {
                    return ext["extension_structure"]["id"] == creep.memory.target;
                })[0];

                if (typeof extensionTarget != "undefined"){
                    extensionTarget["is_target"] = false;
                }

                creep.memory.target = null;


                creep.moveTo(source);
            }

                // xfer to our target.
            else if (creep.transfer(Game.getObjectById(creep.memory["target"]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory["target"]));
            }

            else if (creep.transfer(Game.getObjectById(creep.memory["target"]), RESOURCE_ENERGY) == ERR_FULL){
                energyStorageManager.toggle(creep.memory.target, creep.room);
                setNewTarget(creep);
            }

        }


    },

    upgraded_run: function(creep){
        // Move to the nearest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        var nearest_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: site =>
            site.structureType == STRUCTURE_CONTAINER
        });


        if (creep.memory.gathering == true){
            creep.harvest(source);
            creep.transfer(nearest_container, "energy");


        }

        else {

            if (!(creep.harvest(source) < 0)){
                creep.memory.gathering = true;
            }
            else {
                creep.moveTo(source);
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


// Set the creep's new target.
function setNewTarget(creep) {
    var modified_extension;
    console.log("setting new target: " + creep);


    var extensionTargets = creep.room.memory.extensions.filter(function (ext) {
        return (!ext["is_target"] && (Game.getObjectById(ext["extension_structure"]["id"]).energy < 50));
    });

    if (typeof extensionTargets[0] == "undefined") {
        // ?
        creep.memory.target = creep.pos.findClosestByPath(FIND_MY_SPAWNS)["id"];
        creep.moveTo(Game.getObjectById(creep.memory["target"]));
    }

    else {
        creep.memory.target = extensionTargets[0]["extension_structure"]["id"];

        for (i in creep.room.memory.extensions){
            if (creep.room.memory.extensions[i]["extension_structure"]["id"] == creep.memory.target){
                console.log("New target is valid.");
                creep.room.memory.extensions[i]["is_target"] = true;
                console.log("Set is target flag to: " + creep.room.memory.extensions[i]["is_target"]);
                modified_extension = i;

            }
        }

    }

}