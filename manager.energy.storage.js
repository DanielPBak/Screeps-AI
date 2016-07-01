// Construct the faucetList and sinkList.
module.exports = {
    update_extensions: function (room) {



        // Room extension: {extension_structure: extension, is_target: false}
        if (!(room.memory.hasOwnProperty("extensions"))) {
            room.memory.extensions = [];
        }

        var real_extensions = room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_EXTENSION}
        });


        //   room.memory.extensions.add({extension_structure: real_extensions[indx], is_target: false});


        // Get rid of all extensions that no longer really exist
        room.memory.extensions = room.memory.extensions.filter(function (ext) {
            var eliminate_this = true;
            for (i in real_extensions){
                if (real_extensions[i]["id"] == ext["extension_structure"]["id"]){
                    eliminate_this = false;
                }
            }
            return !eliminate_this;
        });



        // add all new extensions




        // Get all extensions that aren't in memory yet

        real_extensions = real_extensions.filter(function (ext) {
            var extension_is_new = true;
            for (indx in room.memory.extensions) {
                if (ext["id"] == room.memory.extensions[indx]["extension_structure"]["id"]) {
                    extension_is_new = false;
                    return extension_is_new;
                }

            }
            return extension_is_new;


        });


        // Add each new extension to memory

        for (indx in real_extensions) {
            room.memory.extensions.push({"extension_structure": real_extensions[indx], "is_target": false});
        }


    },


    reset_extensions: function(room){
        room.memory.extensions = [];
    },

    toggle: function(id, room){
        for (i in room.memory.extensions){
            if (room.memory.extensions[i]["extension_structure"]["id"] == id){
                room.memory.extensions[i]["is_target"] = false;
            }
        }

    }


};

