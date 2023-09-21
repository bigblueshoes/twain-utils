const alpha = Array.from(Array(26)).map((e, i) => i + 97);
const alphanumDict = alpha.map((x) => String.fromCharCode(x))
    .concat([0,1,2,3,4,5,6,7,8,9,'_','-'])
    .reduce((res, ind, val) => {
        res[ind] = val;
        return res;
    }, {});

const hash_to_dec = (h) => {
    const inthash = parseInt(
        h.split('')
        .map(v => alphanumDict[v]).join('')
    )
    return (Math.sin(inthash) + Math.cos(inthash)) / 2;
}

const consistentHash = (servers=[], n=3) => {
    const partition_size = 2 / servers.length;
    return (hash) => {
        const dec = hash_to_dec(hash);
        const server = servers.reduce((res, name, n) => {
            if (res) return res;
            const lt_partition = -1 + (n+1) * partition_size;
            if (dec < lt_partition) return name;
        }, null);
        const ind = servers.findIndex(server);
        return servers.slice(ind).concat(
            servers.slice(0, ind) 
        ).slice(0, n);
    }
}

exports.consistentHash = consistentHash;