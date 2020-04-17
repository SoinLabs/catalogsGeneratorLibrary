const createTable = require('./createTable')

function generateModel(options){
    let fields = options.fields
    if(options.exclude && options.exclude.length > 0){
        excludeAttributes(fields, options.exclude)
        delete options.exclude
    }
    if(options.include){
        fields = { ...fields, ...options.include}
        delete options.include
    }
}

function excludeAttributes(fields, excludeFields){
    excludeFields.map(fieldname => {
        delete fields[fieldname]
    })
}

module.exports = {
    generateModel,
}
