var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDeliverer = require('role.deliverer');
var managerSpawn = require('manager.spawn');
var managerRoomEnergy = require('manager.room.energy');
var roleSoldierGrunt = require('role.soldier.grunt');

module.exports.loop = function() {
    var reset = false;
    var creep;
    var room;

    if (reset == true){
        console.log("reset");
        for (let name in Game.creeps) {
            creep = Game.creeps[name];
            console.log(creep);

            roleHarvester.reset(creep);
        }

        for (let name in Game.rooms) {
            room = Game.rooms[name];
            managerEnergyStorage.reset_extensions(room);
        }
        }

    else {
        for (let name in Game.creeps) {
            creep = Game.creeps[name];


            if (creep.memory.role == 'harvester') {
                roleHarvester.upgraded_run(creep);

            }

            else if (creep.memory.role == 'soldier.grunt'){
                roleSoldierGrunt.run(creep);
            }

            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }

            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }

            else if (creep.memory.role == 'deliverer'){
                roleDeliverer.run(creep);
            }


        }

        for (let name in Game.spawns) {
            var spawn = Game.spawns[name];

            managerSpawn.run(spawn);
        }


        for (let name in Game.rooms) {
            room = Game.rooms[name];

            managerRoomEnergy.update_room(room);



        }

    }


};