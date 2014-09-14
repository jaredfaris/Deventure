describe("When a team member exists", function () {

    var teamMember;
    var result;

    beforeEach(function() {
        teamMember = new Deventure.TeamMember("developer");
    });

    describe("When getStatus() is called on the team member", function() {
        beforeEach(function() {
            result = teamMember.getStatus();
        });

        it("Has 100 health", function() {
            expect(result.health).toEqual(100);
        });

        it("Has no status effects", function() {
            expect(Array.isArray(result.statusEffects)).toBeTruthy();
            expect(result.statusEffects.length).toEqual(0);
        });

        it("Has the assigned class name", function() {
            expect(result.className).toEqual("developer");
        })

        it("Has a productivity of 100", function() {
            expect(result.productivity).toEqual(100);
        });
    });

    describe("When 10 damage is dealt", function() {
        beforeEach(function() {
            teamMember.dealDamage(10);
        });

        it("Should have 90 health", function() {
            expect(teamMember.getStatus().health).toEqual(90);
        })
    });

    describe("When damage takes character to 0", function() {
        beforeEach(function() {
            teamMember.dealDamage(100);
        });

        it("Should set health to 0", function() {
            expect(teamMember.getStatus().health).toEqual(0);
        });

        it("Should apply status effect 'dead'", function() {
            expect(teamMember.getStatus().statusEffects[0].name).toEqual("dead");
        });
    });

    describe("When damage takes character to negative", function() {
        beforeEach(function() {
            teamMember.dealDamage(110);
        });

        it("Should set health to 0", function() {
            expect(teamMember.getStatus().health).toEqual(0);
        });
    });

    describe("When a status effects are added to the character", function() {
        beforeEach(function() {
            teamMember.applyEffect({name: "slowed"});
            teamMember.applyEffect({name: "poisoned"});
        });

        it("Should add the effect to the character", function() {
            var status = teamMember.getStatus();

            var effectNames = _.pluck(status.statusEffects, "name");

            expect(_.contains(effectNames, "slowed")).toBeTruthy();
            expect(_.contains(effectNames, "poisoned")).toBeTruthy();
        })
    });

    describe("When a status effect is added a second time", function() {
        beforeEach(function() {
            teamMember.applyEffect({name: "slowed"});
            teamMember.applyEffect({name: "slowed"});
        });

        it("Should only be applied once", function() {
           expect(teamMember.getStatus().statusEffects.length).toEqual(1);
           expect(teamMember.getStatus().statusEffects[0].name).toEqual("slowed");
        });
    });

    describe("When the character is at 90 health", function() {
        beforeEach(function() {
            teamMember.dealDamage(10);
        });

        describe("When the character is healed 10", function() {
            beforeEach(function() {
                teamMember.healDamage(10);
            });

            it("Should heal the character to 100", function() {
                expect(teamMember.getStatus().health).toEqual(100);
            })
        });

        describe("When the character is healed 20", function() {
            beforeEach(function() {
                teamMember.healDamage(20);
            });

            it("Should heal the character to only 100 (no overhealing)", function() {
                expect(teamMember.getStatus().health).toEqual(100);
            });
        });
    });

    describe("When the character is dead", function() {
        beforeEach(function() {
            teamMember.dealDamage(100);
        });

        describe("When the character is healed 10", function() {
            beforeEach(function() {
                teamMember.healDamage(10);
            });

            it("Nothing should happen because they are dead", function() {
                expect(teamMember.getStatus().health).toEqual(0);
                expect(teamMember.getStatus().statusEffects[0].name).toEqual("dead");
            })
        });
    });

    describe("When the character is fatigued", function() {
        beforeEach(function() {
           teamMember.applyEffect({name: "fatigued"});
        });

        it("Has as productivity of 50", function() {
           expect(teamMember.getStatus().productivity).toEqual(50);
        });
    });
});