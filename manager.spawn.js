// Todo: relay strategy. Fetch from containers. Scheduler?
// Put things into functions. Make a queue?
// spawnCreep(energy) automatically makes creep for that amt.

module.exports = {
    run: function (spawn) {

        var max_builders;
        if (Object.keys(Game.constructionSites).length > 0) {
            max_builders = 1;
            if (Object.keys(Game.constructionSites).length > 10) {
                max_builders = 2;
            }
        }
        else {
            max_builders = 1;
        }
        var max_harvesters = 2;
        var num_harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var max_upgraders = 2;
        var num_upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var num_builders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var max_deliverers = 5;
        var num_deliverers = _.sum(Game.creeps, (c) => c.memory.role == 'deliverer');
        var max_grunts = 1;
        var num_grunts = _.sum(Game.creeps, (c) => c.memory.role == 'soldier.grunt');
        var max_medics = 0;
        var num_medics = _.sum(Game.creeps, (c) => c.memory.role == 'soldier.medic');

        var max_shields = 0;
        var num_shields = _.sum(Game.creeps, (c) => c.memory.role == 'soldier.shield');


        if (Game.time % 50 == 0) {
            console.log("Tick: " + Game.time);
            console.log(num_harvesters + " out of " + max_harvesters + " harvesters.");
            console.log(num_grunts + " out of " + max_grunts + " grunts.");
            console.log(num_medics + " out of " + max_medics + " medics.");
            console.log(num_shields + " out of " + max_shields + " shields.");
            console.log(num_upgraders + " out of " + max_upgraders + " upgraders.");
            console.log(num_builders + " out of " + max_builders + " builders.");
            console.log(num_deliverers + " out of " + max_deliverers + " deliverers.");
        }



        var name;

        if (Memory["claims"].length > 0){
            var targetRoom = Memory["claims"].pop();
            console.log("CLAIMANT TARGET: " + targetRoom);
            var claimantName = "Claimant: " + targetRoom;

            name = spawn.createCreep([MOVE, CLAIM], claimantName, {targetRoom: targetRoom, role: 'claimant'});
        }

        else if (num_deliverers < max_deliverers) {
            var delivererID = getNextCreepID('deliverer');
            name = spawn.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY], 'Deliverer: ' + delivererID, {
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

            name = spawn.createCreep([TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], 'Grunt: ' + gruntID, {
                role: 'soldier.grunt',
                id: gruntID
            });

            if (!(name < 0) ) {
                console.log("Grunt spawned: " + name);
            }
            else if ((name != -6) && (name != -4)) {
                console.log("Can't spawn grunts: " + name);
            }

        }



        if ((num_harvesters < max_harvesters) && (spawn.room.energyAvailable == spawn.room.energyCapacityAvailable)) {
            //name = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {gathering: true, role: 'harvester'});
            name = this.spawn_creep('harvester', spawn, spawn.room.energyAvailable);

            if (!(name < 0) && (name != -4)) {
                console.log("Harvester spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Harvester can't spawn: " +name);
            }
        }


        if ((num_upgraders < max_upgraders) && (spawn.room.energyAvailable == spawn.room.energyCapacityAvailable)) {
            //name = spawn.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {gathering: true, role: 'harvester'});
            name = this.spawn_creep('upgrader', spawn, spawn.room.energyAvailable);

            if (!(name < 0) && (name != -4)) {
                console.log("Upgrader spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Upgrader can't spawn: " +name);
            }
        }

        else if (num_builders < max_builders) {
            var builderID = getNextCreepID('builder');
            name = spawn.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], "Builder: " + builderID, {
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

        else if (num_shields < max_shields) {
            var shieldID = getNextCreepID('soldier.shield');
            name = spawn.createCreep([TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE],
                "Shield: " + shieldID, {
                gathering: true,
                role: 'soldier.shield',
                id: shieldID
            });

            if (!(name < 0)) {
                console.log("Shield spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Can't build shield - error code: " + name);
                console.log(shieldID);
            }
        }

        else if (num_medics < max_medics) {
            var medicID = getNextCreepID('soldier.medic');
            name = spawn.createCreep([HEAL, MOVE],
                "Medic: " + medicID, {
                    gathering: true,
                    role: 'soldier.medic',
                    id: medicID
                });

            if (!(name < 0)) {
                console.log("Medic spawned: " + name);
            }
            else if (name != -6 && name != -4) {
                console.log("Can't build medic - error code: " + name);
                console.log(medicID);
            }
        }




    },


    spawn_creep: function(type, spawn, energy) {
        var tail;
        var segment;
        var head = [];
        var segment_cost;

        if (type == 'harvester') {
            tail = [CARRY, MOVE];
            segment = [WORK];

            head = [];
            segment_cost = 100;


            while(energy > segment_cost){
                head = head.concat(segment);
                energy = energy - segment_cost;
            }
            head = head.concat(tail);
            var harvesterID = getNextCreepID('harvester');

            return spawn.createCreep(head, "Harvester: " + harvesterID, {
                gathering: false,
                role: 'harvester',
                id: harvesterID
            });
        }

        else if (type == 'upgrader') {
            tail = [CARRY, MOVE];
            segment = [WORK];

            head = [];
            segment_cost = 100;


            while(energy > segment_cost){
                head = head.concat(segment);
                energy = energy - segment_cost;
            }
            head = head.concat(tail);
            var upgraderID = getNextCreepID('upgrader');

            return spawn.createCreep(head, "Upgrader: " + upgraderID, {
                upgrading: false,
                role: 'upgrader',
                id: upgraderID
            });
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

