/*DeliveryJob is {destid, energy_required, energy_en_route, priority, creeps}.
 PickupJob!
 creep.memory needs{creep_id, jobids, energy_reserved, seeking(?)}
 Containers need jobidsFrom, jobidsTo
 Spawns, extensions, towers need jobidsFrom


 Each creep has 0..* jobs
 Each job has 0..* creeps
 Each job dest has 1 job
 Each job source has 0..* jobs
 Each creep has 0,1 jobs

 On creep death: remove creep from memory, change energy_en_route

 Each job dest creates a job using nearest source with an amount of energy above (say 500).

 Priority 1: spawns, extensions
 Priority 2: Tower > 50%
 Priority 3: Upgrader reserves > 50%
 Priority 4: Tower > 90%
 Priority 5: Upgrader reserves > 90%
 Prioty 6: else

 Each seeking creep assigns it self to the nearest job source for which that job has energyEnRoute < energyRequired with the lowest and assigns it that job, adjusting energyEnRoute.


 New strat: creep picks up energy, assigned jobs and works jobs until energy_reserved = energy_capacity, picks up energy
 And job doesn't care about source

 Don't assign deliverer if he will die in transit.

 delivery jobs and gathering jobs are entirely distinct, unrelated entities.

 Implement shortest-next-path travelling salesman: 2nd job is picked relative to the 1st job's location.
 */

module.exports = {
    maintain: function() {

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                //energyManager.clearJobs(Memory.creeps[name]);
                delete Memory.creeps[name];
            }
        }


    }
};


function: createJobs(){


}

