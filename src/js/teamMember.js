if ((typeof Deventure) === "undefined")
    Deventure = {};

Deventure.TeamMember = function() {
    var health = 100;
    var statusEffects = [];

    var getStatus = function() {
        return {
            health: health,
            statusEffects: statusEffects
        };
    };

    var dealDamage = function(amountOfDamage) {
        health = health - amountOfDamage;

        if(health <= 0) {
            statusEffects.push({
                name: "dead"
            });

            health = 0;
        }
    };

    var healDamage = function(amountToHeal) {
        if(!isAffectedBy("dead")) {
            health = health + amountToHeal;

            if(health > 100)
                health = 100;
        }
    };

    var applyEffect = function(effect) {
        if(!isAffectedBy(effect.name))
            statusEffects.push(effect);
    };

    // private helper method to use with _.contains for quick checks
    var isAffectedBy = function(statusEffectName) {
        var effectNames = _.pluck(statusEffects, "name");
        return _.contains(effectNames, statusEffectName);
    }

    return {
        getStatus: getStatus,
        dealDamage: dealDamage,
        healDamage: healDamage,
        applyEffect: applyEffect
    };
};