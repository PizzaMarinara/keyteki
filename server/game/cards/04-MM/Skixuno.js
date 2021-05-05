const Card = require('../../Card.js');

class Skixuno extends Card {
    setupCardAbilities(ability) {
        this.play({
            effect: 'destroy each other creature',
            gameAction: ability.actions.destroy((context) => ({
                target: context.game.creaturesInPlay.filter((card) => card !== context.source)
            })),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.addPowerCounter((context) => ({
                    amount: context.preThenEvents.filter((event) => !event.cancelled).length
                }))
            }
        });
    }
}

Skixuno.id = 'skixuno';

module.exports = Skixuno;
