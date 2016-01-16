'use strict'


function pipes(src, procs, ctx) {
    return procs.reduce(
        (prev, proc) => proc.bind(ctx, prev)(),
        src
    )
}

module.exports = pipes