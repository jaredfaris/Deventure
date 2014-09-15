describe "When a project exists", () ->

  project = null

  beforeEach () ->
    project = new Deventure.Project()

  it "Has a list of team members", () ->
    expect project.teamMembers.isArray

  describe "When addTeamMember is called with a new person", () ->
    beforeEach () ->
      project.addTeamMember {}

    it "Should add that person to the teamMembers array", () ->
      expect(project.teamMembers.length).toEqual(1)

    describe "When getStatus() is called on the project", () ->
      result = null

      beforeEach () ->
        result = project.getStatus()

      it "Returns a JavaScript object", () ->
        expect(result).toBeDefined()

      it "Returns a 0 project completion status", () ->
        expect(result.completionPercentage).toEqual(0)