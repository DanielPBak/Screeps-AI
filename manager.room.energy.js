// Construct the faucetList and sinkList.
module.exports = {

    update_room: function (room) {

        room.memory.virtual_containers = [];
        room.memory.virtual_extensions = [];
        room.memory.virtual_spawns = [];
        room.memory.virtual_everything = [];

        var containers = room.find(FIND_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_CONTAINER});
        var extensions = room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_EXTENSION});
        var spawns = room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_SPAWN});


        var id;
        var faucetStatus;
        var pos;

        for (i in containers){
            id = containers[i]["id"];
            faucetStatus = (containers[i].pos.findInRange(FIND_SOURCES, 2).length > 0);
            pos = containers[i].pos;
            var new_container = {"id": id, "faucet": faucetStatus, "pos": pos};
            room.memory.virtual_containers.push(new_container);
        }

        for (i in extensions){
            id = extensions[i]["id"];
            faucetStatus = false;
            pos = extensions[i].pos;
            var new_extension = {"id": id, "faucet": faucetStatus, "pos": pos};
            room.memory.virtual_extensions.push(new_extension);
        }



        for (i in spawns){
            id = spawns[i]["id"];
            faucetStatus = false;
            pos = spawns[i]["pos"];
            var new_spawn = {"id": id, "faucet": faucetStatus, "pos": pos};
            room.memory.virtual_spawns.push(new_spawn);
        }

        room.memory.virtual_everything = room.memory.virtual_containers.concat(room.memory.virtual_extensions, room.memory.virtual_spawns);
        

    },

    get_faucets: function (room) {
        var virtual_faucets = room.memory.virtual_everything.filter(c => c["faucet"] == true);
        var to_return = [];

        for (i in virtual_faucets){
            var id = virtual_faucets[i]["id"];

            if (Game.getObjectById(id) != null) {
                var structureType = Game.getObjectById(id).structureType;
            }

            var gameObject = Game.getObjectById(id);

            switch(structureType){
                case STRUCTURE_CONTAINER:
                    if (gameObject.store[RESOURCE_ENERGY] > 100){
                        to_return.push(gameObject);
                    }
                    break;

            }
        }

        return to_return;

    },

    get_sinks: function (room) {
        var virtual_sinks = room.memory.virtual_everything.filter(c => c["faucet"] == false);
        var to_return = [];

        for (i in virtual_sinks){
            var id = virtual_sinks[i]["id"];

            if (Game.getObjectById(id) != null) {
                var structureType = Game.getObjectById(id).structureType;
            }
            else {
                return;
            }
            var gameObject = Game.getObjectById(id);

            switch(structureType){
                case STRUCTURE_CONTAINER:
                    if (gameObject.store[RESOURCE_ENERGY] < gameObject.storeCapacity - 200){
                        to_return.push(gameObject);
                    }
                    break;
                case STRUCTURE_SPAWN:
                    if (gameObject.energy < gameObject.energyCapacity){
                        to_return.push(gameObject);
                    }
                    break;
                case STRUCTURE_EXTENSION:
                    if (gameObject.energy < gameObject.energyCapacity){
                        to_return.push(gameObject);
                    }
                    break;


            }
        }

        return to_return;

    }
};

