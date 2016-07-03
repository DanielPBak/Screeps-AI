// Todo: repair prioritization
// Relay scheduling?
// Todo: healer AI
// Todo: ranger AI
// Todo: schedule combat
// Todo: micro flags
// Distance is length from PathFinder.

var roleClaimant = require('role.claimant');
var roleHarvester = require('role.harvester');
var roleRemoteHarvester = require('role.remote_harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDeliverer = require('role.deliverer');
var managerSpawn = require('manager.spawn');
var managerRoomEnergy = require('manager.room.energy');
var roleSoldierGrunt = require('role.soldier.grunt');
var roleSoldierShield = require('role.soldier.shield');
var roleSoldierMedic = require('role.soldier.medic');
var roleSoldierScout = require('role.soldier.scout');
var managerRoomTowers = require('manager.room.towers');
var managerMemory = require('manager.memory');
var multiRoomNavigation = require('multiroom_navigation');

module.exports.loop = function() {
    // managerMemory.maintain();
    PathFinder.use(true);
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

            else if (creep.memory.role == 'soldier.shield'){
                roleSoldierShield.run(creep);
            }

            else if (creep.memory.role == 'soldier.medic'){
                roleSoldierMedic.run(creep);
            }

                else if (creep.memory.role == 'soldier.scout'){
                roleSoldierScout.run(creep);
            }

            else if (creep.memory.role === 'claimant'){
                console.log("Running claimant");
                roleClaimant.run(creep);
            }

            else if (creep.memory.role === 'remote_harvester'){
                roleRemoteHarvester.run(creep);
            }

            else if (creep.memory.role === 'primitive_harvester'){
                roleHarvester.run(creep);
            }


        }

        for (let name in Game.spawns) {
            var spawn = Game.spawns[name];

            managerSpawn.run(spawn);
        }


        for (let name in Game.rooms) {
            room = Game.rooms[name];

            managerRoomEnergy.update_room(room);
            managerRoomTowers.manage_towers(room);



        }

    }


};