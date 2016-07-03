var managerRoomEnergy = require('manager.room.energy');
var spawnManager = require('manager.spawn');
// get best faucet
// get best sink
// Deliverer walks onto container when collecting

module.exports = {
    run: function (creep) {
        if (creep.memory.need_replacement == null) {
            creep.memory.need_replacement = false;
        }

        if (creep.ticksToLive == 100){
            creep.memory.need_replacement = true;
        }

        if (creep.memory.need_replacement){
            let name = spawnManager.spawn_creep('deliverer',Game.getObjectById("5775e490efd3405c4bb4e8e8"), creep.room.energyCapacityAvailable);
            if (!(name < 0)){
                creep.memory.need_replacement = false;
            }
        }


        var faucets = managerRoomEnergy.get_faucets(creep.room);
        faucets = _.filter(faucets, function(f) {
            return f.store[RESOURCE_ENERGY] > 500;
        });

        var sinks = managerRoomEnergy.get_sinks(creep.room);
        var target;




        if (creep.memory.gathering == true) {
            if (creep.carry.energy < creep.carryCapacity) {
                target = creep.pos.findClosestByRange(faucets);

                if (target != null) {
                    if (target.transfer(creep, "energy") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }

            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.gathering = false;
                target = creep.pos.findClosestByRange(faucets);
                creep.moveTo(target);
            }



        }




        else if (creep.memory.gathering == false) {

            if (creep.carry.energy > 0){
                var tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: str => (str.structureType == STRUCTURE_TOWER) && (str.energy < str.energyCapacity - (creep.carryCapacity / 3))});
                if (tower != null && true){
                    target= tower;
                }
                else {
                    target = creep.pos.findClosestByRange(sinks);
                }



                if (creep.transfer(target, "energy") == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }

            if (creep.carry.energy == 0){
                creep.memory.gathering = true;
                target = creep.pos.findClosestByRange(sinks);
                creep.moveTo(target);
            }
        }
/*
        if (creep.carry.energy == 0) {

            if (creep.memory.target == null) {



                creep.memory.target = creep.pos.findClosestByRange(faucets)["id"];
            }

            if (Game.getObjectById(creep.memory.target).transfer(creep, "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {reusePath: 20});
            }

            if (creep.carry.energy > 0) {
                if (creep.memory.id == 9){
                }
                creep.memory.target = creep.pos.findClosestByRange(sinks)["id"];
                creep.moveTo(Game.getObjectById(creep.memory.target), {reusePath: 20});
            }

        }
        */

/*
else if (creep.carry.energy > 0) {


            if (creep.memory.target == null || Game.getObjectById(creep.memory.target).structureType != "StructureSpawn") {
                try {
                    creep.memory.target = creep.pos.findClosestByRange(sinks)["id"];
                }
                catch (err){
                    console.log("No delivery targets");
                }
            }

            if (creep.transfer(Game.getObjectById(creep.memory.target), "energy") == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {reusePath: 20});
            }

            if (creep.carry.energy == 0) {
                creep.memory.target = creep.pos.findClosestByPath(faucets)["id"];
                creep.moveTo(Game.getObjectById(creep.memory.target), {reusePath: 20});
            }

        }

        */




    }



};


