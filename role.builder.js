// Todo: priority tags (flags)? - scheduler
// Todo: repair and build
module.exports = {
run: function(creep){
    var primitive = false;

    var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 500)});
    if (source == null){
        primitive = true;
        source = creep.pos.findClosestByRange(FIND_SOURCES);
    }
    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    var all_site_ids = Object.keys(Game.constructionSites);
    var all_sites = [];
    for (i in all_site_ids){
        let site = Game.getObjectById(all_site_ids[i]);
        all_sites.push(site);
    }
    var altTarget = null;

    if (target == null && altTarget != null){
        target = altTarget;
    }
    var mode = 'build';

    if (target == null || ((creep.memory.id % 2 == 1) && false)){
        mode = 'repair';
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure =>
                 structure.hits < structure.hitsMax && structure.hits < 50000
            });

    }


    if (creep.memory.gathering == true){

        if (source != null) {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.gathering = false;
                creep.moveTo(target);
            }

            else if ((primitive == false) && (source.transfer(creep, "energy") == ERR_NOT_IN_RANGE)) {
                creep.moveTo(source);
            }

                else if ((primitive == true) && creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }

            else if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.gathering = false;
                creep.moveTo(target);
            }
        }
    }


    else if (creep.memory.gathering == false) {
        //console.log(creep.name + ": " + creep.repair(target));
        if (creep.carry.energy == 0) {
            creep.memory.gathering = true;
            creep.moveTo(source);
        }
        else if (mode == 'build') {
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);

            }

            else {
                if (creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49){
                    creep.moveTo(target);
                }
            }

        }

        else if (mode == 'repair') {
            var repairStatus = (creep.repair(target));

            if (repairStatus == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }


        if (creep.carry.energy == 0) {
            creep.memory.gathering = true;
            creep.moveTo(source);
        }
    }


},

    downgrade_run: function(creep){
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        var mode = 'build';

        if (target == null || ((creep.memory.id % 2 == 1) && false)){
            mode = 'repair';
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: structure =>
            structure.hits < structure.hitsMax && structure.hits < 30000
            });

        }
        if (creep.memory.gathering == true){

            if (source != null) {
                if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.gathering = false;
                    creep.moveTo(target);
                }

                else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

                else if (creep.carry.energy == creep.carryCapacity) {
                    creep.memoy.gathering = false;
                    creep.moveTo(target);
                }
            }
        }


        else if (creep.memory.gathering == false) {
            //console.log(creep.name + ": " + creep.repair(target));
            if (creep.carry.energy == 0) {
                creep.memory.gathering = true;
                creep.moveTo(source);
            }
            else if (mode == 'build') {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);

                }

            }

            else if (mode == 'repair') {
                var repairStatus = (creep.repair(target));

                if (repairStatus == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }


            if (creep.carry.energy == 0) {
                creep.memory.gathering = true;
                creep.moveTo(source);
            }
        }

    }


};

function getClosestConstructionSite(creep){

    for (i in Object.keys(Game.constructionSites)){
        let site = Game.getObjectById(Object.keys(Game.constructionSites)[i]);

        let length = PathFinder.search(creep.pos, site)["path"].length;
    }
};