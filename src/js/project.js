if ((typeof Deventure) === "undefined")
    Deventure = {};

Deventure.Project = function() {
    var completionPercentage = 0;
    var teamMembers = [];

    var getStatus = function() {
        return {
            completionPercentage: completionPercentage
        };
    };

    var addTeamMember = function(newPerson) {
        teamMembers.push(newPerson);
    };

    return {
        getStatus: getStatus,
        addTeamMember: addTeamMember,
        teamMembers: teamMembers
    };
};