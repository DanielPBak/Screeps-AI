module.exports = {
    run: function (creep) {
        var shieldFlag = Game.flags["ShieldFlag"];


        if (shieldFlag != null) {
            creep.moveTo(shieldFlag);
        }

    }
}