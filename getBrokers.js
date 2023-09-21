const getBrokers = () => process.env.TWAIN_BROKERS
    .split(',')
    .map(b => b.split(':'));

exports.getBrokers = getBrokers;