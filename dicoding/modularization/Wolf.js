class Wolf {
    constructor() {
        this.strength = Math.floor(Math.random() * 100);
    }

    roar() {
        console.log('owoo');
    }
}


module.exports = Wolf;
