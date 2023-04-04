const roundPrice = (price) => {
    const number = Number(price);
    const fixed = Number(number.toFixed(2));
    return fixed;
}

module.exports = roundPrice;