function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

const getResults = async (players) => {
    console.log(players);
    try {
        const results = await Promise.all(
            players.map(player => luckyDraw(player))
        );
        console.log(results);
    } catch (err) {
        console.log(err);
    }
};
const players=["Tina","Jorge","Julien"]
getResults(players);