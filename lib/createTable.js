function tableGenerate(options){
    let createTable = `CREATE TABLE "${options.name}" (`
    Object.keys(options.fields).forEach(field => {
        createTable += `\r\n\t${field}`
        Object.keys(options.fields[field]).forEach(property => {
            createTable += getValue(options.fields[field], property)
        })
        createTable += ','
      })
    createTable = createTable.slice(0, -1) + '\r\n)'
    return createTable
}

function getValue(fields, property) {
    let text = ''
    switch(property){
        case 'autoIncrement': {
            if(fields.autoIncrement) text = ' serial'
            break
        }
        case 'defaultValue': text = ` DEFAULT ${fields.defaultValue}`; break
        case 'allowNull': {
            if(!fields.allowNull) text = ' NOT NULL'
            break
        }
        case 'type': text = getType(fields, "type"); break
        case 'length': break
        case 'references': {
            text = ` REFERENCES "${fields.references.model
                }"(${fields.references.key})`
            break
        }
        case 'onDelete':
        case 'onUpdate': {
            text =  ` ${property.replace(/([a-z])([A-Z])/g, '$1 $2')} ${fields[property]}`.toUpperCase()
            break
        }
        default: {
            text = ` ${property.replace(/([a-z])([A-Z])/g, '$1 $2')}`.toUpperCase()
            break
        }
    }
    return text
}

function getType(field, name) {
    let type = ''
    if(field.hasOwnProperty(name)){
        switch(field[name]){
            case 'DATE': { type = ' timestamp with time zone'; break; }
            case 'STRING': {
                type = ` character varying(${field.hasOwnProperty('length') ? field.length : 255})`; 
                break; 
            }
            default: { type = ` ${field[name]}`; break; }
        }
    }
    return type
}

module.exports = {
    tableGenerate
}