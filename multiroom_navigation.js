module.exports = {
    getPathLength: function (pos1, pos2) {
        return PathFinder.search(pos1, pos2)["path"].length;

    },

    getClosestPermittedContainer: function (pos1) {
        var containers = [];

        permittedRooms = this.getPermittedRooms();

        for (i in permittedRooms){
            let room = Game.rooms[permittedRooms[i]];

            if (room == null){
                continue;
            }

            containers = containers.concat(room.find(FIND_STRUCTURES, {
                filter: function (s) {
                    return ((s.structureType == STRUCTURE_CONTAINER) && (s.findInRange(FIND_SOURCES, 2).length > 0))
                }
            }));
        }
        console.log(containers);

        // Don't return anything shorter than 1000.
        var shortest = 1000;
        var nearest_container;

        for (i in containers) {
            var container = containers[i];
            var pathLength = this.getPathLength(container["pos"], pos1);
            if (pathLength < shortest){
                shortest = pathLength;
                nearest_container = container;
            }
        }

        return nearest_container;


    },


    getPermittedRooms: function () {
        return ["W34N11", "W33N11"];
    }

};

