describe("When a project exists", function () {

    var project;
    var result;

    beforeEach(function() {
        project = new Deventure.Project();
    });

    it("Has a list of team members", function() {

        expect(project.teamMembers.isArray);
    });

    describe("When addTeamMember is called with a new person", function() {
        beforeEach(function() {
            project.addTeamMember({});
        });

        it("Should add that person to the teamMembers array", function () {
            expect(project.teamMembers.length).toEqual(1);
        });

        describe("When getStatus() is called on the project", function() {
            beforeEach(function() {
                result = project.getStatus();
            });

            it("Returns a JavaScript object", function () {
                expect(result).toBeDefined();
            });

            it("Returns a 0 project completion status", function() {
                expect(result.completionPercentage).toEqual(0);
            });
        })
    });
});