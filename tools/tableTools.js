module.exports = {
    whiteSpaceSplicer(table) {
        if (Array.isArray(table))
            for (var counter = 0; counter < table.length; counter++)
                if (table[counter] === ' ' || table[counter] === '')
                    table.splice(counter, 1);

        return table;
    }
}