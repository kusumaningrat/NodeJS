const tiger = require('./Tiger');
const wolf  = require('./Wolf');

const fighting = (tiger, wolf) => {
    
    if (tiger.strength > wolf.strength) {
        console.log('Tiger wins!');
        return;
    }

    if (wolf.strength > tiger.strength) {
        console.log('Wolf wins!');
        return;
    }

    console.log('They are equal!');
}

const Tiger = new tiger();
const Wolf = new wolf();

fighting(Tiger, Wolf);