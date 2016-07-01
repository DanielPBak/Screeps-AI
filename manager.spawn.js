// Todo: relay strategy. Fetch from containers. Scheduler?

module.exports = {
    run: function (spawn) {

        var max_builders;
        if (spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            max_builders = 3;
            if (spawn.room.find(FIND_CONSTRUCTION_SITES).length > 10) {
                max_builders = 5;
            }
        }
        else {
            max_builders = 3;
        }
        var max_harvesters = 4;
        var num_harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var max_upgraders = 2;
        var num_upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var num_builders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var max_deliverers = 8;
        var num_deliverers = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer');
        var max_grunts = 6;
        var num_grunts = _.sum(Game.creeps, (c) => c.memory.role == 'soldier.grunt');


        var name;

        if (num_deliverers < max_deliverers) {
            var delivererID = getNextCreepID('deliverer');
            name = spawn.createCreep([MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], 'Deliverer: ' + delivererID, {
                gathering: true,
                target: null,
                role: 'deliverer',
                id: delivererID
            });

            if (!(name < 0) && (name != -4)) {
                console.log("Deliverer spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Can't spawn deliverers: " + name);
            }
        }

        else if (num_grunts < max_grunts) {
            var gruntID = getNextCreepID('soldier.grunt');

            name = spawn.createCreep([TOUGH, TOUGH, MOVE, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], 'Grunt: ' + gruntID, {
                role: 'soldier.grunt',
                id: gruntID
            });

            if (!(name < 0) && (name != -4)) {
                console.log("Grunt spawned: " + name);
            }
            else if (name != -6) {
                console.log("Can't spawn grunts: " + name);
            }

        }



        if (num_harvesters < max_harvesters) {
            var harvesterID = getNextCreepID('harvester');
            //name = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {gathering: true, role: 'harvester'});
            name = spawn.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], "Harvester: " + harvesterID, {
                gathering: false,
                role: 'harvester',
                id: harvesterID
            });

            if (!(name < 0) && (name != -4)) {
                console.log("Harvester spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Harvester can't spawn: " +name);
            }
        }


        else if (num_upgraders < max_upgraders) {
            var upgraderID = getNextCreepID('upgrader');
            name = spawn.createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], "Upgrader: " + upgraderID, {
                upgrading: false,
                gathering: true,
                role: 'upgrader',
                id: upgraderID
            });

            if (!(name < 0)) {
                console.log("Upgrader spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Can't build upgrader - error code: " + name);
            }
        }

        else if (num_builders < max_builders) {
            var builderID = getNextCreepID('builder');
            name = spawn.createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], "Builder: " + builderID, {
                gathering: true,
                role: 'builder',
                id: builderID
            });

            if (!(name < 0)) {
                console.log("Builder spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Can't build upgrader - error code: " + name);
            }
        }


    }

};



function getNextCreepID(type){
    var max = 2;
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.hasOwnProperty("id") && creep.memory.role == type) {
            max = Math.max(max, creep.memory["id"]);
        }
    }
    return max + 1;

}