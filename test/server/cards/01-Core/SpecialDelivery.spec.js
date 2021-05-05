describe('Special Delivery', function () {
    describe("Special Delivery's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'sanctum',
                    inPlay: ['special-delivery', 'the-grey-rider', 'lamindra', 'bulwark']
                },
                player2: {
                    inPlay: ['troll', 'urchin', 'shadow-self', 'nexus']
                }
            });
        });

        it('should purge creatures who are destroyed by it', function () {
            this.player2.moveCard(this.shadowSelf, 'discard');
            this.player1.useAction(this.specialDelivery, true);
            expect(this.player1).toBeAbleToSelect(this.theGreyRider);
            expect(this.player1).toBeAbleToSelect(this.bulwark);
            expect(this.player1).not.toBeAbleToSelect(this.lamindra);
            expect(this.player1).toBeAbleToSelect(this.nexus);
            expect(this.player1).toBeAbleToSelect(this.troll);
            expect(this.player1).not.toBeAbleToSelect(this.urchin);
            this.player1.clickCard(this.nexus);
            expect(this.nexus.location).toBe('purged');
            expect(this.specialDelivery.location).toBe('discard');
            this.player1.endTurn();
        });

        it('should not purge creatures who are not destroyed', function () {
            this.player2.moveCard(this.shadowSelf, 'discard');
            this.player1.useAction(this.specialDelivery, true);
            this.player1.clickCard(this.troll);
            expect(this.troll.location).toBe('play area');
            expect(this.troll.tokens.damage).toBe(3);
            expect(this.specialDelivery.location).toBe('discard');
            this.player1.endTurn();
        });

        it('should not purge creatures who are destroyed, but were not the target', function () {
            this.shadowSelf.tokens.damage = 7;
            this.player1.useAction(this.specialDelivery, true);
            this.player1.clickCard(this.nexus);
            expect(this.nexus.tokens.damage).toBeUndefined();
            expect(this.nexus.location).toBe('play area');
            expect(this.shadowSelf.location).toBe('discard');
            expect(this.specialDelivery.location).toBe('discard');
            this.player1.endTurn();
        });
    });
});
