function greeting (req, res) {
    res.send({ hi: "there" });
}

function create (req, res) {
    res.send({ success: true });
}

module.exports = {
    greeting,
    create
};