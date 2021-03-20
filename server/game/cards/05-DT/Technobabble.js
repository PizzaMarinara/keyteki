const Card = require('../../Card.js');

class Technobabble extends Card {
    //Play: Stun a creature and each of its neighbors that shares a house with it.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.stun()
            },
            gameAction: ability.actions.stun((context) => ({
                target: context.target
                    ? context.target.neighbors.filter((card) =>
                          card.getHouses().some((house) => context.target.hasHouse(house))
                      )
                    : []
            }))
        });
    }
}

Technobabble.id = 'technobabble';

module.exports = Technobabble;
