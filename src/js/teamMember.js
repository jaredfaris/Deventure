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
            })

            health = 0;
        }
    };

    var applyEffect = function(effect) {
        var statusNames = _.pluck(statusEffects, "name");

        if(!_.contains(statusNames, effect.name))
            statusEffects.push(effect);
    };

    return {
        getStatus: getStatus,
        dealDamage: dealDamage,
        applyEffect: applyEffect
    };
};