// Todo: Update target only when switching gathering state
// Todo: creep.pos.findClosestByPath(FIND_EXTENSION, { filter: e => e.energy < e.energyCapacity });
// Todo: If there are already two creeps next to the source, forget about it.
// Tood: anticipate harvester death
energyStorageManager = require('manager.energy.storage');
spawnManager = require('manager.spawn');

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

                else {
                var error_status = creep.transfer(Game.getObjectById(creep.memory["target"]), RESOURCE_ENERGY);

                if (error_status == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory["target"]));
                }

                else if (error_status == ERR_FULL){
                    energyStorageManager.toggle(creep.memory.target, creep.room);
                    setNewTarget(creep);

                }
            }


        }


    },

    upgraded_run: function(creep){
        // Move to the nearest source
        var source;
        var nearest_container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: site =>
            site.structureType == STRUCTURE_CONTAINER
        });


        if (creep.memory.gathering == true){
            source = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(source);
            creep.transfer(nearest_container, "energy");


        }

        else {
            source = creep.pos.findClosestByRange(FIND_SOURCES, {filter: src => src.pos.findInRange(FIND_MY_CREEPS, 1).length < 1});

            if (source == null){
                source = creep.pos.findClosestByRange(FIND_SOURCES);
            }

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


    var extensionTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: str => (str.structureType == STRUCTURE_EXTENSION) && (str.energy < str.energyCapacity)});

    console.log(creep.name + " extension targets: " + extensionTarget);

    if (typeof extensionTarget == "undefined") {
        creep.memory.target = creep.pos.findClosestByPath(FIND_MY_SPAWNS)["id"];
        creep.moveTo(Game.getObjectById(creep.memory["target"]));
    }

    else {
        creep.memory.target = extensionTarget["id"];

        }

    }
